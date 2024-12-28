import axios from "axios";
import { useEffect, useState } from "react";

const useSession = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const checkSession = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/v1/user/session",
          {
            withCredentials: true,
          }
        );
        setIsAuthenticated(response.status === 200);
      } catch {
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkSession();
  }, []);

  return { isAuthenticated, isLoading };
};

export default useSession;
