import { describe, it, expect } from 'vitest';
import { applyPatches, validatePatchEntry, type PatchEntry } from './patches';

/**
 * Minimal-shape mock action + npc for testing patches in isolation.
 * The real engine carries dozens of fields; we only need the ones
 * the patch engine actually touches.
 */
const makeActionRegistry = (): Record<string, any> => ({
  'act-test': {
    id: 'act-test',
    maxProgress: 3,
    steps: [
      { cost: 5, dialogueKey: 'd1' },
      { cost: 5, dialogueKey: 'd2' },
      { cost: 5, dialogueKey: 'd3' },
    ] as any[],
  },
});

const makeNpcRegistry = (): Record<string, any> => ({
  'npc-test': {
    id: 'npc-test',
    icon: '🐉',
    color: '#000',
    image: 'old.webp',
    maxProgress: 5,
    dialogues: { hello: 'Hi' } as Record<string, string>,
  },
});

const patch = (entry: PatchEntry) => [{ entry, origin: 'test' }];

describe('patch engine — action ops', () => {
  describe('appendSteps', () => {
    it('appends and lifts maxProgress', () => {
      const reg = { action: makeActionRegistry(), npc: makeNpcRegistry() };
      applyPatches(
        patch({ targetType: 'action', targetId: 'act-test', appendSteps: [{ cost: 1 }] }),
        reg,
        { missingTarget: 'throw' },
      );
      expect(reg.action['act-test'].steps).toHaveLength(4);
      expect(reg.action['act-test'].maxProgress).toBe(4);
    });
  });

  describe('prependSteps', () => {
    it('inserts at the front', () => {
      const reg = { action: makeActionRegistry(), npc: makeNpcRegistry() };
      applyPatches(
        patch({ targetType: 'action', targetId: 'act-test', prependSteps: [{ cost: 99 }] }),
        reg,
        { missingTarget: 'throw' },
      );
      expect(reg.action['act-test'].steps[0]).toEqual({ cost: 99 });
      expect(reg.action['act-test'].steps).toHaveLength(4);
      expect(reg.action['act-test'].maxProgress).toBe(4);
    });
  });

  describe('replaceStep', () => {
    it('swaps the indexed step in place', () => {
      const reg = { action: makeActionRegistry(), npc: makeNpcRegistry() };
      applyPatches(
        patch({
          targetType: 'action',
          targetId: 'act-test',
          replaceStep: { index: 1, with: { cost: 42, dialogueKey: 'd2_new' } },
        }),
        reg,
        { missingTarget: 'throw' },
      );
      expect(reg.action['act-test'].steps[1]).toEqual({ cost: 42, dialogueKey: 'd2_new' });
      expect(reg.action['act-test'].steps).toHaveLength(3);
      expect(reg.action['act-test'].maxProgress).toBe(3);
    });

    it('warns on out-of-range index (runtime mode)', () => {
      const reg = { action: makeActionRegistry(), npc: makeNpcRegistry() };
      const result = applyPatches(
        patch({
          targetType: 'action',
          targetId: 'act-test',
          replaceStep: { index: 99, with: { cost: 1 } },
        }),
        reg,
        { missingTarget: 'warn' },
      );
      expect(result.applied).toBe(0);
      expect(result.warnings.length).toBeGreaterThan(0);
      expect(result.warnings[0]).toMatch(/out of range/);
    });
  });

  describe('removeStep', () => {
    it('drops the indexed step and shrinks maxProgress', () => {
      const reg = { action: makeActionRegistry(), npc: makeNpcRegistry() };
      applyPatches(
        patch({ targetType: 'action', targetId: 'act-test', removeStep: { index: 0 } }),
        reg,
        { missingTarget: 'throw' },
      );
      expect(reg.action['act-test'].steps).toHaveLength(2);
      expect(reg.action['act-test'].steps[0].dialogueKey).toBe('d2');
      expect(reg.action['act-test'].maxProgress).toBe(2);
    });
  });

  describe('combined ops', () => {
    it('applies multiple ops from one patch entry in declaration order', () => {
      const reg = { action: makeActionRegistry(), npc: makeNpcRegistry() };
      applyPatches(
        patch({
          targetType: 'action',
          targetId: 'act-test',
          appendSteps: [{ cost: 100 }],
          prependSteps: [{ cost: 0 }],
        }),
        reg,
        { missingTarget: 'throw' },
      );
      // After append+prepend, length should be 5; original 3 in the middle
      expect(reg.action['act-test'].steps).toHaveLength(5);
      expect(reg.action['act-test'].steps[0].cost).toBe(0);
      expect(reg.action['act-test'].steps[4].cost).toBe(100);
      expect(reg.action['act-test'].maxProgress).toBe(5);
    });
  });
});

