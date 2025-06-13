import React from 'react';
import { motion } from 'framer-motion';
import { Brain, Zap, Target, TrendingUp } from 'lucide-react';

const LoadingAnimation: React.FC = () => {
  const steps = [
    { icon: Brain, text: "Analyzing resume content...", delay: 0 },
    { icon: Zap, text: "Extracting skills and experience...", delay: 0.8 },
    { icon: Target, text: "Matching with job roles...", delay: 1.6 },
    { icon: TrendingUp, text: "Generating recommendations...", delay: 2.4 }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="max-w-2xl mx-auto"
    >
      <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-12 text-center">
        {/* AI Avatar */}
        <motion.div
          animate={{ 
            scale: [1, 1.1, 1],
            rotate: [0, 5, -5, 0] 
          }}
          transition={{ 
            duration: 2, 
            repeat: Infinity,
            ease: "easeInOut" 
          }}
          className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-8"
        >
          <Brain className="w-10 h-10 text-white" />
        </motion.div>

        <h2 className="text-3xl font-bold text-white mb-4">AI is Analyzing Your Resume</h2>
        <p className="text-blue-200 mb-12">Our advanced AI is processing your resume to provide comprehensive insights</p>

        {/* Analysis Steps */}
        <div className="space-y-6">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: step.delay, duration: 0.5 }}
              className="flex items-center space-x-4 bg-white/5 rounded-lg p-4"
            >
              <div className="p-2 bg-blue-500/20 rounded-lg">
                <step.icon className="w-6 h-6 text-blue-400" />
              </div>
              <span className="text-white font-medium">{step.text}</span>
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: '100%' }}
                transition={{ delay: step.delay + 0.2, duration: 0.6 }}
                className="ml-auto flex-1 max-w-20"
              >
                <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: '100%' }}
                    transition={{ delay: step.delay + 0.2, duration: 0.6 }}
                    className="h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"
                  />
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Loading Dots */}
        <div className="flex justify-center space-x-2 mt-8">
          {[0, 1, 2].map((index) => (
            <motion.div
              key={index}
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.5, 1, 0.5]
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                delay: index * 0.2
              }}
              className="w-3 h-3 bg-blue-400 rounded-full"
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default LoadingAnimation;