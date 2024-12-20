import React from "react";

const NotFound: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-800">
      <div className="text-6xl font-bold text-red-500 mb-4">404</div>
      <h1 className="text-4xl font-semibold mb-4">Page Not Found</h1>
      <p className="text-xl text-center mb-8 max-w-md">
        Oops! The page you're looking for doesn't exist or has been moved.
      </p>
      <a
        href="/"
        className="px-6 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors duration-300"
      >
        Back to Home
      </a>
    </div>
  );
};

export default NotFound;
