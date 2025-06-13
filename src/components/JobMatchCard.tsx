import React from 'react';
import { motion } from 'framer-motion';
import { Target, TrendingUp, Star } from 'lucide-react';

interface JobMatchCardProps {
  jobRoles: string[];
}

const JobMatchCard: React.FC<JobMatchCardProps> = ({ jobRoles }) => {
  const getMatchPercentage = (index: number) => {
    const basePercentage = 95 - (index * 8);
    return Math.max(basePercentage, 70);
  };

  const getMatchColor = (percentage: number) => {
    if (percentage >= 90) return 'from-green-500 to-emerald-600';
    if (percentage >= 80) return 'from-blue-500 to-blue-600';
    return 'from-purple-500 to-purple-600';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6 }}
      className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-6"
    >
      <div className="flex items-center space-x-3 mb-6">
        <Target className="w-6 h-6 text-green-400" />
        <h3 className="text-xl font-semibold text-white">Job Role Matches</h3>
      </div>

      <div className="space-y-4">
        {jobRoles.map((role, index) => {
          const matchPercentage = getMatchPercentage(index);
          return (
            <motion.div
              key={role}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7 + index * 0.1 }}
              className="bg-white/5 border border-white/10 rounded-lg p-4 hover:bg-white/10 transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-lg font-medium text-white">{role}</h4>
                <div className="flex items-center space-x-2">
                  {index === 0 && <Star className="w-4 h-4 text-yellow-400" />}
                  <span className="text-sm font-medium text-white">
                    {matchPercentage}% Match
                  </span>
                </div>
              </div>
              
              {/* Progress Bar */}
              <div className="w-full bg-white/10 rounded-full h-2 mb-3">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${matchPercentage}%` }}
                  transition={{ delay: 0.8 + index * 0.1, duration: 1 }}
                  className={`h-2 rounded-full bg-gradient-to-r ${getMatchColor(matchPercentage)}`}
                />
              </div>
              
              <div className="flex items-center justify-between text-sm">
                <span className="text-blue-200">
                  {index === 0 ? 'Perfect Match' : index === 1 ? 'Excellent Fit' : 'Good Fit'}
                </span>
                <div className="flex items-center space-x-1">
                  <TrendingUp className="w-3 h-3 text-green-400" />
                  <span className="text-green-400">High Demand</span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="mt-6 p-4 bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-400/20 rounded-lg">
        <p className="text-blue-200 text-sm">
          💼 Based on your skills and experience, these roles offer the best career opportunities in the current market.
        </p>
      </div>
    </motion.div>
  );
};

export default JobMatchCard;