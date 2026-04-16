/**
 * Dialogue System Module
 * Handles NPC dialogues, sprites, and choices in a generic way.
 */
export const createDialogueSystem = () => ({
    active: false,
    npcId: null,
    text: '',
    title: '',
    choices: [], // Array of { text, callback }
    waiting: false,

    /**
     * Show a dialogue
     * @param {Object} store - The game store
     * @param {Object} config - { npcId, text, title, choices, waiting }
     */
    show(store, config) {
        store.dialogueNpcId = config.npcId || 'Ellie';
        store.dialogueText = config.text || '';
        store.dialogueTitle = config.title || store.dialogueNpcId;
        store.dialogueChoices = config.choices || [];
        store.dialogueWaiting = config.waiting || false;
        
        store.dialogueActive = true;
        
        // Ensure ellieActive flag is synced if the NPC is Ellie
        if (store.dialogueNpcId === 'Ellie') {
            store.ellieActive = true;
        }
    },

    hide(store) {
        store.dialogueActive = false;
        store.dialogueNpcId = null;
        store.dialogueText = '';
        store.dialogueTitle = '';
    },

    next(store) {
        if (store.dialogueNpcId === 'Ellie') {
            store.tutorial.next(store);
        } else {
            this.hide(store);
        }
    }
});
