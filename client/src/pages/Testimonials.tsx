import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, MessageSquare, Video, FileText } from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const SERVER = import.meta.env.VITE_SERVER;

interface Space {
  id: number;
  spacename: string;
  description: string;
  link: string;
  _count?: {
    testimonials: number;
  };
}

function Testimonials() {
  const navigate = useNavigate();
  const [spaces, setSpaces] = useState<Space[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSpaces = async () => {
      try {
        const response = await axios.get(`${SERVER}/api/v1/space/spaces`, {
          withCredentials: true,
        });
        setSpaces(response.data.spaces || []);
      } catch {
        toast.error("Failed to load products");
        navigate("/dashboard");
      } finally {
        setLoading(false);
      }
    };

    fetchSpaces();
  }, [navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center gap-4">
          <button
            onClick={() => navigate("/dashboard")}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft size={24} />
          </button>
          <div>
            <h1 className="text-2xl font-bold">Testimonials</h1>
            <p className="text-gray-500 text-sm">
              View and embed testimonials for your products
            </p>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {spaces.length === 0 ? (
          <div className="text-center py-16">
            <MessageSquare className="mx-auto text-gray-300 mb-4" size={64} />
            <h2 className="text-xl font-medium text-gray-600 mb-2">
              No products yet
            </h2>
            <p className="text-gray-500 mb-4">
              Create a space in your dashboard to start collecting testimonials
            </p>
            <button
              onClick={() => navigate("/dashboard")}
              className="bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-800"
            >
              Go to Dashboard
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {spaces.map((space) => (
              <Card
                key={space.id}
                className="hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => navigate(`/testimonials/${space.link}`)}
              >
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>{space.spacename}</span>
                    <MessageSquare size={20} className="text-gray-400" />
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {space.description && (
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      {space.description}
                    </p>
                  )}
                  <button
                    className="w-full bg-black text-white py-2 px-4 rounded-lg hover:bg-gray-800 transition-colors"
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/testimonials/${space.link}`);
                    }}
                  >
                    View Testimonials
                  </button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

export default Testimonials;
