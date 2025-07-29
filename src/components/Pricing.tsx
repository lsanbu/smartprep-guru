
import React from 'react';
import { Check, Zap, Rocket, Trophy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const Pricing = () => {
  const plans = [
    {
      name: 'Ignite',
      price: '₹199',
      icon: <Zap className="w-6 h-6" />,
      description: 'Perfect for starting your NEET journey',
      hours: '30 hours',
      features: [
        'AI Tutor (text/image/voice input)',
        'NCERT RAG access',
        'Study streak tracker',
        'NEET readiness score',
        'Basic subject-wise performance charts'
      ],
      popular: false,
      gradient: 'from-purple-500 to-pink-500'
    },
    {
      name: 'Accelerate',
      price: '₹799',
      icon: <Rocket className="w-6 h-6" />,
      description: 'Advanced features for serious preparation',
      hours: '90 hours',
      features: [
        'All Ignite features',
        'Upload & query own study materials (PDFs)',
        'Parent Telegram/WhatsApp progress alerts',
        'District-level benchmarking reports',
        'Study planner with progress visual'
      ],
      popular: true,
      gradient: 'from-blue-500 to-cyan-500'
    },
    {
      name: 'Achieve',
      price: '₹1,499',
      icon: <Trophy className="w-6 h-6" />,
      description: 'Complete solution for NEET success',
      hours: '300 hours',
      features: [
        'All Accelerate features',
        'College Predictor Tool (NEET-based)',
        'Training support & usage analytics',
        'Priority customer support'
      ],
      popular: false,
      gradient: 'from-yellow-500 to-orange-500'
    }
  ];

  return (
    <section id="pricing" className="py-20 bg-gradient-to-br from-purple-50 to-blue-50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold font-brand-primary text-gray-900 mb-4">
            🚀 XmPrepNEET Pricing Tiers
          </h2>
          <p className="text-xl text-gray-600 mb-2">
            Feature-based access + XmPrep hours/year usage limits
          </p>
          <p className="text-lg text-gray-500">
            Open to all users/institutions; selection based on usage & features
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {plans.map((plan, index) => (
            <Card 
              key={index} 
              className={`relative overflow-hidden transition-all duration-300 hover:shadow-2xl ${
                plan.popular ? 'ring-2 ring-brand-primary scale-105' : ''
              }`}
            >
              {plan.popular && (
                <Badge className="absolute top-4 right-4 bg-brand-primary text-white">
                  Most Popular
                </Badge>
              )}
              
              <CardHeader className="text-center pb-2">
                <div className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r ${plan.gradient} flex items-center justify-center text-white`}>
                  {plan.icon}
                </div>
                <CardTitle className="text-2xl font-bold text-gray-900">
                  {plan.name}
                </CardTitle>
                <CardDescription className="text-gray-600">
                  {plan.description}
                </CardDescription>
              </CardHeader>

              <CardContent className="pt-2">
                <div className="text-center mb-6">
                  <div className="text-4xl font-bold text-brand-primary mb-2">
                    {plan.price}
                  </div>
                  <div className="text-sm text-gray-500">per student/year</div>
                  <div className="mt-3 px-3 py-1 bg-brand-accent/20 text-brand-primary rounded-full text-sm font-medium inline-block">
                    ⏱️ Up to {plan.hours}
                  </div>
                </div>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button 
                  className={`w-full ${
                    plan.popular 
                      ? 'bg-brand-primary hover:bg-brand-primary/90' 
                      : 'bg-gray-800 hover:bg-gray-700'
                  }`}
                >
                  Choose {plan.name}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* XmPrep Hours Explanation */}
        <div className="bg-white rounded-2xl p-8 shadow-lg border border-purple-100">
          <div className="text-center mb-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              🧠 What Counts as "XmPrep Hours"?
            </h3>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Total time spent across AI chat, mock tests, analytics, study planner, and interactive modules – 
              tracked fairly to optimize learning, not restrict it.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h4 className="font-semibold text-gray-900 mb-3">Included Activities:</h4>
              <div className="space-y-2">
                {[
                  '💬 AI Tutor conversations',
                  '📝 Mock test sessions',
                  '📊 Performance analytics review',
                  '📅 Study planner usage',
                  '🔍 Interactive learning modules'
                ].map((activity, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-brand-primary rounded-full"></div>
                    <span className="text-gray-700">{activity}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold text-gray-900 mb-3">Fair Usage Policy:</h4>
              <div className="space-y-2">
                {[
                  '⏰ Hours reset annually',
                  '📈 Usage tracked transparently',
                  '🎯 Optimized for effective learning',
                  '💡 Smart notifications for usage',
                  '🔄 Flexible hour management'
                ].map((policy, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-brand-accent rounded-full"></div>
                    <span className="text-gray-700">{policy}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Ready to start your NEET journey?
          </h3>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Join thousands of students who are already using XmPrepNEET to ace their NEET preparation with AI-powered learning.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-brand-primary hover:bg-brand-primary/90">
              Start Free Trial
            </Button>
            <Button size="lg" variant="outline" className="border-brand-primary text-brand-primary hover:bg-brand-primary/10">
              Contact Sales
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
