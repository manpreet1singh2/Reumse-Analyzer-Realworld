import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Brain, FileText, Sparkles } from 'lucide-react';
import ProfileSelector from './components/ProfileSelector';
import EnhancedResumeUpload from './components/EnhancedResumeUpload';
import EnhancedAnalysisResults from './components/EnhancedAnalysisResults';
import LoadingAnimation from './components/LoadingAnimation';
import { ResumeAnalysis } from './types/resume';
import { jobProfiles } from './data/jobProfiles';

function App() {
  const [selectedProfile, setSelectedProfile] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<ResumeAnalysis | null>(null);
  const [showResults, setShowResults] = useState(false);

  const handleAnalyze = async (resumeText: string, fileName?: string) => {
    setIsAnalyzing(true);
    setShowResults(false);
    
    // Simulate AI analysis with realistic delay
    await new Promise(resolve => setTimeout(resolve, 4000));
    
    const mockAnalysis = generateProfileBasedAnalysis(resumeText, selectedProfile!, fileName);
    setAnalysis(mockAnalysis);
    setIsAnalyzing(false);
    setShowResults(true);
  };

  const handleReset = () => {
    setAnalysis(null);
    setShowResults(false);
    setIsAnalyzing(false);
    setSelectedProfile(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iNCIvPjwvZz48L2c+PC9zdmc+')] opacity-20"></div>
      
      <div className="relative z-10">
        {/* Header */}
        <motion.header 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="container mx-auto px-6 py-8"
        >
          <div className="flex items-center justify-center space-x-3">
            <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl">
              <Brain className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">AI Resume Analyzer</h1>
              <p className="text-blue-200">Profile-Targeted Career Insights Powered by AI</p>
            </div>
          </div>
        </motion.header>

        {/* Main Content */}
        <main className="container mx-auto px-6 pb-12">
          {!showResults && !isAnalyzing && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="max-w-4xl mx-auto"
            >
              {!selectedProfile && (
                <div className="text-center mb-12">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="mb-6"
                  >
                    <Sparkles className="w-16 h-16 text-yellow-400 mx-auto mb-4" />
                    <h2 className="text-4xl font-bold text-white mb-4">
                      Unlock Your Career Potential
                    </h2>
                    <p className="text-xl text-blue-200 max-w-2xl mx-auto">
                      Get targeted AI-powered resume analysis based on your specific career goals. 
                      Choose your target role and receive personalized insights to land your dream job.
                    </p>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="grid md:grid-cols-3 gap-6 mb-12"
                  >
                    <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6">
                      <FileText className="w-10 h-10 text-blue-400 mx-auto mb-3" />
                      <h3 className="text-lg font-semibold text-white mb-2">Multi-Format Support</h3>
                      <p className="text-blue-200 text-sm">Upload PDF, DOCX, images, or paste text directly</p>
                    </div>
                    <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6">
                      <Brain className="w-10 h-10 text-purple-400 mx-auto mb-3" />
                      <h3 className="text-lg font-semibold text-white mb-2">Profile-Targeted Analysis</h3>
                      <p className="text-blue-200 text-sm">Get insights specific to your target job role</p>
                    </div>
                    <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6">
                      <Sparkles className="w-10 h-10 text-yellow-400 mx-auto mb-3" />
                      <h3 className="text-lg font-semibold text-white mb-2">Actionable Insights</h3>
                      <p className="text-blue-200 text-sm">Receive specific recommendations to improve your resume</p>
                    </div>
                  </motion.div>
                </div>
              )}

              <ProfileSelector 
                selectedProfile={selectedProfile}
                onSelectProfile={setSelectedProfile}
              />

              {selectedProfile && (
                <EnhancedResumeUpload 
                  onAnalyze={handleAnalyze}
                  selectedProfile={selectedProfile}
                />
              )}
            </motion.div>
          )}

          {isAnalyzing && <LoadingAnimation />}

          {showResults && analysis && (
            <EnhancedAnalysisResults analysis={analysis} onReset={handleReset} />
          )}
        </main>
      </div>
    </div>
  );
}

// Enhanced mock analysis generator with profile-based insights
function generateProfileBasedAnalysis(resumeText: string, profileId: string, fileName?: string): ResumeAnalysis {
  const profile = jobProfiles.find(p => p.id === profileId);
  const skills = extractSkills(resumeText, profile?.skills || []);
  const experience = extractExperience(resumeText);
  
  return {
    name: "John Doe",
    email: "john.doe@email.com",
    phone: "+1 (555) 123-4567",
    skills,
    experience,
    education: [
      {
        degree: "Bachelor of Computer Science",
        institute: "Tech University",
        year: "2020"
      }
    ],
    certifications: getRelevantCertifications(profileId),
    total_experience_years: calculateExperience(experience),
    resume_score: calculateScore(skills, experience, profile),
    profile_match_score: calculateProfileMatch(skills, profile),
    missing_skills: getMissingSkills(skills, profile),
    job_fit_roles: getJobFitRoles(profileId),
    recommendations: generateProfileRecommendations(profileId, skills),
    selected_profile: profileId
  };
}

