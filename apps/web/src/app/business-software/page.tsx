'use client';

import { motion } from 'framer-motion';
import { Button } from '@elo-tech/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@elo-tech/ui/card';
import { Badge } from '@elo-tech/ui/badge';
import { 
  Building2, 
  Store, 
  Factory, 
  Truck, 
  UtensilsCrossed,
  Stethoscope,
  Landmark,
  GraduationCap,
  ArrowRight,
  CheckCircle2,
  Settings,
  BarChart3,
  Users,
  Package
} from 'lucide-react';
import Link from 'next/link';

const industries = [
  {
    icon: Store,
    title: 'Retail & E-commerce',
    description: 'Complete solutions for retail businesses of all sizes.',
    solutions: ['Point of Sale', 'Inventory Management', 'E-commerce Platform', 'Customer Loyalty']
  },
  {
    icon: UtensilsCrossed,
    title: 'Restaurant & Hospitality',
    description: 'Streamline operations for restaurants and hotels.',
    solutions: ['Order Management', 'Table Reservations', 'Kitchen Display', 'Staff Scheduling']
  },
  {
    icon: Factory,
    title: 'Manufacturing',
    description: 'Optimize production and supply chain processes.',
    solutions: ['Production Planning', 'Quality Control', 'Supply Chain', 'Equipment Maintenance']
  },
  {
    icon: Truck,
    title: 'Logistics & Transport',
    description: 'Fleet management and logistics solutions.',
    solutions: ['Fleet Tracking', 'Route Optimization', 'Driver Management', 'Fuel Monitoring']
  },
  {
    icon: Stethoscope,
    title: 'Healthcare',
    description: 'Healthcare management and patient records.',
    solutions: ['Patient Records', 'Appointment Scheduling', 'Billing', 'Inventory']
  },
  {
    icon: Landmark,
    title: 'Finance & Banking',
    description: 'Secure financial management solutions.',
    solutions: ['Loan Management', 'Core Banking', 'Risk Assessment', 'Compliance']
  },
  {
    icon: GraduationCap,
    title: 'Education',
    description: 'Modern solutions for educational institutions.',
    solutions: ['Student Management', 'Online Learning', 'Attendance', 'Grading System']
  },
  {
    icon: Building2,
    title: 'Real Estate',
    description: 'Property management and sales solutions.',
    solutions: ['Property Listings', 'Lead Management', 'Contract Management', 'Analytics']
  }
];

const features = [
  { icon: Users, label: 'Multi-user Access' },
  { icon: Settings, label: 'Customizable' },
  { icon: BarChart3, label: 'Real-time Analytics' },
  { icon: Package, label: 'Cloud-based' }
];

export default function BusinessSoftwarePage() {
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
            <Link href="/ai-automation" className="text-sm font-medium hover:text-primary">AI Automation</Link>
            <Link href="/business-software" className="text-sm font-medium text-primary">Business Software</Link>
          </nav>
          <Button asChild>
            <Link href="/contact">Get Started</Link>
          </Button>
        </div>
      </header>

      {/* Hero */}
      <section className="py-24 bg-gradient-to-b from-emerald-500/10 to-background">
        <div className="container">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <Badge variant="outline" className="mb-4 border-emerald-500 text-emerald-500">
              Business Software
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Industry-Specific Solutions
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              Tailored business software for every industry. Streamline operations, 
              boost productivity, and drive growth with our specialized solutions.
            </p>
            <Button size="lg" asChild>
              <Link href="#industries">Explore Industries <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="py-12 bg-muted/30">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {features.map((feature) => (
              <div key={feature.label} className="flex items-center gap-3">
                <feature.icon className="h-6 w-6 text-emerald-500" />
                <span className="font-medium">{feature.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Industries */}
      <section id="industries" className="py-24">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold">Industries We Serve</h2>
            <p className="mt-4 text-muted-foreground">
              Specialized software solutions designed for your specific industry
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {industries.map((industry, index) => (
              <motion.div
                key={industry.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow border-emerald-100 dark:border-emerald-900">
                  <CardHeader>
                    <industry.icon className="h-10 w-10 text-emerald-500 mb-2" />
                    <CardTitle className="text-lg">{industry.title}</CardTitle>
                    <CardDescription>{industry.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {industry.solutions.map((solution) => (
                        <li key={solution} className="flex items-center gap-2 text-sm">
                          <CheckCircle2 className="h-4 w-4 text-emerald-500 flex-shrink-0" />
                          {solution}
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

      {/* Why Choose */}
      <section className="py-24 bg-muted/30">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Why Choose Our Business Software?</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold text-lg mb-2">Industry Expertise</h3>
                  <p className="text-muted-foreground">We understand the unique challenges of each industry and tailor solutions accordingly.</p>
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Scalable & Flexible</h3>
                  <p className="text-muted-foreground">Our software grows with your business, adapting to changing needs.</p>
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">24/7 Support</h3>
                  <p className="text-muted-foreground">Dedicated support team available round the clock to assist you.</p>
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Data Security</h3>
                  <p className="text-muted-foreground">Enterprise-grade security to protect your sensitive business data.</p>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: 'Industries', value: '8+' },
                { label: 'Clients', value: '200+' },
                { label: 'Uptime', value: '99.9%' },
                { label: 'Support', value: '24/7' }
              ].map((stat) => (
                <Card key={stat.label} className="text-center p-6">
                  <div className="text-3xl font-bold text-emerald-500">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-emerald-500 text-white">
        <div className="container text-center">
          <h2 className="text-3xl font-bold mb-4">Find the Right Solution</h2>
          <p className="text-emerald-100 mb-8 max-w-2xl mx-auto">
            Our team will help you choose the perfect software solution for your industry 
            and customize it to meet your specific needs.
          </p>
          <Button size="lg" variant="secondary" asChild>
            <Link href="/contact">Get a Free Consultation</Link>
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
