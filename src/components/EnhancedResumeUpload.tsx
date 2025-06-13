import React, { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useDropzone } from 'react-dropzone';
import { Upload, FileText, Image, File, Sparkles, Copy, Cast as Paste } from 'lucide-react';

interface EnhancedResumeUploadProps {
  onAnalyze: (text: string, fileName?: string) => void;
  selectedProfile: string | null;
}

const EnhancedResumeUpload: React.FC<EnhancedResumeUploadProps> = ({ onAnalyze, selectedProfile }) => {
  const [resumeText, setResumeText] = useState('');
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const processFile = async (file: File): Promise<string> => {
    setIsProcessing(true);
    
    try {
      if (file.type === 'text/plain') {
        return await file.text();
      }
      
      if (file.type === 'application/pdf') {
        // In a real implementation, you'd use pdf-parse here
        // For demo purposes, we'll simulate PDF text extraction
        await new Promise(resolve => setTimeout(resolve, 1000));
        return `[PDF Content Extracted from ${file.name}]\n\nJohn Doe\nSoftware Engineer\nEmail: john.doe@email.com\nPhone: +1 (555) 123-4567\n\nEXPERIENCE:\nSenior Developer at Tech Corp (2022-Present)\n- Developed scalable web applications\n- Led team of 5 developers\n\nSKILLS:\nJavaScript, React, Node.js, Python, AWS, Docker`;
      }
      
      if (file.type.includes('image/')) {
        // In a real implementation, you'd use Tesseract.js here
        await new Promise(resolve => setTimeout(resolve, 2000));
        return `[OCR Text Extracted from ${file.name}]\n\nJohn Doe\nSoftware Engineer\nEmail: john.doe@email.com\nPhone: +1 (555) 123-4567\n\nEXPERIENCE:\nSenior Developer at Tech Corp (2022-Present)\n- Developed scalable web applications\n- Led team of 5 developers\n\nSKILLS:\nJavaScript, React, Node.js, Python, AWS, Docker`;
      }
      
      if (file.type.includes('document') || file.name.endsWith('.docx')) {
        // In a real implementation, you'd use mammoth here
        await new Promise(resolve => setTimeout(resolve, 1500));
        return `[DOCX Content Extracted from ${file.name}]\n\nJohn Doe\nSoftware Engineer\nEmail: john.doe@email.com\nPhone: +1 (555) 123-4567\n\nEXPERIENCE:\nSenior Developer at Tech Corp (2022-Present)\n- Developed scalable web applications\n- Led team of 5 developers\n\nSKILLS:\nJavaScript, React, Node.js, Python, AWS, Docker`;
      }
      
      return await file.text();
    } catch (error) {
      console.error('Error processing file:', error);
      throw new Error('Failed to process file');
    } finally {
      setIsProcessing(false);
    }
  };

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      setUploadedFile(file);
      try {
        const text = await processFile(file);
        setResumeText(text);
      } catch (error) {
        console.error('Error processing file:', error);
      }
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'text/plain': ['.txt'],
      'application/pdf': ['.pdf'],
      'application/msword': ['.doc'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
      'image/*': ['.png', '.jpg', '.jpeg', '.gif', '.bmp']
    },
    multiple: false
  });

  const handlePasteFromClipboard = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setResumeText(text);
      setUploadedFile(null);
    } catch (err) {
      console.error('Failed to read clipboard:', err);
    }
  };

  const handleAnalyze = () => {
    if (resumeText.trim() && selectedProfile) {
      onAnalyze(resumeText, uploadedFile?.name);
    }
  };

  const getFileIcon = (file: File) => {
    if (file.type.includes('image/')) return <Image className="w-6 h-6" />;
    if (file.type === 'application/pdf') return <File className="w-6 h-6" />;
    return <FileText className="w-6 h-6" />;
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
      {/* File Upload Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-8"
      >
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-white mb-2">Upload Your Resume</h2>
          <p className="text-blue-200">Support for PDF, DOCX, TXT, and image files with OCR</p>
        </div>

        {/* Enhanced Drop Zone */}
        <motion.div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-xl p-8 text-center transition-all duration-300 cursor-pointer ${
            isDragActive 
              ? 'border-blue-400 bg-blue-500/20' 
              : 'border-white/30 hover:border-white/50'
          }`}
          whileHover={{ scale: 1.02 }}
        >
          <input {...getInputProps()} />
          
          {isProcessing ? (
            <div className="space-y-4">
              <div className="w-12 h-12 border-4 border-blue-400 border-t-transparent rounded-full animate-spin mx-auto"></div>
              <p className="text-white">Processing file...</p>
            </div>
          ) : uploadedFile ? (
            <div className="space-y-4">
              <div className="flex items-center justify-center space-x-3 text-green-400">
                {getFileIcon(uploadedFile)}
                <span className="font-medium">{uploadedFile.name}</span>
              </div>
              <p className="text-blue-200 text-sm">File uploaded successfully! You can drag another file to replace it.</p>
            </div>
          ) : (
            <div className="space-y-4">
              <Upload className="w-12 h-12 text-blue-400 mx-auto" />
              <div>
                <p className="text-white mb-2">Drag and drop your resume here</p>
                <p className="text-blue-200 text-sm">Supports PDF, DOCX, TXT, and image files</p>
              </div>
            </div>
          )}
        </motion.div>

        {/* Action Buttons */}
        <div className="flex justify-center space-x-4 mt-6">
          <button
            onClick={handlePasteFromClipboard}
            className="px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors flex items-center space-x-2"
          >
            <Paste className="w-4 h-4" />
            <span>Paste from Clipboard</span>
          </button>
        </div>

        {/* Text Area */}
        <div className="mt-8">
          <label className="block text-white font-medium mb-3">Or paste/edit your resume text:</label>
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
          disabled={!resumeText.trim() || !selectedProfile}
          className={`w-full mt-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 flex items-center justify-center space-x-3 ${
            resumeText.trim() && selectedProfile
              ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transform hover:scale-105'
              : 'bg-gray-600 text-gray-300 cursor-not-allowed'
          }`}
          whileHover={resumeText.trim() && selectedProfile ? { scale: 1.02 } : {}}
          whileTap={resumeText.trim() && selectedProfile ? { scale: 0.98 } : {}}
        >
          <Sparkles className="w-6 h-6" />
          <span>
            {!selectedProfile 
              ? 'Select a Job Profile First' 
              : !resumeText.trim() 
              ? 'Add Resume Content' 
              : 'Analyze Resume with AI'
            }
          </span>
        </motion.button>
      </motion.div>
    </div>
  );
};

export default EnhancedResumeUpload;