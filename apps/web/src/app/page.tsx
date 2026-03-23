'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@elo-tech/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@elo-tech/ui/card';
import { Badge } from '@elo-tech/ui/badge';
import { Input } from '@elo-tech/ui/input';
import { Label } from '@elo-tech/ui/label';
import { Textarea } from '@elo-tech/ui/textarea';
import { 
  Code2, 
  Cpu, 
  Brain, 
  Zap, 
  Globe,
  ArrowRight,
  CheckCircle2,
  Menu,
  X,
  Mail,
  Phone,
  MapPin,
  Bot,
  Workflow,
  Database,
  Cloud,
  Shield,
  BarChart3,
  ShoppingCart,
  Users,
  Truck,
  Stethoscope,
  Briefcase,
  MessageSquare,
  ChevronRight,
  Layers,
  Server,
  Lock,
  Play,
  Pause,
  RotateCcw,
  Sparkles,
  Target,
  TrendingUp,
  ArrowDown,
  Send,
  MousePointer,
  Cpu as Chip,
  Network,
  Lock as Security,
  Gauge,
  Loader2,
  Copy,
  Check
} from 'lucide-react';

const BRAND_NAME = "Elo Tech";
const TAGLINE = "Building Websites, Software, and AI Systems for Modern Businesses";
const CONTACT_EMAIL = "maxwelipeni1@gmail.com";
const CONTACT_PHONE = "+254768610735";
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

const scrollToSection = (id: string) => {
  const element = document.getElementById(id);
  element?.scrollIntoView({ behavior: 'smooth' });
};

const capabilities = [
  {
    icon: Code2,
    title: 'Web Development',
    description: 'Modern, responsive websites built with cutting-edge technologies.',
    features: ['React/Next.js', 'E-commerce', 'CMS', 'SEO Optimization'],
  },
  {
    icon: Cpu,
    title: 'Software Development',
    description: 'Custom software solutions tailored to your business needs.',
    features: ['Enterprise Systems', 'APIs', 'Mobile Apps', 'Cloud Solutions'],
  },
  {
    icon: Brain,
    title: 'AI & Automation',
    description: 'Intelligent systems that streamline operations and boost productivity.',
    features: ['Machine Learning', 'Chatbots', 'Process Automation', 'Data Analytics'],
  },
];

const systems = [
  {
    id: 'business-website',
    title: 'Business Website System',
    description: 'Complete web presence solution with CMS, analytics, and marketing tools.',
    icon: Globe,
    features: ['Content Management', 'SEO Suite', 'Analytics Dashboard', 'Lead Capture'],
  },
  {
    id: 'automation',
    title: 'Automation System',
    description: 'Streamline workflows and eliminate manual tasks with smart automation.',
    icon: Workflow,
    features: ['Workflow Builder', 'Integration Hub', 'Task Scheduling', 'Notifications'],
  },
  {
    id: 'ai-interaction',
    title: 'AI Interaction System',
    description: 'Intelligent chatbots and virtual assistants powered by advanced AI.',
    icon: Bot,
    features: ['Natural Language', '24/7 Support', 'Multi-channel', 'Learning Engine'],
  },
];

const products = [
  {
    id: 'business-software',
    name: 'Business Software',
    description: 'Custom ERP & Business Solutions',
    price: 'Custom',
    features: ['Inventory Management', 'CRM', 'Accounting', 'Reporting'],
    icon: ShoppingCart,
    link: '/business-software',
  },
  {
    id: 'logistics',
    name: 'Logistics Platform',
    description: 'Fleet & Delivery Management',
    price: 'Custom',
    features: ['Real-time Tracking', 'Route Optimization', 'Driver Management', 'Analytics'],
    icon: Truck,
    link: '/logistics',
  },
  {
    id: 'products',
    name: 'E-Commerce',
    description: 'Online Store Solutions',
    price: 'Custom',
    features: ['Product Catalog', 'Cart & Checkout', 'Payment Integration', 'Order Management'],
    icon: Database,
    link: '/products',
  },
  {
    id: 'services',
    name: 'Service Booking',
    description: 'Appointment & Booking System',
    price: 'Custom',
    features: ['Online Scheduling', 'Customer Portal', 'Payment Processing', 'Notifications'],
    icon: Users,
    link: '/services',
  },
  {
    id: 'ai-automation',
    name: 'AI Automation',
    description: 'AI-Powered Business Automation',
    price: 'Custom',
    features: ['Smart Workflows', 'AI Chatbots', 'Data Analysis', 'Automation'],
    icon: Brain,
    link: '/ai-automation',
  },
];

