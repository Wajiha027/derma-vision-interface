
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ImageDropZone from "@/components/ImageDropZone";
import { analyzeImageWithRoboflow, calculateAcneSeverity, RoboflowDetection } from "@/utils/roboflowAPI";
import { mockAcneData } from "@/data/mockAcneData";

const ImageUpload = () => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleImageSelect = (file: File) => {
    setSelectedImage(file);
  };

  const handleAnalyze = async () => {
    if (!selectedImage) {
      toast({
        variant: "destructive",
        title: "No image selected",
        description: "Please select an image to analyze.",
      });
      return;
    }

    setIsAnalyzing(true);
    
    try {
      // Call Roboflow API
      const roboflowResult = await analyzeImageWithRoboflow(selectedImage);
      
      // Calculate severity based on detections
      const { severity, severityGrade } = calculateAcneSeverity(roboflowResult.predictions);
      
      // Create a unique ID for this analysis
      const resultId = `result_${Date.now()}`;
      
      // Create a result object based on the Roboflow response
      const result = {
        id: resultId,
        hasAcne: roboflowResult.predictions.length > 0,
        severity,
        severityGrade,
        detections: roboflowResult.predictions,
        imageWidth: roboflowResult.image?.width || 640, // Default width if not provided
        imageHeight: roboflowResult.image?.height || 480, // Default height if not provided
        imageUrl: URL.createObjectURL(selectedImage)
      };
      
      // Store the result in sessionStorage
      sessionStorage.setItem(resultId, JSON.stringify(result));
      
      // Navigate to results page
      navigate(`/results/${resultId}`);
    } catch (error) {
      console.error("Error during image analysis:", error);
      toast({
        variant: "destructive",
        title: "Analysis failed",
        description: "There was an error analyzing your image. Using mock data for demonstration.",
      });
      
      // Fallback to mock data for demo purposes
      const mockResultId = "demo";
      navigate(`/results/${mockResultId}`);
    } finally {
      setIsAnalyzing(false);
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow bg-gray-50">
        <div className="page-container py-8">
          <div className="max-w-3xl mx-auto">
            <div className="mb-8 text-center">
              <h1 className="text-2xl font-bold text-gray-800">Skin Analysis</h1>
              <p className="text-gray-600 mt-2">
                Upload a clear photo of your face for AI-powered acne detection and analysis
              </p>
            </div>
            
            <div className="bg-white p-6 md:p-8 rounded-xl shadow-sm border border-gray-100">
              <h2 className="text-lg font-medium text-gray-800 mb-6">Upload Your Image</h2>
              
              <div className="mb-6">
                <ImageDropZone onImageSelect={handleImageSelect} />
              </div>
              
              <div className="border-t border-gray-100 pt-6">
                <h3 className="text-sm font-medium text-gray-800 mb-4">For best results:</h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-start">
                    <span className="inline-block w-4 h-4 mr-2 rounded-full bg-primary-100 text-primary-600 flex-shrink-0 mt-0.5"></span>
                    Use good lighting – natural daylight works best
                  </li>
                  <li className="flex items-start">
                    <span className="inline-block w-4 h-4 mr-2 rounded-full bg-primary-100 text-primary-600 flex-shrink-0 mt-0.5"></span>
                    Capture a clear, well-focused front view of your face
                  </li>
                  <li className="flex items-start">
                    <span className="inline-block w-4 h-4 mr-2 rounded-full bg-primary-100 text-primary-600 flex-shrink-0 mt-0.5"></span>
                    Avoid heavy makeup for more accurate analysis
                  </li>
                  <li className="flex items-start">
                    <span className="inline-block w-4 h-4 mr-2 rounded-full bg-primary-100 text-primary-600 flex-shrink-0 mt-0.5"></span>
                    Remove glasses or anything else covering your face
                  </li>
                </ul>
              </div>
              
              <div className="mt-8 flex justify-end">
                <Button 
                  onClick={handleAnalyze} 
                  disabled={!selectedImage || isAnalyzing}
                  className="min-w-[120px]"
                >
                  {isAnalyzing ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Analyzing...
                    </>
                  ) : (
                    "Analyze Image"
                  )}
                </Button>
              </div>
            </div>
            
            <div className="mt-8 text-center text-xs text-gray-500">
              <p>Your privacy is important to us. Images are processed securely and not shared with third parties.</p>
              <p className="mt-1">By using this service, you agree to our <a href="/terms" className="underline">Terms</a> and <a href="/privacy" className="underline">Privacy Policy</a>.</p>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ImageUpload;
