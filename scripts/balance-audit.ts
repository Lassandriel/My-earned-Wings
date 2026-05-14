#!/usr/bin/env tsx
/**
 * balance-audit.ts — number-flow inspection for the YAML content.
 * Reads all resources/actions/modifiers and prints a progression report:
 *   - resources by category, base value, cap, regen
 *   - actions grouped by chapter: cost/reward profile + bottlenecks
 *   - anomalies (free actions, free resources, costs > any cap, etc.)
 *
 * No side effects. Run with: npx tsx scripts/balance-audit.ts
 */
import * as fs from 'fs';
import * as path from 'path';
import * as yaml from 'js-yaml';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const ROOT = path.resolve(path.dirname(__filename), '..');
const C = (n: number, d = 1) => n.toFixed(d).replace(/\.0$/, '');

function loadDir(dir: string): any[] {
  const full = path.join(ROOT, 'content', dir);
  if (!fs.existsSync(full)) return [];
  return fs.readdirSync(full)
    .filter(f => /\.ya?ml$/.test(f))
    .flatMap(f => {
      const parsed = yaml.load(fs.readFileSync(path.join(full, f), 'utf8'));
      return Array.isArray(parsed) ? parsed : [];
    });
}

const resources = loadDir('resources');
const modifiers = loadDir('modifiers');
const actions = loadDir('actions');

// ─── Resources overview ──────────────────────────────────────────────────────
console.log('\n═══════════════════════════════════════════════════════════════');
console.log('  RESOURCE LAYER');
console.log('═══════════════════════════════════════════════════════════════');
const byCategory: Record<string, any[]> = {};
for (const r of resources) (byCategory[r.category || 'misc'] ??= []).push(r);
for (const [cat, arr] of Object.entries(byCategory)) {
  console.log(`\n[${cat}]  (${arr.length} resources)`);
  for (const r of arr.sort((a, b) => (a.id || '').localeCompare(b.id || ''))) {
    const base = r.baseValue ?? r.startValue ?? 0;
    const cap = r.baseLimit ?? r.maxValue ?? '∞';
    const regen = r.passiveRegen ? `+${r.passiveRegen}/${r.regenInterval || '?'}ms` : '';
    const tags = [r.scalesWithSatiation && '🍞scales'].filter(Boolean).join(' ');
    console.log(`  ${r.id.padEnd(22)}  base=${String(base).padStart(4)}  cap=${String(cap).padStart(4)}  ${regen}  ${tags}`);
  }
}

// ─── Helpers ────────────────────────────────────────────────────────────────
function totalCost(a: any): number {
  let sum = 0;
  if (typeof a.cost === 'number') sum += a.cost;
  if (a.costs && typeof a.costs === 'object') {
    for (const v of Object.values(a.costs)) if (typeof v === 'number') sum += v;
  }
  if (Array.isArray(a.steps)) {
    for (const step of a.steps) {
      if (typeof step.cost === 'number') sum += step.cost;
      if (step.costs && typeof step.costs === 'object') {
        for (const v of Object.values(step.costs)) if (typeof v === 'number') sum += v;
      }
    }
  }
  return sum;
}

function totalNumericReward(a: any): number {
  let sum = 0;
  if (a.rewards && typeof a.rewards === 'object') {
    for (const v of Object.values(a.rewards)) if (typeof v === 'number') sum += v;
  }
  return sum;
}

function rewardKeys(a: any): string[] {
  return a.rewards ? Object.keys(a.rewards) : [];
}

function costResources(a: any): string[] {
  const out = new Set<string>();
  if (a.costType) out.add(a.costType);
  if (a.costs) Object.keys(a.costs).forEach(k => out.add(k));
  if (Array.isArray(a.steps)) {
    for (const s of a.steps) {
      if (s.costType) out.add(s.costType);
      if (s.costs) Object.keys(s.costs).forEach(k => out.add(k));
    }
  }
  return [...out];
}

// ─── Actions by chapter ──────────────────────────────────────────────────────
console.log('\n═══════════════════════════════════════════════════════════════');
console.log('  ACTION ECONOMY BY CHAPTER');
console.log('═══════════════════════════════════════════════════════════════');
const byChapter: Record<string, any[]> = {};
for (const a of actions) (byChapter[a.chapter || '— unchaptered —'] ??= []).push(a);

