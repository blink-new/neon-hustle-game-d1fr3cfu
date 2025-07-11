import React, { useState } from 'react';
import { useGameState } from './hooks/useGameState';
import { Header } from './components/Header';
import { GameMenu } from './components/GameMenu';
import { MiniGameHub } from './components/MiniGameHub';
import { CoinShop } from './components/CoinShop';
import { CurrencyShop } from './components/CurrencyShop';
import { GemShop } from './components/GemShop';
import { CityView } from './components/CityView';
import { toast } from 'react-hot-toast';
import { GemShopItem } from './types/game';

type GameScreen = 'menu' | 'city' | 'minigames' | 'shop' | 'currency-shop' | 'gem-shop' | 'inventory';

function App() {
  const [currentScreen, setCurrentScreen] = useState<GameScreen>('menu');
  const gameState = useGameState();

  const handleScreenChange = (screen: GameScreen) => {
    setCurrentScreen(screen);
  };

  const handlePurchase = (itemId: string, price: number) => {
    if (gameState.gameState.coins >= price) {
      gameState.spendCoins(price);
      toast.success('Purchase successful!', {
        style: {
          background: '#0f172a',
          color: '#f1f5f9',
          border: '1px solid #3b82f6',
        }
      });
    } else {
      toast.error('Insufficient coins!', {
        style: {
          background: '#0f172a',
          color: '#f1f5f9',
          border: '1px solid #ef4444',
        }
      });
    }
  };

  const handleCurrencyPurchase = (type: 'coin' | 'gem', packageId: string, amount: number) => {
    // In a real app, this would integrate with payment processing
    // For demo purposes, we'll just add the currency
    if (type === 'coin') {
      gameState.addCoins(amount);
      toast.success(`Purchased ${amount.toLocaleString()} coins!`, {
        style: {
          background: '#0f172a',
          color: '#f1f5f9',
          border: '1px solid #f59e0b',
        }
      });
    } else {
      gameState.addGems(amount);
      toast.success(`Purchased ${amount.toLocaleString()} gems!`, {
        style: {
          background: '#0f172a',
          color: '#f1f5f9',
          border: '1px solid #10b981',
        }
      });
    }
  };

  const handleGemPurchase = (item: GemShopItem) => {
    if (gameState.gameState.gems >= item.price) {
      gameState.spendGems(item.price);
      
      // Apply the item's effect
      switch (item.effect.type) {
        case 'coin_amount':
          gameState.addCoins(item.effect.value);
          break;
        case 'instant_level':
          gameState.addExperience(item.effect.value * 100); // Each level is 100 exp
          break;
        case 'coin_multiplier':
        case 'experience_multiplier':
          // These would need to be implemented as active boosts
          // For now, we'll just show a success message
          break;
      }
      
      toast.success(`Purchased ${item.name}!`, {
        style: {
          background: '#0f172a',
          color: '#f1f5f9',
          border: '1px solid #10b981',
        }
      });
    } else {
      toast.error('Insufficient gems!', {
        style: {
          background: '#0f172a',
          color: '#f1f5f9',
          border: '1px solid #ef4444',
        }
      });
    }
  };

  const renderCurrentScreen = () => {
    switch (currentScreen) {
      case 'menu':
        return <GameMenu onScreenChange={handleScreenChange} />;
      case 'city':
        return <CityView gameState={gameState.gameState} onScreenChange={handleScreenChange} />;
      case 'minigames':
        return <MiniGameHub gameState={gameState} onBack={() => setCurrentScreen('menu')} />;
      case 'shop':
        return <CoinShop gameState={gameState.gameState} onPurchase={handlePurchase} onBack={() => setCurrentScreen('menu')} />;
      case 'currency-shop':
        return <CurrencyShop onPurchase={handleCurrencyPurchase} onBack={() => setCurrentScreen('menu')} />;
      case 'gem-shop':
        return <GemShop gems={gameState.gameState.gems} onPurchase={handleGemPurchase} onBack={() => setCurrentScreen('menu')} />;
      default:
        return <GameMenu onScreenChange={handleScreenChange} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Animated background grid */}
      <div className="fixed inset-0 bg-grid-pattern opacity-20"></div>
      
      {/* Neon glow effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500 rounded-full blur-3xl opacity-10 animate-pulse"></div>
        <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-purple-500 rounded-full blur-3xl opacity-10 animate-pulse delay-1000"></div>
        <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-pink-500 rounded-full blur-3xl opacity-10 animate-pulse delay-2000"></div>
      </div>

      <div className="relative z-10">
        {currentScreen !== 'menu' && (
          <Header 
            coins={gameState.gameState.coins}
            gems={gameState.gameState.gems}
            level={gameState.gameState.level}
            experience={gameState.gameState.experience}
          />
        )}
        
        {renderCurrentScreen()}
      </div>
    </div>
  );
}

export default App;