import { GameSystem } from '../../types/system';

// System Factories
import { createResourceSystem } from '../../features/gameplay/resource.logic';
import { createAudioSystem } from '../../core/visuals/audio';
import { createPersistenceSystem } from '../../core/services/persistence';
import { createLoggerSystem } from '../../core/services/logger';
import { createJuiceSystem } from '../../core/visuals/juice';
import { createUISystem } from '../../core/visuals/ui';
import { createStorySystem } from '../../features/story/story.logic';
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
 * Returns a list of all game systems.
 * Boot priority is implicitly defined by the order here or explicitly in metadata.
 */
export const getSystems = (initialState?: any): Record<string, GameSystem> => {
  return {
    input: createInputSystem() as GameSystem,
    resource: createResourceSystem() as GameSystem,
    audio: createAudioSystem() as GameSystem,
    persistence: createPersistenceSystem(initialState) as GameSystem,
    logger: createLoggerSystem() as GameSystem,
    juice: createJuiceSystem() as GameSystem,
    ui: createUISystem() as GameSystem,
    story: createStorySystem() as GameSystem,
    prologue: createPrologueSystem() as GameSystem,
    npc: createNPCSystem() as GameSystem,
    actions: createActionSystem() as GameSystem,
    engine: createEngineSystem() as GameSystem,
    item: createItemSystem() as GameSystem,
    housing: createHousingSystem() as GameSystem,
    dialogue: createDialogueSystem() as GameSystem,
    pipeline: createPipelineSystem() as GameSystem,
    ellie: createEllieSystem() as GameSystem,
    viewManager: createViewManagerSystem() as GameSystem,
    settingsSystem: createSettingsSystem() as GameSystem,
    i18n: createI18nSystem() as GameSystem,
    background: createBackgroundSystem() as GameSystem,
    preloader: createPreloaderSystem() as GameSystem,
    titles: createTitleSystem() as GameSystem,
  };
};
