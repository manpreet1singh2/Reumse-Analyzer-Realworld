import React from 'react';
import { motion } from 'framer-motion';
import { Code, Plus, Zap } from 'lucide-react';

interface SkillTagsProps {
  skills: string[];
  missingSkills: string[];
}

const SkillTags: React.FC<SkillTagsProps> = ({ skills, missingSkills }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-6"
    >
      <div className="flex items-center space-x-3 mb-6">
        <Code className="w-6 h-6 text-blue-400" />
        <h3 className="text-xl font-semibold text-white">Skills Analysis</h3>
      </div>

      {/* Current Skills */}
      <div className="mb-8">
        <div className="flex items-center space-x-2 mb-4">
          <Zap className="w-5 h-5 text-green-400" />
          <h4 className="text-lg font-medium text-white">Current Skills</h4>
          <span className="px-2 py-1 bg-green-500/20 text-green-400 text-xs rounded-full">
            {skills.length} skills
          </span>
        </div>
        <div className="flex flex-wrap gap-2">
          {skills.map((skill, index) => (
            <motion.span
              key={skill}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6 + index * 0.1 }}
              className="px-3 py-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-400/30 text-blue-200 rounded-lg text-sm font-medium hover:scale-105 transition-transform"
            >
              {skill}
            </motion.span>
          ))}
        </div>
      </div>

      {/* Missing Skills */}
      <div>
        <div className="flex items-center space-x-2 mb-4">
          <Plus className="w-5 h-5 text-orange-400" />
          <h4 className="text-lg font-medium text-white">Recommended Skills</h4>
          <span className="px-2 py-1 bg-orange-500/20 text-orange-400 text-xs rounded-full">
            High Demand
          </span>
        </div>
        <div className="flex flex-wrap gap-2">
          {missingSkills.map((skill, index) => (
            <motion.span
              key={skill}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8 + index * 0.1 }}
              className="px-3 py-2 bg-gradient-to-r from-orange-500/20 to-red-500/20 border border-orange-400/30 text-orange-200 rounded-lg text-sm font-medium hover:scale-105 transition-transform cursor-pointer"
            >
              + {skill}
            </motion.span>
          ))}
        </div>
        <p className="text-blue-200 text-sm mt-4">
          💡 Learning these skills could increase your job market competitiveness by up to 40%
        </p>
      </div>
    </motion.div>
  );
};

export default SkillTags;