describe('patch engine — action ops (v2.1: hooks + cost + cosmetics)', () => {
  describe('addOnSuccess', () => {
    it('appends to existing onSuccess array', () => {
      const reg = { action: makeActionRegistry(), npc: makeNpcRegistry() };
      reg.action['act-test'].onSuccess = [{ type: 'log', logKey: 'orig' }];
      applyPatches(
        patch({
          targetType: 'action',
          targetId: 'act-test',
          addOnSuccess: [{ type: 'setFlag', flag: 'extra', value: true }],
        }),
        reg,
        { missingTarget: 'throw' },
      );
      expect(reg.action['act-test'].onSuccess).toHaveLength(2);
      expect(reg.action['act-test'].onSuccess[1]).toMatchObject({ type: 'setFlag', flag: 'extra' });
    });

    it('creates onSuccess from nothing when target had none', () => {
      const reg = { action: makeActionRegistry(), npc: makeNpcRegistry() };
      applyPatches(
        patch({
          targetType: 'action',
          targetId: 'act-test',
          addOnSuccess: [{ type: 'log', logKey: 'first' }],
        }),
        reg,
        { missingTarget: 'throw' },
      );
      expect(reg.action['act-test'].onSuccess).toHaveLength(1);
    });
  });

  describe('addRequirement', () => {
    it('merges new keys into requirements', () => {
      const reg = { action: makeActionRegistry(), npc: makeNpcRegistry() };
      applyPatches(
        patch({
          targetType: 'action',
          targetId: 'act-test',
          addRequirement: { 'flags.my-addon-active': true },
        }),
        reg,
        { missingTarget: 'throw' },
      );
      expect(reg.action['act-test'].requirements).toMatchObject({ 'flags.my-addon-active': true });
    });

    it('warns + skips on key collision', () => {
      const reg = { action: makeActionRegistry(), npc: makeNpcRegistry() };
      reg.action['act-test'].requirements = { 'flags.X': true };
      const result = applyPatches(
        patch({
          targetType: 'action',
          targetId: 'act-test',
          addRequirement: { 'flags.X': false },
        }),
        reg,
        { missingTarget: 'warn' },
      );
      expect(reg.action['act-test'].requirements['flags.X']).toBe(true); // unchanged
      expect(result.warnings.some((w) => w.includes('flags.X'))).toBe(true);
    });
  });

  describe('modifyCost', () => {
    it('converts shorthand cost+costType to a costs map and applies the delta', () => {
      const reg = { action: makeActionRegistry(), npc: makeNpcRegistry() };
      reg.action['act-test'].cost = 10;
      reg.action['act-test'].costType = 'wood';
      applyPatches(
        patch({ targetType: 'action', targetId: 'act-test', modifyCost: { wood: -3 } }),
        reg,
        { missingTarget: 'throw' },
      );
      expect(reg.action['act-test'].costs).toEqual({ wood: 7 });
      expect(reg.action['act-test'].cost).toBeUndefined();
      expect(reg.action['act-test'].costType).toBeUndefined();
    });

    it('removes a cost line that goes to zero or below', () => {
      const reg = { action: makeActionRegistry(), npc: makeNpcRegistry() };
      reg.action['act-test'].costs = { wood: 5, stone: 3 };
      applyPatches(
        patch({ targetType: 'action', targetId: 'act-test', modifyCost: { wood: -5 } }),
        reg,
        { missingTarget: 'throw' },
      );
      expect(reg.action['act-test'].costs).toEqual({ stone: 3 });
    });

    it('adds a new cost line for a resource the action didn\'t use', () => {
      const reg = { action: makeActionRegistry(), npc: makeNpcRegistry() };
      reg.action['act-test'].costs = { wood: 5 };
      applyPatches(
        patch({ targetType: 'action', targetId: 'act-test', modifyCost: { magic: 2 } }),
        reg,
        { missingTarget: 'throw' },
      );
      expect(reg.action['act-test'].costs).toEqual({ wood: 5, magic: 2 });
    });
  });

  describe('setIcon / setImage on actions', () => {
    it('overrides both fields', () => {
      const reg = { action: makeActionRegistry(), npc: makeNpcRegistry() };
      applyPatches(
        patch({
          targetType: 'action',
          targetId: 'act-test',
          setIcon: '🎯',
          setImage: 'patched.webp',
        }),
        reg,
        { missingTarget: 'throw' },
      );
      expect(reg.action['act-test'].icon).toBe('🎯');
      expect(reg.action['act-test'].image).toBe('patched.webp');
    });
  });
});

