import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Briefcase } from 'lucide-react';
import { JobProfile } from '../types/resume';
import { jobProfiles } from '../data/jobProfiles';

interface ProfileSelectorProps {
  selectedProfile: string | null;
  onSelectProfile: (profileId: string) => void;
}

const ProfileSelector: React.FC<ProfileSelectorProps> = ({ selectedProfile, onSelectProfile }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-8 mb-8"
    >
      <div className="text-center mb-8">
        <div className="flex items-center justify-center space-x-3 mb-4">
          <Briefcase className="w-8 h-8 text-blue-400" />
          <h2 className="text-2xl font-bold text-white">Select Target Job Profile</h2>
        </div>
        <p className="text-blue-200">Choose the role you're targeting for personalized resume analysis</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {jobProfiles.map((profile, index) => (
          <motion.div
            key={profile.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            onClick={() => onSelectProfile(profile.id)}
            className={`relative p-6 rounded-xl border-2 cursor-pointer transition-all duration-300 hover:scale-105 ${
              selectedProfile === profile.id
                ? 'border-blue-400 bg-blue-500/20'
                : 'border-white/20 bg-white/5 hover:border-white/40'
            }`}
          >
            {selectedProfile === profile.id && (
              <div className="absolute top-3 right-3">
                <CheckCircle className="w-6 h-6 text-blue-400" />
              </div>
            )}
            
            <div className="text-center">
              <div className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r ${profile.color} flex items-center justify-center text-2xl`}>
                {profile.icon}
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">{profile.title}</h3>
              <p className="text-blue-200 text-sm mb-4">{profile.description}</p>
              
              <div className="flex flex-wrap gap-1 justify-center">
                {profile.skills.slice(0, 3).map((skill) => (
                  <span
                    key={skill}
                    className="px-2 py-1 bg-white/10 text-blue-200 text-xs rounded-full"
                  >
                    {skill}
                  </span>
                ))}
                {profile.skills.length > 3 && (
                  <span className="px-2 py-1 bg-white/10 text-blue-200 text-xs rounded-full">
                    +{profile.skills.length - 3}
                  </span>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default ProfileSelector;