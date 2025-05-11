
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

interface HistoryItem {
  id: string;
  date: string;
  imageUrl: string;
  severity: "mild" | "moderate" | "severe";
  detectionCount: number;
}

const History = () => {
  // Mock history data
  const [historyItems] = useState<HistoryItem[]>([
    {
      id: "1",
      date: "2025-05-08T15:30:00",
      imageUrl: "/placeholder.svg",
      severity: "mild",
      detectionCount: 3
    },
    {
      id: "2",
      date: "2025-05-01T10:15:00",
      imageUrl: "/placeholder.svg",
      severity: "moderate",
      detectionCount: 7
    },
    {
      id: "3",
      date: "2025-04-24T09:20:00",
      imageUrl: "/placeholder.svg",
      severity: "moderate",
      detectionCount: 8
    },
    {
      id: "4",
      date: "2025-04-17T14:10:00",
      imageUrl: "/placeholder.svg",
      severity: "severe",
      detectionCount: 12
    },
    {
      id: "5",
      date: "2025-04-10T11:45:00",
      imageUrl: "/placeholder.svg",
      severity: "moderate",
      detectionCount: 6
    }
  ]);

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

  const getSeverityBadge = (severity: string) => {
    const badgeClasses = {
      mild: "bg-green-100 text-green-800 border border-green-200",
      moderate: "bg-yellow-100 text-yellow-800 border border-yellow-200",
      severe: "bg-red-100 text-red-800 border border-red-200"
    };

    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${badgeClasses[severity as keyof typeof badgeClasses]}`}>
        {severity.charAt(0).toUpperCase() + severity.slice(1)}
      </span>
    );
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow bg-gray-50">
        <div className="page-container py-8">
          <div className="mb-8">
            <div className="flex flex-wrap justify-between items-center gap-4">
              <div>
                <h1 className="text-2xl font-bold text-gray-800">Analysis History</h1>
                <p className="text-gray-600">View your past skin analysis results</p>
              </div>
              
              <Link to="/upload">
                <Button>
                  New Analysis
                </Button>
              </Link>
            </div>
          </div>
          
          {historyItems.length > 0 ? (
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="text-xs font-medium text-gray-500 bg-gray-50 border-b">
                      <th className="px-6 py-3 text-left">Date</th>
                      <th className="px-6 py-3 text-left">Image</th>
                      <th className="px-6 py-3 text-left">Severity</th>
                      <th className="px-6 py-3 text-left">Detections</th>
                      <th className="px-6 py-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {historyItems.map((item) => (
                      <tr key={item.id} className="text-sm text-gray-700 hover:bg-gray-50">
                        <td className="px-6 py-4">{formatDate(item.date)}</td>
                        <td className="px-6 py-4">
                          <div className="w-12 h-12 bg-gray-100 rounded-md overflow-hidden">
                            <img 
                              src={item.imageUrl} 
                              alt="Analysis" 
                              className="w-full h-full object-cover"
                            />
                          </div>
                        </td>
                        <td className="px-6 py-4">{getSeverityBadge(item.severity)}</td>
                        <td className="px-6 py-4">{item.detectionCount} issues found</td>
                        <td className="px-6 py-4 text-right">
                          <Link to={`/results/${item.id}`}>
                            <Button variant="outline" size="sm">
                              View Details
                            </Button>
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
              <div className="flex flex-col items-center">
                <div className="bg-gray-100 p-6 rounded-full mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2h11A2.5 2.5 0 0 1 20 4.5v15a2.5 2.5 0 0 1-2.5 2.5h-11A2.5 2.5 0 0 1 4 19.5Z" />
                    <path d="M8 7h8" />
                    <path d="M8 11h8" />
                    <path d="M8 15h5" />
                  </svg>
                </div>
                <h2 className="text-xl font-medium text-gray-800 mb-2">No history found</h2>
                <p className="text-gray-600 mb-6">
                  You haven't performed any skin analyses yet.
                </p>
                <Link to="/upload">
                  <Button>Start Your First Analysis</Button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default History;
