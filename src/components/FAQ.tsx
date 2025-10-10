
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { HelpCircle } from "lucide-react";

const FAQ = () => {
  const faqs = [
    {
      question: "What makes XmPrep's AI Tutor different from other learning platforms?",
      answer: "Our AI Tutor is specifically trained on NEET curriculum with NCERT RAG (Retrieval-Augmented Generation) technology. It understands context, provides step-by-step explanations, and supports multiple input methods including text, images, and voice. Plus, it's available 24/7 for instant doubt clearing."
    },
    {
      question: "How does the 'XmPrep Hours' system work?",
      answer: "XmPrep Hours track your active learning time across interactive features like AI chat, mock tests, and study planning. Passive activities like reading materials or viewing analytics don't count. This ensures fair usage while encouraging productive study habits."
    },
    {
      question: "Is the Beta Launch offer really free?",
      answer: "Yes! During our beta phase, new users get complete access to our AI Tutor feature absolutely free. Just sign up and start learning immediately. This is our way of thanking early adopters who help us improve the platform."
    },
    {
      question: "Can I upload my own study materials?",
      answer: "Yes, with our Accelerate and Achieve plans, you can upload your own PDFs and study materials. Our AI will process and index them, allowing you to query your personal content just like NCERT materials."
    },
    {
      question: "How accurate is the College Predictor tool?",
      answer: "Our College Predictor uses historical NEET data, current performance trends, and machine learning algorithms to provide predictions. While we strive for accuracy, remember that actual admissions depend on many factors including seat availability and reservation policies."
    },
    {
      question: "Do parents really get progress updates?",
      answer: "Absolutely! Parents receive automated progress alerts via Telegram or WhatsApp (available in Accelerate and Achieve plans). They get weekly summaries, milestone achievements, and areas needing attention - all while respecting student privacy."
    },
    {
      question: "What subjects and topics are covered?",
      answer: "We cover all NEET subjects: Physics, Chemistry, and Biology (Botany & Zoology). Our content is aligned with the latest NEET syllabus and includes NCERT textbooks, previous year questions, and additional practice materials."
    },
    {
      question: "Can I use XmPrep offline?",
      answer: "While core features require internet connectivity for AI interactions, downloaded study materials and completed assessments can be accessed offline. Progress syncs automatically when you're back online."
    },
    {
      question: "Is there a money-back guarantee?",
      answer: "Yes, we offer a 30-day satisfaction guarantee. If you're not completely satisfied with your learning progress, we'll provide a full refund. Our goal is your success in NEET."
    },
    {
      question: "How do I get started?",
      answer: "Simply click 'Get Started Free' or 'Student Portal' to access the platform. During beta, you get immediate free access to AI Tutor features. For paid plans, choose your tier and start learning within minutes."
    }
  ];

  return (
    <section id="faq" className="py-20 px-4 bg-white">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-16">
          <Badge className="bg-brand-navy/10 text-brand-navy border-brand-navy/20 mb-4 px-4 py-2">
            <HelpCircle className="w-4 h-4 mr-2" />
            Frequently Asked Questions
          </Badge>
          
          <h2 className="text-4xl font-bold font-brand-primary text-brand-dark-gray mb-4">
            Got Questions? We've Got Answers!
          </h2>
          
          <p className="text-xl text-brand-light-gray max-w-2xl mx-auto font-poppins">
            Everything you need to know about XmPrep and how it can transform your NEET preparation journey.
          </p>
        </div>

        <Accordion type="single" collapsible className="space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem 
              key={index} 
              value={`item-${index}`}
              className="border border-gray-200 rounded-lg px-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <AccordionTrigger className="text-left font-semibold font-brand-primary text-brand-dark-gray hover:text-brand-navy">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-gray-600 font-poppins leading-relaxed">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        <div className="mt-12 text-center">
          <div className="rounded-xl p-6" style={{ background: 'linear-gradient(135deg, rgba(6, 47, 90, 0.1) 0%, rgba(32, 178, 170, 0.1) 50%, rgba(164, 214, 94, 0.1) 100%)' }}>
            <h3 className="text-xl font-bold font-brand-primary text-brand-dark-gray mb-3">
              Still have questions?
            </h3>
            <p className="text-brand-light-gray mb-4 font-poppins">
              Our support team is here to help you succeed in your NEET journey.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="mailto:support@xmprep.com" 
                className="text-brand-navy hover:text-brand-navy/80 font-medium font-poppins"
              >
                📧 support@xmprep.com
              </a>
              <a 
                href="tel:+911234567890" 
                className="text-brand-navy hover:text-brand-navy/80 font-medium font-poppins"
              >
                📞 +91 12345 67890
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
