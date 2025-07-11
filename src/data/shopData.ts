import { CoinPackage, GemPackage, GemShopItem } from '../types/game';

export const COIN_PACKAGES: CoinPackage[] = [
  {
    id: 'coin-starter',
    name: 'Starter Pack',
    coins: 1000,
    price: 0.99,
    icon: '🪙',
    description: 'Perfect for beginners'
  },
  {
    id: 'coin-bronze',
    name: 'Bronze Bundle',
    coins: 5000,
    price: 4.99,
    bonus: 500,
    icon: '🥉',
    description: 'Great value starter'
  },
  {
    id: 'coin-silver',
    name: 'Silver Stack',
    coins: 12000,
    price: 9.99,
    bonus: 2000,
    icon: '🥈',
    description: 'Most popular choice'
  },
  {
    id: 'coin-gold',
    name: 'Gold Fortune',
    coins: 25000,
    price: 19.99,
    bonus: 5000,
    popular: true,
    icon: '🥇',
    description: 'Best value deal!'
  },
  {
    id: 'coin-platinum',
    name: 'Platinum Vault',
    coins: 55000,
    price: 39.99,
    bonus: 15000,
    icon: '💰',
    description: 'Premium package'
  },
  {
    id: 'coin-diamond',
    name: 'Diamond Empire',
    coins: 120000,
    price: 79.99,
    bonus: 40000,
    icon: '💎',
    description: 'Ultimate coin package'
  }
];

export const GEM_PACKAGES: GemPackage[] = [
  {
    id: 'gem-small',
    name: 'Gem Pouch',
    gems: 50,
    price: 2.99,
    icon: '💎',
    description: 'Small gem collection'
  },
  {
    id: 'gem-medium',
    name: 'Gem Chest',
    gems: 120,
    price: 6.99,
    bonus: 20,
    icon: '🗝️',
    description: 'Solid gem investment'
  },
  {
    id: 'gem-large',
    name: 'Gem Vault',
    gems: 250,
    price: 12.99,
    bonus: 50,
    popular: true,
    icon: '🏦',
    description: 'Most popular gem pack'
  },
  {
    id: 'gem-massive',
    name: 'Gem Treasury',
    gems: 550,
    price: 24.99,
    bonus: 150,
    icon: '🏛️',
    description: 'Premium gem collection'
  },
  {
    id: 'gem-ultimate',
    name: 'Gem Kingdom',
    gems: 1200,
    price: 49.99,
    bonus: 400,
    icon: '👑',
    description: 'Ultimate gem package'
  }
];

export const GEM_SHOP_ITEMS: GemShopItem[] = [
  {
    id: 'coin-boost-small',
    name: '2x Coin Boost',
    type: 'boosts',
    price: 10,
    icon: '⚡',
    description: 'Double your coin earnings for 1 hour',
    effect: {
      type: 'coin_multiplier',
      value: 2.0,
      duration: 3600000 // 1 hour in milliseconds
    }
  },
  {
    id: 'coin-boost-medium',
    name: '3x Coin Boost',
    type: 'boosts',
    price: 20,
    icon: '🔥',
    description: 'Triple your coin earnings for 1 hour',
    effect: {
      type: 'coin_multiplier',
      value: 3.0,
      duration: 3600000
    }
  },
  {
    id: 'coin-boost-large',
    name: '5x Coin Boost',
    type: 'boosts',
    price: 35,
    icon: '💫',
    description: 'Quintuple your coin earnings for 1 hour',
    effect: {
      type: 'coin_multiplier',
      value: 5.0,
      duration: 3600000
    }
  },
  {
    id: 'instant-coins-small',
    name: 'Instant 10K Coins',
    type: 'currency',
    price: 15,
    icon: '🪙',
    description: 'Receive 10,000 coins instantly',
    effect: {
      type: 'coin_amount',
      value: 10000
    }
  },
  {
    id: 'instant-coins-medium',
    name: 'Instant 25K Coins',
    type: 'currency',
    price: 30,
    icon: '💰',
    description: 'Receive 25,000 coins instantly',
    effect: {
      type: 'coin_amount',
      value: 25000
    }
  },
  {
    id: 'instant-coins-large',
    name: 'Instant 60K Coins',
    type: 'currency',
    price: 60,
    icon: '🏦',
    description: 'Receive 60,000 coins instantly',
    effect: {
      type: 'coin_amount',
      value: 60000
    }
  },
  {
    id: 'exp-boost-small',
    name: '2x Experience Boost',
    type: 'boosts',
    price: 8,
    icon: '⭐',
    description: 'Double experience gain for 2 hours',
    effect: {
      type: 'experience_multiplier',
      value: 2.0,
      duration: 7200000 // 2 hours
    }
  },
  {
    id: 'exp-boost-large',
    name: '3x Experience Boost',
    type: 'boosts',
    price: 18,
    icon: '🌟',
    description: 'Triple experience gain for 2 hours',
    effect: {
      type: 'experience_multiplier',
      value: 3.0,
      duration: 7200000
    }
  },
  {
    id: 'instant-level',
    name: 'Instant Level Up',
    type: 'premium',
    price: 25,
    icon: '🚀',
    description: 'Instantly gain a level',
    effect: {
      type: 'instant_level',
      value: 1
    }
  },
  {
    id: 'mega-boost-combo',
    name: 'Mega Boost Combo',
    type: 'special',
    price: 75,
    icon: '🎯',
    description: '5x coins + 3x experience for 2 hours',
    effect: {
      type: 'coin_multiplier',
      value: 5.0,
      duration: 7200000
    }
  }
];