import React from "react";
import { Trash2, ExternalLink } from "lucide-react";

interface Testimonial {
  name: string;
  testimonials: number;
  link: string;
}

const sampleTestimonials: Testimonial[] = [
  { name: "John Doe", testimonials: 5, link: "/john-doe" },
  { name: "Jane Smith", testimonials: 3, link: "/jane-smith" },
  { name: "Alice Johnson", testimonials: 7, link: "/alice-johnson" },
  { name: "Bob Williams", testimonials: 2, link: "/bob-williams" },
  { name: "Eva Brown", testimonials: 4, link: "/eva-brown" },
];

const SpaceCards: React.FC<Testimonial & { onDelete: () => void }> = ({
  name,
  testimonials,
  link,
  onDelete,
}) => (
  <div className="bg-white border border-gray-200 rounded-lg p-6 mb-4 transition-all duration-300 hover:shadow-lg">
    <h2 className="text-xl font-semibold mb-2 text-black">{name}</h2>
    <p className="text-gray-600 mb-4">Testimonials: {testimonials}</p>
    <div className="flex justify-between">
      <button
        onClick={() => window.open(link, "_blank")}
        className="bg-black hover:bg-gray-800 text-white font-bold py-2 px-4 rounded transition-colors duration-300 flex items-center"
      >
        <ExternalLink size={18} className="mr-2" />
        View Form
      </button>
      <button
        onClick={onDelete}
        className="bg-white hover:bg-gray-100 text-black font-bold py-2 px-4 rounded transition-colors duration-300 border border-black flex items-center"
      >
        <Trash2 size={18} className="mr-2" />
        Delete
      </button>
    </div>
  </div>
);

const Spaces: React.FC = () => {
  const [testimonials, setTestimonials] =
    React.useState<Testimonial[]>(sampleTestimonials);

  const handleDelete = (index: number) => {
    setTestimonials(testimonials.filter((_, i) => i !== index));
  };

  return (
    <div className="container mx-auto px-4 py-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center text-black">
        Testimonial Cards
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {testimonials.map((testimonial, index) => (
          <SpaceCards
            key={index}
            {...testimonial}
            onDelete={() => handleDelete(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default Spaces;

// return <div className="bg-black h-screen w-full"></div>;