const industries = [
  { icon: Briefcase, name: 'SMEs', count: '150+' },
  { icon: Stethoscope, name: 'Clinics', count: '45+' },
  { icon: Truck, name: 'Car Dealers', count: '30+' },
  { icon: Zap, name: 'Plumbers', count: '60+' },
  { icon: Users, name: 'Salons', count: '80+' },
];

const caseStudies = [
  {
    client: 'Auto Kenya',
    industry: 'Car Dealership',
    problem: 'Manual inventory tracking across 3 branches with frequent data inconsistencies and slow sales reporting.',
    solution: 'Custom inventory management system with real-time sync, automated reporting, and M-Pesa payment integration.',
    result: '60% faster sales process, 95% accuracy in inventory, 40% increase in monthly sales.',
    flow: 'Lead Entry → Inventory Check → Sales Processing → Payment → Report Generation',
  },
  {
    client: 'MediCare Clinic',
    industry: 'Healthcare',
    problem: 'Patient records scattered across paper files and multiple systems, leading to slow check-ins and billing errors.',
    solution: 'Unified patient management system with electronic health records, appointment scheduling, and insurance billing.',
    result: '75% faster patient check-in, zero billing errors, 50% more appointments daily.',
    flow: 'Patient Registration → Appointment → Consultation → Billing → Records Update',
  },
  {
    client: 'QuickFix Plumbing',
    industry: 'Trade Services',
    problem: 'Unable to track jobs, manage customer bookings, or maintain service history effectively.',
    solution: 'Job management app with customer portal, automated scheduling, and service history tracking.',
    result: '30% more jobs completed daily, 100% customer satisfaction, seamless invoicing.',
    flow: 'Customer Call → Job Assignment → Technician Dispatch → Service → Payment',
  },
];

