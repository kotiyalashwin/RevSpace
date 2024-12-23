import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className="bg-gray-100 text-gray-600 py-12 px-4 border-t-4 border-black">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="col-span-1 md:col-span-2">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">RevSpace</h2>
          <p className="mb-4">
            Empowering your digital journey with innovative solutions.
          </p>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li>
              <Link to={"#"} className="hover:text-gray-800">
                Home
              </Link>
            </li>
            <li>
              <Link to={"#"} className="hover:text-gray-800">
                Product
              </Link>
            </li>
            <li>
              <Link to={"#"} className="hover:text-gray-800">
                Pricing
              </Link>
            </li>
            <li>
              <Link to={"#"} className="hover:text-gray-800">
                Contact
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
          <ul className="space-y-2">
            <li>contactsupport@gmail.com</li>
          </ul>
        </div>
      </div>
      <div className="max-w-6xl mx-auto mt-8 pt-8 border-t border-gray-200 text-center">
        <p>&copy; 2023 RevSpace. All rights reserved.</p>
      </div>
    </footer>
  );
};
