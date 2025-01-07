// components/Scoreboard.js
import React from 'react';

const TeamTable = ({ players, teamName }) => (
  <div className="mb-8">
    <h3 className="text-xl font-bold mb-4">{teamName}</h3>
    <div className="overflow-x-auto">
      <table className="min-w-full">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-3 text-left">Player</th>
            <th className="p-3 text-left">K</th>
            <th className="p-3 text-left">D</th>
            <th className="p-3 text-left">K/D</th>
            <th className="p-3 text-left">MVPs</th>
            <th className="p-3 text-left">HS%</th>
            <th className="p-3 text-left">3K</th>
            <th className="p-3 text-left">4K</th>
            <th className="p-3 text-left">Aces</th>
          </tr>
        </thead>
        <tbody>
          {players.map((player, index) => {
            const kdRatio = (player.kills_total / Math.max(1, player.deaths_total)).toFixed(2);
            const hsPercentage = ((player.headshot_kills_total / Math.max(1, player.kills_total)) * 100).toFixed(1);
            
            return (
              <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : ''}>
                <td className="p-3 font-medium">{player.player_name}</td>
                <td className="p-3">{player.kills_total}</td>
                <td className="p-3">{player.deaths_total}</td>
                <td className="p-3">{kdRatio}</td>
                <td className="p-3">{player.mvps}</td>
                <td className="p-3">{hsPercentage}%</td>
                <td className="p-3">{player['3k_rounds_total']}</td>
                <td className="p-3">{player['4k_rounds_total']}</td>
                <td className="p-3">{player.ace_rounds_total}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  </div>
);

const Scoreboard = ({ stats }) => {  
  // Sort players by team and kills
  const terrorists = stats
    .filter(player => player.team_name === 'TERRORIST')
    .sort((a, b) => b.kills_total - a.kills_total);

  const counterTerrorists = stats
    .filter(player => player.team_name === 'CT')
    .sort((a, b) => b.kills_total - a.kills_total);

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4">Match Scoreboard</h2>
      <TeamTable 
        players={counterTerrorists} 
        teamName="Counter-Terrorists" 
      />
      <TeamTable 
        players={terrorists} 
        teamName="Terrorists" 
      />
    </div>
  );
};

export default Scoreboard;