
import { Button } from "@/components/ui/button";
import { ArrowLeft, Shield, Lock, Eye, UserCheck, Database, Globe } from "lucide-react";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-green-50 font-poppins">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex items-center space-x-4 mb-8">
            <Button 
              variant="outline" 
              onClick={() => window.history.back()}
              className="border-brand-purple/30 text-brand-purple hover:bg-brand-purple/10"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-brand-purple mb-2 font-brand-primary">
                Privacy Policy
              </h1>
              <p className="text-brand-light-gray font-poppins">
                Last updated: January 2025
              </p>
            </div>
          </div>

          {/* Content */}
          <div className="bg-white rounded-xl shadow-lg p-8 space-y-8">
            <div className="flex items-center space-x-3 mb-6">
              <Shield className="w-8 h-8 text-brand-green" />
              <h2 className="text-2xl font-bold text-brand-dark-gray font-brand-primary">
                Your Privacy Matters to Us
              </h2>
            </div>

            <section className="space-y-4">
              <h3 className="text-xl font-semibold text-brand-purple flex items-center">
                <UserCheck className="w-5 h-5 mr-2" />
                Information We Collect
              </h3>
              <div className="text-brand-dark-gray space-y-2 font-poppins">
                <p><strong>Personal Information:</strong> Name, email address, phone number, and educational details during registration.</p>
                <p><strong>Learning Data:</strong> Study progress, performance metrics, quiz scores, and learning preferences.</p>
                <p><strong>Usage Data:</strong> App interaction patterns, time spent on features, and device information.</p>
                <p><strong>Content Data:</strong> Questions asked to AI tutor, uploaded study materials (with your permission).</p>
              </div>
            </section>

            <section className="space-y-4">
              <h3 className="text-xl font-semibold text-brand-purple flex items-center">
                <Lock className="w-5 h-5 mr-2" />
                How We Use Your Information
              </h3>
              <div className="text-brand-dark-gray space-y-2 font-poppins">
                <p>• <strong>Personalized Learning:</strong> Adapt AI tutoring and content recommendations to your learning style</p>
                <p>• <strong>Progress Tracking:</strong> Monitor and report your academic progress to you and authorized guardians</p>
                <p>• <strong>Feature Improvement:</strong> Enhance our AI algorithms and educational content</p>
                <p>• <strong>Communication:</strong> Send important updates, study reminders, and educational content</p>
                <p>• <strong>Support:</strong> Provide technical assistance and respond to your queries</p>
              </div>
            </section>

            <section className="space-y-4">
              <h3 className="text-xl font-semibold text-brand-purple flex items-center">
                <Database className="w-5 h-5 mr-2" />
                Data Security & Storage
              </h3>
              <div className="text-brand-dark-gray space-y-2 font-poppins">
                <p>• All data is encrypted in transit and at rest using industry-standard protocols</p>
                <p>• We use secure cloud infrastructure with regular security audits</p>
                <p>• Access to your data is restricted to authorized personnel only</p>
                <p>• We retain your data only as long as necessary for educational purposes</p>
                <p>• You can request data deletion at any time through our support channels</p>
              </div>
            </section>

            <section className="space-y-4">
              <h3 className="text-xl font-semibold text-brand-purple flex items-center">
                <Eye className="w-5 h-5 mr-2" />
                Data Sharing & Third Parties
              </h3>
              <div className="text-brand-dark-gray space-y-2 font-poppins">
                <p>• <strong>We Never Sell Your Data:</strong> Your personal information is never sold to third parties</p>
                <p>• <strong>Educational Partners:</strong> Anonymized performance data may be shared with educational institutions (with consent)</p>
                <p>• <strong>Service Providers:</strong> Trusted vendors who help us operate the platform (under strict data agreements)</p>
                <p>• <strong>Legal Requirements:</strong> Only when required by law or to protect user safety</p>
              </div>
            </section>

            <section className="space-y-4">
              <h3 className="text-xl font-semibold text-brand-purple flex items-center">
                <Globe className="w-5 h-5 mr-2" />
                Your Rights & Choices
              </h3>
              <div className="text-brand-dark-gray space-y-2 font-poppins">
                <p>• <strong>Access:</strong> Request a copy of your personal data</p>
                <p>• <strong>Correction:</strong> Update or correct your information</p>
                <p>• <strong>Deletion:</strong> Request removal of your data</p>
                <p>• <strong>Portability:</strong> Export your data in a machine-readable format</p>
                <p>• <strong>Opt-out:</strong> Unsubscribe from marketing communications</p>
              </div>
            </section>

            <section className="bg-brand-purple/5 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-brand-purple mb-3">Contact Our Privacy Team</h3>
              <p className="text-brand-dark-gray mb-4 font-poppins">
                Have questions about our privacy practices? We're here to help.
              </p>
              <div className="space-y-2 text-brand-dark-gray font-poppins">
                <p><strong>Email:</strong> privacy@xmprep.com</p>
                <p><strong>Address:</strong> XmPrep Education Pvt Ltd, Bangalore, India</p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
