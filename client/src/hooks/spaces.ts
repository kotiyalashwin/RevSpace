import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Space } from "../pages/Spaces";

const SERVER = import.meta.env.VITE_SERVER;

type respone = {
  success: true;
  spaces: Space[];
  error?: string;
};

const useSpaces = (): { isLoading: boolean; spacesData: Space[] } => {
  const [isLoading, setIsLoading] = useState(true);
  const [spacesData, setSpaces] = useState<Space[]>([]);

  useEffect(() => {
    const getSpaces = async () => {
      try {
        const response = await axios.get<respone>(`${SERVER}/api/v1/space/spaces`, {
          withCredentials: true,
        });

        const data = response.data;

        if (data.success) {
          setSpaces(data.spaces);
          // console.log(data.spaces);
        } else {
          toast.error("Unable to fetch Spaces");
        }
      } catch {
        toast.error("Unable to fetch Spaces");
      } finally {
        setIsLoading(false);
      }
    };

    getSpaces();
  }, []);

  return { isLoading, spacesData };
};

export default useSpaces;
