import { describe, it, expect, vi, beforeEach } from 'vitest';
import { createHousingSystem, activateHome } from './housing.logic';
import { GameState } from '../../types/game';

const createMockState = (overrides: Partial<GameState> = {}): GameState => {
  return {
    placedItems: [],
    homeFurniture: {},
    ownedHomes: [],
    discoveredItems: [],
    activeHome: null,
    ...overrides,
  } as any;
};

describe('Housing System', () => {
  let housing: ReturnType<typeof createHousingSystem>;
  let mockContent: { get: ReturnType<typeof vi.fn> };
  let mockPipeline: { invalidateCache: ReturnType<typeof vi.fn>; calculate: ReturnType<typeof vi.fn> };
  let mockResource: { invalidateCache: ReturnType<typeof vi.fn> };
  let mockUI: { showToast: ReturnType<typeof vi.fn> };
  let mockAddLog: ReturnType<typeof vi.fn>;
  let mockPlaySound: ReturnType<typeof vi.fn>;
  let mockSaveGame: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    vi.clearAllMocks();
    housing = createHousingSystem();
    mockContent = { get: vi.fn(() => null) };
    mockPipeline = { invalidateCache: vi.fn(), calculate: vi.fn() };
    mockResource = { invalidateCache: vi.fn() };
    mockUI = { showToast: vi.fn() };
    mockAddLog = vi.fn();
    mockPlaySound = vi.fn();
    mockSaveGame = vi.fn();
    (housing as any).setServices({
      content: mockContent,
      pipeline: mockPipeline,
      resource: mockResource,
      ui: mockUI,
      addLog: mockAddLog,
      playSound: mockPlaySound,
      t: (k: string) => k,
      saveGame: mockSaveGame,
    });
  });

  describe('toggleFurniture()', () => {
    it('does nothing for non-furniture items', () => {
      mockContent.get.mockReturnValue({ category: 'food' });
      const state = createMockState();

      housing.toggleFurniture(state, 'item-bread');

      expect(state.placedItems).toEqual([]);
      expect(mockSaveGame).not.toHaveBeenCalled();
    });

    it('removes a furniture item that is already placed', () => {
      mockContent.get.mockReturnValue({
        category: 'furniture',
        title: 'Chair',
        spaceCost: 1,
      });
      const state = createMockState({ placedItems: ['item-chair'] as any });

      housing.toggleFurniture(state, 'item-chair');

      expect(state.placedItems).not.toContain('item-chair');
      expect(mockPlaySound).toHaveBeenCalledWith('click');
      expect(mockSaveGame).toHaveBeenCalled();
    });

    it('places a furniture item from inventory when capacity allows', () => {
      mockContent.get.mockImplementation((id: string) => {
        if (id === 'item-chair') return { category: 'furniture', title: 'Chair', spaceCost: 1 };
        if (id === 'home-shelter') return { capacity: 5, baseLimits: {} };
        return null;
      });
      const state = createMockState({
        discoveredItems: ['item-chair'] as any,
        activeHome: 'home-shelter' as any,
      });

      housing.toggleFurniture(state, 'item-chair');

      expect(state.placedItems).toContain('item-chair');
      expect(mockPlaySound).toHaveBeenCalledWith('magic');
    });

    it('refuses placement when capacity would overflow', () => {
      mockContent.get.mockImplementation((id: string) => {
        if (id === 'item-bigchair') return { category: 'furniture', title: 'Throne', spaceCost: 10 };
        if (id === 'home-shelter') return { capacity: 5, baseLimits: {} };
        return null;
      });
      const state = createMockState({
        discoveredItems: ['item-bigchair'] as any,
        activeHome: 'home-shelter' as any,
      });

      housing.toggleFurniture(state, 'item-bigchair');

      expect(state.placedItems).not.toContain('item-bigchair');
      expect(mockUI.showToast).toHaveBeenCalledWith('fail_furniture_space', 'error');
      expect(mockPlaySound).toHaveBeenCalledWith('fail');
    });

    it('replaces an existing bed when placing a new bed (exclusive rule)', () => {
      mockContent.get.mockImplementation((id: string) => {
        if (id.includes('bed')) return { category: 'furniture', title: 'Bed', spaceCost: 2 };
        if (id === 'home-shelter') return { capacity: 10, baseLimits: {} };
        return null;
      });
      const state = createMockState({
        placedItems: ['item-old-bed'] as any,
        discoveredItems: ['item-new-bed'] as any,
        activeHome: 'home-shelter' as any,
      });

      housing.toggleFurniture(state, 'item-new-bed');

      expect(state.placedItems).toContain('item-new-bed');
      expect(state.placedItems).not.toContain('item-old-bed');
    });
  });

  describe('getUsedFurnitureSpace()', () => {
    it('sums spaceCost of placed furniture', () => {
      mockContent.get.mockImplementation((id: string) => ({
        category: 'furniture',
        spaceCost: id === 'item-bed' ? 2 : 1,
      }));
      const state = createMockState({
        placedItems: ['item-chair', 'item-bed', 'item-lamp'] as any,
      });

      expect(housing.getUsedFurnitureSpace(state)).toBe(4);
    });
  });

  describe('getHomeCapacity()', () => {
    it('returns 0 when no home is active', () => {
      const state = createMockState({ activeHome: null });
      expect(housing.getHomeCapacity(state)).toBe(0);
    });

    it('returns capacity of the active home', () => {
      mockContent.get.mockReturnValue({ capacity: 8 });
      const state = createMockState({ activeHome: 'home-cabin' as any });
      expect(housing.getHomeCapacity(state)).toBe(8);
    });
  });

  describe('activateHome() — multiple-homes-one-active', () => {
    it('registers ownership when activating a new home', () => {
      const state = createMockState({ activeHome: 'home-house' as any, ownedHomes: ['home-house'] as any });
      activateHome(state, 'home-vandara-dorm' as any);
      expect(state.activeHome).toBe('home-vandara-dorm');
      expect(state.ownedHomes).toEqual(expect.arrayContaining(['home-house', 'home-vandara-dorm']));
    });

    it('parks the old loadout and restores the new home\'s loadout', () => {
      const state = createMockState({
        activeHome: 'home-house' as any,
        ownedHomes: ['home-house', 'home-vandara-dorm'] as any,
        placedItems: ['item-bed', 'item-stove'] as any,
        homeFurniture: { 'home-vandara-dorm': ['item-desk'] } as any,
      });
      activateHome(state, 'home-vandara-dorm' as any);
      // old furniture parked under the old home
      expect((state.homeFurniture as any)['home-house']).toEqual(['item-bed', 'item-stove']);
      // new home's loadout restored into the active placedItems
      expect(state.placedItems).toEqual(['item-desk']);
    });

    it('restores an empty loadout for a freshly-built home', () => {
      const state = createMockState({
        activeHome: 'home-house' as any,
        ownedHomes: ['home-house'] as any,
        placedItems: ['item-bed'] as any,
      });
      activateHome(state, 'home-vandara-dorm' as any);
      expect(state.placedItems).toEqual([]);
    });

    it('is a no-op (but records ownership) when target is already active', () => {
      const state = createMockState({
        activeHome: 'home-house' as any,
        ownedHomes: [] as any,
        placedItems: ['item-bed'] as any,
      });
      activateHome(state, 'home-house' as any);
      expect(state.placedItems).toEqual(['item-bed']);
      expect(state.ownedHomes).toEqual(['home-house']);
    });
  });

  describe('switchHome() — UI-facing', () => {
    it('switches to an owned home with feedback', () => {
      const state = createMockState({
        activeHome: 'home-house' as any,
        ownedHomes: ['home-house', 'home-vandara-dorm'] as any,
        placedItems: [] as any,
      });
      housing.switchHome(state, 'home-vandara-dorm');
      expect(state.activeHome).toBe('home-vandara-dorm');
      expect(mockPlaySound).toHaveBeenCalledWith('magic');
      expect(mockSaveGame).toHaveBeenCalled();
    });

    it('refuses to switch to a home the player does not own', () => {
      const state = createMockState({
        activeHome: 'home-house' as any,
        ownedHomes: ['home-house'] as any,
      });
      housing.switchHome(state, 'home-tower');
      expect(state.activeHome).toBe('home-house');
      expect(mockSaveGame).not.toHaveBeenCalled();
    });
  });
});
