import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as motion from "motion/react-client";

interface PlanProps {
  name: string;
  price: string;
  features: string[];
}

const PlanCard: React.FC<
  PlanProps & { isHovered: boolean; onHover: () => void; onLeave: () => void }
> = ({ name, price, features, isHovered, onHover, onLeave }) => {
  const navigate = useNavigate();
  const baseClasses =
    "flex flex-col p-6 rounded-lg transition-colors duration-300 h-full";
  const textClasses = isHovered ? "text-white" : "text-black";
  const bgClasses = isHovered ? "bg-black" : "bg-white";

  return (
    <motion.div
      initial={{ y: 200, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      transition={{ duration: 1, ease: "easeInOut" }}
      className={`${baseClasses} items-center ${bgClasses}`}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
    >
      <h3 className={`text-2xl  font-bold mb-4 ${textClasses}`}>{name}</h3>
      <p className={`text-4xl font-bold mb-6 ${textClasses}`}>{price}</p>
      <ul className="flex-grow mb-6 list-disc">
        {features.map((feature, index) => (
          <li key={index} className={`mb-2 ${textClasses}`}>
            {feature}
          </li>
        ))}
      </ul>
      <button
        onClick={() => navigate("/signup")}
        className={`w-full btn-base ${
          isHovered
            ? "bg-white text-black hover:bg-gray-200"
            : "bg-black text-white hover:bg-gray-800"
        }`}
      >
        {name === "Free" ? "Try Now" : "Get Started"}
      </button>
    </motion.div>
  );
};

export const PricingPlans: React.FC = () => {
  const [hoveredPlan, setHoveredPlan] = useState<number | null>(null);

  const plans: PlanProps[] = [
    {
      name: "Free",
      price: "$0/mo",
      features: ["2 free spaes", "Limited Storage", "Default styling"],
    },
    {
      name: "Starter",
      price: "$5/mo",
      features: ["Unlimited spaces", "50GB storage", "Customizable tag"],
    },
    {
      name: "Premium",
      price: "$10/mo",
      features: ["All features", "Analytics", "1TB storage"],
    },
  ];

  return (
    <section className="py-12 px-4 md:px-8 bg-transparent">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1, ease: "easeInOut" }}
          className="text-3xl md:text-6xl font-bold text-center mb-12"
        >
          Choose Your Plan
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <PlanCard
              key={index}
              {...plan}
              isHovered={hoveredPlan === index}
              onHover={() => setHoveredPlan(index)}
              onLeave={() => setHoveredPlan(null)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