describe('patch engine — npc ops', () => {
  describe('setIcon / setColor / setImage', () => {
    it('overrides each field independently', () => {
      const reg = { action: makeActionRegistry(), npc: makeNpcRegistry() };
      applyPatches(
        patch({
          targetType: 'npc',
          targetId: 'npc-test',
          setIcon: '✨',
          setColor: '#abc',
          setImage: 'new.webp',
        }),
        reg,
        { missingTarget: 'throw' },
      );
      expect(reg.npc['npc-test'].icon).toBe('✨');
      expect(reg.npc['npc-test'].color).toBe('#abc');
      expect(reg.npc['npc-test'].image).toBe('new.webp');
    });
  });

  describe('mergeDialogues', () => {
    it('adds new keys but warns on collisions and skips them', () => {
      const reg = { action: makeActionRegistry(), npc: makeNpcRegistry() };
      const result = applyPatches(
        patch({
          targetType: 'npc',
          targetId: 'npc-test',
          mergeDialogues: { hello: 'Hello again', goodbye: 'Bye' },
        }),
        reg,
        { missingTarget: 'warn' },
      );
      expect(reg.npc['npc-test'].dialogues.hello).toBe('Hi'); // unchanged
      expect(reg.npc['npc-test'].dialogues.goodbye).toBe('Bye');
      expect(result.warnings.some((w) => w.includes('"hello"'))).toBe(true);
    });
  });

  describe('bumpMaxProgress', () => {
    it('only raises, never lowers (multi-addon stack safety)', () => {
      const reg = { action: makeActionRegistry(), npc: makeNpcRegistry() };
      applyPatches(
        [
          { entry: { targetType: 'npc', targetId: 'npc-test', bumpMaxProgress: 8 }, origin: 'a' },
          { entry: { targetType: 'npc', targetId: 'npc-test', bumpMaxProgress: 3 }, origin: 'b' },
        ],
        reg,
        { missingTarget: 'throw' },
      );
      expect(reg.npc['npc-test'].maxProgress).toBe(8);
    });
  });
});

