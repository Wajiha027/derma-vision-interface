
import React, { useEffect, useRef, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface BoundingBox {
  x: number;
  y: number;
  width: number;
  height: number;
  class: string;
  confidence: number;
}

interface ResultVisualizationProps {
  imageUrl: string;
  detections: BoundingBox[];
  severity: 'mild' | 'moderate' | 'severe';
  severityGrade?: 1 | 2 | 3;
}

const ResultVisualization = ({ imageUrl, detections, severity, severityGrade }: ResultVisualizationProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [imageLoaded, setImageLoaded] = useState(false);
  
  const severityColorMap = {
    mild: 'bg-green-100 text-green-800 border-green-200',
    moderate: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    severe: 'bg-red-100 text-red-800 border-red-200'
  };
  
  const severityDescription = {
    mild: 'Your acne condition is mild. Keep up with a good skincare routine.',
    moderate: 'Your acne condition is moderate. Consider consulting a dermatologist.',
    severe: 'Your acne condition is severe. We recommend seeking professional dermatological care.'
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !imageLoaded) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const image = new Image();
    image.src = imageUrl;
    
    image.onload = () => {
      // Set canvas dimensions to match the image
      canvas.width = image.width;
      canvas.height = image.height;
      
      // Draw the base image
      ctx.drawImage(image, 0, 0);
      
      // Draw bounding boxes for detections
      detections.forEach(box => {
        ctx.strokeStyle = '#14b8a6'; // Primary teal color
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.rect(box.x, box.y, box.width, box.height);
        ctx.stroke();
        
        // Optional: Add label to the bounding box
        ctx.fillStyle = '#14b8a6';
        ctx.fillRect(box.x, box.y - 20, 60, 20);
        ctx.fillStyle = 'white';
        ctx.font = '12px Arial';
        ctx.fillText(`${box.class} ${Math.round(box.confidence * 100)}%`, box.x + 5, box.y - 5);
      });
    };
  }, [imageUrl, detections, imageLoaded]);

  const renderSeverityStars = () => {
    const grade = severityGrade || (severity === 'mild' ? 1 : severity === 'moderate' ? 2 : 3);
    return (
      <div className="flex items-center mt-1">
        {[1, 2, 3].map((star) => (
          <div 
            key={star} 
            className={`w-4 h-4 mr-1 rounded-full ${
              star <= grade ? 'bg-primary-500' : 'bg-gray-200'
            }`}
          />
        ))}
        <span className="text-sm text-gray-500 ml-2">
          Grade {grade}
        </span>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <Card className="overflow-hidden">
        <CardHeader className="bg-gray-50 pb-3">
          <CardTitle className="text-lg text-gray-700">Acne Detection Results</CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-1">
              <div className="relative bg-gray-100 rounded-lg overflow-hidden">
                <img 
                  src={imageUrl} 
                  alt="Original" 
                  className="w-full h-auto hidden" 
                  onLoad={() => setImageLoaded(true)}
                />
                <canvas 
                  ref={canvasRef} 
                  className="w-full h-auto rounded-lg"
                />
              </div>
            </div>
            
            <div className="flex-1 space-y-6">
              <div>
                <h3 className="font-medium text-gray-700 mb-2">Analysis Summary</h3>
                <div className="flex items-center">
                  <span className="text-sm text-gray-500 mr-2">Severity:</span>
                  <Badge className={severityColorMap[severity]}>
                    {severity.charAt(0).toUpperCase() + severity.slice(1)}
                  </Badge>
                </div>
                {renderSeverityStars()}
                <p className="text-sm text-gray-600 mt-2">
                  {severityDescription[severity]}
                </p>
              </div>
              
              <div>
                <h3 className="font-medium text-gray-700 mb-2">Detected Issues</h3>
                <ul className="space-y-2">
                  {detections.length > 0 ? (
                    detections.map((detection, index) => (
                      <li key={index} className="flex items-center text-sm text-gray-600">
                        <span className="w-2 h-2 bg-primary-500 rounded-full mr-2"></span>
                        {detection.class} ({Math.round(detection.confidence * 100)}% confidence)
                      </li>
                    ))
                  ) : (
                    <li className="text-sm text-gray-500">No issues detected</li>
                  )}
                </ul>
              </div>
              
              <div>
                <h3 className="font-medium text-gray-700 mb-2">Recommended Next Steps</h3>
                {severity === 'mild' && (
                  <p className="text-sm text-gray-600">
                    Maintain your current skincare routine. Consider using products with salicylic acid for spot treatment.
                  </p>
                )}
                {severity === 'moderate' && (
                  <p className="text-sm text-gray-600">
                    Consider using over-the-counter treatments with benzoyl peroxide. If persistent, consult with a dermatologist.
                  </p>
                )}
                {severity === 'severe' && (
                  <p className="text-sm text-gray-600">
                    We recommend scheduling an appointment with a dermatologist for prescription treatment options such as topical retinoids or antibiotics.
                  </p>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ResultVisualization;
