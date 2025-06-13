export interface ResumeAnalysis {
  name: string;
  email: string;
  phone: string;
  skills: string[];
  experience: Experience[];
  education: Education[];
  certifications: string[];
  total_experience_years: number;
  resume_score: number;
  missing_skills: string[];
  profile_match_score: number;
  job_fit_roles: string[];
  recommendations: string;
  selected_profile?: string;
}

export interface Experience {
  company: string;
  role: string;
  duration: string;
  description: string;
}

export interface Education {
  degree: string;
  institute: string;
  year: string;
}

export interface JobProfile {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  skills: string[];
}