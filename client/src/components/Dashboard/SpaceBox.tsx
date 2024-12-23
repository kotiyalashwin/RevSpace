import { BookPlus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import * as motion from "motion/react-client";

type SpaceBoxProps = {
  setIsOpen: (v: boolean) => void;
  spaces: spaces[];
};

type spaces = {
  spacename: string;
  description: string;
  link: string;
};

const variants = {
  hidden: {
    opacity: 0,
  },

  visible: {
    opacity: 100,
  },
};

function SpaceBox({ setIsOpen, spaces }: SpaceBoxProps) {
  const navigate = useNavigate();

  return (
    <motion.div
      variants={variants}
      initial="hidden"
      animate="visible"
      transition={{ duration: 1, ease: "easeIn" }}
      className="rounded-xl p-6 mt-4 max-w-[80%] bg-white border-2"
      style={{
        backdropFilter: "blur(12px)",
      }}
    >
      <header className="flex justify-between ">
        <h2 className="text-xl md:text-5xl font-semibold text-black mb-4">
          Spaces
        </h2>
        <button className="text-black mb-4" onClick={() => setIsOpen(true)}>
          <BookPlus size={28} />
        </button>
      </header>

      <div className="flex ">
        {spaces && spaces.length > 0 ? (
          spaces?.map((space) => {
            return (
              <SpaceCard
                navigate={navigate}
                spacename={space.spacename}
                description={space.description}
                link={space.link}
              />
            );
          })
        ) : (
          <div className="w-full text-neutral-500 flex text-xl text-center items-center justify-center">
            No Spaces Found.Create One
          </div>
        )}
      </div>
    </motion.div>
  );
}

interface spaceCardProps extends spaces {
  navigate: (path: string) => void;
}

const SpaceCard = ({
  spacename,
  description,
  link,
  navigate,
}: spaceCardProps) => (
  <div className="bg-white rounded-lg shadow-md p-4 m-2 w-64 border-2">
    <h2 className="text-xl font-bold mb-2">{spacename}</h2>
    {description && <p className="text-gray-600 mb-4">{description}</p>}
    <button
      onClick={() => navigate(`/testimonial/${link}`)}
      className="bg-black  text-white font-bold py-2 px-4 rounded"
    >
      View Form
    </button>
  </div>
);
{
  /* Form
          <form  className="space-y-4">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="Enter name"
                required
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="Enter email"
                required
              />
            </div>

            <div>
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-700"
              >
                Title
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="Enter title"
                required
              />
            </div>

            <div>
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700"
              >
                Description
              </label>
              <input
                type="text"
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="Enter description"
                required
              />
            </div>

            {/* Footer */
}

export default SpaceBox;
