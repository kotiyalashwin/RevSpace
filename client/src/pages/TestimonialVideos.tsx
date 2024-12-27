import axios from "axios";
import { useEffect, useState } from "react";
import CopyCodeButton from "../components/Testimonial/CopyCodeButton";

type Testimonials = {
  id: string;
  email: string;
  v_url: string;
};

export default function TestimonialVideos() {
  const [testimonials, setTestimonials] = useState<Testimonials[]>();

  const getTestimonials = async () => {
    const response = await axios.get(
      "http://localhost:3000/api/v1/testimonial/testimonials",
      {
        withCredentials: true,
      }
    );

    const data = await response.data;
    // @ts-ignore
    setTestimonials(data);
  };

  useEffect(() => {
    getTestimonials();
  }, []);
  return (
    <div className="max-w-7xl min-h-screen  p-8">
      <h1 className="text-4xl font-bold mb-8 text-center text-black">
        Customer Testimonials
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {testimonials &&
          testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-white text-black rounded-lg overflow-hidden shadow-lg"
            >
              <video
                className="w-full h-48 object-cover"
                src={testimonial.v_url}
                controls
              >
                Your browser does not support the video tag.
              </video>
              <div className="p-4">
                <h2 className="text-xl font-semibold">{testimonial.email}</h2>
              </div>

              <CopyCodeButton
                code={`<iframe 
            src="${testimonial.v_url}" 
            title="Video Player" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
            allowfullscreen>
        </iframe>`}
              />
            </div>
          ))}
      </div>
    </div>
  );
}
