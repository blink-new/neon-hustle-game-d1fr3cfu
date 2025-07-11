import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { GEM_SHOP_ITEMS } from '../data/shopData';
import { GemShopItem } from '../types/game';

interface GemShopProps {
  gems: number;
  onBack: () => void;
  onPurchase: (item: GemShopItem) => void;
}

export const GemShop: React.FC<GemShopProps> = ({ gems, onBack, onPurchase }) => {
  const [selectedTab, setSelectedTab] = useState('boosts');

  const getTabItems = (type: string) => {
    return GEM_SHOP_ITEMS.filter(item => item.type === type);
  };

  const formatDuration = (milliseconds: number) => {
    const hours = Math.floor(milliseconds / 3600000);
    const minutes = Math.floor((milliseconds % 3600000) / 60000);
    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    }
    return `${minutes}m`;
  };

  const getEffectDescription = (item: GemShopItem) => {
    switch (item.effect.type) {
      case 'coin_multiplier':
        return `${item.effect.value}x coin earnings${item.effect.duration ? ` for ${formatDuration(item.effect.duration)}` : ''}`;
      case 'coin_amount':
        return `+${item.effect.value.toLocaleString()} coins instantly`;
      case 'experience_multiplier':
        return `${item.effect.value}x experience${item.effect.duration ? ` for ${formatDuration(item.effect.duration)}` : ''}`;
      case 'instant_level':
        return `+${item.effect.value} level${item.effect.value > 1 ? 's' : ''} instantly`;
      default:
        return 'Special effect';
    }
  };

  const GemShopItemCard = ({ item }: { item: GemShopItem }) => {
    const canAfford = gems >= item.price;
    
    return (
      <Card className={`bg-black/40 backdrop-blur-md border-emerald-500/30 hover:border-emerald-400/50 transition-all duration-300 group ${!canAfford ? 'opacity-60' : ''}`}>
        <CardHeader className="pb-3">
          <CardTitle className="text-white text-lg flex items-center gap-2">
            <span className="text-2xl">{item.icon}</span>
            {item.name}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-center">
            <div className="text-slate-300 text-sm mb-2">
              {item.description}
            </div>
            <div className="text-emerald-300 font-semibold text-sm">
              {getEffectDescription(item)}
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1">
              <span className="text-emerald-300 font-bold text-lg">
                {item.price}
              </span>
              <span className="text-emerald-400/70 text-sm">💎</span>
            </div>
            <Button 
              onClick={() => onPurchase(item)}
              disabled={!canAfford}
              className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-white font-bold disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {canAfford ? 'Purchase' : 'Need More Gems'}
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="min-h-screen p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent">
              💎 Gem Shop
            </h1>
            <p className="text-slate-300 mt-2">
              Spend gems on powerful boosts and instant rewards
            </p>
            <div className="flex items-center gap-2 mt-2">
              <span className="text-emerald-300 font-bold">💎 {gems.toLocaleString()}</span>
              <span className="text-emerald-400/70 text-sm">gems available</span>
            </div>
          </div>
          <Button 
            onClick={onBack}
            variant="outline" 
            className="bg-slate-800/50 border-slate-600 hover:bg-slate-700/50"
          >
            ← Back
          </Button>
        </div>

        {/* Tabs */}
        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 bg-black/40 backdrop-blur-md border border-slate-700/50">
            <TabsTrigger 
              value="boosts" 
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-emerald-500 data-[state=active]:to-teal-500 data-[state=active]:text-white"
            >
              ⚡ Boosts
            </TabsTrigger>
            <TabsTrigger 
              value="currency"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-emerald-500 data-[state=active]:to-teal-500 data-[state=active]:text-white"
            >
              🪙 Currency
            </TabsTrigger>
            <TabsTrigger 
              value="premium"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-emerald-500 data-[state=active]:to-teal-500 data-[state=active]:text-white"
            >
              🚀 Premium
            </TabsTrigger>
            <TabsTrigger 
              value="special"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-emerald-500 data-[state=active]:to-teal-500 data-[state=active]:text-white"
            >
              🎯 Special
            </TabsTrigger>
          </TabsList>

          <TabsContent value="boosts" className="mt-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {getTabItems('boosts').map((item) => (
                <GemShopItemCard key={item.id} item={item} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="currency" className="mt-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {getTabItems('currency').map((item) => (
                <GemShopItemCard key={item.id} item={item} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="premium" className="mt-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {getTabItems('premium').map((item) => (
                <GemShopItemCard key={item.id} item={item} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="special" className="mt-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {getTabItems('special').map((item) => (
                <GemShopItemCard key={item.id} item={item} />
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Info Section */}
        <div className="mt-12 bg-black/40 backdrop-blur-md border border-slate-700/50 rounded-lg p-6">
          <h3 className="text-xl font-bold text-white mb-4">💎 Gem Shop Guide</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-lg font-semibold text-emerald-300 mb-2">⚡ Boosts</h4>
              <p className="text-slate-300 text-sm">
                Temporary multipliers that dramatically increase your coin or experience earnings for a limited time.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-emerald-300 mb-2">🪙 Currency</h4>
              <p className="text-slate-300 text-sm">
                Instant coin rewards that provide immediate buying power for shop items and upgrades.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};