export default function HomePage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState<{role: string, content: string, timestamp: number}[]>([
    { role: 'assistant', content: 'Hi! I\'m Elo Tech\'s AI assistant. How can I help you today?', timestamp: Date.now() }
  ]);
  const [chatInput, setChatInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [workflowRunning, setWorkflowRunning] = useState(false);
  const [workflowStep, setWorkflowStep] = useState(-1);
  const chatMessagesEndRef = useRef<HTMLDivElement>(null);

  const [contactForm, setContactForm] = useState({ name: '', email: '', message: '' });
  const [contactStatus, setContactStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [contactError, setContactError] = useState('');

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setContactStatus('loading');
    setContactError('');

    try {
      const res = await fetch(`${API_URL}/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(contactForm),
      });

      if (!res.ok) throw new Error('Failed to send message');

      setContactStatus('success');
      setContactForm({ name: '', email: '', message: '' });
    } catch (err) {
      setContactStatus('error');
      setContactError('Failed to send message. Please try again.');
    }
  };

  const scrollToBottom = () => {
    chatMessagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatMessages]);

  useEffect(() => {
    const hash = window.location.hash.replace('#', '');
    if (hash) {
      scrollToSection(hash);
    } else {
      window.scrollTo(0, 0);
    }
  }, []);

  const chatbotResponses: Record<string, string> = {
    'price': 'Our pricing starts from KES 1,500/month depending on the product. Would you like me to send you a detailed pricing breakdown?',
    'pricing': 'Our pricing starts from KES 1,500/month depending on the product. Would you like me to send you a detailed pricing breakdown?',
    'cost': 'Our pricing starts from KES 1,500/month depending on the product. Would you like me to send you a detailed pricing breakdown?',
    'demo': 'I\'d be happy to arrange a demo! Our team typically schedules demos within 24-48 hours. What time works best for you?',
    'contact': 'You can reach us at maxwelipeni1@gmail.com or call +254768610735. Would you like me to have our team contact you directly?',
    'products': 'We offer SmartPOS, CustomerHub, StockPro, and LogiFlow. Each is tailored for specific business needs. Which product interests you?',
    'features': 'Our products include inventory management, CRM, analytics, M-Pesa integration, and more. What specific feature are you looking for?',
    'default': 'Thanks for your interest! Our team will get back to you within 24 hours with a customized solution for your business needs.'
  };

  const getChatbotResponse = (input: string): string => {
    const lowerInput = input.toLowerCase();
    for (const [key, response] of Object.entries(chatbotResponses)) {
      if (lowerInput.includes(key)) return response;
    }
    return chatbotResponses.default;
  };

  const sendChatMessage = () => {
    if (!chatInput.trim()) return;
    const userMsg = { role: 'user', content: chatInput, timestamp: Date.now() };
    setChatMessages(prev => [...prev, userMsg]);
    const currentInput = chatInput;
    setChatInput('');
    setIsTyping(true);
    
    setTimeout(() => {
      const response = getChatbotResponse(currentInput);
      setChatMessages(prev => [...prev, { 
        role: 'assistant', 
        content: response,
        timestamp: Date.now()
      }]);
      setIsTyping(false);
    }, 1500);
  };

  const runWorkflow = () => {
    if (workflowRunning) return;
    setWorkflowRunning(true);
    setWorkflowStep(0);
    
    const steps = [
      { label: 'Data Input', duration: 1000 },
      { label: 'AI Processing', duration: 2000 },
      { label: 'System Integration', duration: 1500 },
      { label: 'Analytics', duration: 1000 },
    ];

    let currentStep = 0;
    const runStep = () => {
      if (currentStep < steps.length) {
        setWorkflowStep(currentStep);
        setTimeout(() => {
          currentStep++;
          if (currentStep < steps.length) {
            runStep();
          } else {
            setWorkflowRunning(false);
            setWorkflowStep(-1);
          }
        }, steps[currentStep].duration);
      }
    };
    runStep();
  };

  const resetWorkflow = () => {
    setWorkflowRunning(false);
    setWorkflowStep(-1);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navigation - Glass Effect */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-b border-white/20 shadow-lg shadow-primary/5">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <motion.div 
            whileHover={{ scale: 1.02 }}
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => scrollToSection('hero')}
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-lg shadow-primary/30">
              <span className="text-white font-bold text-xl">E</span>
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">{BRAND_NAME}</span>
          </motion.div>
          
          <button 
            className="md:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>

          <nav className="hidden md:flex items-center gap-8">
            {['Capabilities', 'Systems', 'Projects', 'Industries', 'Case Studies'].map((item) => (
              <button 
                key={item}
                onClick={() => scrollToSection(item.toLowerCase().replace(' ', '-'))}
                className="text-sm font-medium hover:text-primary transition-colors"
              >
                {item}
              </button>
            ))}
            <Button onClick={() => scrollToSection('contact')} className="px-4 py-2">
              Get Started
            </Button>
          </nav>
        </div>
        
        {mobileMenuOpen && (
          <div className="md:hidden border-t p-4 space-y-4">
            {['Capabilities', 'Systems', 'Projects', 'Industries', 'Case Studies'].map((item) => (
              <button 
                key={item}
                onClick={() => { scrollToSection(item.toLowerCase().replace(' ', '-')); setMobileMenuOpen(false); }}
                className="block w-full text-left text-sm font-medium py-2"
              >
                {item}
              </button>
            ))}
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section id="hero" className="pt-32 pb-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/20 via-background to-background" />
        
        {/* Animated System Diagram */}
        <div className="absolute top-1/2 right-0 w-1/2 h-full opacity-20">
          <motion.div 
            animate={{ 
              scale: [1, 1.05, 1],
              rotate: [0, 5, -5, 0]
            }}
            transition={{ duration: 10, repeat: Infinity }}
            className="relative w-full h-full"
          >
            <svg viewBox="0 0 400 400" className="w-full h-full">
              <defs>
                <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" style={{stopColor:'#3B82F6', stopOpacity:1}} />
                  <stop offset="100%" style={{stopColor:'#22C55E', stopOpacity:1}} />
                </linearGradient>
              </defs>
              <circle cx="200" cy="200" r="120" fill="none" stroke="url(#grad1)" strokeWidth="2" strokeDasharray="10 5" />
              <circle cx="200" cy="80" r="40" fill="#f1f5f9" stroke="#3B82F6" strokeWidth="2" />
              <circle cx="320" cy="200" r="40" fill="#f1f5f9" stroke="#22C55E" strokeWidth="2" />
              <circle cx="200" cy="320" r="40" fill="#f1f5f9" stroke="#8B5CF6" strokeWidth="2" />
              <circle cx="80" cy="200" r="40" fill="#f1f5f9" stroke="#F59E0B" strokeWidth="2" />
              <line x1="200" y1="120" x2="200" y2="160" stroke="#3B82F6" strokeWidth="2" />
              <line x1="280" y1="200" x2="240" y2="200" stroke="#22C55E" strokeWidth="2" />
              <line x1="200" y1="280" x2="200" y2="240" stroke="#8B5CF6" strokeWidth="2" />
              <line x1="120" y1="200" x2="160" y2="200" stroke="#F59E0B" strokeWidth="2" />
              <text x="200" y="85" textAnchor="middle" fill="#333" fontSize="12">Frontend</text>
              <text x="320" y="205" textAnchor="middle" fill="#333" fontSize="12">Backend</text>
              <text x="200" y="325" textAnchor="middle" fill="#333" fontSize="12">Database</text>
              <text x="80" y="205" textAnchor="middle" fill="#333" fontSize="12">AI/ML</text>
            </svg>
          </motion.div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <Badge variant="secondary" className="mb-6 text-lg px-4 py-1">
              Premium Software Agency
            </Badge>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              {TAGLINE}
            </h1>
            <p className="text-xl text-slate-600 mb-8 max-w-2xl">
              We build cutting-edge websites, powerful software, and intelligent AI systems 
              that help modern businesses grow and scale.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button onClick={() => scrollToSection('projects')} size="lg" className="gap-2 px-6 py-3">
                View Our Work <ArrowRight className="h-4 w-4" />
              </Button>
              <Button onClick={() => scrollToSection('contact')} size="lg" variant="outline" className="px-6 py-3">
                Contact Us
              </Button>
            </div>
            
            <div className="mt-12 flex items-center gap-8 text-slate-600">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-secondary" />
                <span>50+ Projects</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-secondary" />
                <span>30+ Clients</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-secondary" />
                <span>5+ Years</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Capabilities Section */}
      <section id="capabilities" className="py-24 px-4">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <Badge variant="outline" className="mb-4 text-lg px-4 py-1">Our Capabilities</Badge>
            <h2 className="text-4xl font-bold mb-4">What We Do Best</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Comprehensive digital solutions tailored to transform your business
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {capabilities.map((cap, index) => (
              <motion.div
                key={cap.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -8 }}
              >
                <Card className="h-full glass-card hover:shadow-2xl transition-all duration-300">
                  <CardHeader>
                    <motion.div 
                      whileHover={{ scale: 1.1 }}
                      className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center mb-4"
                    >
                      <cap.icon className="h-7 w-7 text-primary" />
                    </motion.div>
                    <CardTitle className="text-xl">{cap.title}</CardTitle>
                    <CardDescription>{cap.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {cap.features.map((feature) => (
                        <li key={feature} className="flex items-center gap-2 text-sm">
                          <ChevronRight className="h-4 w-4 text-primary flex-shrink-0" />
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

      {/* Systems Section */}
      <section id="systems" className="py-24 px-4 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <Badge variant="outline" className="mb-4 text-lg px-4 py-1">Our Systems</Badge>
            <h2 className="text-4xl font-bold mb-4">Powerful Systems We Build</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              End-to-end solutions designed to streamline operations and drive growth
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8">
            {systems.map((system, index) => (
              <motion.div
                key={system.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -8 }}
              >
                <Card className="h-full glass-card hover:shadow-2xl transition-all duration-300">
                  <CardHeader>
                    <motion.div 
                      whileHover={{ scale: 1.1 }}
                      className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center mb-4 shadow-lg"
                    >
                      <system.icon className="h-8 w-8 text-white" />
                    </motion.div>
                    <CardTitle className="text-2xl">{system.title}</CardTitle>
                    <CardDescription>{system.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {system.features.map((feature) => (
                        <li key={feature} className="flex items-center gap-3">
                          <div className="w-2 h-2 rounded-full bg-gradient-to-r from-primary to-secondary flex-shrink-0" />
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

      {/* Architecture Visual - Flow Diagram */}
      <section className="py-24 px-4 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary/20 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-gradient-to-r from-primary/5 via-secondary/5 to-green-500/5 rounded-full blur-3xl" />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <Badge variant="outline" className="mb-4 bg-white/10 text-white border-white/20 text-lg px-4 py-1">Architecture</Badge>
            <h2 className="text-4xl font-bold text-white mb-4">How Our Systems Work</h2>
            <p className="text-slate-300 max-w-2xl mx-auto">
              Seamless integration from lead capture to customer engagement
            </p>
          </motion.div>

          <div className="relative">
            <div className="flex flex-wrap justify-center items-center gap-6 md:gap-0">
              {[
                { icon: Globe, label: 'Website', color: 'from-blue-500 to-blue-600', desc: 'Lead Capture', borderColor: 'border-blue-500/30' },
                { icon: Target, label: 'Lead', color: 'from-purple-500 to-purple-600', desc: 'Qualification', borderColor: 'border-purple-500/30' },
                { icon: Workflow, label: 'Automation', color: 'from-yellow-500 to-orange-500', desc: 'Processing', borderColor: 'border-yellow-500/30' },
                { icon: Database, label: 'CRM', color: 'from-green-500 to-emerald-500', desc: 'Management', borderColor: 'border-green-500/30' },
                { icon: MessageSquare, label: 'Notify', color: 'from-cyan-500 to-teal-500', desc: 'Engagement', borderColor: 'border-cyan-500/30' },
              ].map((step, index) => (
                <motion.div
                  key={step.label}
                  initial={{ opacity: 0, scale: 0.8, y: 20 }}
                  whileInView={{ opacity: 1, scale: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.12, type: 'spring', stiffness: 200 }}
                  className="relative flex flex-col items-center group"
                >
                  <motion.div
                    whileHover={{ scale: 1.1, y: -5 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                    className={`relative w-28 h-28 md:w-32 md:h-32 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center shadow-2xl cursor-pointer z-10 border-2 ${step.borderColor}`}
                  >
                    <div className="absolute inset-0 rounded-2xl bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <step.icon className="h-12 w-12 md:h-14 md:w-14 text-white drop-shadow-lg" />
                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full animate-pulse shadow-lg shadow-green-400/50" />
                  </motion.div>
                  
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.12 + 0.2 }}
                    className="mt-4 text-center"
                  >
                    <p className="text-white font-bold text-base md:text-lg">{step.label}</p>
                    <p className="text-slate-400 text-sm mt-1">{step.desc}</p>
                  </motion.div>

                  {index < 4 && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.12 + 0.3 }}
                      className="hidden md:flex absolute top-14 -right-10 items-center"
                    >
                      <motion.div
                        animate={{ x: [0, 8, 0] }}
                        transition={{ repeat: Infinity, duration: 2, delay: index * 0.3 }}
                        className="flex items-center"
                      >
                        <div className="w-16 h-0.5 bg-gradient-to-r from-slate-600 to-slate-500 rounded-full" />
                        <ArrowRight className="h-5 w-5 text-slate-400 -ml-1" />
                      </motion.div>
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="mt-16 text-center"
            >
              <div className="inline-flex items-center gap-3 px-6 py-3 bg-white/10 backdrop-blur-sm rounded-full border border-white/10 shadow-xl">
                <motion.div
                  animate={{ scale: [1, 1.3, 1] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                  className="w-3 h-3 rounded-full bg-green-400 shadow-lg shadow-green-400/60"
                />
                <span className="text-white font-medium">Real-time data flow active</span>
                <span className="text-slate-400 text-sm ml-2">•</span>
                <span className="text-slate-400 text-sm">Instant processing</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-24 px-4">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <Badge className="mb-4 bg-primary text-primary-foreground text-lg px-4 py-1">Our Products</Badge>
            <h2 className="text-4xl font-bold mb-4">Solutions</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Production-ready software solutions you can start using today
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -8 }}
              >
                <Card className="h-full flex flex-col glass-card hover:shadow-2xl transition-all duration-300">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <Badge variant={index === 0 ? 'default' : index === 1 ? 'secondary' : 'outline'} className="text-sm px-3 py-0.5">
                        {index === 0 ? 'Popular' : index === 1 ? 'New' : 'Available'}
                      </Badge>
                    </div>
                    <motion.div 
                      whileHover={{ scale: 1.1 }}
                      className="w-16 h-16 rounded-xl bg-gradient-to-br from-secondary/20 to-green-500/20 flex items-center justify-center mt-2"
                    >
                      <product.icon className="h-10 w-10 text-secondary" />
                    </motion.div>
                    <CardTitle className="text-xl mt-4">{product.name}</CardTitle>
                    <CardDescription>{product.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-1 flex flex-col">
                    <div className="text-3xl font-bold text-primary mb-4">{product.price}</div>
                    <ul className="space-y-2 mb-6 flex-1">
                      {product.features.map((feature) => (
                        <li key={feature} className="flex items-center gap-2 text-sm">
                          <CheckCircle2 className="h-4 w-4 text-secondary flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <Link href={product.link}>
                      <Button className="w-full bg-gradient-to-r from-green-600 to-emerald-500 hover:from-green-700 hover:to-emerald-600 text-white font-semibold shadow-lg shadow-green-500/25 py-3">
                        View Project
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Industry Solutions */}
      <section id="industries" className="py-24 px-4 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <Badge variant="outline" className="mb-4 text-lg px-4 py-1">Industries</Badge>
            <h2 className="text-4xl font-bold mb-4">Solutions by Industry</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Specialized systems tailored to specific industry needs
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            {industries.map((industry, index) => (
              <motion.div
                key={industry.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ y: -8, scale: 1.02 }}
              >
                <Card className="text-center p-6 glass-card hover:shadow-2xl transition-all duration-300 cursor-pointer">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    className="inline-flex"
                  >
                    <industry.icon className="h-10 w-10 mx-auto text-primary mb-3" />
                  </motion.div>
                  <div className="text-2xl font-bold">{industry.count}</div>
                  <div className="text-slate-600 text-sm">{industry.name}</div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Case Studies */}
      <section id="case-studies" className="py-24 px-4">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <Badge className="mb-4 bg-secondary text-secondary-foreground text-lg px-4 py-1">Case Studies</Badge>
            <h2 className="text-4xl font-bold mb-4">Success Stories</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Real results from real clients who transformed their businesses
            </p>
          </motion.div>

          <div className="space-y-8">
            {caseStudies.map((study, index) => (
              <motion.div
                key={study.client}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -4 }}
              >
                <Card className="glass-card hover:shadow-2xl transition-all duration-300">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-2xl">{study.client}</CardTitle>
                        <CardDescription>{study.industry}</CardDescription>
                      </div>
                      <Badge className="bg-secondary text-secondary-foreground">
                        {study.result.split(',')[0]}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-3 gap-6">
                      <div>
                        <h4 className="font-semibold text-red-600 mb-2">Problem</h4>
                        <p className="text-sm text-slate-700">{study.problem}</p>
                      </div>
                      <div>
                        <h4 className="font-semibold text-blue-600 mb-2">Solution</h4>
                        <p className="text-sm text-slate-700">{study.solution}</p>
                      </div>
                      <div>
                        <h4 className="font-semibold text-green-600 mb-2">System Flow</h4>
                        <p className="text-sm text-slate-700">{study.flow}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Demo Section */}
      <section className="py-24 px-4 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <Badge variant="outline" className="mb-4 text-lg px-4 py-1">Interactive Demo</Badge>
            <h2 className="text-4xl font-bold mb-4">Experience Our Technology</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Try our AI chatbot and see how our systems work
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Chatbot Demo - Enhanced */}
            <motion.div
              whileHover={{ y: -4 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <Card className="border-0">
                <CardHeader className="bg-gradient-to-r from-primary/5 to-secondary/5">
                  <CardTitle className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                      <Bot className="h-4 w-4 text-white" />
                    </div>
                    AI Chatbot Demo
                  </CardTitle>
                  <CardDescription>
                    Try our intelligent chatbot that understands context and provides relevant responses
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="bg-gradient-to-b from-white to-slate-50 rounded-lg mx-4 my-4 h-72 flex flex-col border-2 border-slate-200 shadow-inner">
                    <div className="flex-1 overflow-y-auto space-y-3 p-3">
                      <AnimatePresence>
                        {chatMessages.map((msg, i) => (
                          <motion.div
                            key={msg.timestamp}
                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            transition={{ duration: 0.2 }}
                            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                          >
                            <div className={`max-w-[85%] rounded-2xl px-4 py-2.5 ${
                              msg.role === 'user' 
                                ? 'bg-gradient-to-r from-primary to-primary/80 text-white shadow-lg shadow-primary/25' 
                                : 'bg-white border border-slate-200 text-slate-700 shadow-sm'
                            }`}>
                              <p className="text-sm">{msg.content}</p>
                            </div>
                          </motion.div>
                        ))}
                      </AnimatePresence>
                      {isTyping && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="flex justify-start"
                        >
                          <div className="bg-white border border-slate-200 rounded-2xl px-4 py-3 shadow-sm">
                            <div className="flex gap-1">
                              <motion.div
                                animate={{ y: [0, -5, 0] }}
                                transition={{ repeat: Infinity, duration: 0.6 }}
                                className="w-2 h-2 rounded-full bg-slate-400"
                              />
                              <motion.div
                                animate={{ y: [0, -5, 0] }}
                                transition={{ repeat: Infinity, duration: 0.6, delay: 0.1 }}
                                className="w-2 h-2 rounded-full bg-slate-400"
                              />
                              <motion.div
                                animate={{ y: [0, -5, 0] }}
                                transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }}
                                className="w-2 h-2 rounded-full bg-slate-400"
                              />
                            </div>
                          </div>
                        </motion.div>
                      )}
                      <div ref={chatMessagesEndRef} />
                    </div>
                    <div className="p-3 border-t bg-white/50">
                      <div className="flex gap-2">
                        <Input 
                          value={chatInput}
                          onChange={(e) => setChatInput(e.target.value)}
                          onKeyDown={(e) => e.key === 'Enter' && sendChatMessage()}
                          placeholder="Ask about pricing, demo..."
                          className="border-slate-200 focus:border-primary"
                        />
                        <Button 
                          onClick={sendChatMessage}
                          disabled={!chatInput.trim() || isTyping}
                          className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 shadow-lg shadow-primary/25"
                        >
                          <Send className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Workflow Animation - Enhanced */}
            <motion.div
              whileHover={{ y: -4 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <Card className="border-0">
                <CardHeader className="bg-gradient-to-r from-secondary/5 to-green-500/5">
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-secondary to-green-500 flex items-center justify-center">
                        <Workflow className="h-4 w-4 text-white" />
                      </div>
                      System Workflow
                    </CardTitle>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={resetWorkflow}
                        className="h-8"
                      >
                        <RotateCcw className="h-3 w-3 mr-1" />
                        Reset
                      </Button>
                      <Button
                        size="sm"
                        onClick={runWorkflow}
                        disabled={workflowRunning}
                        className="h-9 px-5 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-semibold shadow-lg shadow-green-500/30 border-0"
                      >
                        {workflowRunning ? (
                          <Loader2 className="h-4 w-4 mr-1.5 animate-spin" />
                        ) : (
                          <Play className="h-4 w-4 mr-1.5 fill-current" />
                        )}
                        {workflowRunning ? 'Running...' : 'Run Demo'}
                      </Button>
                    </div>
                  </div>
                  <CardDescription>
                    Visualize how our automation systems process data in real-time
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="relative">
                    {[
                      { icon: Layers, label: 'Data Input', color: 'from-blue-500 to-blue-600', bgColor: 'bg-blue-100', iconColor: 'text-blue-600' },
                      { icon: Brain, label: 'AI Processing', color: 'from-purple-500 to-purple-600', bgColor: 'bg-purple-100', iconColor: 'text-purple-600' },
                      { icon: Server, label: 'System Integration', color: 'from-yellow-500 to-orange-500', bgColor: 'bg-yellow-100', iconColor: 'text-yellow-600' },
                      { icon: BarChart3, label: 'Analytics', color: 'from-green-500 to-emerald-500', bgColor: 'bg-green-100', iconColor: 'text-green-600' },
                    ].map((step, index) => (
                      <div key={step.label} className="relative">
                        <motion.div
                          className="flex items-center gap-4"
                        >
                          <motion.div
                            animate={workflowStep >= index ? { scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] } : {}}
                            transition={workflowStep >= index ? { duration: 0.5 } : {}}
                            className={`w-14 h-14 rounded-xl ${step.bgColor} flex items-center justify-center shadow-lg z-10 relative`}
                          >
                            {workflowStep > index ? (
                              <CheckCircle2 className={`h-7 w-7 ${step.iconColor}`} />
                            ) : workflowStep === index ? (
                              <motion.div
                                animate={{ scale: [1, 1.2, 1] }}
                                transition={{ repeat: Infinity, duration: 1 }}
                              >
                                <Loader2 className={`h-7 w-7 ${step.iconColor} animate-spin`} />
                              </motion.div>
                            ) : (
                              <step.icon className={`h-7 w-7 ${step.iconColor}`} />
                            )}
                          </motion.div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-2">
                              <span className={`font-semibold ${workflowStep >= index ? 'text-slate-900' : 'text-slate-500'}`}>
                                {step.label}
                              </span>
                              {workflowStep > index && (
                                <motion.span
                                  initial={{ opacity: 0, scale: 0 }}
                                  animate={{ opacity: 1, scale: 1 }}
                                  className="text-xs text-green-600 font-medium"
                                >
                                  ✓ Complete
                                </motion.span>
                              )}
                            </div>
                            <div className="h-2.5 bg-slate-100 rounded-full overflow-hidden">
                              <motion.div 
                                initial={{ width: 0 }}
                                animate={workflowStep >= index ? { width: '100%' } : { width: '0%' }}
                                transition={{ duration: workflowStep === index ? 0.5 : 0 }}
                                className={`h-full bg-gradient-to-r ${step.color} rounded-full`}
                              />
                            </div>
                          </div>
                        </motion.div>
                        {index < 3 && (
                          <div className="absolute left-7 top-14 -bottom-4 w-0.5 bg-slate-200 z-0">
                            <motion.div 
                              initial={{ height: 0 }}
                              animate={workflowStep > index ? { height: '100%' } : { height: 0 }}
                              transition={{ duration: 0.3 }}
                              className={`w-full bg-gradient-to-b ${step.color} rounded-full`}
                            />
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                  
                  {/* Progress Stats */}
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: workflowStep >= 0 ? 1 : 0 }}
                    className="mt-6 p-4 bg-gradient-to-r from-slate-50 to-slate-100 rounded-xl border"
                  >
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-600">Workflow Progress</span>
                      <span className="font-bold text-primary">
                        {workflowStep < 0 ? '0' : Math.round(((workflowStep + 1) / 4) * 100)}%
                      </span>
                    </div>
                    <div className="mt-2 h-1.5 bg-slate-200 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${workflowStep < 0 ? 0 : ((workflowStep + 1) / 4) * 100}%` }}
                        className="h-full bg-gradient-to-r from-primary to-secondary rounded-full"
                      />
                    </div>
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
          </div>
        </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 px-4">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto"
          >
            <div className="text-center mb-12">
              <Badge className="mb-4 bg-primary text-primary-foreground text-lg px-4 py-1">Contact</Badge>
              <h2 className="text-4xl font-bold mb-4">Let's Work Together</h2>
              <p className="text-slate-600">
                Ready to transform your business? Get in touch today.
              </p>
            </div>

            <Card className="glass-card hover:shadow-2xl transition-all duration-300">
              <CardContent className="p-6">
                <AnimatePresence mode="wait">
                  {contactStatus === 'success' ? (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="text-center py-8"
                    >
                      <CheckCircle2 className="h-16 w-16 text-green-500 mx-auto mb-4" />
                      <h3 className="text-2xl font-bold mb-2">Message Sent!</h3>
                      <p className="text-slate-600 mb-4">Thank you for reaching out. We'll get back to you soon.</p>
                      <Button onClick={() => setContactStatus('idle')} variant="outline">
                        Send Another Message
                      </Button>
                    </motion.div>
                  ) : (
                    <form onSubmit={handleContactSubmit} className="space-y-4">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Name</Label>
                          <Input
                            placeholder="Your name"
                            value={contactForm.name}
                            onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Email</Label>
                          <Input
                            type="email"
                            placeholder="you@company.com"
                            value={contactForm.email}
                            onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                            required
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label>Message</Label>
                        <Textarea
                          placeholder="Tell us about your project..."
                          className="min-h-[120px]"
                          value={contactForm.message}
                          onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                          required
                        />
                      </div>
                      {contactStatus === 'error' && (
                        <p className="text-red-500 text-sm">{contactError}</p>
                      )}
                      <Button type="submit" className="w-full gap-2 py-3" disabled={contactStatus === 'loading'}>
                        {contactStatus === 'loading' ? (
                          <>Sending...</>
                        ) : (
                          <>Send Message <Mail className="h-4 w-4" /></>
                        )}
                      </Button>
                    </form>
                  )}
                </AnimatePresence>
              </CardContent>
            </Card>

            <div className="mt-8 flex flex-wrap justify-center gap-8 text-slate-600">
              <div className="flex items-center gap-2">
                <Mail className="h-5 w-5" />
                <span>{CONTACT_EMAIL}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-5 w-5" />
                <span>{CONTACT_PHONE}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                <span>Nairobi, Kenya</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-12 px-4">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
                <span className="text-white font-bold text-xl">E</span>
              </div>
              <span className="text-xl font-bold">{BRAND_NAME}</span>
            </div>
            <div className="text-slate-600 text-sm">
              © 2024 {BRAND_NAME}. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
