import React, { createContext, useContext, useState, ReactNode } from 'react';

interface Candidate {
  id: string;
  name: string;
  catContent: string;
  timestamp: string;
}

interface ResumeContextType {
  candidates: Candidate[];
  addCandidate: (candidate: Candidate) => void;
}

const ResumeContext = createContext<ResumeContextType | undefined>(undefined);

export const ResumeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [candidates, setCandidates] = useState<Candidate[]>([]);

  const addCandidate = (candidate: Candidate) => {
    setCandidates(prev => [...prev, candidate]);
  };

  return (
    <ResumeContext.Provider value={{ candidates, addCandidate }}>
      {children}
    </ResumeContext.Provider>
  );
};

export const useResume = () => {
  const context = useContext(ResumeContext);
  if (context === undefined) {
    throw new Error('useResume must be used within a ResumeProvider');
  }
  return context;
}; 