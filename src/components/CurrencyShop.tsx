import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { COIN_PACKAGES, GEM_PACKAGES } from '../data/shopData';
import { CoinPackage, GemPackage } from '../types/game';

interface CurrencyShopProps {
  onBack: () => void;
  onPurchase: (type: 'coin' | 'gem', packageId: string, amount: number) => void;
}

export const CurrencyShop: React.FC<CurrencyShopProps> = ({ onBack, onPurchase }) => {
  const [selectedTab, setSelectedTab] = useState('coins');

  const handlePurchase = (type: 'coin' | 'gem', pkg: CoinPackage | GemPackage) => {
    // In a real app, this would integrate with payment processing
    // For now, we'll simulate successful purchase
    const amount = 'coins' in pkg ? pkg.coins : pkg.gems;
    onPurchase(type, pkg.id, amount);
  };

  const CoinPackageCard = ({ pkg }: { pkg: CoinPackage }) => (
    <Card className="bg-black/40 backdrop-blur-md border-yellow-500/30 hover:border-yellow-400/50 transition-all duration-300 group">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-white text-lg flex items-center gap-2">
            <span className="text-2xl">{pkg.icon}</span>
            {pkg.name}
          </CardTitle>
          {pkg.popular && (
            <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-black font-bold">
              POPULAR
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-center">
          <div className="text-3xl font-bold text-yellow-300">
            {pkg.coins.toLocaleString()}
          </div>
          <div className="text-sm text-yellow-400/70">coins</div>
          {pkg.bonus && (
            <div className="text-sm text-green-400 mt-1">
              +{pkg.bonus.toLocaleString()} bonus!
            </div>
          )}
        </div>
        
        <div className="text-center text-slate-300 text-sm">
          {pkg.description}
        </div>
        
        <Button 
          onClick={() => handlePurchase('coin', pkg)}
          className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-400 hover:to-orange-400 text-black font-bold"
        >
          ${pkg.price.toFixed(2)}
        </Button>
      </CardContent>
    </Card>
  );

  const GemPackageCard = ({ pkg }: { pkg: GemPackage }) => (
    <Card className="bg-black/40 backdrop-blur-md border-emerald-500/30 hover:border-emerald-400/50 transition-all duration-300 group">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-white text-lg flex items-center gap-2">
            <span className="text-2xl">{pkg.icon}</span>
            {pkg.name}
          </CardTitle>
          {pkg.popular && (
            <Badge className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-bold">
              POPULAR
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-center">
          <div className="text-3xl font-bold text-emerald-300">
            {pkg.gems.toLocaleString()}
          </div>
          <div className="text-sm text-emerald-400/70">gems</div>
          {pkg.bonus && (
            <div className="text-sm text-green-400 mt-1">
              +{pkg.bonus.toLocaleString()} bonus!
            </div>
          )}
        </div>
        
        <div className="text-center text-slate-300 text-sm">
          {pkg.description}
        </div>
        
        <Button 
          onClick={() => handlePurchase('gem', pkg)}
          className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-white font-bold"
        >
          ${pkg.price.toFixed(2)}
        </Button>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-yellow-400 via-emerald-400 to-cyan-400 bg-clip-text text-transparent">
              💰 Currency Shop
            </h1>
            <p className="text-slate-300 mt-2">
              Purchase coins and gems to enhance your cyberpunk empire
            </p>
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
          <TabsList className="grid w-full grid-cols-2 bg-black/40 backdrop-blur-md border border-slate-700/50">
            <TabsTrigger 
              value="coins" 
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-yellow-500 data-[state=active]:to-orange-500 data-[state=active]:text-black"
            >
              🪙 Coin Packages
            </TabsTrigger>
            <TabsTrigger 
              value="gems"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-emerald-500 data-[state=active]:to-teal-500 data-[state=active]:text-white"
            >
              💎 Gem Packages
            </TabsTrigger>
          </TabsList>

          <TabsContent value="coins" className="mt-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {COIN_PACKAGES.map((pkg) => (
                <CoinPackageCard key={pkg.id} pkg={pkg} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="gems" className="mt-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {GEM_PACKAGES.map((pkg) => (
                <GemPackageCard key={pkg.id} pkg={pkg} />
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Info Section */}
        <div className="mt-12 bg-black/40 backdrop-blur-md border border-slate-700/50 rounded-lg p-6">
          <h3 className="text-xl font-bold text-white mb-4">💡 Currency Guide</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-lg font-semibold text-yellow-300 mb-2">🪙 Coins</h4>
              <p className="text-slate-300 text-sm">
                The primary currency for purchasing items, gear, and premium passes. 
                Earn coins through mini-games or buy them here to accelerate your progress.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-emerald-300 mb-2">💎 Gems</h4>
              <p className="text-slate-300 text-sm">
                Premium currency for exclusive boosts, instant rewards, and special items. 
                Gems provide powerful advantages and unique opportunities in your cyber empire.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};