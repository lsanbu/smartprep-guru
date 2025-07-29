
import { Button } from "@/components/ui/button";
import { ArrowLeft, FileText, Users, Shield, AlertCircle, CheckCircle, XCircle } from "lucide-react";

const TermsOfService = () => {
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
                Terms of Service
              </h1>
              <p className="text-brand-light-gray font-poppins">
                Last updated: January 2025
              </p>
            </div>
          </div>

          {/* Content */}
          <div className="bg-white rounded-xl shadow-lg p-8 space-y-8">
            <div className="flex items-center space-x-3 mb-6">
              <FileText className="w-8 h-8 text-brand-green" />
              <h2 className="text-2xl font-bold text-brand-dark-gray font-brand-primary">
                Welcome to XmPrep<sup>NEET</sup>
              </h2>
            </div>

            <section className="space-y-4">
              <h3 className="text-xl font-semibold text-brand-purple flex items-center">
                <CheckCircle className="w-5 h-5 mr-2" />
                Acceptance of Terms
              </h3>
              <div className="text-brand-dark-gray space-y-2 font-poppins">
                <p>By accessing and using XmPrep<sup>NEET</sup>, you accept and agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our platform.</p>
                <p>These terms apply to all users, including students, parents, teachers, and educational institutions.</p>
              </div>
            </section>

            <section className="space-y-4">
              <h3 className="text-xl font-semibold text-brand-purple flex items-center">
                <Users className="w-5 h-5 mr-2" />
                User Accounts & Eligibility
              </h3>
              <div className="text-brand-dark-gray space-y-2 font-poppins">
                <p>• <strong>Age Requirements:</strong> Users under 18 must have parental consent to use our platform</p>
                <p>• <strong>Account Security:</strong> You are responsible for maintaining the confidentiality of your login credentials</p>
                <p>• <strong>Accurate Information:</strong> You must provide truthful and accurate information during registration</p>
                <p>• <strong>Single Account:</strong> Each user should maintain only one active account</p>
              </div>
            </section>

            <section className="space-y-4">
              <h3 className="text-xl font-semibold text-brand-purple flex items-center">
                <Shield className="w-5 h-5 mr-2" />
                Platform Usage Guidelines
              </h3>
              <div className="text-brand-dark-gray space-y-2 font-poppins">
                <p><strong>Permitted Use:</strong></p>
                <p>• Access educational content and AI tutoring features</p>
                <p>• Upload personal study materials for AI analysis</p>
                <p>• Share progress with authorized parents/guardians</p>
                <p>• Participate in mock tests and assessments</p>
                
                <p className="mt-4"><strong>Prohibited Activities:</strong></p>
                <p>• Sharing login credentials with unauthorized users</p>
                <p>• Attempting to reverse-engineer our AI algorithms</p>
                <p>• Uploading copyrighted content without permission</p>
                <p>• Using the platform for commercial purposes without authorization</p>
                <p>• Engaging in any form of academic dishonesty or cheating</p>
              </div>
            </section>

            <section className="space-y-4">
              <h3 className="text-xl font-semibold text-brand-purple flex items-center">
                <AlertCircle className="w-5 h-5 mr-2" />
                AI Tutor & Content Disclaimer
              </h3>
              <div className="text-brand-dark-gray space-y-2 font-poppins">
                <p>• <strong>Educational Purpose:</strong> Our AI tutor is designed to supplement, not replace, traditional learning methods</p>
                <p>• <strong>Accuracy:</strong> While we strive for accuracy, AI responses should be verified with official study materials</p>
                <p>• <strong>No Guarantees:</strong> We cannot guarantee specific exam results or academic outcomes</p>
                <p>• <strong>Continuous Improvement:</strong> Our AI system learns and improves over time based on interactions</p>
              </div>
            </section>

            <section className="space-y-4">
              <h3 className="text-xl font-semibold text-brand-purple">
                Subscription & Payment Terms
              </h3>
              <div className="text-brand-dark-gray space-y-2 font-poppins">
                <p>• <strong>Billing:</strong> Subscription fees are charged annually as per your selected plan</p>
                <p>• <strong>Refunds:</strong> Refund requests are evaluated on a case-by-case basis within 7 days of purchase</p>
                <p>• <strong>Usage Limits:</strong> XmPrep hours are allocated as per your subscription tier</p>
                <p>• <strong>Auto-renewal:</strong> Subscriptions renew automatically unless cancelled before the renewal date</p>
                <p>• <strong>Price Changes:</strong> We reserve the right to modify pricing with 30 days notice</p>
              </div>
            </section>

            <section className="space-y-4">
              <h3 className="text-xl font-semibold text-brand-purple flex items-center">
                <XCircle className="w-5 h-5 mr-2" />
                Account Termination
              </h3>
              <div className="text-brand-dark-gray space-y-2 font-poppins">
                <p>• <strong>User Termination:</strong> You may delete your account at any time through account settings</p>
                <p>• <strong>Platform Termination:</strong> We may suspend or terminate accounts for violations of these terms</p>
                <p>• <strong>Data Retention:</strong> Upon termination, your data will be deleted as per our Privacy Policy</p>
                <p>• <strong>No Refund:</strong> Termination for terms violation does not entitle you to a refund</p>
              </div>
            </section>

            <section className="bg-brand-green/5 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-brand-green mb-3">Limitation of Liability</h3>
              <p className="text-brand-dark-gray font-poppins">
                XmPrep<sup>NEET</sup> provides educational services "as is" and cannot be held liable for any direct, 
                indirect, or consequential damages arising from platform usage. Our maximum liability is limited 
                to the amount paid for your subscription.
              </p>
            </section>

            <section className="bg-brand-purple/5 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-brand-purple mb-3">Contact Us</h3>
              <p className="text-brand-dark-gray mb-4 font-poppins">
                Questions about these terms? We're here to help.
              </p>
              <div className="space-y-2 text-brand-dark-gray font-poppins">
                <p><strong>Email:</strong> legal@xmprep.com</p>
                <p><strong>Support:</strong> support@xmprep.com</p>
                <p><strong>Address:</strong> XmPrep Education Pvt Ltd, Bangalore, India</p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;
