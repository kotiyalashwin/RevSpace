import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Space } from "../pages/Spaces";

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
        const url =
          "http://ec2-13-48-42-141.eu-north-1.compute.amazonaws.com:8080/api/v1/space/spaces";
        const response = await axios.get<respone>(url, {
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
