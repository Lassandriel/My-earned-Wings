import { BUFF_REGISTRY, NPC_REGISTRY, channel, sendCheat, flashButton } from './state';

/**
 * Live-cheats panel: buttons that emit BroadcastChannel messages to the
 * main game window (e.g. add resource, unlock NPC, jump to view).
 */
export function renderCheatsPanel(): string {
  const buffs = Object.values(BUFF_REGISTRY);
  const npcs = Object.values(NPC_REGISTRY);

  return `
    <div class="detail-header">
      <h2>Cheats &amp; Spawn helpers</h2>
      <div class="id">live commands → main game window (BroadcastChannel)</div>
    </div>

    <div class="cheats">
      <section>
        <h3>Quick stats</h3>
        <button data-cheat="applyCheats">Max all stats &amp; resources</button>
        <button data-cheat="addStat" data-stat="energy" data-amount="100">+100 Energy</button>
        <button data-cheat="addStat" data-stat="magic" data-amount="100">+100 Magic</button>
        <button data-cheat="addStat" data-stat="satiation" data-amount="100">+100 Satiation</button>
      </section>

      <section>
        <h3>Resources</h3>
        <button data-cheat="addResource" data-resource="wood" data-amount="100">+100 Holz</button>
        <button data-cheat="addResource" data-resource="stone" data-amount="100">+100 Stein</button>
        <button data-cheat="addResource" data-resource="herbs" data-amount="50">+50 Kräuter</button>
        <button data-cheat="addResource" data-resource="resin" data-amount="50">+50 Baumharz</button>
        <button data-cheat="addResource" data-resource="shards" data-amount="100">+100 Shards</button>
      </section>

      <section>
        <h3>Flags</h3>
        <button data-cheat="setFlag" data-flag="ability-shadow-bind" data-value="true">Unlock Shadow Bind</button>
        <button data-cheat="setFlag" data-flag="school_graduate" data-value="true">Village School Graduate</button>
      </section>

      <section>
        <h3>Activate buff</h3>
        ${buffs.map((b) => `<button data-cheat="addBuff" data-buffid="${b.id}">${b.id} (${b.duration}s)</button>`).join('')}
      </section>

      <section>
        <h3>NPCs</h3>
        <button data-cheat="unlockAllNPCs">Unlock ALL NPCs</button>
        ${npcs
          .slice(0, 12)
          .map((n: any) => `<button data-cheat="unlockNPC" data-npcid="${n.id}">Unlock ${n.id}</button>`)
          .join('')}
      </section>

      <section>
        <h3>Jump to view</h3>
        <button data-cheat="setView" data-view="main">main</button>
        <button data-cheat="setView" data-view="crafting">crafting</button>
        <button data-cheat="setView" data-view="upgrades">upgrades</button>
        <button data-cheat="setView" data-view="village">village</button>
        <button data-cheat="setView" data-view="housing">housing</button>
        <button data-cheat="setView" data-view="collection">collection</button>
        <button data-cheat="setView" data-view="finale">finale</button>
        <button data-cheat="setView" data-view="menu">menu</button>
      </section>

      <section>
        <h3>Demo / save management</h3>
        <button data-cheat="completeDemo">Mark demo as completed</button>
        <button data-cheat="resetSave" class="danger">Wipe save &amp; reload</button>
      </section>

      <section>
        <h3>Custom resource</h3>
        <div class="custom-row">
          <input type="text" id="custom-resource" placeholder="resource id (e.g. wood)" />
          <input type="number" id="custom-amount" placeholder="amount" value="10" />
          <button id="custom-add">Add</button>
        </div>
      </section>

      <section>
        <h3>Status</h3>
        <p class="hint">${channel ? '✓ Connected (BroadcastChannel active)' : '✗ Not connected — open this window in the same browser as the main game.'}</p>
      </section>
    </div>
  `;
}

export function wireCheatsHandlers(): void {
  document.querySelectorAll<HTMLButtonElement>('.cheats button[data-cheat]').forEach((btn) => {
    btn.onclick = () => {
      const cheat = btn.getAttribute('data-cheat')!;
      const cmd: Record<string, unknown> = { type: cheat };
      // dataset attribute → command field name (HTML lowercases data-*)
      const attrMap: Record<string, string> = {
        resource: 'resource',
        stat: 'stat',
        flag: 'flag',
        amount: 'amount',
        value: 'value',
        buffid: 'buffId',
        npcid: 'npcId',
        view: 'view',
      };
      for (const [attr, field] of Object.entries(attrMap)) {
        const v = btn.getAttribute('data-' + attr);
        if (v !== null) {
          cmd[field] = field === 'amount' ? Number(v) : field === 'value' ? v === 'true' : v;
        }
      }
      sendCheat(cmd);
      flashButton(btn);
    };
  });
  const customAdd = document.getElementById('custom-add');
  if (customAdd) {
    customAdd.onclick = () => {
      const r = (document.getElementById('custom-resource') as HTMLInputElement).value.trim();
      const a = Number((document.getElementById('custom-amount') as HTMLInputElement).value);
      if (r && a) {
        sendCheat({ type: 'addResource', resource: r, amount: a });
        flashButton(customAdd as HTMLButtonElement);
      }
    };
  }
}
