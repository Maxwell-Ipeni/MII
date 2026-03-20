'use client';

import { motion } from 'framer-motion';
import { Button } from '@elo-tech/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@elo-tech/ui/card';
import { Badge } from '@elo-tech/ui/badge';
import { 
  Brain, 
  Bot, 
  Sparkles, 
  Workflow, 
  MessageSquare,
  ImageIcon,
  Code2,
  TrendingUp,
  ArrowRight,
  CheckCircle2,
  Zap
} from 'lucide-react';
import Link from 'next/link';

const aiSolutions = [
  {
    icon: Brain,
    title: 'AI Consulting',
    description: 'Expert guidance on integrating AI into your business processes.',
    features: ['Strategy Development', 'AI Readiness Assessment', 'Use Case Identification', 'ROI Analysis']
  },
  {
    icon: Bot,
    title: 'Chatbots & Virtual Assistants',
    description: 'Intelligent conversational AI for customer service and support.',
    features: ['24/7 Customer Support', 'Multi-language Support', 'Integration with CRM', 'Custom Training']
  },
  {
    icon: Workflow,
    title: 'Process Automation',
    description: 'Automate repetitive tasks with intelligent workflows.',
    features: ['Workflow Design', 'RPA Integration', 'Business Rules Engine', 'Performance Analytics']
  },
  {
    icon: ImageIcon,
    title: 'Computer Vision',
    description: 'Image recognition and analysis for various business needs.',
    features: ['Object Detection', 'Quality Control', 'Facial Recognition', 'Document Processing']
  },
  {
    icon: MessageSquare,
    title: 'NLP Solutions',
    description: 'Natural language processing for text and speech analysis.',
    features: ['Sentiment Analysis', 'Text Classification', 'Entity Extraction', 'Language Translation']
  },
  {
    icon: TrendingUp,
    title: 'Predictive Analytics',
    description: 'AI-powered forecasting and decision support.',
    features: ['Demand Forecasting', 'Risk Assessment', 'Market Analysis', 'Recommendation Engines']
  }
];

const benefits = [
  'Increase operational efficiency by up to 70%',
  'Reduce human error in repetitive tasks',
  'Available 24/7 without additional staff costs',
  'Scalable solutions that grow with your business',
  'Data-driven insights for better decisions',
  'Competitive advantage in your industry'
];

export default function AIAutomationPage() {
  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-white font-bold text-lg">E</span>
            </div>
            <span className="text-xl font-bold">Elo Tech</span>
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/products" className="text-sm font-medium hover:text-primary">Products</Link>
            <Link href="/services" className="text-sm font-medium hover:text-primary">Services</Link>
            <Link href="/ai-automation" className="text-sm font-medium text-primary">AI Automation</Link>
            <Link href="/business-software" className="text-sm font-medium hover:text-primary">Business Software</Link>
          </nav>
          <Button asChild>
            <Link href="/contact">Get Started</Link>
          </Button>
        </div>
      </header>

      {/* Hero */}
      <section className="py-24 bg-gradient-to-b from-violet-500/10 to-background">
        <div className="container">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <Badge variant="outline" className="mb-4 border-violet-500 text-violet-500">
              <Sparkles className="w-3 h-3 mr-1" /> AI Automation
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Transform Your Business with AI
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              Leverage cutting-edge artificial intelligence to automate processes, 
              enhance customer experiences, and drive business growth.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link href="#solutions">Explore AI Solutions <ArrowRight className="ml-2 h-4 w-4" /></Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/contact">Book Consultation</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* AI Solutions */}
      <section id="solutions" className="py-24">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold">AI Solutions</h2>
            <p className="mt-4 text-muted-foreground">
              Comprehensive AI services tailored to your business needs
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {aiSolutions.map((solution, index) => (
              <motion.div
                key={solution.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow border-violet-100 dark:border-violet-900">
                  <CardHeader>
                    <solution.icon className="h-10 w-10 text-violet-500 mb-2" />
                    <CardTitle>{solution.title}</CardTitle>
                    <CardDescription>{solution.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {solution.features.map((feature) => (
                        <li key={feature} className="flex items-center gap-2 text-sm">
                          <CheckCircle2 className="h-4 w-4 text-violet-500 flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-24 bg-muted/30">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Why Invest in AI?</h2>
              <p className="text-muted-foreground mb-6">
                Artificial intelligence is no longer a luxury—it's a necessity for businesses 
                that want to stay competitive in today's fast-paced market.
              </p>
              <ul className="space-y-4">
                {benefits.map((benefit) => (
                  <li key={benefit} className="flex items-start gap-3">
                    <Zap className="h-5 w-5 text-violet-500 flex-shrink-0 mt-0.5" />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: 'Cost Reduction', value: '40%' },
                { label: 'Efficiency Boost', value: '70%' },
                { label: 'Faster Decisions', value: '3x' },
                { label: 'Error Reduction', value: '90%' }
              ].map((stat) => (
                <Card key={stat.label} className="text-center p-6">
                  <div className="text-3xl font-bold text-violet-500">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-violet-500 text-white">
        <div className="container text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Embrace AI?</h2>
          <p className="text-violet-100 mb-8 max-w-2xl mx-auto">
            Start your AI journey today. Our experts are ready to help you identify 
            the best AI solutions for your business.
          </p>
          <Button size="lg" variant="secondary" asChild>
            <Link href="/contact">Start Your AI Project</Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-12">
        <div className="container">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
                <span className="text-white font-bold text-lg">E</span>
              </div>
              <span className="text-xl font-bold">Elo Tech</span>
            </div>
            <p className="text-sm text-muted-foreground">© 2024 Elo Tech. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
