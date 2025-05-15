
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Check, Info } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ResultVisualization from "@/components/ResultVisualization";
import { mockAcneData, MockImageData } from "@/data/mockAcneData";
import { RoboflowDetection } from "@/utils/roboflowAPI";

interface AnalysisResult extends MockImageData {
  imageWidth?: number;
  imageHeight?: number;
  imageUrl?: string;
}

const ResultsPage = () => {
  const { resultId } = useParams<{ resultId: string }>();
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    setIsLoading(true);
    
    // Check if this is a real-time result stored in sessionStorage
    const storedResult = resultId ? sessionStorage.getItem(resultId) : null;
    
    if (storedResult) {
      // We have a result from the Roboflow API
      const parsedResult = JSON.parse(storedResult);
      console.log("Loading result from session storage:", parsedResult);
      setResult(parsedResult);
      setIsLoading(false);
    } else if (resultId && mockAcneData[resultId]) {
      // Fallback to mock data
      console.log("Using mock data for resultId:", resultId);
      setResult(mockAcneData[resultId]);
      setIsLoading(false);
    } else {
      // If resultId doesn't exist anywhere, use the demo data
      console.log("Using demo data");
      setResult(mockAcneData["demo"]);
      setIsLoading(false);
    }
  }, [resultId]);
  
  const formatDate = () => {
    const date = new Date();
    return new Intl.DateTimeFormat('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  const getAverageConfidence = (detections: RoboflowDetection[]) => {
    if (!detections || detections.length === 0) return 0;
    const sum = detections.reduce((acc, detection) => acc + detection.confidence, 0);
    return Math.round((sum / detections.length) * 100);
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow bg-gray-50">
        <div className="page-container py-8">
          <div className="mb-6">
            <div className="flex flex-wrap justify-between items-center gap-4">
              <div>
                <h1 className="text-2xl font-bold text-gray-800">Skin Analysis Results</h1>
                {!isLoading && result && (
                  <p className="text-gray-600">Analysis completed on {formatDate()}</p>
                )}
              </div>
              
              <div className="flex gap-3">
                <Link to="/upload">
                  <Button variant="outline">New Analysis</Button>
                </Link>
                <Link to="/history">
                  <Button>View History</Button>
                </Link>
              </div>
            </div>
          </div>
          
          {isLoading ? (
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12">
              <div className="flex flex-col items-center justify-center">
                <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary-500"></div>
                <p className="mt-4 text-gray-600">Loading analysis results...</p>
              </div>
            </div>
          ) : result ? (
            <>
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
                <div className="flex flex-wrap gap-6 items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className={`w-14 h-14 rounded-full flex items-center justify-center ${
                      result.severity === 'severe' ? 'bg-red-100' : 
                      result.severity === 'moderate' ? 'bg-yellow-100' : 'bg-green-100'
                    }`}>
                      <span className={`text-2xl font-bold ${
                        result.severity === 'severe' ? 'text-red-600' : 
                        result.severity === 'moderate' ? 'text-yellow-600' : 'text-green-600'
                      }`}>
                        {result.detections ? getAverageConfidence(result.detections) : 0}%
                      </span>
                    </div>
                    <div>
                      <h2 className="text-lg font-semibold text-gray-800">
                        Confidence Score
                      </h2>
                      <p className="text-gray-600 text-sm">
                        Average confidence of detected issues
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className={`px-4 py-2 rounded-full ${
                      result.severity === 'severe' ? 'bg-red-100 text-red-800' : 
                      result.severity === 'moderate' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'
                    }`}>
                      <span className="font-medium">
                        {result.severity.charAt(0).toUpperCase() + result.severity.slice(1)} Severity
                      </span>
                    </div>
                    
                    <div className="bg-gray-100 px-4 py-2 rounded-full">
                      <span className="font-medium text-gray-800">
                        {result.detections ? result.detections.length : 0} Issues Detected
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              
              {result.hasAcne ? (
                <ResultVisualization 
                  imageUrl={result.imageUrl || "/placeholder.svg"}
                  detections={result.detections}
                  severity={result.severity || "mild"}
                  severityGrade={result.severityGrade}
                  imageWidth={result.imageWidth}
                  imageHeight={result.imageHeight}
                />
              ) : (
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
                  <div className="flex flex-col items-center justify-center text-center max-w-lg mx-auto">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
                      <Check className="h-8 w-8 text-green-600" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">No Acne Detected</h2>
                    <p className="text-gray-600 mb-6">
                      Our analysis didn't detect any significant acne on your skin. Keep up your good skincare routine!
                    </p>
                    
                    <Alert className="mb-6 bg-blue-50 border-blue-100">
                      <AlertDescription>
                        Even with clear skin, it's important to maintain a consistent skincare routine, stay hydrated, and protect your skin from the sun.
                      </AlertDescription>
                    </Alert>
                    
                    <Link to="/upload">
                      <Button>Analyze Another Image</Button>
                    </Link>
                  </div>
                </div>
              )}
              
              <div className="flex items-center gap-2 mt-6 p-4 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-500">
                <Info className="h-4 w-4" />
                <p>This analysis is generated by AI and should not replace professional medical advice.</p>
              </div>
            </>
          ) : (
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
              <p className="text-gray-600">Result not found or has been deleted.</p>
              <Link to="/upload" className="mt-4 inline-block">
                <Button>Start New Analysis</Button>
              </Link>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ResultsPage;
