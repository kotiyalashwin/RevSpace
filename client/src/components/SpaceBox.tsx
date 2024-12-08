import { BookPlus } from "lucide-react";

type SpaceBoxProps = {
  setIsOpen: (v: boolean) => void;
};

function SpaceBox({ setIsOpen }: SpaceBoxProps) {
  return (
    <div
      className="rounded-xl p-6 mt-4 max-w-[80%]"
      style={{
        backgroundColor: "rgba(95, 72, 162, 0.15)",
        backdropFilter: "blur(12px)",
        border: "1px solid rgba(1, 168, 164, 0.1)",
      }}
    >
      <header className="flex justify-between ">
        <h2 className="text-lg md:text-3xl font-semibold text-white mb-4">
          Spaces
        </h2>
        <button className="text-white mb-4" onClick={() => setIsOpen(true)}>
          <BookPlus size={28} />
        </button>
      </header>
      <div className="h-40 md:text-md flex items-center justify-center text-white/60">
        No Spaces Created
      </div>
    </div>
  );
}

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
