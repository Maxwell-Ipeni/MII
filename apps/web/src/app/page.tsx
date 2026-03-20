'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
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
  Lock
} from 'lucide-react';

const BRAND_NAME = "Elo Tech";
const TAGLINE = "Building Websites, Software, and AI Systems for Modern Businesses";
const CONTACT_EMAIL = "hello@elotech.ke";

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
    id: 'smartpos',
    name: 'SmartPOS',
    description: 'Point of Sale System',
    price: 'KES 2,500/mo',
    features: ['Inventory Management', 'Sales Tracking', 'Multi-branch', 'M-Pesa Integration'],
    icon: ShoppingCart,
  },
  {
    id: 'customerhub',
    name: 'CustomerHub',
    description: 'CRM Software',
    price: 'KES 1,800/mo',
    features: ['Contact Management', 'Lead Tracking', 'Email Campaigns', 'Analytics'],
    icon: Users,
  },
  {
    id: 'stockpro',
    name: 'StockPro',
    description: 'Inventory Management',
    price: 'KES 1,500/mo',
    features: ['Real-time Stock', 'Low Stock Alerts', 'Barcode Scanning', 'Suppliers'],
    icon: Database,
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
  const [chatMessages, setChatMessages] = useState<{role: string, content: string}[]>([
    { role: 'assistant', content: 'Hi! I\'m Elo Tech\'s AI assistant. How can I help you today?' }
  ]);
  const [chatInput, setChatInput] = useState('');

  const sendChatMessage = () => {
    if (!chatInput.trim()) return;
    const userMsg = { role: 'user', content: chatInput };
    setChatMessages(prev => [...prev, userMsg]);
    setChatInput('');
    
    setTimeout(() => {
      setChatMessages(prev => [...prev, { 
        role: 'assistant', 
        content: 'Thanks for reaching out! Our team will get back to you within 24 hours. Would you like to schedule a demo?' 
      }]);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navigation */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-white font-bold text-xl">E</span>
            </div>
            <span className="text-xl font-bold">{BRAND_NAME}</span>
          </div>
          
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
            <Button onClick={() => scrollToSection('contact')}>
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
      <section className="pt-32 pb-20 px-4 relative overflow-hidden">
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
            <Badge variant="secondary" className="mb-6">
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
              <Button onClick={() => scrollToSection('projects')} size="lg" className="gap-2">
                View Our Work <ArrowRight className="h-4 w-4" />
              </Button>
              <Button onClick={() => scrollToSection('contact')} size="lg" variant="outline">
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
            <Badge variant="outline" className="mb-4">Our Capabilities</Badge>
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
              >
                <Card className="h-full hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                      <cap.icon className="h-7 w-7 text-primary" />
                    </div>
                    <CardTitle className="text-xl">{cap.title}</CardTitle>
                    <CardDescription>{cap.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {cap.features.map((feature) => (
                        <li key={feature} className="flex items-center gap-2 text-sm">
                          <ChevronRight className="h-4 w-4 text-primary" />
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
            <Badge variant="outline" className="mb-4">Our Systems</Badge>
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
              >
                <Card className="h-full group hover:shadow-lg transition-all">
                  <CardHeader>
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <system.icon className="h-8 w-8 text-white" />
                    </div>
                    <CardTitle className="text-2xl">{system.title}</CardTitle>
                    <CardDescription>{system.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {system.features.map((feature) => (
                        <li key={feature} className="flex items-center gap-3">
                          <div className="w-2 h-2 rounded-full bg-secondary" />
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

      {/* Projects Section */}
      <section id="projects" className="py-24 px-4">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <Badge className="mb-4 bg-primary text-primary-foreground">Our Products</Badge>
            <h2 className="text-4xl font-bold mb-4">SaaS Products</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Production-ready software solutions you can start using today
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {products.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full flex flex-col">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <Badge variant={index === 0 ? 'default' : index === 1 ? 'secondary' : 'outline'}>
                        {index === 0 ? 'Popular' : index === 1 ? 'New' : 'Available'}
                      </Badge>
                    </div>
                    <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center mt-2">
                      <product.icon className="h-6 w-6 text-secondary" />
                    </div>
                    <CardTitle className="text-xl mt-4">{product.name}</CardTitle>
                    <CardDescription>{product.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-1 flex flex-col">
                    <div className="text-3xl font-bold text-primary mb-4">{product.price}</div>
                    <ul className="space-y-2 mb-6 flex-1">
                      {product.features.map((feature) => (
                        <li key={feature} className="flex items-center gap-2 text-sm">
                          <CheckCircle2 className="h-4 w-4 text-secondary" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <Button className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold">
                      Start Free Trial
                    </Button>
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
            <Badge variant="outline" className="mb-4">Industries</Badge>
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
              >
                <Card className="text-center p-6 hover:shadow-lg transition-shadow cursor-pointer">
                  <industry.icon className="h-10 w-10 mx-auto text-primary mb-3" />
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
            <Badge className="mb-4 bg-secondary text-secondary-foreground">Case Studies</Badge>
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
              >
                <Card>
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
            <Badge variant="outline" className="mb-4">Interactive Demo</Badge>
            <h2 className="text-4xl font-bold mb-4">Experience Our Technology</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Try our AI chatbot and see how our systems work
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Chatbot Demo */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bot className="h-5 w-5 text-primary" />
                  AI Chatbot Demo
                </CardTitle>
                <CardDescription>
                  Try our intelligent chatbot that understands context and provides relevant responses
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-muted rounded-lg p-4 h-80 flex flex-col">
                  <div className="flex-1 overflow-y-auto space-y-4 mb-4">
                    {chatMessages.map((msg, i) => (
                      <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-[80%] rounded-lg p-3 ${
                          msg.role === 'user' 
                            ? 'bg-primary text-primary-foreground' 
                            : 'bg-muted-foreground/10'
                        }`}>
                          {msg.content}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <Input 
                      value={chatInput}
                      onChange={(e) => setChatInput(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && sendChatMessage()}
                      placeholder="Type your message..."
                    />
                    <Button onClick={sendChatMessage}>
                      Send
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Workflow Animation */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Workflow className="h-5 w-5 text-secondary" />
                  System Workflow
                </CardTitle>
                <CardDescription>
                  Visualize how our automation systems process data in real-time
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { icon: Layers, label: 'Data Input', color: 'primary', delay: 0 },
                    { icon: Brain, label: 'AI Processing', color: 'secondary', delay: 1 },
                    { icon: Server, label: 'System Integration', color: 'yellow-500', delay: 2 },
                    { icon: BarChart3, label: 'Analytics', color: 'green-500', delay: 3 },
                  ].map((step, index) => (
                    <motion.div
                      key={step.label}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: step.delay * 0.2 }}
                      className="flex items-center gap-4"
                    >
                      <div className={`w-12 h-12 rounded-xl bg-${step.color}/10 flex items-center justify-center`}>
                        <step.icon className={`h-6 w-6 text-${step.color}`} />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <span className="font-medium">{step.label}</span>
                          {index < 3 && (
                            <ChevronRight className="h-4 w-4 text-slate-600" />
                          )}
                        </div>
                        <div className="h-2 bg-muted rounded-full mt-2 overflow-hidden">
                          <motion.div 
                            initial={{ width: 0 }}
                            whileInView={{ width: '100%' }}
                            transition={{ duration: 0.5, delay: step.delay * 0.2 }}
                            className={`h-full bg-${step.color} rounded-full`}
                          />
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
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
              <Badge className="mb-4 bg-primary text-primary-foreground">Contact</Badge>
              <h2 className="text-4xl font-bold mb-4">Let's Work Together</h2>
              <p className="text-slate-600">
                Ready to transform your business? Get in touch today.
              </p>
            </div>

            <Card>
              <CardContent className="p-6">
                <form className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Name</Label>
                      <Input placeholder="Your name" />
                    </div>
                    <div className="space-y-2">
                      <Label>Email</Label>
                      <Input type="email" placeholder="you@company.com" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Message</Label>
                    <Textarea placeholder="Tell us about your project..." className="min-h-[120px]" />
                  </div>
                  <Button type="submit" className="w-full gap-2">
                    Send Message <Mail className="h-4 w-4" />
                  </Button>
                </form>
              </CardContent>
            </Card>

            <div className="mt-8 flex flex-wrap justify-center gap-8 text-slate-600">
              <div className="flex items-center gap-2">
                <Mail className="h-5 w-5" />
                <span>{CONTACT_EMAIL}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-5 w-5" />
                <span>+254 700 000 000</span>
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
