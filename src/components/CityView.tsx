import React from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { GameState } from '../types/game';

interface CityViewProps {
  gameState: GameState;
  onScreenChange: (screen: 'menu' | 'city' | 'minigames' | 'shop' | 'inventory') => void;
}

export const CityView: React.FC<CityViewProps> = ({ gameState, onScreenChange }) => {
  const cityZones = [
    {
      id: 'downtown',
      name: 'Downtown District',
      description: 'The heart of your cyber empire',
      icon: '🏙️',
      unlocked: true,
      buildings: ['Small Office', 'Neon Café'],
      color: 'from-cyan-500 to-blue-600'
    },
    {
      id: 'underground',
      name: 'Underground Market',
      description: 'Secret deals and hidden opportunities',
      icon: '🕳️',
      unlocked: gameState.level >= 5,
      buildings: ['Black Market', 'Crypto Mine'],
      color: 'from-purple-500 to-pink-600'
    },
    {
      id: 'skyline',
      name: 'Skyline Arcade',
      description: 'High-tech gaming paradise',
      icon: '🌃',
      unlocked: gameState.level >= 10,
      buildings: ['VR Arena', 'Rooftop Club'],
      color: 'from-orange-500 to-red-600'
    }
  ];

  const getEmpireStats = () => {
    const ownedItems = gameState.inventory.length;
    const totalValue = gameState.inventory.reduce((sum, item) => sum + (item.passiveBonus || 0), 0);
    const coinBoost = gameState.inventory.reduce((sum, item) => sum + (item.coinBoost || 0), 0);
    
    return {
      buildings: ownedItems,
      passiveIncome: totalValue,
      coinBoost: coinBoost * 100
    };
  };

  const stats = getEmpireStats();

  return (
    <div className="min-h-screen p-4 pt-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent mb-2">
              Your Cyber Empire
            </h1>
            <p className="text-slate-300">
              Manage and expand your neon-lit business empire! 🏙️
            </p>
          </div>
          <Button 
            variant="outline" 
            onClick={() => onScreenChange('menu')}
            className="bg-transparent border-cyan-500/50 text-cyan-300 hover:bg-cyan-500/20"
          >
            ← Back to Menu
          </Button>
        </div>

        {/* Empire Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-black/40 backdrop-blur-md border-slate-700/50">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg text-cyan-300 flex items-center">
                🏢 Total Buildings
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">
                {stats.buildings}
              </div>
              <p className="text-slate-400 text-sm">Assets owned</p>
            </CardContent>
          </Card>

          <Card className="bg-black/40 backdrop-blur-md border-slate-700/50">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg text-green-300 flex items-center">
                💸 Passive Income
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">
                {stats.passiveIncome}/min
              </div>
              <p className="text-slate-400 text-sm">Coins per minute</p>
            </CardContent>
          </Card>

          <Card className="bg-black/40 backdrop-blur-md border-slate-700/50">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg text-yellow-300 flex items-center">
                ⚡ Coin Boost
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">
                +{stats.coinBoost.toFixed(0)}%
              </div>
              <p className="text-slate-400 text-sm">Earning multiplier</p>
            </CardContent>
          </Card>
        </div>

        {/* City Zones */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-white mb-6">
            🌆 City Districts
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cityZones.map((zone) => (
              <Card 
                key={zone.id}
                className={`bg-black/40 backdrop-blur-md border-slate-700/50 transition-all duration-300 ${
                  zone.unlocked ? 'hover:border-cyan-500/50' : 'opacity-50'
                }`}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${zone.color} flex items-center justify-center text-2xl`}>
                      {zone.icon}
                    </div>
                    <div className="flex flex-col items-end space-y-1">
                      <Badge 
                        className={`${
                          zone.unlocked 
                            ? 'bg-green-500/20 text-green-300' 
                            : 'bg-red-500/20 text-red-300'
                        }`}
                      >
                        {zone.unlocked ? 'Unlocked' : 'Locked'}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="pt-0">
                  <CardTitle className="text-lg text-white mb-2">
                    {zone.name}
                  </CardTitle>
                  
                  <p className="text-slate-300 text-sm mb-4">
                    {zone.description}
                  </p>
                  
                  <div className="space-y-2 mb-4">
                    <h4 className="text-sm font-semibold text-cyan-300">Buildings:</h4>
                    <div className="space-y-1">
                      {zone.buildings.map((building) => (
                        <div key={building} className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                          <span className="text-slate-400 text-sm">{building}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-slate-400">
                      {zone.unlocked ? 'Available' : `Unlock at Level ${zone.id === 'underground' ? '5' : '10'}`}
                    </div>
                    <Button 
                      disabled={!zone.unlocked}
                      className={`${
                        zone.unlocked 
                          ? 'bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-white' 
                          : 'bg-slate-700 text-slate-400 cursor-not-allowed'
                      }`}
                      size="sm"
                    >
                      {zone.unlocked ? 'Visit' : 'Locked'}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-12 bg-black/20 backdrop-blur-md border border-cyan-500/20 rounded-lg p-6">
          <h3 className="text-xl font-bold text-cyan-300 mb-6">
            ⚡ Quick Actions
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button 
              onClick={() => onScreenChange('minigames')}
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
            >
              🎮 Play Mini-Games
            </Button>
            <Button 
              onClick={() => onScreenChange('shop')}
              className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white"
            >
              🛍️ Visit Shop
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};