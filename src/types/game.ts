export interface GameState {
  coins: number;
  experience: number;
  level: number;
  unlockedZones: string[];
  inventory: InventoryItem[];
  activeBoosts: ActiveBoost[];
}

export interface InventoryItem {
  id: string;
  name: string;
  type: 'gear' | 'decoration' | 'drone' | 'legendary' | 'pass';
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  coinBoost?: number;
  passiveBonus?: number;
  description: string;
  icon: string;
  owned: boolean;
}

export interface ActiveBoost {
  id: string;
  name: string;
  multiplier: number;
  duration: number;
  remainingTime: number;
}

export interface MiniGame {
  id: string;
  name: string;
  description: string;
  icon: string;
  baseReward: number;
  difficulty: 'easy' | 'medium' | 'hard';
  unlockLevel: number;
  color: string;
}

export interface ShopItem extends InventoryItem {
  price: number;
  category: 'gear' | 'boosts' | 'decorations' | 'legendary' | 'passes';
}