import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { ArrowLeft, Check } from "lucide-react";

// Mock layout templates
const layoutTemplates = [
  {
    id: "modern-grid",
    name: "Modern Grid",
    description: "Clean grid layout with large headlines and imagery",
    preview: "modern-grid",
  },
  {
    id: "hero-focus",
    name: "Hero Focus",
    description: "Full-screen hero image with overlay text",
    preview: "hero-focus",
  },
  {
    id: "split-screen",
    name: "Split Screen",
    description: "Divided layout with content and visuals side-by-side",
    preview: "split-screen",
  },
  {
    id: "timeline",
    name: "Timeline View",
    description: "Chronological layout with timeline elements",
    preview: "timeline",
  },
  {
    id: "minimalist",
    name: "Minimalist",
    description: "Clean, spacious design with focus on typography",
    preview: "minimalist",
  },
];

// Mock content extracted from URL
const mockContent = {
  title: "Exciting Product Launch Event",
  subtitle: "Join us for an unforgettable experience",
  description: "Discover our latest innovations and connect with industry leaders at this exclusive event. Experience the future of technology.",
  date: "March 25, 2026",
  location: "San Francisco Convention Center",
};

export function LayoutSelection() {
  const [selectedLayout, setSelectedLayout] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const url = sessionStorage.getItem("contentUrl");
    if (!url) {
      navigate("/");
    }
  }, [navigate]);

  const handleSelect = (layoutId: string) => {
    setSelectedLayout(layoutId);
  };

  const handleContinue = () => {
    if (selectedLayout) {
      sessionStorage.setItem("selectedLayout", selectedLayout);
      sessionStorage.setItem("content", JSON.stringify(mockContent));
      navigate("/customize");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-400 via-blue-400 to-indigo-500 p-3 md:p-6">
      <div className="max-w-7xl mx-auto space-y-3 md:space-y-6">
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
            <h1 className="text-2xl md:text-4xl font-bold text-white">Select Your Layout</h1>
            <p className="text-cyan-100 text-sm md:text-lg">Choose from 5 AI-generated layouts</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6">
          {layoutTemplates.map((layout) => (
            <Card
              key={layout.id}
              className={`cursor-pointer transition-all hover:shadow-2xl hover:scale-105 bg-white/95 backdrop-blur-sm ${
                selectedLayout === layout.id
                  ? "ring-4 ring-yellow-400 shadow-2xl scale-105"
                  : ""
              }`}
              onClick={() => handleSelect(layout.id)}
            >
              <div className="relative">
                <LayoutPreview layout={layout.preview} content={mockContent} />
                {selectedLayout === layout.id && (
                  <div className="absolute top-2 right-2 md:top-4 md:right-4 w-8 h-8 md:w-10 md:h-10 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg">
                    <Check className="w-5 h-5 md:w-6 md:h-6 text-white" />
                  </div>
                )}
              </div>
              <div className="p-3 md:p-4 space-y-1 md:space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-base md:text-lg">{layout.name}</h3>
                  <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0 text-xs">AI</Badge>
                </div>
                <p className="text-xs md:text-sm text-gray-600">{layout.description}</p>
              </div>
            </Card>
          ))}
        </div>

        <div className="flex justify-end">
          <Button
            onClick={handleContinue}
            disabled={!selectedLayout}
            size="lg"
            className="w-full sm:w-auto px-6 md:px-8 h-12 md:h-14 text-sm md:text-base bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 shadow-lg"
          >
            Continue to Customize
          </Button>
        </div>
      </div>
    </div>
  );
}

// Layout preview component
function LayoutPreview({ layout, content }: { layout: string; content: typeof mockContent }) {
  const baseClasses = "w-full h-64 bg-white rounded-t-lg overflow-hidden";

  switch (layout) {
    case "modern-grid":
      return (
        <div className={baseClasses}>
          <div className="p-6 h-full bg-gradient-to-br from-purple-500 to-pink-500">
            <div className="grid grid-cols-2 gap-4 h-full">
              <div className="bg-white/20 backdrop-blur rounded p-3">
                <div className="text-xs font-bold text-white mb-1">{content.title}</div>
                <div className="text-[8px] text-white/80">{content.description.slice(0, 50)}...</div>
              </div>
              <div className="bg-white/20 backdrop-blur rounded"></div>
              <div className="bg-white/20 backdrop-blur rounded"></div>
              <div className="bg-white/20 backdrop-blur rounded p-3">
                <div className="text-[8px] text-white font-semibold">{content.date}</div>
              </div>
            </div>
          </div>
        </div>
      );

    case "hero-focus":
      return (
        <div className={baseClasses}>
          <div className="relative h-full bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center">
            <div className="text-center space-y-2 px-6">
              <h2 className="text-lg font-bold text-white">{content.title}</h2>
              <p className="text-xs text-white/90">{content.subtitle}</p>
              <div className="text-[10px] text-white/80 mt-2">{content.date}</div>
            </div>
          </div>
        </div>
      );

    case "split-screen":
      return (
        <div className={baseClasses}>
          <div className="flex h-full">
            <div className="w-1/2 bg-gradient-to-br from-orange-500 to-red-500"></div>
            <div className="w-1/2 bg-white p-4 flex flex-col justify-center">
              <h3 className="text-sm font-bold mb-2">{content.title}</h3>
              <p className="text-[8px] text-gray-600 mb-2">{content.description.slice(0, 80)}...</p>
              <div className="text-[8px] text-gray-500">{content.date}</div>
            </div>
          </div>
        </div>
      );

    case "timeline":
      return (
        <div className={baseClasses}>
          <div className="h-full bg-gradient-to-br from-teal-500 to-green-500 p-6">
            <div className="space-y-3">
              <div className="flex items-start gap-2">
                <div className="w-2 h-2 rounded-full bg-white mt-1 flex-shrink-0"></div>
                <div className="text-[8px] text-white">
                  <div className="font-bold">{content.title}</div>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-2 h-2 rounded-full bg-white/50 mt-1 flex-shrink-0"></div>
                <div className="text-[8px] text-white/80">{content.date}</div>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-2 h-2 rounded-full bg-white/50 mt-1 flex-shrink-0"></div>
                <div className="text-[8px] text-white/80">{content.location}</div>
              </div>
            </div>
          </div>
        </div>
      );

    case "minimalist":
      return (
        <div className={baseClasses}>
          <div className="h-full bg-gray-50 flex items-center justify-center p-8">
            <div className="text-center space-y-3">
              <div className="text-base font-bold text-gray-900">{content.title}</div>
              <div className="w-12 h-px bg-gray-300 mx-auto"></div>
              <div className="text-[8px] text-gray-600 max-w-[200px]">{content.description}</div>
              <div className="text-[8px] text-gray-500 mt-3">{content.date}</div>
            </div>
          </div>
        </div>
      );

    default:
      return <div className={baseClasses}></div>;
  }
}