import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Calendar, Building } from 'lucide-react';
import { Experience } from '../types/resume';

interface ExperienceTimelineProps {
  experience: Experience[];
}

const ExperienceTimeline: React.FC<ExperienceTimelineProps> = ({ experience }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.7 }}
      className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-6"
    >
      <div className="flex items-center space-x-3 mb-6">
        <Briefcase className="w-6 h-6 text-purple-400" />
        <h3 className="text-xl font-semibold text-white">Work Experience</h3>
      </div>

      <div className="space-y-6">
        {experience.map((exp, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8 + index * 0.2 }}
            className="relative pl-8 pb-6 last:pb-0"
          >
            {/* Timeline Line */}
            {index < experience.length - 1 && (
              <div className="absolute left-4 top-8 w-0.5 h-full bg-gradient-to-b from-purple-400 to-blue-400 opacity-30" />
            )}
            
            {/* Timeline Dot */}
            <div className="absolute left-2 top-2 w-4 h-4 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full border-2 border-white/20" />
            
            {/* Content */}
            <div className="bg-white/5 border border-white/10 rounded-lg p-4 hover:bg-white/10 transition-all duration-300">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3">
                <h4 className="text-lg font-semibold text-white">{exp.role}</h4>
                <div className="flex items-center space-x-2 text-blue-200 text-sm">
                  <Calendar className="w-4 h-4" />
                  <span>{exp.duration}</span>
                </div>
              </div>
              
              <div className="flex items-center space-x-2 mb-3">
                <Building className="w-4 h-4 text-purple-400" />
                <span className="text-purple-200 font-medium">{exp.company}</span>
              </div>
              
              <p className="text-blue-200 text-sm leading-relaxed">
                {exp.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default ExperienceTimeline;