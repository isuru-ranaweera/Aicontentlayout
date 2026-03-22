import { useState } from "react";
import { useNavigate } from "react-router";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Card } from "./ui/card";
import { Sparkles, Link2, Library, Tv, Upload, FileText } from "lucide-react";

export function LinkInput() {
  const [url, setUrl] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [inputMode, setInputMode] = useState<"url" | "file">("url");
  const navigate = useNavigate();

  const handleGenerate = async () => {
    if (!url.trim() && !uploadedFile) return;

    setIsGenerating(true);
    // Simulate AI processing
    await new Promise((resolve) => setTimeout(resolve, 2000));
    
    // Store the content source and navigate to layout selection
    if (inputMode === "url") {
      sessionStorage.setItem("contentUrl", url);
    } else {
      sessionStorage.setItem("contentFile", uploadedFile?.name || "");
    }
    navigate("/layouts");
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedFile(file);
      setUrl(""); // Clear URL when file is uploaded
    }
  };

  const canGenerate = inputMode === "url" ? url.trim() : uploadedFile !== null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-400 to-red-400 flex items-center justify-center p-3 md:p-6 lg:p-8">
      <Card className="w-full max-w-4xl p-6 md:p-10 lg:p-12 space-y-5 md:space-y-7 bg-white/95 backdrop-blur-sm shadow-2xl">
        <div className="text-center space-y-3 md:space-y-4">
          <div className="inline-flex items-center justify-center w-20 h-20 md:w-24 md:h-24 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 mb-3 md:mb-4 shadow-lg">
            <Sparkles className="w-10 h-10 md:w-12 md:h-12 text-white" />
          </div>
          <h1 className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            AI Layout Generator
          </h1>
          <p className="text-gray-700 text-base md:text-xl max-w-2xl mx-auto">
            Paste a link or upload a file, and our AI will generate 5 unique layouts for your TV display
          </p>
        </div>

        {/* Input Mode Toggle */}
        <div className="flex gap-3 max-w-md mx-auto">
          <Button
            onClick={() => {
              setInputMode("url");
              setUploadedFile(null);
            }}
            className={`flex-1 h-12 md:h-14 text-sm md:text-base ${
              inputMode === "url"
                ? "bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 shadow-lg"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            <Link2 className="w-4 h-4 md:w-5 md:h-5 mr-2" />
            URL Link
          </Button>
          <Button
            onClick={() => {
              setInputMode("file");
              setUrl("");
            }}
            className={`flex-1 h-12 md:h-14 text-sm md:text-base ${
              inputMode === "file"
                ? "bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 shadow-lg"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            <Upload className="w-4 h-4 md:w-5 md:h-5 mr-2" />
            Upload File
          </Button>
        </div>

        <div className="space-y-4 md:space-y-5">
          {inputMode === "url" ? (
            <div className="relative">
              <Link2 className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 md:w-6 md:h-6 text-purple-500" />
              <Input
                type="url"
                placeholder="https://example.com/your-content"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="pl-10 md:pl-12 h-14 md:h-16 text-base md:text-lg border-2 border-purple-200 focus:border-purple-500"
                disabled={isGenerating}
                onKeyDown={(e) => e.key === "Enter" && handleGenerate()}
              />
            </div>
          ) : (
            <div>
              <label
                htmlFor="file-upload"
                className="block w-full h-32 md:h-40 border-2 border-dashed border-purple-300 rounded-lg hover:border-purple-500 transition-colors cursor-pointer bg-purple-50/50 hover:bg-purple-100/50"
              >
                <div className="h-full flex flex-col items-center justify-center space-y-3">
                  {uploadedFile ? (
                    <>
                      <FileText className="w-12 h-12 md:w-16 md:h-16 text-purple-600" />
                      <div className="text-center px-4">
                        <p className="text-sm md:text-base font-semibold text-purple-900">{uploadedFile.name}</p>
                        <p className="text-xs md:text-sm text-gray-600 mt-1">
                          {(uploadedFile.size / 1024).toFixed(2)} KB • Click to change
                        </p>
                      </div>
                    </>
                  ) : (
                    <>
                      <Upload className="w-12 h-12 md:w-16 md:h-16 text-purple-400" />
                      <div className="text-center px-4">
                        <p className="text-sm md:text-base font-semibold text-purple-900">Click to upload file</p>
                        <p className="text-xs md:text-sm text-gray-600 mt-1">
                          PDF, DOC, TXT, or image files
                        </p>
                      </div>
                    </>
                  )}
                </div>
              </label>
              <input
                id="file-upload"
                type="file"
                accept=".pdf,.doc,.docx,.txt,.jpg,.jpeg,.png,.gif"
                onChange={handleFileUpload}
                className="hidden"
                disabled={isGenerating}
              />
            </div>
          )}

          <Button
            onClick={handleGenerate}
            disabled={!canGenerate || isGenerating}
            className="w-full h-14 md:h-16 text-base md:text-lg bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 shadow-lg disabled:opacity-50"
            size="lg"
          >
            {isGenerating ? (
              <>
                <Sparkles className="w-5 h-5 md:w-6 md:h-6 mr-2 animate-spin" />
                Generating Layouts...
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5 md:w-6 md:h-6 mr-2" />
                Generate 5 Layouts
              </>
            )}
          </Button>

          <div className="grid grid-cols-2 gap-3 md:gap-4">
            <Button
              variant="outline"
              className="h-12 md:h-14 text-sm md:text-base border-2 border-blue-300 hover:bg-blue-50 text-blue-700"
              onClick={() => navigate("/content-library")}
            >
              <Library className="w-4 h-4 md:w-5 md:h-5 mr-2" />
              <span className="hidden sm:inline">Content </span>Library
            </Button>
            <Button
              variant="outline"
              className="h-12 md:h-14 text-sm md:text-base border-2 border-green-300 hover:bg-green-50 text-green-700"
              onClick={() => navigate("/tv-display")}
            >
              <Tv className="w-4 h-4 md:w-5 md:h-5 mr-2" />
              TV Display
            </Button>
          </div>
        </div>

        <div className="pt-4 md:pt-5 border-t border-purple-200">
          <p className="text-sm md:text-base text-gray-600 text-center">
            ✨ The AI will analyze your content and create layouts optimized for TV screens
          </p>
        </div>
      </Card>
    </div>
  );
}