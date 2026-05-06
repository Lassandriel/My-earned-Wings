/**
 * Event Bus System - TypeScript Edition
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
  VIEW_CHANGED: 'view_changed',
};

export type EventCallback<T = unknown> = (data: T) => void;

export interface EventBus {
  on: <T = unknown>(event: string, callback: EventCallback<T>) => () => void;
  emit: <T = unknown>(event: string, data?: T) => void;
}

export const createEventBus = (): EventBus => {
  const listeners: Record<string, EventCallback<unknown>[]> = {};

  return {
    /**
     * Subscribe to an event.
     */
    on<T = unknown>(event: string, callback: EventCallback<T>) {
      if (!listeners[event]) listeners[event] = [];

      // IDEMPOTENCY: Don't register the same callback twice for the same event
      if (listeners[event].includes(callback as EventCallback<unknown>)) return () => {};

      listeners[event].push(callback as EventCallback<unknown>);

      // Return an unsubscribe function
      return () => {
        listeners[event] = listeners[event].filter((l) => l !== callback);
      };
    },

    /**
     * Emit an event.
     */
    emit<T = unknown>(event: string, data?: T) {
      if (!listeners[event]) return;
      listeners[event].forEach((callback) => callback(data));
    },
  };
};
