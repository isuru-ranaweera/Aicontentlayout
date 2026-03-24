import { useState } from "react";
import { useNavigate } from "react-router";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Card } from "./ui/card";
import { Sparkles, Link2, Library, Tv } from "lucide-react";

export function LinkInput() {
  const [url, setUrl] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const navigate = useNavigate();

  // const handleGenerate = async () => {
  //   if (!url.trim()) return;

  //   setIsGenerating(true);

  //   try {
  //     const response = await fetch("http://127.0.0.1:8000/generate", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({ link: url }),
  //     });

  //     if (!response.ok) {
  //       throw new Error("Failed to send link to backend");
  //     }

  //     const data = await response.json();
  //     console.log("Backend response:", data);

  //     sessionStorage.setItem("contentUrl", url);
  //     sessionStorage.setItem("backendResponse", JSON.stringify(data));

  //     navigate("/layouts");
  //   } catch (error) {
  //     console.error("Error sending data to backend:", error);
  //   } finally {
  //     setIsGenerating(false);
  //   }
  // };

  const handleGenerate = async () => {
  console.log("Generate button clicked");
  console.log("URL value:", url);

  if (!url.trim()) {
    console.log("URL is empty");
    return;
  }

  setIsGenerating(true);

  try {
    console.log("Sending request to backend...");

    const response = await fetch("http://127.0.0.1:8000/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ link: url }),
    });

    console.log("Response received:", response);

    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }

    const data = await response.json();
    console.log("Backend response data:", data);

    sessionStorage.setItem("contentUrl", url);
    sessionStorage.setItem("backendResponse", JSON.stringify(data));

    navigate("/layouts");
  } catch (error) {
    console.error("Error sending data to backend:", error);
  } finally {
    setIsGenerating(false);
  }
};

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-400 to-red-400 flex items-center justify-center p-3 md:p-6">
      <Card className="w-full max-w-2xl p-4 md:p-8 space-y-4 md:space-y-6 bg-white/95 backdrop-blur-sm shadow-2xl">
        <div className="text-center space-y-2 md:space-y-3">
          <div className="inline-flex items-center justify-center w-16 h-16 md:w-20 md:h-20 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 mb-2 md:mb-4 shadow-lg">
            <Sparkles className="w-8 h-8 md:w-10 md:h-10 text-white" />
          </div>
          <h1 className="text-2xl md:text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            **AI Layout Generator**
          </h1>
          <p className="text-gray-700 text-sm md:text-lg">
            Paste a link to your content and our AI will generate 5 unique layouts for your TV display
          </p>
        </div>

        <div className="space-y-3 md:space-y-4">
          <div className="relative">
            <Link2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 md:w-5 md:h-5 text-purple-500" />
            <Input
              type="url"
              placeholder="https://example.com/your-content"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="pl-9 md:pl-10 h-12 md:h-14 text-sm md:text-base border-2 border-purple-200 focus:border-purple-500"
              disabled={isGenerating}
              onKeyDown={(e) => e.key === "Enter" && handleGenerate()}
            />
          </div>

          <Button
            onClick={handleGenerate}
            disabled={!url.trim() || isGenerating}
            className="w-full h-12 md:h-14 text-sm md:text-base bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 shadow-lg"
            size="lg"
          >
            {isGenerating ? (
              <>
                <Sparkles className="w-4 h-4 md:w-5 md:h-5 mr-2 animate-spin" />
                Generating Layouts...
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 md:w-5 md:h-5 mr-2" />
                Generate 5 Layouts
              </>
            )}
          </Button>

          <div className="grid grid-cols-2 gap-2 md:gap-3">
            <Button
              variant="outline"
              className="h-10 md:h-12 text-xs md:text-sm border-2 border-blue-300 hover:bg-blue-50 text-blue-700"
              onClick={() => navigate("/content-library")}
            >
              <Library className="w-3 h-3 md:w-4 md:h-4 mr-1 md:mr-2" />
              <span className="hidden sm:inline">Content </span>Library
            </Button>
            <Button
              variant="outline"
              className="h-10 md:h-12 text-xs md:text-sm border-2 border-green-300 hover:bg-green-50 text-green-700"
              onClick={() => navigate("/tv-display")}
            >
              <Tv className="w-3 h-3 md:w-4 md:h-4 mr-1 md:mr-2" />
              TV Display
            </Button>
          </div>
        </div>

        <div className="pt-3 md:pt-4 border-t border-purple-200">
          <p className="text-xs md:text-sm text-gray-600 text-center">
            ✨ The AI will analyze your content and create layouts optimized for TV screens
          </p>
        </div>
      </Card>
    </div>
  );
}