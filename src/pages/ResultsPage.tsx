
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ResultVisualization from "@/components/ResultVisualization";

interface BoundingBox {
  x: number;
  y: number;
  width: number;
  height: number;
  class: string;
  confidence: number;
}

interface AnalysisResult {
  id: string;
  imageUrl: string;
  date: string;
  severity: 'mild' | 'moderate' | 'severe';
  detections: BoundingBox[];
}

const ResultsPage = () => {
  const { resultId } = useParams<{ resultId: string }>();
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    setIsLoading(true);
    
    // Mock API call to fetch result data
    setTimeout(() => {
      // Demo/mock data for visualization
      const mockResult: AnalysisResult = {
        id: resultId || 'demo',
        imageUrl: '/placeholder.svg', // Replace with actual image URL in a real app
        date: new Date().toISOString(),
        severity: 'moderate',
        detections: [
          {
            x: 50,
            y: 100,
            width: 30,
            height: 30,
            class: 'papule',
            confidence: 0.89
          },
          {
            x: 120,
            y: 150,
            width: 25,
            height: 25,
            class: 'pustule',
            confidence: 0.76
          },
          {
            x: 200,
            y: 180,
            width: 20,
            height: 20,
            class: 'papule',
            confidence: 0.92
          },
          {
            x: 250,
            y: 120,
            width: 22,
            height: 22,
            class: 'pustule',
            confidence: 0.81
          }
        ]
      };
      
      setResult(mockResult);
      setIsLoading(false);
    }, 1500);
  }, [resultId]);
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
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
                  <p className="text-gray-600">Analysis completed on {formatDate(result.date)}</p>
                )}
              </div>
              
              <div className="flex gap-3">
                <Link to="/upload">
                  <Button variant="outline">New Analysis</Button>
                </Link>
                <Link to="/dashboard">
                  <Button>Back to Dashboard</Button>
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
            <ResultVisualization 
              imageUrl={result.imageUrl}
              detections={result.detections}
              severity={result.severity}
            />
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
