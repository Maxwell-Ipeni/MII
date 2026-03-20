'use client';

import { motion } from 'framer-motion';
import { Button } from '@elo-tech/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@elo-tech/ui/card';
import { Badge } from '@elo-tech/ui/badge';
import { 
  ShoppingCart, 
  TrendingUp, 
  Users, 
  Package, 
  CreditCard, 
  BarChart3,
  Zap,
  Brain,
  Bot,
  Sparkles,
  Globe,
  Code2,
  Smartphone,
  Cloud,
  Shield,
  ArrowRight,
  CheckCircle2,
  Star
} from 'lucide-react';
import Link from 'next/link';

const saasProducts = [
  {
    id: 'pos',
    name: 'SmartPOS',
    description: 'Complete point of sale system for retail and hospitality',
    price: 'KES 2,500/mo',
    icon: ShoppingCart,
    features: ['Inventory Management', 'Sales Tracking', 'Multi-branch Support', 'M-Pesa Integration', 'Barcode Scanning', 'Employee Management'],
    badge: 'Popular',
    color: 'bg-blue-500'
  },
  {
    id: 'crm',
    name: 'CustomerHub',
    description: 'Customer relationship management for growing businesses',
    price: 'KES 1,800/mo',
    icon: Users,
    features: ['Contact Management', 'Lead Tracking', 'Email Campaigns', 'Analytics Dashboard', 'Sales Pipelines', 'Automation'],
    badge: 'New',
    color: 'bg-green-500'
  },
  {
    id: 'inventory',
    name: 'StockPro',
    description: 'Real-time inventory management system',
    price: 'KES 1,500/mo',
    icon: Package,
    features: ['Real-time Stock', 'Low Stock Alerts', 'Barcode Scanning', 'Supplier Management', 'Purchase Orders', 'Stock Reports'],
    badge: null,
    color: 'bg-purple-500'
  },
  {
    id: 'accounting',
    name: 'FinanceFlow',
    description: 'Simple accounting software for small businesses',
    price: 'KES 3,000/mo',
    icon: CreditCard,
    features: ['Invoice Management', 'Expense Tracking', 'Financial Reports', 'Tax Preparation', 'Bank Integration', 'Multi-currency'],
    badge: null,
    color: 'bg-orange-500'
  },
  {
    id: 'analytics',
    name: 'DataViz',
    description: 'Business intelligence and analytics platform',
    price: 'KES 2,200/mo',
    icon: BarChart3,
    features: ['Custom Dashboards', 'Data Visualization', 'Real-time Reports', 'Export to Excel', 'Scheduled Reports', 'API Access'],
    badge: 'Featured',
    color: 'bg-red-500'
  },
  {
    id: 'hr',
    name: 'HRConnect',
    description: 'Human resources management system',
    price: 'KES 2,800/mo',
    icon: Users,
    features: ['Employee Database', 'Leave Management', 'Payroll Integration', 'Performance Reviews', 'Recruitment', 'Training'],
    badge: null,
    color: 'bg-teal-500'
  }
];

export default function ProductsPage() {
  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-white font-bold text-lg">E</span>
            </div>
            <span className="text-xl font-bold">Elo Tech</span>
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/products" className="text-sm font-medium text-primary">Products</Link>
            <Link href="/services" className="text-sm font-medium hover:text-primary">Services</Link>
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
            <Badge variant="secondary" className="mb-4">SaaS Products</Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Ready-to-Use Software Solutions
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              Accelerate your business with our suite of production-ready SaaS products. 
              From point of sale to CRM, we have everything you need to succeed.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link href="#products">View All Products <ArrowRight className="ml-2 h-4 w-4" /></Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/contact">Request Demo</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Products Grid */}
      <section id="products" className="py-24">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold">Our SaaS Products</h2>
            <p className="mt-4 text-muted-foreground">Choose the perfect solution for your business</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {saasProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full flex flex-col hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center justify-between mb-4">
                      <div className={`h-12 w-12 rounded-lg ${product.color} flex items-center justify-center`}>
                        <product.icon className="h-6 w-6 text-white" />
                      </div>
                      {product.badge && (
                        <Badge variant={product.badge === 'Popular' ? 'default' : product.badge === 'New' ? 'secondary' : 'outline'}>
                          {product.badge}
                        </Badge>
                      )}
                    </div>
                    <CardTitle className="text-xl">{product.name}</CardTitle>
                    <CardDescription>{product.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-1">
                    <div className="text-2xl font-bold text-primary mb-4">{product.price}</div>
                    <ul className="space-y-2">
                      {product.features.slice(0, 4).map((feature) => (
                        <li key={feature} className="flex items-center gap-2 text-sm">
                          <CheckCircle2 className="h-4 w-4 text-secondary flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                      {product.features.length > 4 && (
                        <li className="text-sm text-muted-foreground">+{product.features.length - 4} more features</li>
                      )}
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full" asChild>
                      <Link href={product.id === 'logistics' ? '/logistics' : `/products/${product.id}`}>Start Free Trial</Link>
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-primary text-primary-foreground">
        <div className="container text-center">
          <h2 className="text-3xl font-bold mb-4">Need a Custom Solution?</h2>
          <p className="text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
            We also offer custom software development tailored to your specific needs.
          </p>
          <Button size="lg" variant="secondary" asChild>
            <Link href="/contact">Talk to an Expert</Link>
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
