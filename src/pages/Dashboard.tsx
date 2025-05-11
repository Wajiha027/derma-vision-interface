
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Upload } from "lucide-react";

const Dashboard = () => {
  // Mock user data
  const userData = {
    name: "John Doe",
    scanCount: 5,
    lastScan: "2025-05-08T15:30:00",
    recentResults: [
      {
        id: 1,
        date: "2025-05-08T15:30:00",
        severity: "mild",
        detectionCount: 3
      },
      {
        id: 2,
        date: "2025-05-01T10:15:00",
        severity: "moderate",
        detectionCount: 7
      },
      {
        id: 3,
        date: "2025-04-24T09:20:00",
        severity: "moderate",
        detectionCount: 8
      }
    ]
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric'
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
            <h1 className="text-2xl font-bold text-gray-800">Welcome back, {userData.name}</h1>
            <p className="text-gray-600">Manage your skin health journey with DermaVision</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Scan Statistics</CardTitle>
                <CardDescription>Your activity overview</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-3xl font-bold text-primary-600">{userData.scanCount}</p>
                    <p className="text-sm text-gray-500">Total Scans</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Last scan</p>
                    <p className="font-medium">{formatDate(userData.lastScan)}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="md:col-span-2">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Quick Actions</CardTitle>
                <CardDescription>Common tasks you can perform</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Link to="/upload" className="w-full">
                    <Button className="w-full justify-start" size="lg">
                      <Upload className="mr-2 h-4 w-4" />
                      New Skin Scan
                    </Button>
                  </Link>
                  <Link to="/history" className="w-full">
                    <Button variant="outline" className="w-full justify-start" size="lg">
                      <svg xmlns="http://www.w3.org/2000/svg" className="mr-2 h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M12 8v4l3 3" />
                        <circle cx="12" cy="12" r="10" />
                      </svg>
                      View History
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="mb-8">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Recent Analysis Results</CardTitle>
                <CardDescription>
                  Your latest skin analysis history
                </CardDescription>
              </CardHeader>
              <CardContent>
                {userData.recentResults.length > 0 ? (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="text-xs font-medium text-gray-500 bg-gray-50 border-b">
                          <th className="px-4 py-3 text-left">Date</th>
                          <th className="px-4 py-3 text-left">Severity</th>
                          <th className="px-4 py-3 text-left">Detections</th>
                          <th className="px-4 py-3 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {userData.recentResults.map((result) => (
                          <tr key={result.id} className="text-sm text-gray-700">
                            <td className="px-4 py-3">{formatDate(result.date)}</td>
                            <td className="px-4 py-3">{getSeverityBadge(result.severity)}</td>
                            <td className="px-4 py-3">{result.detectionCount} issues found</td>
                            <td className="px-4 py-3 text-right">
                              <Link to={`/results/${result.id}`}>
                                <Button variant="ghost" size="sm">View Details</Button>
                              </Link>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-gray-500">No analysis results found</p>
                    <p className="text-gray-400 text-sm mt-1">Complete your first scan to see results here</p>
                  </div>
                )}
                
                {userData.recentResults.length > 0 && (
                  <div className="mt-4 text-center">
                    <Link to="/history">
                      <Button variant="outline" size="sm">
                        View All History
                      </Button>
                    </Link>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          <div>
            <Card className="bg-gradient-to-r from-primary-50 to-secondary-50 border-none">
              <CardContent className="pt-6">
                <div className="flex flex-col md:flex-row items-center">
                  <div className="md:w-2/3">
                    <h3 className="text-lg font-medium text-gray-800 mb-2">Start a New Skin Analysis</h3>
                    <p className="text-gray-600 mb-4">
                      Upload a photo of your face to get an instant AI-powered analysis of your skin condition.
                    </p>
                    <Link to="/upload">
                      <Button>
                        <Upload className="mr-2 h-4 w-4" />
                        Start New Scan
                      </Button>
                    </Link>
                  </div>
                  <div className="hidden md:block md:w-1/3">
                    <img 
                      src="/placeholder.svg" 
                      alt="Scan Illustration" 
                      className="w-full h-auto" 
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Dashboard;
