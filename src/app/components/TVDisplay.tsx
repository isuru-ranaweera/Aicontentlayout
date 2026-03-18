import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { Button } from "./ui/button";
import { ArrowLeft, Maximize, Play, Pause } from "lucide-react";

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

// Mock existing published content
const initialContent: ContentData[] = [
  {
    id: "1",
    title: "Summer Festival 2026",
    subtitle: "Music, Food & Entertainment",
    description: "Join us for the biggest summer celebration of the year with live performances, food trucks, and family activities.",
    date: "July 15, 2026",
    location: "Central Park Amphitheater",
    layout: "hero-focus",
    publishedAt: "2026-03-10T10:30:00",
  },
  {
    id: "2",
    title: "Tech Innovation Summit",
    subtitle: "Shaping Tomorrow's Technology",
    description: "Connect with industry leaders and discover cutting-edge innovations that will transform our digital future.",
    date: "April 8, 2026",
    location: "Silicon Valley Convention Center",
    layout: "split-screen",
    publishedAt: "2026-03-12T14:20:00",
  },
  {
    id: "3",
    title: "Art Exhibition Opening",
    subtitle: "Contemporary Visions",
    description: "Experience a curated collection of contemporary art from emerging and established artists from around the world.",
    date: "March 30, 2026",
    location: "Metropolitan Art Gallery",
    layout: "minimalist",
    publishedAt: "2026-03-15T09:00:00",
  },
];

export function TVDisplay() {
  const [allContent, setAllContent] = useState<ContentData[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Load published content from localStorage
    const storedContent = localStorage.getItem("publishedContent");
    if (storedContent) {
      setAllContent(JSON.parse(storedContent));
    } else {
      // Initialize with mock data
      localStorage.setItem("publishedContent", JSON.stringify(initialContent));
      setAllContent(initialContent);
    }
  }, []);

  // Auto-rotate content every 10 seconds
  useEffect(() => {
    if (isPaused || allContent.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % allContent.length);
    }, 10000); // 10 seconds

    return () => clearInterval(interval);
  }, [isPaused, allContent.length]);

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  if (allContent.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center p-6">
        <div className="text-center space-y-4">
          <h1 className="text-3xl font-bold text-white">No Content Published Yet</h1>
          <Button onClick={() => navigate("/")} className="bg-gradient-to-r from-purple-600 to-pink-600">
            Create Your First Layout
          </Button>
        </div>
      </div>
    );
  }

  const currentContent = allContent[currentIndex];

  if (isFullscreen) {
    return (
      <div className="fixed inset-0 bg-black z-50">
        <div className="absolute top-4 right-4 z-10 flex gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setIsPaused(!isPaused)}
            className="bg-white/20 backdrop-blur-sm border-white/30 hover:bg-white/30"
          >
            {isPaused ? <Play className="w-4 h-4 text-white" /> : <Pause className="w-4 h-4 text-white" />}
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={toggleFullscreen}
            className="bg-white/20 backdrop-blur-sm border-white/30 hover:bg-white/30"
          >
            <Maximize className="w-4 h-4 text-white" />
          </Button>
        </div>
        <LayoutPreview layout={currentContent.layout} content={currentContent} fullscreen />
        
        {/* Progress indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
          {allContent.map((_, idx) => (
            <div
              key={idx}
              className={`h-2 rounded-full transition-all ${
                idx === currentIndex ? "w-8 bg-white" : "w-2 bg-white/40"
              }`}
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 p-3 md:p-6">
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
              <h1 className="text-2xl md:text-3xl font-bold text-white">TV Display</h1>
              <p className="text-purple-200 text-xs md:text-sm">
                Showing {currentIndex + 1} of {allContent.length} • Rotates every 10 seconds
              </p>
            </div>
          </div>
          <div className="flex gap-2 md:gap-3 w-full sm:w-auto">
            <Button
              variant="outline"
              onClick={() => setIsPaused(!isPaused)}
              className="flex-1 sm:flex-initial border-white/30 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white h-9 md:h-10 text-xs md:text-sm"
            >
              {isPaused ? (
                <>
                  <Play className="w-3 h-3 md:w-4 md:h-4 mr-1 md:mr-2" />
                  Resume
                </>
              ) : (
                <>
                  <Pause className="w-3 h-3 md:w-4 md:h-4 mr-1 md:mr-2" />
                  Pause
                </>
              )}
            </Button>
            <Button
              onClick={toggleFullscreen}
              className="flex-1 sm:flex-initial bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white shadow-lg h-9 md:h-10 text-xs md:text-sm"
            >
              <Maximize className="w-3 h-3 md:w-4 md:h-4 mr-1 md:mr-2" />
              Fullscreen
            </Button>
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 md:p-6 border border-white/20 shadow-2xl">
          <div className="mb-3 md:mb-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
            <div className="text-white">
              <h2 className="text-lg md:text-2xl font-bold">{currentContent.title}</h2>
              <p className="text-purple-200 text-xs md:text-sm">
                Published on {new Date(currentContent.publishedAt).toLocaleString()}
              </p>
            </div>
            <div className="flex gap-1 md:gap-2">
              {allContent.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`h-2 md:h-3 rounded-full transition-all ${
                    idx === currentIndex ? "w-8 md:w-12 bg-cyan-400" : "w-2 md:w-3 bg-white/40 hover:bg-white/60"
                  }`}
                />
              ))}
            </div>
          </div>

          <div className="bg-gray-900 rounded-lg overflow-hidden border-4 border-gray-800 shadow-2xl">
            <LayoutPreview layout={currentContent.layout} content={currentContent} />
          </div>

          <div className="mt-3 md:mt-4 grid grid-cols-2 sm:grid-cols-4 gap-2 md:gap-4">
            {allContent.map((content, idx) => (
              <button
                key={content.id}
                onClick={() => setCurrentIndex(idx)}
                className={`p-2 md:p-3 rounded-lg text-left transition-all ${
                  idx === currentIndex
                    ? "bg-gradient-to-br from-cyan-500 to-blue-500 text-white shadow-lg scale-105"
                    : "bg-white/10 text-white/70 hover:bg-white/20 hover:text-white"
                }`}
              >
                <div className="text-[10px] md:text-xs font-semibold mb-1 line-clamp-1">{content.title}</div>
                <div className="text-[8px] md:text-[10px] opacity-80 capitalize">{content.layout.replace("-", " ")}</div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// Layout preview component
function LayoutPreview({
  layout,
  content,
  fullscreen = false,
}: {
  layout: string;
  content: ContentData;
  fullscreen?: boolean;
}) {
  const baseClasses = fullscreen ? "w-full h-full" : "w-full aspect-video";

  switch (layout) {
    case "modern-grid":
      return (
        <div className={baseClasses}>
          <div className="p-12 h-full bg-gradient-to-br from-purple-500 via-pink-500 to-red-500">
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
          <div className="relative h-full bg-gradient-to-br from-blue-600 via-cyan-500 to-teal-400 flex items-center justify-center p-12">
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
            <div className="w-1/2 bg-gradient-to-br from-orange-500 via-red-500 to-pink-500"></div>
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
          <div className="h-full bg-gradient-to-br from-teal-500 via-green-500 to-emerald-400 p-12 flex items-center">
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
          <div className="h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center p-16">
            <div className="text-center space-y-8 max-w-2xl">
              <h1 className="text-5xl font-bold text-gray-900">{content.title}</h1>
              <div className="w-24 h-0.5 bg-gray-400 mx-auto"></div>
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