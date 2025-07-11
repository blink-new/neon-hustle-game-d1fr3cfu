import React from 'react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';

interface GameMenuProps {
  onScreenChange: (screen: 'menu' | 'city' | 'minigames' | 'shop' | 'currency-shop' | 'gem-shop' | 'inventory') => void;
}

export const GameMenu: React.FC<GameMenuProps> = ({ onScreenChange }) => {
  const menuItems = [
    {
      id: 'city',
      title: 'City View',
      description: 'Explore your cyber empire',
      icon: '🏙️',
      color: 'from-cyan-500 to-blue-600'
    },
    {
      id: 'minigames',
      title: 'Mini Games',
      description: 'Earn coins through hustle',
      icon: '🎮',
      color: 'from-purple-500 to-pink-600'
    },
    {
      id: 'shop',
      title: 'Item Shop',
      description: 'Upgrade your gear & empire',
      icon: '🛍️',
      color: 'from-orange-500 to-red-600'
    },
    {
      id: 'currency-shop',
      title: 'Currency Shop',
      description: 'Buy coins & gems',
      icon: '💰',
      color: 'from-yellow-500 to-orange-600'
    },
    {
      id: 'gem-shop',
      title: 'Gem Shop',
      description: 'Spend gems on boosts',
      icon: '💎',
      color: 'from-emerald-500 to-teal-600'
    }
  ];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      {/* Title */}
      <div className="text-center mb-12">
        <h1 className="text-6xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-4">
          NEON HUSTLE
        </h1>
        <p className="text-xl text-slate-300 max-w-2xl mx-auto">
          Build your futuristic business empire in the neon-lit cyber city through mini-games, 
          strategic upgrades, and endless hustle! 🌆
        </p>
      </div>

      {/* Menu Items */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl w-full">
        {menuItems.map((item) => (
          <Card 
            key={item.id}
            className="bg-black/40 backdrop-blur-md border-slate-700/50 hover:border-cyan-500/50 transition-all duration-300 cursor-pointer group"
            onClick={() => onScreenChange(item.id as 'city' | 'minigames' | 'shop' | 'currency-shop' | 'gem-shop')}
          >
            <CardContent className="p-6 text-center">
              <div className={`w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-r ${item.color} flex items-center justify-center text-3xl group-hover:scale-110 transition-transform duration-300`}>
                {item.icon}
              </div>
              
              <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors">
                {item.title}
              </h3>
              
              <p className="text-slate-300 text-sm mb-4">
                {item.description}
              </p>
              
              <Button 
                variant="outline" 
                className="bg-transparent border-cyan-500/50 text-cyan-300 hover:bg-cyan-500/20 hover:border-cyan-400"
              >
                Enter
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Footer */}
      <div className="mt-12 text-center">
        <p className="text-slate-500 text-sm">
          Welcome to the future of digital entrepreneurship! 🚀
        </p>
      </div>
    </div>
  );
};