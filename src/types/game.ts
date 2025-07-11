export interface GameState {
  coins: number;
  gems: number;
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

export interface CoinPackage {
  id: string;
  name: string;
  coins: number;
  price: number;
  bonus?: number;
  popular?: boolean;
  icon: string;
  description: string;
}

export interface GemPackage {
  id: string;
  name: string;
  gems: number;
  price: number;
  bonus?: number;
  popular?: boolean;
  icon: string;
  description: string;
}

export interface GemShopItem {
  id: string;
  name: string;
  type: 'boosts' | 'currency' | 'premium' | 'special';
  price: number;
  icon: string;
  description: string;
  effect: {
    type: 'coin_multiplier' | 'coin_amount' | 'experience_multiplier' | 'instant_level' | 'premium_currency';
    value: number;
    duration?: number;
  };
}