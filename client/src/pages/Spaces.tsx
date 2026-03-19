import React, { useEffect, useState } from "react";
import { Trash2, ExternalLink, BarChart3 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import useSpaces from "../hooks/spaces";
import { PageLoader } from "../components/ui/loader";

export interface Space {
  spacename: string;
  description: string;
  link: string;
  testimonials: [{}];
}

const SpaceCards = ({ spacename, link, testimonials, onInsights }: Space & { onInsights: (link: string) => void }) => (
  <div className="bg-white border border-gray-200 rounded-lg p-6 mb-4 transition-all duration-300 hover:shadow-lg">
    <h2 className="text-xl font-semibold mb-2 text-black">{spacename}</h2>
    <p className="text-gray-600 mb-4">Testimonials: {testimonials.length}</p>
    <div className="flex flex-wrap gap-2">
      <button
        onClick={() => window.open(`/testimonial/${link}`, "_blank")}
        className="bg-black hover:bg-gray-800 text-white font-bold py-2 px-4 rounded transition-colors duration-300 flex items-center"
      >
        <ExternalLink size={18} className="mr-2" />
        View Form
      </button>
      <button
        onClick={() => onInsights(link)}
        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors duration-300 flex items-center"
      >
        <BarChart3 size={18} className="mr-2" />
        Insights
      </button>
      <button className="bg-white hover:bg-gray-100 text-black font-bold py-2 px-4 rounded transition-colors duration-300 border border-black flex items-center">
        <Trash2 size={18} className="mr-2" />
        Delete
      </button>
    </div>
  </div>
);

const Spaces: React.FC = () => {
  const [spaces, setSpaces] = useState<Space[]>([]);
  const { isLoading, spacesData } = useSpaces();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading) {
      setSpaces(spacesData);
    }
  }, [isLoading, spacesData]);

  const handleInsights = (link: string) => {
    navigate(`/insights/${link}`);
  };

  if (isLoading) {
    return <PageLoader text="Loading spaces..." />;
  }

  return (
    <div className="container mx-auto px-4 py-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center text-black">
        Your Spaces
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {spaces.map((space, index) => (
          <SpaceCards key={index} {...space} onInsights={handleInsights} />
        ))}
      </div>
    </div>
  );
};

export default Spaces;

// return <div className="bg-black h-screen w-full"></div>;
