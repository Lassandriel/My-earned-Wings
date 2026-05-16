// System Factories
import { createResourceSystem } from '../../features/gameplay/resource.logic';
import { createAudioSystem } from '../../core/visuals/audio';
import { createPersistenceSystem } from '../../core/services/persistence';
import { createLoggerSystem } from '../../core/services/logger';
import { createJuiceSystem } from '../../core/visuals/juice';
import { createUISystem } from '../../core/visuals/ui';
import { createCollectionSystem } from '../../features/story/story.logic';
import { createPrologueSystem } from '../../features/story/prologue.logic';
import { createDialogueSystem } from '../../features/story/dialogue.logic';
import { createNPCSystem } from '../../features/village/village.logic';
import { createHousingSystem } from '../../features/housing/housing.logic';
import { createActionSystem } from '../../features/gameplay/actions.logic';
import { createEngineSystem } from '../../core/systems/engine';
import { createItemSystem } from '../../features/crafting/items.logic';
import { createPipelineSystem } from '../../core/systems/pipeline';
import { createViewManagerSystem } from '../../core/systems/viewManager';
import { createEllieSystem } from '../../features/village/ellie.logic';
import { createSettingsSystem } from '../../features/ui/settings.logic';
import { createI18nSystem } from '../../core/services/i18n';
import { createBackgroundSystem } from '../../core/visuals/background';
import { createPreloaderSystem } from '../../core/visuals/preloader';
import { createTitleSystem } from '../../features/ui/titles.logic';
import { createInputSystem } from '../../core/visuals/input.logic';

/**
 * Returns a list of all game systems with concrete inferred types — so
 * downstream consumers (engine/services.ts, devtools, tests) see
 * `systems.pipeline.calculate(...)` typed correctly instead of being widened
 * to the lossy GameSystem index signature.
 *
 * Boot priority is implicitly defined by the order here or explicitly in metadata.
 */
export const getSystems = (initialState?: any) => {
  return {
    input: createInputSystem(),
    resource: createResourceSystem(),
    audio: createAudioSystem(),
    persistence: createPersistenceSystem(initialState),
    logger: createLoggerSystem(),
    juice: createJuiceSystem(),
    ui: createUISystem(),
    collection: createCollectionSystem(),
    prologue: createPrologueSystem(),
    npc: createNPCSystem(),
    actions: createActionSystem(),
    engine: createEngineSystem(),
    item: createItemSystem(),
    housing: createHousingSystem(),
    dialogue: createDialogueSystem(),
    pipeline: createPipelineSystem(),
    ellie: createEllieSystem(),
    viewManager: createViewManagerSystem(),
    settingsSystem: createSettingsSystem(),
    i18n: createI18nSystem(),
    background: createBackgroundSystem(),
    preloader: createPreloaderSystem(),
    titles: createTitleSystem(),
  };
};

export type Systems = ReturnType<typeof getSystems>;
