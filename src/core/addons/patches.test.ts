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

  it('rejects mergeDialogues with non-string values', () => {
    const err = validatePatchEntry(
      { targetType: 'npc', targetId: 'npc-x', mergeDialogues: { greet: 5 } },
      'test',
    );
    expect(err).toMatch(/mergeDialogues/);
  });
});
