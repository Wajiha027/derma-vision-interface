
// Mock database for acne detection and severity rating
export interface MockImageData {
  id: string;
  hasAcne: boolean;
  severity?: 'mild' | 'moderate' | 'severe';
  severityGrade?: 1 | 2 | 3;
  detections: Array<{
    x: number;
    y: number;
    width: number;
    height: number;
    class: string;
    confidence: number;
  }>;
}

// Mock data for demo purposes
export const mockAcneData: Record<string, MockImageData> = {
  "image1": {
    id: "image1",
    hasAcne: true,
    severity: "severe",
    severityGrade: 3,
    detections: [
      {
        x: 50,
        y: 100,
        width: 30,
        height: 30,
        class: 'papule',
        confidence: 0.92
      },
      {
        x: 120,
        y: 150,
        width: 25,
        height: 25,
        class: 'pustule',
        confidence: 0.88
      },
      {
        x: 200,
        y: 180,
        width: 20,
        height: 20,
        class: 'nodule',
        confidence: 0.78
      },
      {
        x: 250,
        y: 120,
        width: 22,
        height: 22,
        class: 'pustule',
        confidence: 0.85
      },
      {
        x: 80,
        y: 200,
        width: 18,
        height: 18,
        class: 'papule',
        confidence: 0.89
      }
    ]
  },
  "image2": {
    id: "image2",
    hasAcne: false,
    detections: []
  },
  "image3": {
    id: "image3",
    hasAcne: true,
    severity: "moderate",
    severityGrade: 2,
    detections: [
      {
        x: 100,
        y: 120,
        width: 25,
        height: 25,
        class: 'papule',
        confidence: 0.86
      },
      {
        x: 180,
        y: 150,
        width: 22,
        height: 22,
        class: 'pustule',
        confidence: 0.79
      },
      {
        x: 220,
        y: 130,
        width: 20,
        height: 20,
        class: 'papule',
        confidence: 0.82
      }
    ]
  },
  // For demo purposes, these IDs will be assigned to uploaded images
  "demo": {
    id: "demo",
    hasAcne: true,
    severity: "moderate",
    severityGrade: 2,
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
  }
};

// Function to get a random mock result for uploaded images
export const getRandomMockResult = (): string => {
  const options = ["image1", "image2", "image3"];
  return options[Math.floor(Math.random() * options.length)];
};
