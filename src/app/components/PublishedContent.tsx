import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { ArrowLeft, Trash2, Tv, Calendar, MapPin } from "lucide-react";

type ContentData = {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  date: string;
  location: string;
  layout: string;
  publishedAt: string;
};

export function PublishedContent() {
  const [allContent, setAllContent] = useState<ContentData[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedContent = localStorage.getItem("publishedContent");
    if (storedContent) {
      setAllContent(JSON.parse(storedContent));
    }
  }, []);

  const handleDelete = (id: string) => {
    const updated = allContent.filter((c) => c.id !== id);
    setAllContent(updated);
    localStorage.setItem("publishedContent", JSON.stringify(updated));
  };

  const layoutColors: { [key: string]: string } = {
    "modern-grid": "from-purple-500 to-pink-500",
    "hero-focus": "from-blue-600 to-cyan-500",
    "split-screen": "from-orange-500 to-red-500",
    "timeline": "from-teal-500 to-green-500",
    "minimalist": "from-gray-400 to-gray-600",
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 p-3 md:p-6">
      <div className="max-w-7xl mx-auto space-y-3 md:space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2 md:gap-4">
            <Button
              variant="outline"
              onClick={() => navigate("/")}
              size="icon"
              className="border-white/30 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white h-9 w-9 md:h-10 md:w-10"
            >
              <ArrowLeft className="w-4 h-4 md:w-5 md:h-5" />
            </Button>
            <div>
              <h1 className="text-2xl md:text-4xl font-bold text-white">Content Library</h1>
              <p className="text-purple-100 text-xs md:text-sm">
                {allContent.length} published layout{allContent.length !== 1 ? "s" : ""}
              </p>
            </div>
          </div>
          <Button
            onClick={() => navigate("/tv-display")}
            className="w-full sm:w-auto bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white shadow-lg h-9 md:h-11 text-xs md:text-sm"
          >
            <Tv className="w-3 h-3 md:w-4 md:h-4 mr-1 md:mr-2" />
            View TV Display
          </Button>
        </div>

        {allContent.length === 0 ? (
          <Card className="p-8 md:p-12 text-center bg-white/95 backdrop-blur-sm">
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-3 md:mb-4">No Content Yet</h2>
            <p className="text-sm md:text-base text-gray-600 mb-4 md:mb-6">Create your first AI-generated layout to get started</p>
            <Button
              onClick={() => navigate("/")}
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 h-10 md:h-11"
            >
              Create Layout
            </Button>
          </Card>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6">
            {allContent.map((content) => (
              <Card key={content.id} className="overflow-hidden bg-white/95 backdrop-blur-sm hover:shadow-2xl transition-all">
                <div className={`h-40 md:h-48 bg-gradient-to-br ${layoutColors[content.layout] || "from-gray-400 to-gray-600"} p-4 md:p-6 flex items-center justify-center`}>
                  <div className="text-center">
                    <h3 className="text-lg md:text-2xl font-bold text-white mb-1 md:mb-2 line-clamp-2">{content.title}</h3>
                    <p className="text-xs md:text-sm text-white/90 line-clamp-1">{content.subtitle}</p>
                  </div>
                </div>
                
                <div className="p-3 md:p-5 space-y-2 md:space-y-4">
                  <div className="flex items-center justify-between">
                    <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0 text-[10px] md:text-xs">
                      {content.layout.replace("-", " ").toUpperCase()}
                    </Badge>
                    <span className="text-[10px] md:text-xs text-gray-500">
                      {new Date(content.publishedAt).toLocaleDateString()}
                    </span>
                  </div>

                  <p className="text-xs md:text-sm text-gray-600 line-clamp-2">{content.description}</p>

                  <div className="space-y-1 md:space-y-2 text-[10px] md:text-xs text-gray-500">
                    <div className="flex items-center gap-1 md:gap-2">
                      <Calendar className="w-3 h-3" />
                      <span className="line-clamp-1">{content.date}</span>
                    </div>
                    <div className="flex items-center gap-1 md:gap-2">
                      <MapPin className="w-3 h-3" />
                      <span className="line-clamp-1">{content.location}</span>
                    </div>
                  </div>

                  <div className="flex gap-2 pt-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDelete(content.id)}
                      className="flex-1 border-red-200 text-red-600 hover:bg-red-50 h-8 md:h-9 text-xs"
                    >
                      <Trash2 className="w-3 h-3 mr-1" />
                      Delete
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}