import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { SHOP_ITEMS } from '../data/gameData';
import { GameState } from '../types/game';

interface CoinShopProps {
  gameState: GameState;
  onPurchase: (itemId: string, price: number) => void;
  onBack: () => void;
}

export const CoinShop: React.FC<CoinShopProps> = ({ gameState, onPurchase, onBack }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('gear');

  const categories = [
    { id: 'gear', name: 'Gear', icon: '⚡', description: 'Boost your earning power' },
    { id: 'decorations', name: 'Decorations', icon: '🎨', description: 'Passive income generators' },
    { id: 'passes', name: 'Premium Passes', icon: '🎫', description: 'Exclusive VIP benefits' },
    { id: 'legendary', name: 'Legendary', icon: '👑', description: 'Ultimate game changers' }
  ];

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'bg-slate-500/20 text-slate-300';
      case 'rare': return 'bg-blue-500/20 text-blue-300';
      case 'epic': return 'bg-purple-500/20 text-purple-300';
      case 'legendary': return 'bg-yellow-500/20 text-yellow-300';
      default: return 'bg-slate-500/20 text-slate-300';
    }
  };

  const getItemsByCategory = (category: string) => {
    return SHOP_ITEMS.filter(item => item.category === category);
  };

  const canAfford = (price: number) => {
    return gameState.coins >= price;
  };

  const isOwned = (itemId: string) => {
    return gameState.inventory.some(item => item.id === itemId);
  };

  return (
    <div className="min-h-screen p-4 pt-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent mb-2">
              Coin Shop
            </h1>
            <p className="text-slate-300">
              Upgrade your gear and expand your empire! 🛍️
            </p>
          </div>
          <Button 
            variant="outline" 
            onClick={onBack}
            className="bg-transparent border-cyan-500/50 text-cyan-300 hover:bg-cyan-500/20"
          >
            ← Back to Menu
          </Button>
        </div>

        {/* Shop Categories */}
        <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8 bg-black/40 backdrop-blur-md">
            {categories.map((category) => (
              <TabsTrigger 
                key={category.id} 
                value={category.id}
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-cyan-500/30 data-[state=active]:to-purple-500/30"
              >
                <div className="flex items-center space-x-2">
                  <span className="text-lg">{category.icon}</span>
                  <span>{category.name}</span>
                </div>
              </TabsTrigger>
            ))}
          </TabsList>

          {categories.map((category) => (
            <TabsContent key={category.id} value={category.id} className="space-y-6">
              {/* Category Header */}
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-white mb-2">
                  {category.icon} {category.name}
                </h2>
                <p className="text-slate-300">{category.description}</p>
              </div>

              {/* Items Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {getItemsByCategory(category.id).map((item) => {
                  const affordable = canAfford(item.price);
                  const owned = isOwned(item.id);
                  const isPremiumPass = item.type === 'pass';
                  
                  return (
                    <Card 
                      key={item.id}
                      className={`bg-black/40 backdrop-blur-md border-slate-700/50 transition-all duration-300 ${
                        owned ? 'border-green-500/50' : 'hover:border-cyan-500/50'
                      } ${isPremiumPass ? 'relative overflow-hidden' : ''}`}
                    >
                      {/* Premium pass glow effect */}
                      {isPremiumPass && (
                        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-cyan-500/10 to-pink-500/10 animate-pulse"></div>
                      )}
                      
                      <CardHeader className="pb-3 relative z-10">
                        <div className="flex items-center justify-between">
                          <div className="text-3xl">{item.icon}</div>
                          <div className="flex flex-col items-end space-y-1">
                            <Badge className={getRarityColor(item.rarity)}>
                              {item.rarity}
                            </Badge>
                            {isPremiumPass && !owned && (
                              <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white animate-pulse">
                                PREMIUM
                              </Badge>
                            )}
                            {owned && (
                              <Badge className="bg-green-500/20 text-green-300">
                                Owned
                              </Badge>
                            )}
                          </div>
                        </div>
                      </CardHeader>
                      
                      <CardContent className="pt-0 relative z-10">
                        <CardTitle className={`text-lg mb-2 ${isPremiumPass ? 'text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400' : 'text-white'}`}>
                          {item.name}
                        </CardTitle>
                        
                        <p className="text-slate-300 text-sm mb-4">
                          {item.description}
                        </p>
                        
                        {/* Item Stats */}
                        <div className="space-y-2 mb-4">
                          {item.coinBoost && (
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-slate-400">Coin Boost:</span>
                              <span className={`font-bold ${isPremiumPass ? 'text-purple-300' : 'text-yellow-300'}`}>
                                +{(item.coinBoost * 100).toFixed(0)}%
                              </span>
                            </div>
                          )}
                          {item.passiveBonus && (
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-slate-400">Passive Income:</span>
                              <span className={`font-bold ${isPremiumPass ? 'text-cyan-300' : 'text-green-300'}`}>
                                +{item.passiveBonus}/min
                              </span>
                            </div>
                          )}
                        </div>
                        
                        {/* Price and Purchase */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <span className={`font-bold ${isPremiumPass ? 'text-2xl text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-400' : 'text-yellow-300'}`}>
                              💰 {item.price.toLocaleString()}
                            </span>
                          </div>
                          
                          <Button 
                            onClick={() => onPurchase(item.id, item.price)}
                            disabled={!affordable || owned}
                            className={`${
                              owned 
                                ? 'bg-green-500/20 text-green-300 cursor-not-allowed' 
                                : affordable 
                                  ? isPremiumPass 
                                    ? 'bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 hover:from-purple-600 hover:via-pink-600 hover:to-orange-600 text-white animate-pulse' 
                                    : 'bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-white'
                                  : 'bg-slate-700 text-slate-400 cursor-not-allowed'
                            }`}
                            size="sm"
                          >
                            {owned ? 'Owned' : affordable ? (isPremiumPass ? 'ACTIVATE' : 'Buy') : 'Too Expensive'}
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </TabsContent>
          ))}
        </Tabs>

        {/* Shop Footer */}
        <div className="mt-12 bg-black/20 backdrop-blur-md border border-cyan-500/20 rounded-lg p-6">
          <h3 className="text-xl font-bold text-cyan-300 mb-3">
            💰 Your Wallet
          </h3>
          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold text-yellow-300">
              {gameState.coins.toLocaleString()} Coins
            </div>
            <div className="text-slate-300">
              Level {gameState.level} • {gameState.experience} XP
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};