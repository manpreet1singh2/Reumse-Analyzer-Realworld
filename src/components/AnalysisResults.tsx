import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Download, Copy, Star, TrendingUp, Award, Target } from 'lucide-react';
import { ResumeAnalysis } from '../types/resume';
import ScoreCard from './ScoreCard';
import SkillTags from './SkillTags';
import ExperienceTimeline from './ExperienceTimeline';
import JobMatchCard from './JobMatchCard';
import RecommendationsCard from './RecommendationsCard';

interface AnalysisResultsProps {
  analysis: ResumeAnalysis;
  onReset: () => void;
}

const AnalysisResults: React.FC<AnalysisResultsProps> = ({ analysis, onReset }) => {
  const handleDownloadReport = () => {
    const reportData = JSON.stringify(analysis, null, 2);
    const blob = new Blob([reportData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'resume-analysis-report.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleCopyReport = async () => {
    const reportText = `Resume Analysis Report for ${analysis.name}

Overall Score: ${analysis.resume_score}/100
Experience: ${analysis.total_experience_years} years

Top Skills: ${analysis.skills.join(', ')}
Missing Skills: ${analysis.missing_skills.join(', ')}
Recommended Roles: ${analysis.job_fit_roles.join(', ')}

${analysis.recommendations}`;

    try {
      await navigator.clipboard.writeText(reportText);
      // You could add a toast notification here
    } catch (err) {
      console.error('Failed to copy report:', err);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-6xl mx-auto space-y-8"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <motion.h1 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-3xl font-bold text-white mb-2"
          >
            Resume Analysis for {analysis.name}
          </motion.h1>
          <p className="text-blue-200">Complete AI-powered career assessment and recommendations</p>
        </div>
        
        <div className="flex flex-wrap gap-3">
          <button
            onClick={handleDownloadReport}
            className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors flex items-center space-x-2"
          >
            <Download className="w-4 h-4" />
            <span>Download Report</span>
          </button>
          <button
            onClick={handleCopyReport}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors flex items-center space-x-2"
          >
            <Copy className="w-4 h-4" />
            <span>Copy Report</span>
          </button>
          <button
            onClick={onReset}
            className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors flex items-center space-x-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>New Analysis</span>
          </button>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-6"
        >
          <div className="flex items-center space-x-3 mb-4">
            <Award className="w-8 h-8 text-yellow-400" />
            <div>
              <h3 className="text-lg font-semibold text-white">Resume Score</h3>
              <p className="text-blue-200 text-sm">Overall assessment</p>
            </div>
          </div>
          <div className="text-3xl font-bold text-white">{analysis.resume_score}/100</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-6"
        >
          <div className="flex items-center space-x-3 mb-4">
            <TrendingUp className="w-8 h-8 text-green-400" />
            <div>
              <h3 className="text-lg font-semibold text-white">Experience</h3>
              <p className="text-blue-200 text-sm">Professional years</p>
            </div>
          </div>
          <div className="text-3xl font-bold text-white">{analysis.total_experience_years} Years</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-6"
        >
          <div className="flex items-center space-x-3 mb-4">
            <Target className="w-8 h-8 text-purple-400" />
            <div>
              <h3 className="text-lg font-semibold text-white">Skills Match</h3>
              <p className="text-blue-200 text-sm">Technical proficiency</p>
            </div>
          </div>
          <div className="text-3xl font-bold text-white">{analysis.skills.length}/15</div>
        </motion.div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column */}
        <div className="space-y-8">
          <ScoreCard score={analysis.resume_score} />
          <SkillTags 
            skills={analysis.skills} 
            missingSkills={analysis.missing_skills}
          />
          <ExperienceTimeline experience={analysis.experience} />
        </div>

        {/* Right Column */}
        <div className="space-y-8">
          <JobMatchCard jobRoles={analysis.job_fit_roles} />
          <RecommendationsCard recommendations={analysis.recommendations} />
          
          {/* Contact & Education Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-6"
          >
            <h3 className="text-xl font-semibold text-white mb-4">Profile Information</h3>
            <div className="space-y-3">
              <div>
                <span className="text-blue-200 text-sm">Email:</span>
                <p className="text-white">{analysis.email}</p>
              </div>
              <div>
                <span className="text-blue-200 text-sm">Phone:</span>
                <p className="text-white">{analysis.phone}</p>
              </div>
              {analysis.education.length > 0 && (
                <div>
                  <span className="text-blue-200 text-sm">Education:</span>
                  {analysis.education.map((edu, index) => (
                    <p key={index} className="text-white">
                      {edu.degree} - {edu.institute} ({edu.year})
                    </p>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default AnalysisResults;