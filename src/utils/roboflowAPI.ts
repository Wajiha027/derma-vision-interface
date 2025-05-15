
import axios from 'axios';

const ROBOFLOW_API_KEY = "9qpdEGXZIOp4thKOfDj9";
const ROBOFLOW_MODEL_ENDPOINT = "https://serverless.roboflow.com/acne-yolo/1";

export interface RoboflowDetection {
  x: number;
  y: number;
  width: number;
  height: number;
  class: string;
  confidence: number;
}

export interface RoboflowResponse {
  time: number;
  image: {
    width: number;
    height: number;
  };
  predictions: RoboflowDetection[];
}

export const analyzeImageWithRoboflow = async (imageFile: File): Promise<RoboflowResponse> => {
  try {
    // Convert the image file to base64
    const base64Image = await fileToBase64(imageFile);
    
    // Make the API call
    const response = await axios({
      method: "POST",
      url: ROBOFLOW_MODEL_ENDPOINT,
      params: {
        api_key: ROBOFLOW_API_KEY
      },
      data: base64Image.split(',')[1], // Remove the data URL prefix
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    });
    
    return response.data;
  } catch (error) {
    console.error("Error analyzing image with Roboflow:", error);
    throw error;
  }
};

// Helper function to convert File to base64
const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = error => reject(error);
  });
};

// Calculate acne severity based on detections
export const calculateAcneSeverity = (detections: RoboflowDetection[]): {
  severity: 'mild' | 'moderate' | 'severe',
  severityGrade: 1 | 2 | 3
} => {
  if (detections.length === 0) {
    return { severity: 'mild' as const, severityGrade: 1 };
  }
  
  // Calculate severity based on number and confidence of detections
  const totalDetections = detections.length;
  const avgConfidence = detections.reduce((sum, detection) => sum + detection.confidence, 0) / totalDetections;
  
  if (totalDetections < 3 || (totalDetections < 5 && avgConfidence < 0.8)) {
    return { severity: 'mild' as const, severityGrade: 1 };
  } else if (totalDetections < 8 || (totalDetections < 12 && avgConfidence < 0.85)) {
    return { severity: 'moderate' as const, severityGrade: 2 };
  } else {
    return { severity: 'severe' as const, severityGrade: 3 };
  }
};
