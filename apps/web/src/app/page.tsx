'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@elo-tech/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@elo-tech/ui/card';
import { Badge } from '@elo-tech/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@elo-tech/ui/dialog';
import { Input } from '@elo-tech/ui/input';
import { Label } from '@elo-tech/ui/label';
import { Textarea } from '@elo-tech/ui/textarea';
import { 
  Code2, 
  Smartphone, 
  Cloud, 
  Shield, 
  Zap, 
  Globe,
  ArrowRight,
  CheckCircle2,
  Menu,
  X,
  Mail,
  Phone,
  MapPin
} from 'lucide-react';

const scrollToSection = (id: string) => {
  const element = document.getElementById(id);
  element?.scrollIntoView({ behavior: 'smooth' });
};

const features = [
  {
    icon: Code2,
    title: 'Custom Development',
    description: 'Tailored software solutions built with modern technologies and best practices.',
  },
  {
    icon: Smartphone,
    title: 'Mobile Applications',
    description: 'Native and cross-platform mobile apps for iOS and Android devices.',
  },
  {
    icon: Cloud,
    title: 'Cloud Solutions',
    description: 'Scalable cloud infrastructure and serverless architectures.',
  },
  {
    icon: Shield,
    title: 'Security First',
    description: 'Enterprise-grade security measures to protect your data and applications.',
  },
];

const products = [
  {
    id: 'pos',
    name: 'SmartPOS',
    description: 'Point of Sale System',
    price: 'KES 2,500/mo',
    features: [
      'Inventory Management',
      'Sales Tracking',
      'Multi-branch Support',
      'M-Pesa Integration',
    ],
    badge: 'Popular',
  },
  {
    id: 'crm',
    name: 'CustomerHub',
    description: 'CRM Software',
    price: 'KES 1,800/mo',
    features: [
      'Contact Management',
      'Lead Tracking',
      'Email Campaigns',
      'Analytics Dashboard',
    ],
    badge: 'New',
  },
  {
    id: 'inventory',
    name: 'StockPro',
    description: 'Inventory Management',
    price: 'KES 1,500/mo',
    features: [
      'Real-time Stock',
      'Low Stock Alerts',
      'Barcode Scanning',
      'Supplier Management',
    ],
    badge: null,
  },
];

const stats = [
  { value: '50+', label: 'Projects Delivered' },
  { value: '30+', label: 'Happy Clients' },
  { value: '5+', label: 'Years Experience' },
  { value: '24/7', label: 'Support' },
];