const chapterOrder = Object.keys(byChapter).sort();
for (const chapter of chapterOrder) {
  const arr = byChapter[chapter];
  const costs = arr.map(totalCost).filter(c => c > 0);
  const rewards = arr.map(totalNumericReward).filter(r => r > 0);
  const avgCost = costs.length ? costs.reduce((a, b) => a + b, 0) / costs.length : 0;
  const avgReward = rewards.length ? rewards.reduce((a, b) => a + b, 0) / rewards.length : 0;
  const ratio = avgCost > 0 ? avgReward / avgCost : 0;
  const free = arr.filter(a => totalCost(a) === 0 && !a.duration).length;

  console.log(`\n▸ ${chapter}  (${arr.length} actions)`);
  console.log(`    avg cost: ${C(avgCost)}    avg reward (numeric): ${C(avgReward)}    R/C ratio: ${C(ratio, 2)}`);
  if (free) console.log(`    ⚠ ${free} action(s) cost nothing (free clicks)`);

  // Top 3 most expensive
  const top = [...arr].sort((a, b) => totalCost(b) - totalCost(a)).slice(0, 3).filter(a => totalCost(a) > 0);
  if (top.length) {
    for (const a of top) {
      const types = costResources(a).join(',');
      console.log(`      ↳ ${a.id.padEnd(28)} cost=${C(totalCost(a))} (${types})  rewards: ${rewardKeys(a).join(',') || '—'}`);
    }
  }
}

// ─── Resource flow: what produces / consumes each resource ───────────────────
console.log('\n═══════════════════════════════════════════════════════════════');
console.log('  RESOURCE FLOW (producers vs. consumers)');
console.log('═══════════════════════════════════════════════════════════════');
const flow: Record<string, { produces: number; consumes: number }> = {};
for (const r of resources) flow[r.id] = { produces: 0, consumes: 0 };
for (const a of actions) {
  for (const c of costResources(a)) {
    if (!flow[c]) flow[c] = { produces: 0, consumes: 0 };
    flow[c].consumes++;
  }
  for (const k of rewardKeys(a)) {
    if (!flow[k]) flow[k] = { produces: 0, consumes: 0 };
    flow[k].produces++;
  }
}
const flowKeys = Object.keys(flow).sort();
console.log('\n  resource              produced by   consumed by   net');
console.log('  ────────────────────  ───────────   ───────────   ─────');
for (const k of flowKeys) {
  const f = flow[k];
  const net = f.produces - f.consumes;
  const flag = net < 0 ? ' ⚠ sink only' : net === 0 ? '' : '';
  if (f.produces === 0 && f.consumes === 0) continue;
  console.log(`  ${k.padEnd(20)}  ${String(f.produces).padStart(11)}   ${String(f.consumes).padStart(11)}   ${String(net).padStart(4)} ${flag}`);
}

// ─── Anomalies ──────────────────────────────────────────────────────────────
console.log('\n═══════════════════════════════════════════════════════════════');
console.log('  ANOMALIES');
console.log('═══════════════════════════════════════════════════════════════');

const resourceCaps: Record<string, number> = {};
for (const r of resources) {
  const cap = r.baseLimit ?? r.maxValue;
  if (typeof cap === 'number') resourceCaps[r.id] = cap;
}

let issues = 0;

// Free + rewarding actions (instant click → free reward)
for (const a of actions) {
  if (totalCost(a) === 0 && !a.duration && totalNumericReward(a) > 0) {
    console.log(`  ⚠ ${a.id}: free + immediate, gives ${C(totalNumericReward(a))} reward (no cost, no duration)`);
    issues++;
  }
}

// Costs exceeding base resource caps (player would need upgrades just to afford one click)
for (const a of actions) {
  if (typeof a.cost === 'number' && a.costType && resourceCaps[a.costType] !== undefined && a.cost > resourceCaps[a.costType]) {
    console.log(`  ⚠ ${a.id}: cost ${a.cost} ${a.costType} exceeds base cap ${resourceCaps[a.costType]} — needs cap upgrade first`);
    issues++;
  }
  if (a.costs) {
    for (const [res, val] of Object.entries(a.costs)) {
      if (typeof val === 'number' && resourceCaps[res] !== undefined && val > resourceCaps[res]) {
        console.log(`  ⚠ ${a.id}: cost ${val} ${res} exceeds base cap ${resourceCaps[res]}`);
        issues++;
      }
    }
  }
}

// Rewards far above any reasonable amount (potential typo)
for (const a of actions) {
  const total = totalNumericReward(a);
  if (total > 500) {
    console.log(`  ⚠ ${a.id}: very large reward total ${total} — typo?`);
    issues++;
  }
}

if (issues === 0) console.log('  ✅ none detected');
else console.log(`\n  → ${issues} anomalies flagged.`);

console.log('\n═══════════════════════════════════════════════════════════════\n');
