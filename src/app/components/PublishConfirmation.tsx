import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { CheckCircle, Tv, RefreshCw } from "lucide-react";

type ContentData = {
  title: string;
  subtitle: string;
  description: string;
  date: string;
  location: string;
};

export function PublishConfirmation() {
  const [content, setContent] = useState<ContentData | null>(null);
  const [selectedLayout, setSelectedLayout] = useState<string>("");
  const [isPublishing, setIsPublishing] = useState(true);
  const [publishComplete, setPublishComplete] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const layout = sessionStorage.getItem("selectedLayout");
    const contentStr = sessionStorage.getItem("content");

    if (!layout || !contentStr) {
      navigate("/");
      return;
    }

    setSelectedLayout(layout);
    const parsedContent = JSON.parse(contentStr);
    setContent(parsedContent);

    // Simulate publishing process
    const timer = setTimeout(() => {
      // Save to localStorage
      const existingContent = localStorage.getItem("publishedContent");
      const contentArray = existingContent ? JSON.parse(existingContent) : [];
      
      const newContent = {
        id: Date.now().toString(),
        ...parsedContent,
        layout,
        publishedAt: new Date().toISOString(),
      };
      
      contentArray.push(newContent);
      localStorage.setItem("publishedContent", JSON.stringify(contentArray));
      
      setIsPublishing(false);
      setPublishComplete(true);
    }, 2500);

    return () => clearTimeout(timer);
  }, [navigate]);

  const handleCreateNew = () => {
    // Clear session storage and start over
    sessionStorage.clear();
    navigate("/");
  };

  const handleViewTV = () => {
    navigate("/tv-display");
  };

  if (!content) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-400 via-orange-400 to-red-500 flex items-center justify-center p-3 md:p-6">
      <Card className="w-full max-w-4xl p-4 md:p-8 bg-white/95 backdrop-blur-sm shadow-2xl">
        {isPublishing ? (
          <div className="text-center space-y-4 md:space-y-6">
            <div className="inline-flex items-center justify-center w-20 h-20 md:w-24 md:h-24 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 shadow-lg">
              <Tv className="w-10 h-10 md:w-12 md:h-12 text-white animate-pulse" />
            </div>
            <div>
              <h1 className="text-2xl md:text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2 md:mb-3">
                Publishing to TV Screens
              </h1>
              <p className="text-gray-700 text-sm md:text-lg">Please wait while we deploy your layout...</p>
            </div>
            <div className="w-full max-w-md mx-auto bg-gray-200 rounded-full h-2 md:h-3 overflow-hidden">
              <div className="h-full bg-gradient-to-r from-purple-600 to-pink-600 rounded-full animate-[width_2s_ease-in-out]" style={{ width: '100%' }}></div>
            </div>
          </div>
        ) : (
          <div className="space-y-4 md:space-y-6">
            <div className="text-center space-y-3 md:space-y-4">
              <div className="inline-flex items-center justify-center w-20 h-20 md:w-24 md:h-24 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 shadow-lg">
                <CheckCircle className="w-10 h-10 md:w-12 md:h-12 text-white" />
              </div>
              <div>
                <h1 className="text-2xl md:text-4xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-2 md:mb-3">
                  Successfully Published!
                </h1>
                <p className="text-gray-700 text-sm md:text-lg">Your layout is now live on all connected TV screens 🎉</p>
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-4 md:p-6 space-y-3 md:space-y-4 border-2 border-purple-200">
              <h2 className="font-semibold text-lg md:text-xl text-purple-900">Published Content Details</h2>
              <div className="grid grid-cols-2 gap-3 md:gap-4 text-xs md:text-sm">
                <div>
                  <div className="text-purple-600 font-medium">Layout Type</div>
                  <div className="font-semibold capitalize text-gray-800">{selectedLayout.replace("-", " ")}</div>
                </div>
                <div>
                  <div className="text-purple-600 font-medium">Published At</div>
                  <div className="font-semibold text-gray-800">{new Date().toLocaleString()}</div>
                </div>
                <div>
                  <div className="text-purple-600 font-medium">Title</div>
                  <div className="font-semibold text-gray-800">{content.title}</div>
                </div>
                <div>
                  <div className="text-purple-600 font-medium">Event Date</div>
                  <div className="font-semibold text-gray-800">{content.date}</div>
                </div>
              </div>
            </div>

            <div className="border-t-2 border-gray-200 pt-4 md:pt-6">
              <h3 className="font-semibold text-base md:text-xl mb-3 md:mb-4">Preview on TV</h3>
              <div className="bg-gray-100 rounded-lg overflow-hidden border-4 border-gray-800 shadow-2xl">
                <LayoutPreview layout={selectedLayout} content={content} />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-2 md:gap-3 pt-2 md:pt-4">
              <Button onClick={handleViewTV} variant="outline" className="flex-1 h-12 md:h-14 text-sm md:text-base border-2 border-green-300 hover:bg-green-50 text-green-700" size="lg">
                <Tv className="w-4 h-4 md:w-5 md:h-5 mr-2" />
                View TV Display
              </Button>
              <Button onClick={handleCreateNew} className="flex-1 h-12 md:h-14 text-sm md:text-base bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 shadow-lg" size="lg">
                <RefreshCw className="w-4 h-4 md:w-5 md:h-5 mr-2" />
                Create New Layout
              </Button>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
}

// Layout preview component (same as CustomizationView)
function LayoutPreview({ layout, content }: { layout: string; content: ContentData }) {
  const baseClasses = "w-full aspect-video";

  switch (layout) {
    case "modern-grid":
      return (
        <div className={baseClasses}>
          <div className="p-12 h-full bg-gradient-to-br from-purple-500 to-pink-500">
            <div className="grid grid-cols-2 gap-6 h-full">
              <div className="bg-white/20 backdrop-blur-sm rounded-lg p-8 flex flex-col justify-center">
                <h2 className="text-3xl font-bold text-white mb-4">{content.title}</h2>
                <p className="text-base text-white/90">{content.description}</p>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-lg"></div>
              <div className="bg-white/20 backdrop-blur-sm rounded-lg"></div>
              <div className="bg-white/20 backdrop-blur-sm rounded-lg p-8 flex flex-col justify-center">
                <p className="text-xl text-white font-semibold">{content.date}</p>
                <p className="text-base text-white/80 mt-2">{content.location}</p>
              </div>
            </div>
          </div>
        </div>
      );

    case "hero-focus":
      return (
        <div className={baseClasses}>
          <div className="relative h-full bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center p-12">
            <div className="text-center space-y-6 max-w-3xl">
              <h1 className="text-6xl font-bold text-white">{content.title}</h1>
              <p className="text-2xl text-white/95">{content.subtitle}</p>
              <div className="flex items-center justify-center gap-8 text-lg text-white/90 mt-8">
                <span>{content.date}</span>
                <span>•</span>
                <span>{content.location}</span>
              </div>
            </div>
          </div>
        </div>
      );

    case "split-screen":
      return (
        <div className={baseClasses}>
          <div className="flex h-full">
            <div className="w-1/2 bg-gradient-to-br from-orange-500 to-red-500"></div>
            <div className="w-1/2 bg-white p-12 flex flex-col justify-center">
              <h2 className="text-4xl font-bold mb-6">{content.title}</h2>
              <p className="text-xl text-gray-700 mb-6">{content.subtitle}</p>
              <p className="text-base text-gray-600 mb-8">{content.description}</p>
              <div className="space-y-2 text-base text-gray-600">
                <div>{content.date}</div>
                <div>{content.location}</div>
              </div>
            </div>
          </div>
        </div>
      );

    case "timeline":
      return (
        <div className={baseClasses}>
          <div className="h-full bg-gradient-to-br from-teal-500 to-green-500 p-12 flex items-center">
            <div className="space-y-8 w-full">
              <div className="flex items-start gap-6">
                <div className="w-4 h-4 rounded-full bg-white mt-2 flex-shrink-0"></div>
                <div>
                  <h2 className="text-4xl font-bold text-white mb-2">{content.title}</h2>
                  <p className="text-xl text-white/90">{content.subtitle}</p>
                </div>
              </div>
              <div className="flex items-start gap-6 ml-12">
                <div className="w-3 h-3 rounded-full bg-white/70 mt-2 flex-shrink-0"></div>
                <p className="text-lg text-white/90">{content.description}</p>
              </div>
              <div className="flex items-start gap-6 ml-12">
                <div className="w-3 h-3 rounded-full bg-white/70 mt-2 flex-shrink-0"></div>
                <div className="text-lg text-white/90">
                  <div>{content.date}</div>
                  <div className="mt-1">{content.location}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );

    case "minimalist":
      return (
        <div className={baseClasses}>
          <div className="h-full bg-gray-50 flex items-center justify-center p-16">
            <div className="text-center space-y-8 max-w-2xl">
              <h1 className="text-5xl font-bold text-gray-900">{content.title}</h1>
              <div className="w-24 h-0.5 bg-gray-300 mx-auto"></div>
              <p className="text-xl text-gray-700">{content.subtitle}</p>
              <p className="text-base text-gray-600 leading-relaxed">{content.description}</p>
              <div className="flex items-center justify-center gap-6 text-base text-gray-500 pt-6">
                <span>{content.date}</span>
                <span>•</span>
                <span>{content.location}</span>
              </div>
            </div>
          </div>
        </div>
      );

    default:
      return <div className={baseClasses}></div>;
  }
}