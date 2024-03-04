import { useState, useEffect } from 'react';

const useFetchReadme = (repo) => {
  const [readmeContent, setReadmeContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReadme = async () => {
      setIsLoading(true);
      try {
        const url = `https://api.github.com/repos/${repo}/readme`;
        
        // process.env -> import.meta.env (React + Vite)
        const username = import.meta.env.REACT_APP_GITHUB_USERNAME; 
        const token = import.meta.env.REACT_APP_GITHUB_TOKEN;
        
        const authString = `${username}:${token}`;
        const encodedAuth = btoa(authString);

        const response = await fetch(url, {
          headers: {
            'Authorization': `Basic ${encodedAuth}`
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch README');
        }

        const data = await response.json();
        const readmeContentDecoded = atob(data.content);
        setReadmeContent(readmeContentDecoded);
      } catch (err) {
        setError(err.toString());
      } finally {
        setIsLoading(false);
      }
    };

    fetchReadme();
  }, [repo]);

  return { readmeContent, isLoading, error };
};

export default useFetchReadme;