export default function HomePage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [contactDialogOpen, setContactDialogOpen] = useState(false);

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-white font-bold text-lg">E</span>
            </div>
            <span className="text-xl font-bold">Elo Tech</span>
          </div>
          
          {/* Mobile menu button */}
          <button 
            className="md:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>

          <nav className="hidden md:flex items-center gap-6">
            <button onClick={() => scrollToSection('services')} className="text-sm font-medium hover:text-primary">Services</button>
            <button onClick={() => scrollToSection('products')} className="text-sm font-medium hover:text-primary">Products</button>
            <button onClick={() => scrollToSection('about')} className="text-sm font-medium hover:text-primary">About</button>
            <button onClick={() => scrollToSection('contact')} className="text-sm font-medium hover:text-primary">Contact</button>
          </nav>
          
          <Button onClick={() => scrollToSection('contact')}>Get Started</Button>
        </div>
        
        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t p-4 space-y-4">
            <button onClick={() => { scrollToSection('services'); setMobileMenuOpen(false); }} className="block w-full text-left text-sm font-medium py-2">Services</button>
            <button onClick={() => { scrollToSection('products'); setMobileMenuOpen(false); }} className="block w-full text-left text-sm font-medium py-2">Products</button>
            <button onClick={() => { scrollToSection('about'); setMobileMenuOpen(false); }} className="block w-full text-left text-sm font-medium py-2">About</button>
            <button onClick={() => { scrollToSection('contact'); setMobileMenuOpen(false); }} className="block w-full text-left text-sm font-medium py-2">Contact</button>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden py-24 lg:py-32">
        <div className="container relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mx-auto max-w-3xl text-center"
          >
            <Badge variant="secondary" className="mb-4">
              Premium SaaS Solutions
            </Badge>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
              Building the Future of
              <span className="text-primary"> Digital Business</span>
            </h1>
            <p className="mt-6 text-lg text-muted-foreground">
              We craft innovative software solutions that transform businesses. 
              From custom development to ready-made SaaS products, we bring your vision to life.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="gap-2" onClick={() => scrollToSection('products')}>
                Explore Products <ArrowRight className="h-4 w-4" />
              </Button>
              <Button size="lg" variant="outline" onClick={() => scrollToSection('contact')}>
                Contact Us
              </Button>
            </div>
          </motion.div>
        </div>
        
        {/* Background decoration */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/20 via-background to-background" />
          <div className="absolute top-1/4 left-1/4 h-64 w-64 rounded-full bg-primary/10 blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 h-64 w-64 rounded-full bg-secondary/10 blur-3xl" />
        </div>
      </section>

      {/* Stats Section */}
      <section className="border-y bg-muted/30">
        <div className="container py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="text-3xl md:text-4xl font-bold text-primary">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-24">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight">Our Services</h2>
            <p className="mt-4 text-muted-foreground">
              Comprehensive technology solutions for modern businesses
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full">
                  <CardHeader>
                    <feature.icon className="h-10 w-10 text-primary mb-2" />
                    <CardTitle>{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section id="products" className="py-24 bg-muted/30">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight">SaaS Products</h2>
            <p className="mt-4 text-muted-foreground">
              Ready-to-use software solutions to accelerate your business
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {products.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full flex flex-col">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <Badge variant={product.badge === 'Popular' ? 'default' : product.badge === 'New' ? 'secondary' : 'outline'}>
                        {product.badge || 'Available'}
                      </Badge>
                    </div>
                    <CardTitle className="text-xl">{product.name}</CardTitle>
                    <CardDescription>{product.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-1 flex flex-col">
                    <div className="text-2xl font-bold text-primary mb-4">{product.price}</div>
                    <ul className="space-y-2 mb-6 flex-1">
                      {product.features.map((feature) => (
                        <li key={feature} className="flex items-center gap-2 text-sm">
                          <CheckCircle2 className="h-4 w-4 text-secondary" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <Button className="w-full" onClick={() => setContactDialogOpen(true)}>Start Free Trial</Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold tracking-tight mb-6">
                Why Choose Elo Tech?
              </h2>
              <div className="space-y-4">
                {[
                  'Experienced team of developers',
                  'Agile development methodology',
                  'Dedicated support and maintenance',
                  'Scalable and secure solutions',
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 text-secondary flex-shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: Zap, label: 'Fast Delivery' },
                { icon: Globe, label: 'Global Standards' },
                { icon: Cloud, label: 'Cloud Native' },
                { icon: Shield, label: 'Secure' },
              ].map((item) => (
                <Card key={item.label} className="text-center p-6">
                  <item.icon className="h-8 w-8 mx-auto text-primary mb-2" />
                  <div className="font-medium">{item.label}</div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-primary text-primary-foreground">
        <div className="container text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Business?</h2>
          <p className="text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
            Let&apos;s discuss how our technology solutions can help your business grow. 
            Get in touch today for a free consultation.
          </p>
          <Button size="lg" variant="secondary" onClick={() => scrollToSection('contact')}>
            Start Your Project
          </Button>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight">Contact Us</h2>
            <p className="mt-4 text-muted-foreground">
              Get in touch with us for a free consultation
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-primary/10">
                  <Mail className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold">Email</h3>
                  <p className="text-muted-foreground">hello@elotech.ke</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-primary/10">
                  <Phone className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold">Phone</h3>
                  <p className="text-muted-foreground">+254 700 000 000</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-primary/10">
                  <MapPin className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold">Location</h3>
                  <p className="text-muted-foreground">Nairobi, Kenya</p>
                </div>
              </div>
            </div>
            <Dialog>
              <DialogTrigger asChild>
                <Button size="lg" className="w-full">Send us a Message</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Send us a Message</DialogTitle>
                  <DialogDescription>
                    Fill out the form below and we'll get back to you within 24 hours.
                  </DialogDescription>
                </DialogHeader>
                <form className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="contact-name">Name</Label>
                    <Input id="contact-name" placeholder="Your name" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="contact-email">Email</Label>
                    <Input id="contact-email" type="email" placeholder="you@company.com" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="contact-message">Message</Label>
                    <Textarea id="contact-message" placeholder="Tell us about your project..." />
                  </div>
                  <Button type="submit" className="w-full">Send Message</Button>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-12">
        <div className="container">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
                  <span className="text-white font-bold text-lg">E</span>
                </div>
                <span className="text-xl font-bold">Elo Tech</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Premium software solutions for modern businesses in Africa and beyond.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Products</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary">SmartPOS</a></li>
                <li><a href="#" className="hover:text-primary">CustomerHub</a></li>
                <li><a href="#" className="hover:text-primary">StockPro</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Services</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary">Web Development</a></li>
                <li><a href="#" className="hover:text-primary">Mobile Apps</a></li>
                <li><a href="#" className="hover:text-primary">Cloud Solutions</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>hello@elotech.ke</li>
                <li>+254 700 000 000</li>
                <li>Nairobi, Kenya</li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
            © 2024 Elo Tech. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
