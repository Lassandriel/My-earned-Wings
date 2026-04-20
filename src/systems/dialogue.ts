import { GameState } from '../types/game';

/**
 * Dialogue System Module - TypeScript Edition
 * Handles NPC dialogues, sprites, and choices in a generic way.
 */
export const createDialogueSystem = () => ({
    /**
     * Show a dialogue
     * @param {GameState} store - The game store
     * @param {Object} config - { npcId, text, title, choices, waiting }
     */
    show(store: GameState, config: { 
        npcId?: string, 
        text?: string, 
        title?: string, 
        choices?: Array<{ text: string, callback: () => void }>, 
        waiting?: boolean 
    }) {
        store.dialogueNpcId = config.npcId || 'Wanderer';
        store.dialogueText = config.text || '';
        store.dialogueTitle = config.title || store.dialogueNpcId;
        store.dialogueChoices = config.choices || [];
        store.dialogueWaiting = config.waiting || false;
        
        store.dialogueActive = true;
    },

    hide(store: GameState) {
        store.dialogueActive = false;
        store.dialogueNpcId = null;
        store.dialogueText = '';
        store.dialogueTitle = '';
    },

    next(store: GameState) {
        this.hide(store);
    }
});
