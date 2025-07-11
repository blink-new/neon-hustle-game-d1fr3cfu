import React from 'react';
import { Progress } from './ui/progress';

interface HeaderProps {
  coins: number;
  gems: number;
  level: number;
  experience: number;
}

export const Header: React.FC<HeaderProps> = ({ coins, gems, level, experience }) => {
  const expToNextLevel = 100;
  const currentLevelExp = experience % expToNextLevel;
  const expProgress = (currentLevelExp / expToNextLevel) * 100;

  return (
    <div className="bg-black/20 backdrop-blur-md border-b border-cyan-500/20 p-4">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        {/* Game Title */}
        <div className="flex items-center space-x-3">
          <div className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
            🌆 NEON HUSTLE
          </div>
        </div>

        {/* Stats */}
        <div className="flex items-center space-x-8">
          {/* Coins */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 flex items-center justify-center">
              <span className="text-sm font-bold text-black">💰</span>
            </div>
            <span className="text-yellow-300 font-bold text-lg">
              {coins.toLocaleString()}
            </span>
          </div>

          {/* Gems */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-emerald-400 to-teal-500 flex items-center justify-center">
              <span className="text-sm font-bold text-white">💎</span>
            </div>
            <span className="text-emerald-300 font-bold text-lg">
              {gems.toLocaleString()}
            </span>
          </div>

          {/* Level & Experience */}
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-400 to-pink-500 flex items-center justify-center">
                <span className="text-sm font-bold text-white">⚡</span>
              </div>
              <span className="text-purple-300 font-bold">
                Level {level}
              </span>
            </div>
            
            <div className="flex flex-col space-y-1">
              <div className="w-32">
                <Progress 
                  value={expProgress} 
                  className="h-2 bg-slate-800"
                />
              </div>
              <span className="text-xs text-slate-400">
                {currentLevelExp}/{expToNextLevel} XP
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};