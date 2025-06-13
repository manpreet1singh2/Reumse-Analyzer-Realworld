import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Star } from 'lucide-react';

interface ScoreCardProps {
  score: number;
}

const ScoreCard: React.FC<ScoreCardProps> = ({ score }) => {
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'from-green-500 to-emerald-600';
    if (score >= 60) return 'from-yellow-500 to-orange-500';
    return 'from-red-500 to-red-600';
  };

  const getScoreText = (score: number) => {
    if (score >= 80) return 'Excellent';
    if (score >= 60) return 'Good';
    return 'Needs Improvement';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-6"
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold text-white">Resume Score</h3>
        <TrendingUp className="w-6 h-6 text-blue-400" />
      </div>

      {/* Circular Progress */}
      <div className="relative w-32 h-32 mx-auto mb-6">
        <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 36 36">
          <path
            d="m18,2.0845 a 15.9155,15.9155 0 0,1 0,31.831 a 15.9155,15.9155 0 0,1 0,-31.831"
            fill="none"
            stroke="rgba(255,255,255,0.1)"
            strokeWidth="2"
          />
          <motion.path
            d="m18,2.0845 a 15.9155,15.9155 0 0,1 0,31.831 a 15.9155,15.9155 0 0,1 0,-31.831"
            fill="none"
            stroke="url(#scoreGradient)"
            strokeWidth="2"
            strokeDasharray={`${score}, 100`}
            initial={{ strokeDasharray: "0, 100" }}
            animate={{ strokeDasharray: `${score}, 100` }}
            transition={{ duration: 1.5, ease: "easeOut", delay: 0.5 }}
          />
          <defs>
            <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={score >= 80 ? '#10b981' : score >= 60 ? '#f59e0b' : '#ef4444'} />
              <stop offset="100%" stopColor={score >= 80 ? '#059669' : score >= 60 ? '#d97706' : '#dc2626'} />
            </linearGradient>
          </defs>
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 1, duration: 0.5 }}
              className="text-3xl font-bold text-white"
            >
              {score}
            </motion.div>
            <div className="text-sm text-blue-200">out of 100</div>
          </div>
        </div>
      </div>

      {/* Score Details */}
      <div className="text-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className={`inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-gradient-to-r ${getScoreColor(score)} text-white font-medium`}
        >
          <Star className="w-4 h-4" />
          <span>{getScoreText(score)}</span>
        </motion.div>
        <p className="text-blue-200 text-sm mt-3">
          {score >= 80
            ? "Outstanding resume with strong professional presentation"
            : score >= 60
            ? "Solid resume with room for targeted improvements"
            : "Resume needs significant enhancements to stand out"
          }
        </p>
      </div>
    </motion.div>
  );
};

export default ScoreCard;