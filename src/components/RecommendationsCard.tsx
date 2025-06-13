import React from 'react';
import { motion } from 'framer-motion';
import { Lightbulb, CheckCircle, ArrowRight } from 'lucide-react';

interface RecommendationsCardProps {
  recommendations: string;
}

const RecommendationsCard: React.FC<RecommendationsCardProps> = ({ recommendations }) => {
  const parseRecommendations = (text: string) => {
    return text.split(/\d+\.\s/).filter(item => item.trim()).map(item => {
      const [title, ...description] = item.split(':');
      return {
        title: title.replace(/\*\*/g, '').trim(),
        description: description.join(':').trim()
      };
    });
  };

  const parsedRecommendations = parseRecommendations(recommendations);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.8 }}
      className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-6"
    >
      <div className="flex items-center space-x-3 mb-6">
        <Lightbulb className="w-6 h-6 text-yellow-400" />
        <h3 className="text-xl font-semibold text-white">AI Recommendations</h3>
      </div>

      <div className="space-y-4">
        {parsedRecommendations.map((rec, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.9 + index * 0.1 }}
            className="bg-white/5 border border-white/10 rounded-lg p-4 hover:bg-white/10 transition-all duration-300 group"
          >
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 mt-1">
                <div className="w-8 h-8 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-bold">{index + 1}</span>
                </div>
              </div>
              
              <div className="flex-1">
                <h4 className="text-lg font-medium text-white mb-2 group-hover:text-yellow-200 transition-colors">
                  {rec.title}
                </h4>
                <p className="text-blue-200 text-sm leading-relaxed">
                  {rec.description}
                </p>
              </div>
              
              <ArrowRight className="w-5 h-5 text-yellow-400 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0 mt-2" />
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="mt-6 p-4 bg-gradient-to-r from-green-500/10 to-blue-500/10 border border-green-400/20 rounded-lg"
      >
        <div className="flex items-center space-x-2 mb-2">
          <CheckCircle className="w-5 h-5 text-green-400" />
          <span className="text-green-400 font-medium">Pro Tip</span>
        </div>
        <p className="text-blue-200 text-sm">
          Implementing these recommendations could improve your resume score by 15-25 points and significantly increase your interview callback rate.
        </p>
      </motion.div>
    </motion.div>
  );
};

export default RecommendationsCard;