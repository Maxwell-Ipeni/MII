'use client';

import { motion } from 'framer-motion';
import { Button } from '@elo-tech/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@elo-tech/ui/card';
import { Badge } from '@elo-tech/ui/badge';
import { 
  Code2, 
  Smartphone, 
  Cloud, 
  Shield, 
  Database, 
  Server,
  Palette,
  Search,
  ArrowRight,
  CheckCircle2,
  Star
} from 'lucide-react';
import Link from 'next/link';

const services = [
  {
    icon: Code2,
    title: 'Web Development',
    description: 'Custom web applications built with modern frameworks like React, Next.js, and Node.js.',
    features: ['E-commerce Platforms', 'Web Apps', 'CMS Development', 'API Integration', 'Progressive Web Apps'],
    price: 'From KES 50,000'
  },
  {
    icon: Smartphone,
    title: 'Mobile Development',
    description: 'Native and cross-platform mobile applications for iOS and Android.',
    features: ['iOS Development', 'Android Development', 'React Native', 'Flutter Apps', 'App Maintenance'],
    price: 'From KES 80,000'
  },
  {
    icon: Cloud,
    title: 'Cloud Solutions',
    description: 'Scalable cloud infrastructure and serverless architectures.',
    features: ['AWS Services', 'Azure Setup', 'Google Cloud', 'Serverless Apps', 'Cloud Migration'],
    price: 'From KES 30,000'
  },
  {
    icon: Database,
    title: 'Database Design',
    description: 'Efficient database architecture and optimization.',
    features: ['PostgreSQL', 'MongoDB', 'MySQL', 'Data Modeling', 'Performance Tuning'],
    price: 'From KES 25,000'
  },
  {
    icon: Palette,
    title: 'UI/UX Design',
    description: 'User-centered design that delivers exceptional experiences.',
    features: ['Wireframing', 'Prototyping', 'User Research', 'Design Systems', 'Mobile First Design'],
    price: 'From KES 35,000'
  },
  {
    icon: Shield,
    title: 'Security & Compliance',
    description: 'Enterprise-grade security measures to protect your data.',
    features: ['Penetration Testing', 'Security Audit', 'GDPR Compliance', 'SSL/TLS Setup', 'Security Monitoring'],
    price: 'From KES 40,000'
  }
];

const process = [
  { step: 1, title: 'Discovery', description: 'We understand your business needs and goals' },
  { step: 2, title: 'Planning', description: 'Create a detailed roadmap and technical specification' },
  { step: 3, title: 'Development', description: 'Build your solution using agile methodologies' },
  { step: 4, title: 'Testing', description: 'Rigorous quality assurance and security testing' },
  { step: 5, title: 'Deployment', description: 'Launch and deploy to production environments' },
  { step: 6, title: 'Support', description: 'Ongoing maintenance and continuous improvement' }
];

export default function ServicesPage() {
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
            <Link href="/services" className="text-sm font-medium text-primary">Services</Link>
            <Link href="/ai-automation" className="text-sm font-medium hover:text-primary">AI Automation</Link>
            <Link href="/business-software" className="text-sm font-medium hover:text-primary">Business Software</Link>
          </nav>
          <Button asChild>
            <Link href="/contact">Get Started</Link>
          </Button>
        </div>
      </header>

      {/* Hero */}
      <section className="py-24 bg-gradient-to-b from-primary/10 to-background">
        <div className="container">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <Badge variant="secondary" className="mb-4">Services</Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Custom Software Development
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              We build tailored software solutions that transform your business operations. 
              From concept to deployment, we're your trusted technology partner.
            </p>
            <Button size="lg" asChild>
              <Link href="#services">Explore Services <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section id="services" className="py-24">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold">Our Services</h2>
            <p className="mt-4 text-muted-foreground">Comprehensive technology solutions for modern businesses</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <service.icon className="h-10 w-10 text-primary mb-2" />
                    <CardTitle>{service.title}</CardTitle>
                    <CardDescription>{service.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 mb-4">
                      {service.features.map((feature) => (
                        <li key={feature} className="flex items-center gap-2 text-sm">
                          <CheckCircle2 className="h-4 w-4 text-secondary flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <div className="text-lg font-bold text-primary">{service.price}</div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-24 bg-muted/30">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold">Our Process</h2>
            <p className="mt-4 text-muted-foreground">How we deliver exceptional results</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {process.map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="relative">
                  <CardHeader>
                    <div className="absolute -top-3 -left-3 h-8 w-8 rounded-full bg-primary text-white flex items-center justify-center font-bold">
                      {item.step}
                    </div>
                    <CardTitle className="mt-2">{item.title}</CardTitle>
                    <CardDescription>{item.description}</CardDescription>
                  </CardHeader>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-primary text-primary-foreground">
        <div className="container text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Build Your Project?</h2>
          <p className="text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
            Let's discuss your project requirements and find the best solution for your business.
          </p>
          <Button size="lg" variant="secondary" asChild>
            <Link href="/contact">Get a Quote</Link>
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
