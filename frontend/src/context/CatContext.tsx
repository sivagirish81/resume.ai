import React, { createContext, useContext, useState, useEffect } from 'react';
import CatService, { CatImage } from '../services/catService';

interface CatContextType {
  cats: CatImage[];
  isLoading: boolean;
  error: string | null;
  refreshCats: () => Promise<void>;
}

const CatContext = createContext<CatContextType | undefined>(undefined);

export const CatProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cats, setCats] = useState<CatImage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadCats = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const catService = CatService.getInstance();
      const newCats = await catService.getCats(12);
      setCats(newCats);
    } catch (error) {
      console.error('Error loading cats:', error);
      setError('Failed to load cats. Using fallback images.');
      // Set fallback cats
      setCats(Array(12).fill(null).map(() => ({
        url: 'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f431.svg',
        id: Math.random().toString(36).substring(7),
      })));
    } finally {
      setIsLoading(false);
    }
  };

  const refreshCats = async () => {
    const catService = CatService.getInstance();
    catService.clearCache();
    await loadCats();
  };

  useEffect(() => {
    loadCats();
  }, []);

  return (
    <CatContext.Provider value={{ cats, isLoading, error, refreshCats }}>
      {children}
    </CatContext.Provider>
  );
};

export const useCats = () => {
  const context = useContext(CatContext);
  if (context === undefined) {
    throw new Error('useCats must be used within a CatProvider');
  }
  return context;
}; 