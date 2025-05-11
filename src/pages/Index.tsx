
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-primary-500 to-secondary-600 text-white">
          <div className="page-container py-20 md:py-32">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 animate-fade-in">
                AI-Powered Acne Detection & Analysis
              </h1>
              <p className="text-lg md:text-xl opacity-90 mb-8 animate-fade-in" style={{ animationDelay: "0.2s" }}>
                Upload a photo of your skin and get instant AI analysis to understand your acne condition and severity.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4 animate-fade-in" style={{ animationDelay: "0.4s" }}>
                <Link to="/signup">
                  <Button size="lg" className="bg-white text-primary-700 hover:bg-gray-100">
                    Get Started
                  </Button>
                </Link>
                <Link to="/upload">
                  <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                    Try Free Scan
                  </Button>
                </Link>
              </div>
            </div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent"></div>
        </section>
        
        {/* How It Works */}
        <section className="py-16 md:py-24">
          <div className="page-container">
            <h2 className="section-title text-center mb-12">How DermaVision Works</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 text-center">
                <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-primary-100 flex items-center justify-center text-primary-600">
                  <Upload className="h-7 w-7" />
                </div>
                <h3 className="text-lg font-medium text-gray-800 mb-3">Upload Your Photo</h3>
                <p className="text-gray-600">
                  Take a clear photo of your face or upload an existing one for analysis.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 text-center">
                <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-primary-100 flex items-center justify-center text-primary-600">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M2 12.5h2m1 0h2m1 0h2m1 0h2m1 0h2m1 0h2m3 0h1" />
                    <path d="M19 15V9" />
                    <path d="M15 18v-7l-4-8-4 8v7" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-800 mb-3">AI Analysis</h3>
                <p className="text-gray-600">
                  Our advanced AI models detect acne lesions and analyze severity levels.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 text-center">
                <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-primary-100 flex items-center justify-center text-primary-600">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2h11A2.5 2.5 0 0 1 20 4.5v15a2.5 2.5 0 0 1-2.5 2.5h-11A2.5 2.5 0 0 1 4 19.5Z" />
                    <path d="M8 7h8" />
                    <path d="M8 11h8" />
                    <path d="M8 15h5" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-800 mb-3">Get Results</h3>
                <p className="text-gray-600">
                  Receive detailed insights about your acne condition with visual markers and severity grading.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Features */}
        <section className="py-16 md:py-24 bg-gray-50">
          <div className="page-container">
            <h2 className="section-title text-center mb-6">Advanced Features</h2>
            <p className="text-center text-gray-600 max-w-2xl mx-auto mb-12">
              DermaVision uses cutting-edge AI models to provide accurate and helpful skin analysis.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <h3 className="text-lg font-medium text-gray-800 mb-3">
                  Accurate Detection with YOLOv8m
                </h3>
                <p className="text-gray-600 mb-4">
                  Our system uses YOLOv8m, a state-of-the-art object detection model, to precisely identify and locate acne lesions in your images.
                </p>
                <div className="border-t border-gray-100 pt-4">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-primary-500 rounded-full"></span>
                    <span className="text-sm text-gray-600">Accurate bounding box detection</span>
                  </div>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="w-2 h-2 bg-primary-500 rounded-full"></span>
                    <span className="text-sm text-gray-600">Multiple lesion type recognition</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <h3 className="text-lg font-medium text-gray-800 mb-3">
                  Severity Classification with MobileNetV2
                </h3>
                <p className="text-gray-600 mb-4">
                  Using MobileNetV2, our system classifies the severity of your acne condition, providing personalized insights based on clinical standards.
                </p>
                <div className="border-t border-gray-100 pt-4">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-primary-500 rounded-full"></span>
                    <span className="text-sm text-gray-600">Mild, moderate, and severe categorization</span>
                  </div>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="w-2 h-2 bg-primary-500 rounded-full"></span>
                    <span className="text-sm text-gray-600">Personalized recommendations</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Call to Action */}
        <section className="py-16 md:py-24">
          <div className="page-container">
            <div className="bg-gradient-to-br from-primary-500 to-secondary-600 rounded-2xl p-8 md:p-12 text-white text-center">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                Start Your Skin Analysis Journey Today
              </h2>
              <p className="text-lg opacity-90 max-w-2xl mx-auto mb-8">
                Join thousands of users who have gained insights into their skin health with DermaVision's AI technology.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link to="/signup">
                  <Button size="lg" className="bg-white text-primary-700 hover:bg-gray-100">
                    Create Free Account
                  </Button>
                </Link>
                <Link to="/upload">
                  <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                    Try Free Scan
                  </Button>
                </Link>
              </div>
              <p className="mt-6 text-sm opacity-80">
                No credit card required. Start with a free analysis today.
              </p>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
