import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Upload, FileText, Sparkles, Copy, Cast as Paste } from 'lucide-react';

interface ResumeUploadProps {
  onAnalyze: (text: string) => void;
}

const ResumeUpload: React.FC<ResumeUploadProps> = ({ onAnalyze }) => {
  const [resumeText, setResumeText] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = Array.from(e.dataTransfer.files);
    const textFile = files.find(file => file.type === 'text/plain');
    
    if (textFile) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const text = e.target?.result as string;
        setResumeText(text);
      };
      reader.readAsText(textFile);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type === 'text/plain') {
      const reader = new FileReader();
      reader.onload = (e) => {
        const text = e.target?.result as string;
        setResumeText(text);
      };
      reader.readAsText(file);
    }
  };

  const handlePasteFromClipboard = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setResumeText(text);
    } catch (err) {
      console.error('Failed to read clipboard:', err);
    }
  };

  const handleAnalyze = () => {
    if (resumeText.trim()) {
      onAnalyze(resumeText);
    }
  };

  const sampleResume = `John Doe
Software Engineer
Email: john.doe@email.com
Phone: +1 (555) 123-4567

PROFESSIONAL SUMMARY
Experienced Full Stack Developer with 4+ years of experience in developing scalable web applications using modern technologies. Proficient in React, Node.js, Python, and cloud technologies.

TECHNICAL SKILLS
• Frontend: React, JavaScript, TypeScript, HTML5, CSS3, Vue.js
• Backend: Node.js, Python, Express.js, RESTful APIs
• Databases: MongoDB, PostgreSQL, MySQL
• Tools: Git, Docker, AWS, Linux, Agile/Scrum

WORK EXPERIENCE

Senior Software Developer | Tech Solutions Inc. | 2022 - Present
• Developed and maintained 5+ web applications serving 100k+ users
• Improved application performance by 40% through code optimization
• Led a team of 3 junior developers on key projects
• Implemented CI/CD pipelines reducing deployment time by 60%

Software Developer | StartupXYZ | 2020 - 2022
• Built responsive web applications using React and Node.js
• Collaborated with cross-functional teams to deliver projects on time
• Integrated third-party APIs and payment systems
• Mentored 2 junior developers

EDUCATION
Bachelor of Science in Computer Science
State University | 2020

CERTIFICATIONS
• AWS Certified Solutions Architect
• Google Cloud Professional Developer`;

  return (
    <div className="space-y-8">
      {/* Upload Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-8"
      >
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-white mb-2">Upload Your Resume</h2>
          <p className="text-blue-200">Paste your resume text or upload a file to get started</p>
        </div>

        {/* File Drop Zone */}
        <motion.div
          className={`border-2 border-dashed rounded-xl p-8 text-center transition-all duration-300 ${
            isDragging 
              ? 'border-blue-400 bg-blue-500/20' 
              : 'border-white/30 hover:border-white/50'
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          whileHover={{ scale: 1.02 }}
        >
          <Upload className="w-12 h-12 text-blue-400 mx-auto mb-4" />
          <p className="text-white mb-2">Drag and drop your resume file here</p>
          <p className="text-blue-200 text-sm mb-4">or</p>
          
          <div className="flex justify-center space-x-4">
            <button
              onClick={() => fileInputRef.current?.click()}
              className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
            >
              Choose File
            </button>
            <button
              onClick={handlePasteFromClipboard}
              className="px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors flex items-center space-x-2"
            >
              <Paste className="w-4 h-4" />
              <span>Paste from Clipboard</span>
            </button>
          </div>
          
          <input
            ref={fileInputRef}
            type="file"
            accept=".txt"
            onChange={handleFileSelect}
            className="hidden"
          />
        </motion.div>

        {/* Text Area */}
        <div className="mt-6">
          <label className="block text-white font-medium mb-3">Or paste your resume text:</label>
          <textarea
            value={resumeText}
            onChange={(e) => setResumeText(e.target.value)}
            placeholder="Paste your resume content here..."
            className="w-full h-64 p-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-blue-200 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Sample Resume Button */}
        <div className="mt-4 text-center">
          <button
            onClick={() => setResumeText(sampleResume)}
            className="text-blue-400 hover:text-blue-300 text-sm underline transition-colors"
          >
            Use Sample Resume for Demo
          </button>
        </div>

        {/* Analyze Button */}
        <motion.button
          onClick={handleAnalyze}
          disabled={!resumeText.trim()}
          className={`w-full mt-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 flex items-center justify-center space-x-3 ${
            resumeText.trim()
              ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transform hover:scale-105'
              : 'bg-gray-600 text-gray-300 cursor-not-allowed'
          }`}
          whileHover={resumeText.trim() ? { scale: 1.02 } : {}}
          whileTap={resumeText.trim() ? { scale: 0.98 } : {}}
        >
          <Sparkles className="w-6 h-6" />
          <span>Analyze Resume with AI</span>
        </motion.button>
      </motion.div>
    </div>
  );
};

export default ResumeUpload;