function extractSkills(text: string, profileSkills: string[]): string[] {
  const allSkills = [
    "JavaScript", "React", "Node.js", "Python", "Java", "HTML", "CSS", 
    "Git", "SQL", "MongoDB", "Express", "Vue.js", "Angular", "PHP",
    "Docker", "Kubernetes", "AWS", "Azure", "TypeScript", "GraphQL",
    "Machine Learning", "TensorFlow", "Pandas", "R", "Statistics",
    "Figma", "Adobe XD", "Sketch", "Prototyping", "User Research",
    "SEO", "Google Analytics", "Digital Marketing", "Content Marketing"
  ];
  
  const foundSkills = allSkills.filter(skill => 
    text.toLowerCase().includes(skill.toLowerCase())
  );
  
  // Prioritize profile-relevant skills
  const profileRelevantSkills = foundSkills.filter(skill =>
    profileSkills.some(pSkill => pSkill.toLowerCase().includes(skill.toLowerCase()))
  );
  
  return [...profileRelevantSkills, ...foundSkills.filter(s => !profileRelevantSkills.includes(s))].slice(0, 8);
}

function calculateProfileMatch(skills: string[], profile?: any): number {
  if (!profile) return 70;
  
  const matchingSkills = skills.filter(skill =>
    profile.skills.some((pSkill: string) => pSkill.toLowerCase().includes(skill.toLowerCase()))
  );
  
  const matchPercentage = (matchingSkills.length / profile.skills.length) * 100;
  return Math.min(Math.max(matchPercentage, 60), 95);
}

function getMissingSkills(skills: string[], profile?: any): string[] {
  if (!profile) return ["Docker", "Kubernetes", "GraphQL", "TypeScript"];
  
  return profile.skills.filter((pSkill: string) =>
    !skills.some(skill => skill.toLowerCase().includes(pSkill.toLowerCase()))
  ).slice(0, 4);
}

function getRelevantCertifications(profileId: string): string[] {
  const certificationMap: Record<string, string[]> = {
    'software-engineer': ["AWS Certified Developer", "Google Cloud Professional"],
    'data-scientist': ["Google Data Analytics", "AWS Machine Learning"],
    'frontend-developer': ["React Developer Certification", "Google UX Design"],
    'backend-developer': ["AWS Solutions Architect", "MongoDB Certified"],
    'devops-engineer': ["AWS DevOps Engineer", "Kubernetes Administrator"],
    'ui-ux-designer': ["Google UX Design", "Adobe Certified Expert"],
    'product-manager': ["Google Project Management", "Scrum Master"],
    'marketing-manager': ["Google Ads Certified", "HubSpot Marketing"],
    'cybersecurity-analyst': ["CISSP", "CompTIA Security+"],
    'mobile-developer': ["Google Associate Android Developer", "Apple iOS Developer"]
  };
  
  return certificationMap[profileId] || ["Professional Certification", "Industry Certification"];
}

function getJobFitRoles(profileId: string): string[] {
  const roleMap: Record<string, string[]> = {
    'software-engineer': ["Full Stack Developer", "Software Engineer", "Backend Developer"],
    'data-scientist': ["Data Scientist", "Machine Learning Engineer", "Data Analyst"],
    'frontend-developer': ["Frontend Developer", "React Developer", "UI Developer"],
    'backend-developer': ["Backend Developer", "API Developer", "Server Engineer"],
    'devops-engineer': ["DevOps Engineer", "Cloud Engineer", "Site Reliability Engineer"],
    'ui-ux-designer': ["UI/UX Designer", "Product Designer", "User Experience Designer"],
    'product-manager': ["Product Manager", "Product Owner", "Strategy Manager"],
    'marketing-manager': ["Marketing Manager", "Digital Marketing Specialist", "Growth Manager"],
    'cybersecurity-analyst': ["Security Analyst", "Cybersecurity Specialist", "Information Security"],
    'mobile-developer': ["Mobile Developer", "iOS Developer", "Android Developer"]
  };
  
  return roleMap[profileId] || ["Software Developer", "Technical Specialist", "IT Professional"];
}

function generateProfileRecommendations(profileId: string, skills: string[]): string {
  const profile = jobProfiles.find(p => p.id === profileId);
  
  return `1. **Enhance ${profile?.title} Skills**: Focus on mastering ${profile?.skills.slice(0, 3).join(', ')} to align better with industry standards and increase your competitiveness.

2. **Quantify Your Impact**: Add specific metrics and achievements to your experience section. For ${profile?.title} roles, employers value measurable results like performance improvements, user growth, or cost savings.

3. **Build Relevant Projects**: Create a portfolio showcasing projects that demonstrate your expertise in ${profile?.skills.slice(0, 2).join(' and ')}. Include live demos and detailed case studies.

4. **Industry Certifications**: Pursue certifications relevant to ${profile?.title} roles to validate your expertise and show commitment to professional development.

5. **Optimize for ATS**: Ensure your resume includes relevant keywords for ${profile?.title} positions and follows a clean, scannable format that passes through Applicant Tracking Systems.`;
}

function extractExperience(text: string): any[] {
  return [
    {
      company: "Tech Corp",
      role: "Software Developer",
      duration: "2021 - Present",
      description: "Developed web applications using React and Node.js"
    },
    {
      company: "StartupXYZ",
      role: "Junior Developer",
      duration: "2020 - 2021",
      description: "Built responsive websites and mobile applications"
    }
  ];
}

function calculateExperience(experience: any[]): number {
  return Math.max(1, Math.floor(Math.random() * 5) + 2);
}

function calculateScore(skills: string[], experience: any[], profile?: any): number {
  const baseScore = 65;
  const skillBonus = Math.min(skills.length * 3, 20);
  const expBonus = Math.min(experience.length * 5, 10);
  const profileBonus = profile ? 5 : 0;
  return Math.min(baseScore + skillBonus + expBonus + profileBonus, 92);
}

export default App;