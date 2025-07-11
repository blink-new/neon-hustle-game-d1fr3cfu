import { useState, useEffect } from 'react';
import { GameState, InventoryItem, ActiveBoost } from '../types/game';

const INITIAL_GAME_STATE: GameState = {
  coins: 0,
  experience: 0,
  level: 1,
  unlockedZones: ['downtown'],
  inventory: [],
  activeBoosts: []
};

export const useGameState = () => {
  const [gameState, setGameState] = useState<GameState>(() => {
    const saved = localStorage.getItem('neonHustleGameState');
    return saved ? JSON.parse(saved) : INITIAL_GAME_STATE;
  });

  useEffect(() => {
    localStorage.setItem('neonHustleGameState', JSON.stringify(gameState));
  }, [gameState]);

  const addCoins = (amount: number) => {
    setGameState(prev => ({ ...prev, coins: prev.coins + amount }));
  };

  const spendCoins = (amount: number) => {
    setGameState(prev => ({ 
      ...prev, 
      coins: Math.max(0, prev.coins - amount) 
    }));
  };

  const addExperience = (amount: number) => {
    setGameState(prev => {
      const newExp = prev.experience + amount;
      const newLevel = Math.floor(newExp / 100) + 1;
      return { 
        ...prev, 
        experience: newExp,
        level: newLevel
      };
    });
  };

  const addInventoryItem = (item: InventoryItem) => {
    setGameState(prev => ({
      ...prev,
      inventory: [...prev.inventory, { ...item, owned: true }]
    }));
  };

  const addActiveBoost = (boost: ActiveBoost) => {
    setGameState(prev => ({
      ...prev,
      activeBoosts: [...prev.activeBoosts, boost]
    }));
  };

  const updateActiveBoosts = () => {
    setGameState(prev => ({
      ...prev,
      activeBoosts: prev.activeBoosts
        .map(boost => ({ ...boost, remainingTime: boost.remainingTime - 1 }))
        .filter(boost => boost.remainingTime > 0)
    }));
  };

  const resetGame = () => {
    setGameState(INITIAL_GAME_STATE);
    localStorage.removeItem('neonHustleGameState');
  };

  return {
    gameState,
    addCoins,
    spendCoins,
    addExperience,
    addInventoryItem,
    addActiveBoost,
    updateActiveBoosts,
    resetGame
  };
};

export type UseGameStateReturn = ReturnType<typeof useGameState>;