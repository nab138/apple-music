import { useState, useEffect } from "react";

const useMusic = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMusic = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const musicKitInstance = MusicKit.getInstance();

        // Ensure the user is authorized
        if (!musicKitInstance.isAuthorized) {
          await musicKitInstance.authorize();
        }
      } catch (err: any) {
        setError(err.message || "An error occurred");
      } finally {
        setIsLoading(false);
      }
    };

    fetchMusic();
  }, []);

  return { isLoading, error };
};

export default useMusic;
