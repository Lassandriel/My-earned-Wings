/**
 * Event Bus System
 * A lightweight pub/sub mechanism to decouple systems.
 */

export const GAME_EVENTS = {
    // Action Events
    ACTION_SUCCESS: 'action_success',
    ACTION_FAILURE: 'action_failure',
    
    // Resource Events
    RESOURCE_CHANGED: 'resource_changed',
    RESOURCE_GAINED: 'resource_gained',
    RESOURCE_SPENT: 'resource_spent',
    
    // Side Effect Events
    LOG_ADDED: 'log_added',
    SOUND_TRIGGERED: 'sound_triggered',
    PARTICLE_TRIGGERED: 'particle_triggered',
    
    // System Events
    SAVE_REQUESTED: 'save_requested',
    SETTINGS_UPDATED: 'settings_updated',
    VIEW_CHANGED: 'view_changed'
};

export const createEventBus = () => {
    const listeners = {};

    return {
        /**
         * Subscribe to an event.
         */
        on(event, callback) {
            if (!listeners[event]) listeners[event] = [];
            
            // IDEMPOTENCY: Don't register the same callback twice for the same event
            if (listeners[event].includes(callback)) return () => {}; 
            
            listeners[event].push(callback);
            
            // Return an unsubscribe function
            return () => {
                listeners[event] = listeners[event].filter(l => l !== callback);
            };
        },

        /**
         * Emit an event.
         */
        emit(event, data) {
            if (!listeners[event]) return;
            listeners[event].forEach(callback => callback(data));
        }
    };
};