describe('patch engine — item ops', () => {
  const makeItemRegistry = (): Record<string, any> => ({
    'item-bed': {
      id: 'item-bed',
      title: 'item_bed_title',
      image: 'old.webp',
      category: 'furniture',
      spaceCost: 2,
      modifiers: [{ key: 'rest_energy_gain', add: 30 }],
    },
  });

  describe('addModifiers', () => {
    it('appends new modifiers', () => {
      const reg = { action: makeActionRegistry(), npc: makeNpcRegistry(), item: makeItemRegistry() };
      applyPatches(
        patch({
          targetType: 'item',
          targetId: 'item-bed',
          addModifiers: [{ key: 'magic_limit', add: 10 }],
        }),
        reg,
        { missingTarget: 'throw' },
      );
      expect(reg.item['item-bed'].modifiers).toHaveLength(2);
      expect(reg.item['item-bed'].modifiers[1]).toMatchObject({ key: 'magic_limit', add: 10 });
    });

    it('warns + skips when modifier key already present', () => {
      const reg = { action: makeActionRegistry(), npc: makeNpcRegistry(), item: makeItemRegistry() };
      const result = applyPatches(
        patch({
          targetType: 'item',
          targetId: 'item-bed',
          addModifiers: [{ key: 'rest_energy_gain', add: 50 }],
        }),
        reg,
        { missingTarget: 'warn' },
      );
      expect(reg.item['item-bed'].modifiers).toHaveLength(1); // unchanged
      expect(result.warnings.some((w) => w.includes('rest_energy_gain'))).toBe(true);
    });
  });

  describe('setSpaceCost / setImage', () => {
    it('overrides both fields independently', () => {
      const reg = { action: makeActionRegistry(), npc: makeNpcRegistry(), item: makeItemRegistry() };
      applyPatches(
        patch({
          targetType: 'item',
          targetId: 'item-bed',
          setSpaceCost: 3,
          setImage: 'fancier-bed.webp',
        }),
        reg,
        { missingTarget: 'throw' },
      );
      expect(reg.item['item-bed'].spaceCost).toBe(3);
      expect(reg.item['item-bed'].image).toBe('fancier-bed.webp');
    });
  });

  describe('missing item', () => {
    it('warns at runtime when item id does not exist', () => {
      const reg = { action: makeActionRegistry(), npc: makeNpcRegistry(), item: makeItemRegistry() };
      const result = applyPatches(
        patch({ targetType: 'item', targetId: 'item-ghost', setSpaceCost: 5 }),
        reg,
        { missingTarget: 'warn' },
      );
      expect(result.applied).toBe(0);
      expect(result.warnings.some((w) => w.includes('item-ghost'))).toBe(true);
    });
  });

  describe('missing item registry', () => {
    it('warns when applyPatches is called without an item registry', () => {
      const reg = { action: makeActionRegistry(), npc: makeNpcRegistry() };
      const result = applyPatches(
        patch({ targetType: 'item', targetId: 'item-bed', setSpaceCost: 5 }),
        reg,
        { missingTarget: 'warn' },
      );
      expect(result.applied).toBe(0);
      expect(result.warnings.some((w) => w.includes('item registry'))).toBe(true);
    });
  });
});

describe('validatePatchEntry', () => {
  it('accepts a well-formed action patch with multiple ops', () => {
    expect(
      validatePatchEntry(
        {
          targetType: 'action',
          targetId: 'act-x',
          appendSteps: [{ cost: 1 }],
          replaceStep: { index: 0, with: { cost: 2 } },
        },
        'test',
      ),
    ).toBeNull();
  });

  it('rejects replaceStep without `with`', () => {
    const err = validatePatchEntry(
      { targetType: 'action', targetId: 'act-x', replaceStep: { index: 0 } },
      'test',
    );
    expect(err).toMatch(/with/);
  });

  it('rejects negative replaceStep.index', () => {
    const err = validatePatchEntry(
      { targetType: 'action', targetId: 'act-x', replaceStep: { index: -1, with: {} } },
      'test',
    );
    expect(err).toMatch(/index/);
  });

  it('rejects non-string setIcon/setColor/setImage', () => {
    for (const k of ['setIcon', 'setColor', 'setImage']) {
      const err = validatePatchEntry({ targetType: 'npc', targetId: 'npc-x', [k]: 42 }, 'test');
      expect(err).toMatch(new RegExp(k));
    }
  });

  it('rejects modifyCost with non-numeric value', () => {
    const err = validatePatchEntry(
      { targetType: 'action', targetId: 'act-x', modifyCost: { wood: '5' as any } },
      'test',
    );
    expect(err).toMatch(/modifyCost/);
  });

  it('rejects addOnSuccess entries without a type field', () => {
    const err = validatePatchEntry(
      { targetType: 'action', targetId: 'act-x', addOnSuccess: [{ flag: 'x' }] },
      'test',
    );
    expect(err).toMatch(/addOnSuccess/);
  });

  it('rejects mergeDialogues with non-string values', () => {
    const err = validatePatchEntry(
      { targetType: 'npc', targetId: 'npc-x', mergeDialogues: { greet: 5 } },
      'test',
    );
    expect(err).toMatch(/mergeDialogues/);
  });
});
