import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';

const SectionHeading = ({ title }) => {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="mb-6 sm:mb-8 lg:mb-12 flex items-center space-x-3 sm:space-x-4">
      <h2 className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold ${resolvedTheme === 'dark' ? 'text-white' : 'text-black'}`}>
        {title}<span className="text-blue-500">.</span>
      </h2>
      
      {/* Horizontal line after the title */}
      <div className={`flex-1 h-px ${resolvedTheme === 'dark' ? 'border-gray-600/50' : 'border-gray-300/50'} opacity-50`}></div>
    </div>
  );
};

// AboutSection component with skill proficiency levels
const AboutSection = ({ aboutRef }) => {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Ensure component is mounted to avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  // Use resolvedTheme to ensure correct theme detection
  if (!mounted) return null;

  const expertSkills = {
    languages: ['C/C++', 'HTML', 'CSS', 'MySQL'],
    libraries: ['Pandas', 'NumPy', 'Scikit-learn', 'Matplotlib', 'Seaborn', 'Tableau', 'MATLAB'],
    concepts: ['OOP', 'Git/GitHub']
  };

  const moderateSkills = {
    languages: ['Python', 'JavaScript'],
    libraries: ['SFML', 'Streamlit'],
    concepts: ['Data Structures & Algorithms']
  };

  const learnerSkills = {
    languages: ['R'],
    libraries: ['TensorFlow', 'React', 'Next.js'],
    concepts: ['Dockers', 'Unreal']
  };

  const SkillCategory = ({ title, languages, libraries, concepts, levelColor, levelIcon }) => (
    <div className="mb-6 lg:mb-8">
      <div className="flex items-center mb-3 lg:mb-4">
        <div className={`w-5 h-5 lg:w-6 lg:h-6 ${levelColor} rounded mr-2 lg:mr-3 flex items-center justify-center`}>
          {levelIcon}
        </div>
        <h3 className={`text-lg sm:text-xl font-semibold ${resolvedTheme === 'dark' ? 'text-white' : 'text-black'}`}>{title}</h3>
      </div>
      
      <div className="flex flex-wrap gap-1.5 sm:gap-2">
        {languages?.map((skill, index) => (
          <span
            key={`lang-${index}`}
            className={`${
              resolvedTheme === 'dark' 
                ? 'bg-gray-800/70 border-gray-700/50 text-gray-300 hover:bg-gray-700/70' 
                : 'bg-gray-100/70 border-gray-300/50 text-gray-800 hover:bg-gray-200/70'
            } backdrop-blur-lg border px-2 py-1 sm:px-3 rounded-full text-xs sm:text-sm transition-colors`}
          >
            {skill}
          </span>
        ))}
        {libraries?.map((skill, index) => (
          <span
            key={`lib-${index}`}
            className={`${
              resolvedTheme === 'dark' 
                ? 'bg-gray-800/70 border-gray-700/50 text-gray-300 hover:bg-gray-700/70' 
                : 'bg-gray-100/70 border-gray-300/50 text-gray-800 hover:bg-gray-200/70'
            } backdrop-blur-lg border px-2 py-1 sm:px-3 rounded-full text-xs sm:text-sm transition-colors`}
          >
            {skill}
          </span>
        ))}
        {concepts?.map((skill, index) => (
          <span
            key={`concept-${index}`}
            className={`${
              resolvedTheme === 'dark' 
                ? 'bg-gray-800/70 border-gray-700/50 text-gray-300 hover:bg-gray-700/70' 
                : 'bg-gray-100/70 border-gray-300/50 text-gray-800 hover:bg-gray-200/70'
            } backdrop-blur-lg border px-2 py-1 sm:px-3 rounded-full text-xs sm:text-sm transition-colors`}
          >
            {skill}
          </span>
        ))}
      </div>
    </div>
  );

  return (
    <section
      ref={aboutRef}
      className={`pt-20 sm:pt-24 lg:pt-16 pb-8 sm:pb-12 lg:pb-16 px-4 sm:px-6 lg:px-8 ${resolvedTheme === 'dark' ? 'bg-black' : 'bg-white'}`}
      data-section="about"
    >
      <div className="max-w-4xl mx-auto">
        <SectionHeading title="About" />
        
        {/* Mobile-first layout: Stack content, then side-by-side on larger screens */}
        <div className="space-y-8 lg:space-y-0 lg:grid lg:grid-cols-3 lg:gap-8 lg:items-start">
          {/* Main content - full width on mobile, 2/3 on desktop */}
          <div className="lg:col-span-2 lg:pr-4">
            <div className="space-y-4 sm:space-y-6">
              <p className={`${resolvedTheme === 'dark' ? 'text-gray-300' : 'text-gray-800'} text-sm sm:text-base lg:text-lg leading-relaxed`}>
                Hey! I&apos;m Sidhart Sami, a Computer Science student at FAST NUCES, set to graduate in 2027. I&apos;m passionate about Data Science and transforming complex datasets into actionable insights that solve real-world problems.
              </p>
              <p className={`${resolvedTheme === 'dark' ? 'text-gray-300' : 'text-gray-800'} text-sm sm:text-base lg:text-lg leading-relaxed`}>
                Certified in Data Science by IBM and Google&apos;s Advanced Data Analytics, I&apos;ve grown from struggling with code to confidently helping friends debug complex issues. My love for gaming led me to build several games as semester projects, shaping my technical and creative skills.
              </p>
              <p className={`${resolvedTheme === 'dark' ? 'text-gray-300' : 'text-gray-800'} text-sm sm:text-base lg:text-lg leading-relaxed`}>
                Beyond coding, I&apos;m a chess enthusiast and sports analytics buff who geeks out over stats and team strategies. My goal is to pursue a Master&apos;s in Data Science and join a FAANG company, driving innovation through data.
              </p>
            </div>
          </div>
          
          {/* Skills section - full width on mobile, 1/3 on desktop */}
          <div className="lg:col-span-1 lg:sticky lg:top-8">
            {/* Add a subtle separator on mobile */}
            <div className={`lg:hidden border-t ${resolvedTheme === 'dark' ? 'border-gray-600/50' : 'border-gray-300/50'} pt-6 mb-2`}>
              <h3 className={`text-lg sm:text-xl font-semibold ${resolvedTheme === 'dark' ? 'text-white' : 'text-black'} mb-4`}>Technical Skills</h3>
            </div>
            
            {/* Expert Skills */}
            <SkillCategory 
              title="Expert" 
              languages={expertSkills.languages}
              libraries={expertSkills.libraries}
              concepts={expertSkills.concepts}
              levelColor="bg-green-500"
              levelIcon={
                <svg className="w-3 h-3 lg:w-4 lg:h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                </svg>
              }
            />
            
            {/* Moderate Skills */}
            <SkillCategory 
              title="Moderate" 
              languages={moderateSkills.languages}
              libraries={moderateSkills.libraries}
              concepts={moderateSkills.concepts}
              levelColor="bg-yellow-500"
              levelIcon={
                <svg className="w-3 h-3 lg:w-4 lg:h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd"/>
                </svg>
              }
            />
            
            {/* Learning Skills */}
            <SkillCategory 
              title="Learning" 
              languages={learnerSkills.languages}
              libraries={learnerSkills.libraries}
              levelColor="bg-orange-500"
              levelIcon={
                <svg className="w-3 h-3 lg:w-4 lg:h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 2L3 7v3h14V7l-7-5zM3 12v5a1 1 0 001 1h1v-4a1 1 0 011-1h6a1 1 0 011 1v4h1a1 1 0 001-1v-5H3z"/>
                </svg>
              }
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;