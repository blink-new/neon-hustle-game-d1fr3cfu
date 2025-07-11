import React from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { MINI_GAMES } from '../data/gameData';
import { UseGameStateReturn } from '../hooks/useGameState';

interface MiniGameHubProps {
  gameState: UseGameStateReturn;
  onBack: () => void;
}

export const MiniGameHub: React.FC<MiniGameHubProps> = ({ gameState, onBack }) => {
  const handlePlayGame = (gameId: string, baseReward: number) => {
    // Simulate mini-game completion with randomized rewards
    const multiplier = Math.random() * 0.5 + 0.75; // 75% to 125% of base reward
    const coinsEarned = Math.floor(baseReward * multiplier);
    const expEarned = Math.floor(coinsEarned * 0.1);
    
    gameState.addCoins(coinsEarned);
    gameState.addExperience(expEarned);
    
    // Show success message (toast will be handled by App component)
  };

  return (
    <div className="min-h-screen p-4 pt-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent mb-2">
              Mini-Game Hub
            </h1>
            <p className="text-slate-300">
              Choose your hustle and start earning! 💰
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

        {/* Mini Games Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {MINI_GAMES.map((game) => {
            const isUnlocked = gameState.gameState.level >= game.unlockLevel;
            
            return (
              <Card 
                key={game.id}
                className={`bg-black/40 backdrop-blur-md border-slate-700/50 transition-all duration-300 ${
                  isUnlocked ? 'hover:border-cyan-500/50' : 'opacity-50'
                }`}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${game.color} flex items-center justify-center text-2xl`}>
                      {game.icon}
                    </div>
                    <div className="flex flex-col items-end space-y-1">
                      <Badge 
                        variant="secondary" 
                        className={`${
                          game.difficulty === 'easy' ? 'bg-green-500/20 text-green-300' :
                          game.difficulty === 'medium' ? 'bg-yellow-500/20 text-yellow-300' :
                          'bg-red-500/20 text-red-300'
                        }`}
                      >
                        {game.difficulty}
                      </Badge>
                      <Badge variant="outline" className="text-cyan-300 border-cyan-500/50">
                        Level {game.unlockLevel}+
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="pt-0">
                  <CardTitle className="text-lg text-white mb-2">
                    {game.name}
                  </CardTitle>
                  
                  <p className="text-slate-300 text-sm mb-4">
                    {game.description}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="text-yellow-300 font-bold">
                        💰 {game.baseReward}
                      </span>
                      <span className="text-purple-300 text-sm">
                        +{Math.floor(game.baseReward * 0.1)} XP
                      </span>
                    </div>
                    
                    <Button 
                      onClick={() => handlePlayGame(game.id, game.baseReward)}
                      disabled={!isUnlocked}
                      className={`${
                        isUnlocked 
                          ? 'bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-white' 
                          : 'bg-slate-700 text-slate-400 cursor-not-allowed'
                      }`}
                    >
                      {isUnlocked ? 'Play Now' : 'Locked'}
                    </Button>
                  </div>
                  
                  {!isUnlocked && (
                    <p className="text-slate-500 text-xs mt-2">
                      Unlock at level {game.unlockLevel}
                    </p>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Tips Section */}
        <div className="mt-12 bg-black/20 backdrop-blur-md border border-cyan-500/20 rounded-lg p-6">
          <h3 className="text-xl font-bold text-cyan-300 mb-3">
            💡 Pro Tips
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-slate-300">
            <div>
              • Higher difficulty games give better rewards
            </div>
            <div>
              • Level up to unlock new mini-games
            </div>
            <div>
              • Purchase gear from the shop for coin bonuses
            </div>
            <div>
              • Perfect your skills to maximize earnings
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};