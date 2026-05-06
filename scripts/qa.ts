import { spawn } from 'node:child_process';

type StepResult = {
  name: string;
  command: string;
  exitCode: number;
  durationMs: number;
};

const runStep = async (name: string, fullCommand: string) => {
  const start = Date.now();

  return await new Promise<StepResult>((resolve) => {
    const child = spawn(fullCommand, {
      stdio: 'inherit',
      shell: true,
      env: process.env,
    });

    child.on('error', () => {
      resolve({
        name,
        command: fullCommand,
        exitCode: 1,
        durationMs: Date.now() - start,
      });
    });

    child.on('close', (code) => {
      resolve({
        name,
        command: fullCommand,
        exitCode: typeof code === 'number' ? code : 1,
        durationMs: Date.now() - start,
      });
    });
  });
};

const formatMs = (ms: number) => {
  const s = Math.round(ms / 100) / 10;
  return `${s}s`;
};

const main = async () => {
  console.log('\n=== QA BUNDLE (one command) ===\n');

  const steps: Array<{ name: string; command: string }> = [
    { name: 'i18n', command: 'npm run check-i18n' },
    { name: 'assets', command: 'npm run check-assets' },
    { name: 'logic', command: 'npm run check-logic' },
    { name: 'unused', command: 'npm run check-unused' },
    { name: 'tests', command: 'npm run test' },
  ];

  const results: StepResult[] = [];
  for (const step of steps) {
    console.log(`\n--- Running: ${step.name} ---\n`);
    results.push(await runStep(step.name, step.command));
  }

  const failed = results.filter((r) => r.exitCode !== 0);
  const totalMs = results.reduce((sum, r) => sum + r.durationMs, 0);

  console.log('\n-----------------------------------------');
  console.log('QA Summary:');
  for (const r of results) {
    const status = r.exitCode === 0 ? '✅ PASS' : `❌ FAIL (${r.exitCode})`;
    console.log(`  - ${status} ${r.name} (${formatMs(r.durationMs)})`);
  }
  console.log(`  - Total: ${formatMs(totalMs)}`);
  console.log('-----------------------------------------\n');

  if (failed.length > 0) process.exit(1);
};

main().catch((err) => {
  console.error('❌ QA bundle crashed:', err);
  process.exit(1);
});

