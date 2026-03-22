import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Textarea } from "./ui/textarea";
import { ArrowLeft, Sparkles, Eye, Tv } from "lucide-react";

type ContentData = {
  title: string;
  subtitle: string;
  description: string;
  date: string;
  location: string;
};

export function CustomizationView() {
  const [content, setContent] = useState<ContentData | null>(null);
  const [selectedLayout, setSelectedLayout] = useState<string>("");
  const [customPrompt, setCustomPrompt] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const layout = sessionStorage.getItem("selectedLayout");
    const contentStr = sessionStorage.getItem("content");

    if (!layout || !contentStr) {
      navigate("/");
      return;
    }

    setSelectedLayout(layout);
    setContent(JSON.parse(contentStr));
  }, [navigate]);

  const handleApplyCustomization = async () => {
    if (!customPrompt.trim()) return;

    setIsProcessing(true);
    // Simulate AI processing the customization
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Mock update to content based on prompt
    if (content) {
      const updatedContent = { ...content };
      
      // Simple mock logic - you can expand this
      if (customPrompt.toLowerCase().includes("bold") || customPrompt.toLowerCase().includes("exciting")) {
        updatedContent.title = updatedContent.title.toUpperCase();
      }
      if (customPrompt.toLowerCase().includes("short")) {
        updatedContent.description = updatedContent.description.slice(0, 50) + "...";
      }

      setContent(updatedContent);
      sessionStorage.setItem("content", JSON.stringify(updatedContent));
    }

    setIsProcessing(false);
    setCustomPrompt("");
  };

  const handlePublish = () => {
    // Store final layout in session and navigate to confirmation
    navigate("/published");
  };

  if (!content) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-400 via-teal-400 to-cyan-500">
      <div className="max-w-7xl mx-auto p-3 md:p-6 space-y-3 md:space-y-6">
        <div className="flex items-center gap-2 md:gap-4">
          <Button
            variant="outline"
            onClick={() => navigate("/layouts")}
            size="icon"
            className="border-white/30 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white h-9 w-9 md:h-10 md:w-10"
          >
            <ArrowLeft className="w-4 h-4 md:w-5 md:h-5" />
          </Button>
          <div>
            <h1 className="text-2xl md:text-4xl font-bold text-white">Customize Your Layout</h1>
            <p className="text-emerald-100 text-sm md:text-lg">Adjust the design with AI-powered prompts</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 md:gap-6">
          {/* Customization Panel */}
          <div className="space-y-3 md:space-y-6">
            <Card className="p-4 md:p-6 space-y-3 md:space-y-4 bg-white/95 backdrop-blur-sm shadow-xl">
              <div>
                <h2 className="font-semibold text-lg md:text-xl mb-1 md:mb-2 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 md:w-6 md:h-6 text-purple-600" />
                  AI Customization
                </h2>
                <p className="text-xs md:text-sm text-gray-600">
                  Describe how you want to modify the layout
                </p>
              </div>

              <Textarea
                placeholder="E.g., 'Make the title more bold and exciting' or 'Use a darker color scheme' or 'Add more emphasis on the date'"
                value={customPrompt}
                onChange={(e) => setCustomPrompt(e.target.value)}
                rows={3}
                className="resize-none border-2 border-purple-200 focus:border-purple-500 text-sm"
              />

              <Button
                onClick={handleApplyCustomization}
                disabled={!customPrompt.trim() || isProcessing}
                className="w-full h-10 md:h-12 text-sm md:text-base bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 shadow-lg"
              >
                {isProcessing ? (
                  <>
                    <Sparkles className="w-4 h-4 mr-2 animate-spin" />
                    Applying Changes...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 mr-2" />
                    Apply Customization
                  </>
                )}
              </Button>
            </Card>

            <Card className="p-4 md:p-6 space-y-3 md:space-y-4 bg-white/95 backdrop-blur-sm shadow-xl">
              <h3 className="font-semibold text-base md:text-xl">Current Content</h3>
              <div className="space-y-2 md:space-y-3 text-xs md:text-sm">
                <div>
                  <div className="font-medium text-gray-700">Title</div>
                  <div className="text-gray-600">{content.title}</div>
                </div>
                <div>
                  <div className="font-medium text-gray-700">Subtitle</div>
                  <div className="text-gray-600">{content.subtitle}</div>
                </div>
                <div>
                  <div className="font-medium text-gray-700">Description</div>
                  <div className="text-gray-600">{content.description}</div>
                </div>
                <div className="grid grid-cols-2 gap-3 md:gap-4">
                  <div>
                    <div className="font-medium text-gray-700">Date</div>
                    <div className="text-gray-600">{content.date}</div>
                  </div>
                  <div>
                    <div className="font-medium text-gray-700">Location</div>
                    <div className="text-gray-600">{content.location}</div>
                  </div>
                </div>
              </div>
            </Card>

            <div className="flex gap-2 md:gap-3">
              <Button
                onClick={() => setShowPreview(!showPreview)}
                variant="outline"
                className="flex-1 h-10 md:h-12 text-xs md:text-sm border-2 border-white/30 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white"
              >
                <Eye className="w-4 h-4 mr-2" />
                {showPreview ? "Hide" : "Show"} Preview
              </Button>
              <Button
                onClick={handlePublish}
                className="flex-1 h-10 md:h-12 text-xs md:text-sm bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 shadow-lg"
                size="lg"
              >
                <Tv className="w-4 h-4 mr-2" />
                Publish to TV
              </Button>
            </div>
          </div>

          {/* Preview Panel */}
          <div className="space-y-3 md:space-y-4">
            <Card className="p-4 md:p-6 bg-white/95 backdrop-blur-sm shadow-xl">
              <h3 className="font-semibold text-base md:text-xl mb-3 md:mb-4 flex items-center gap-2">
                <Eye className="w-5 h-5 md:w-6 md:h-6 text-emerald-600" />
                Live Preview
              </h3>
              <div className="bg-gray-100 rounded-lg overflow-hidden border-4 border-gray-800 shadow-2xl">
                <LayoutPreview layout={selectedLayout} content={content} />
              </div>
              <p className="text-xs text-gray-500 mt-2 md:mt-3 text-center">
                📺 This is how your layout will appear on TV screens
              </p>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

// Full-size layout preview
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