import React, { useEffect, useState } from "react";
import { Trash2, ExternalLink } from "lucide-react";
import useSpaces from "../hooks/spaces";

export interface Space {
  spacename: string;
  description: string;
  link: string;
  testimonials: [{}];
}

const SpaceCards = ({ spacename, link, testimonials }: Space) => (
  <div className="bg-white border border-gray-200 rounded-lg p-6 mb-4 transition-all duration-300 hover:shadow-lg">
    <h2 className="text-xl font-semibold mb-2 text-black">{spacename}</h2>
    <p className="text-gray-600 mb-4">Testimonials: {testimonials.length}</p>
    <div className="flex justify-between">
      <button
        onClick={() => window.open(`/testimonial/${link}`, "_blank")}
        className="bg-black hover:bg-gray-800 text-white font-bold py-2 px-4 rounded transition-colors duration-300 flex items-center"
      >
        <ExternalLink size={18} className="mr-2" />
        View Form
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

  useEffect(() => {
    if (!isLoading) {
      setSpaces(spacesData);
    }
  }, [isLoading, spacesData]);

  // const handleDelete = (index: number) => {
  //   setTestimonials(testimonials.filter((_, i) => i !== index));
  // };

  return (
    <div className="container mx-auto px-4 py-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center text-black">
        Testimonial Cards
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* @ts-ignore */}
        {spaces.map((testimonial, index) => (
          <SpaceCards key={index} {...testimonial} />
        ))}
      </div>
    </div>
  );
};

export default Spaces;

// return <div className="bg-black h-screen w-full"></div>;
