'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@elo-tech/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@elo-tech/ui/card';
import { Badge } from '@elo-tech/ui/badge';
import { Input } from '@elo-tech/ui/input';
import { Label } from '@elo-tech/ui/label';
import { Textarea } from '@elo-tech/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@elo-tech/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@elo-tech/ui/tabs';
import { 
  Truck, 
  Package, 
  MapPin, 
  Clock, 
  CheckCircle2, 
  XCircle,
  DollarSign,
  TrendingUp,
  Search,
  Plus,
  Navigation,
  Phone,
  User,
  Weight,
  Box,
  Star,
  ArrowRight,
  RefreshCw,
  AlertCircle,
  Car,
  Bike,
  Warehouse
} from 'lucide-react';
import Link from 'next/link';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';
const DEFAULT_TENANT_ID = 'demo-tenant-001';

interface Courier {
  id: string;
  name: string;
  logo: string;
  baseRate: number;
  ratePerKm: number;
  estimatedDays: number;
}

interface CourierQuote {
  courier: Courier;
  price: number;
  estimatedDelivery: string;
  currency: string;
}

interface TrackingEvent {
  status: string;
  location: string;
  timestamp: string;
  notes?: string;
}

interface Delivery {
  id: string;
  trackingNumber: string;
  recipientName: string;
  recipientPhone: string;
  pickupAddress: {
    street: string;
    city: string;
    county: string;
  };
  deliveryAddress: {
    street: string;
    city: string;
    county: string;
  };
  packageDetails: {
    weight: number;
    description: string;
    isFragile: boolean;
  };
  status: string;
  courierId: string | null;
  courierName: string | null;
  price: number | null;
  trackingHistory: TrackingEvent[];
  createdAt: string;
}

interface DeliveryStats {
  totalDeliveries: number;
  pendingDeliveries: number;
  inTransitDeliveries: number;
  deliveredToday: number;
  failedDeliveries: number;
  totalRevenue: number;
  averageDeliveryTime: number;
}

const statusColors: Record<string, string> = {
  PENDING: 'bg-yellow-500',
  QUOTE_REQUESTED: 'bg-blue-500',
  COURIER_ASSIGNED: 'bg-purple-500',
  PICKED_UP: 'bg-indigo-500',
  IN_TRANSIT: 'bg-orange-500',
  OUT_FOR_DELIVERY: 'bg-cyan-500',
  DELIVERED: 'bg-green-500',
  FAILED: 'bg-red-500',
  CANCELLED: 'bg-gray-500',
};

const statusLabels: Record<string, string> = {
  PENDING: 'Pending',
  QUOTE_REQUESTED: 'Quote Requested',
  COURIER_ASSIGNED: 'Courier Assigned',
  PICKED_UP: 'Picked Up',
  IN_TRANSIT: 'In Transit',
  OUT_FOR_DELIVERY: 'Out for Delivery',
  DELIVERED: 'Delivered',
  FAILED: 'Failed',
  CANCELLED: 'Cancelled',
};

const kenyanCounties = [
  'Nairobi', 'Mombasa', 'Kisumu', 'Nakuru', 'Eldoret', 'Thika', 'Malindi',
  'Kitale', 'Garissa', 'Nyeri', 'Machakos', 'Meru', 'Kericho', 'Migori'
];

export default function LogisticsDashboard() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [deliveries, setDeliveries] = useState<Delivery[]>([]);
  const [stats, setStats] = useState<DeliveryStats | null>(null);
  const [couriers, setCouriers] = useState<Courier[]>([]);
  const [loading, setLoading] = useState(true);
  const [trackingNumber, setTrackingNumber] = useState('');
  const [trackedDelivery, setTrackedDelivery] = useState<Delivery | null>(null);
  const [showNewDelivery, setShowNewDelivery] = useState(false);

  const [newDelivery, setNewDelivery] = useState({
    recipientName: '',
    recipientPhone: '',
    pickupStreet: '',
    pickupCity: 'Nairobi',
    pickupCounty: 'Nairobi',
    deliveryStreet: '',
    deliveryCity: 'Nairobi',
    deliveryCounty: 'Nairobi',
    packageWeight: 1,
    packageDescription: '',
    isFragile: false,
    specialInstructions: '',
  });

  const [quotes, setQuotes] = useState<CourierQuote[]>([]);
  const [selectedCourier, setSelectedCourier] = useState<string | null>(null);
  const [gettingQuotes, setGettingQuotes] = useState(false);
  const [creatingDelivery, setCreatingDelivery] = useState(false);
  const [deliveryCreated, setDeliveryCreated] = useState<Delivery | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const [couriersRes, deliveriesRes, statsRes] = await Promise.all([
        fetch(`${API_URL}/deliveries/couriers`),
        fetch(`${API_URL}/deliveries?tenantId=${DEFAULT_TENANT_ID}`),
        fetch(`${API_URL}/deliveries/stats?tenantId=${DEFAULT_TENANT_ID}`),
      ]);

      if (!couriersRes.ok || !deliveriesRes.ok || !statsRes.ok) {
        throw new Error('Failed to fetch data from server');
      }

      const couriersData = await couriersRes.json();
      const deliveriesData = await deliveriesRes.json();
      const statsData = await statsRes.json();

      setCouriers(couriersData);
      setDeliveries(deliveriesData || []);
      setStats(statsData);
    } catch (err) {
      console.error('Error fetching data:', err);
      setError('Failed to load dashboard data. Please ensure the API server is running on port 4000.');
    } finally {
      setLoading(false);
    }
  };

  const validateDelivery = (): boolean => {
    const errors: Record<string, string> = {};
    
    if (!newDelivery.recipientName.trim()) {
      errors.recipientName = 'Recipient name is required';
    }
    if (!newDelivery.recipientPhone.trim()) {
      errors.recipientPhone = 'Phone number is required';
    }
    if (!newDelivery.pickupStreet.trim()) {
      errors.pickupStreet = 'Pickup street is required';
    }
    if (!newDelivery.deliveryStreet.trim()) {
      errors.deliveryStreet = 'Delivery street is required';
    }
    if (!newDelivery.packageDescription.trim()) {
      errors.packageDescription = 'Package description is required';
    }
    if (newDelivery.packageWeight <= 0) {
      errors.packageWeight = 'Weight must be greater than 0';
    }
    
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const getQuotes = async () => {
    if (!validateDelivery()) return;
    
    setGettingQuotes(true);
    setError(null);
    try {
      const response = await fetch(`${API_URL}/deliveries/quotes`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          pickupAddress: {
            street: newDelivery.pickupStreet,
            city: newDelivery.pickupCity,
            county: newDelivery.pickupCounty,
          },
          deliveryAddress: {
            street: newDelivery.deliveryStreet,
            city: newDelivery.deliveryCity,
            county: newDelivery.deliveryCounty,
          },
          packageDetails: {
            weight: newDelivery.packageWeight,
            description: newDelivery.packageDescription,
            isFragile: newDelivery.isFragile,
          },
        }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to get quotes');
      }
      
      const data = await response.json();
      setQuotes(data);
    } catch (err) {
      console.error('Error getting quotes:', err);
      setError('Failed to get courier quotes. Please try again.');
    } finally {
      setGettingQuotes(false);
    }
  };

  const createDelivery = async () => {
    if (!selectedCourier) return;
    setCreatingDelivery(true);
    try {
      const response = await fetch(`${API_URL}/deliveries`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          recipientName: newDelivery.recipientName,
          recipientPhone: newDelivery.recipientPhone,
          pickupAddress: {
            street: newDelivery.pickupStreet,
            city: newDelivery.pickupCity,
            county: newDelivery.pickupCounty,
          },
          deliveryAddress: {
            street: newDelivery.deliveryStreet,
            city: newDelivery.deliveryCity,
            county: newDelivery.deliveryCounty,
          },
          packageDetails: {
            weight: newDelivery.packageWeight,
            description: newDelivery.packageDescription,
            isFragile: newDelivery.isFragile,
          },
          specialInstructions: newDelivery.specialInstructions,
          tenantId: DEFAULT_TENANT_ID,
        }),
      });
      const created = await response.json();

      await fetch(`${API_URL}/deliveries/assign`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          deliveryId: created._id || created.id,
          courierId: selectedCourier,
          tenantId: DEFAULT_TENANT_ID,
        }),
      });

      setDeliveryCreated(created);
      fetchData();
    } catch (error) {
      console.error('Error creating delivery:', error);
      setError('Failed to create delivery. Please try again.');
    } finally {
      setCreatingDelivery(false);
    }
  };

  const trackDelivery = async () => {
    if (!trackingNumber.trim()) {
      setError('Please enter a tracking number');
      return;
    }
    setError(null);
    setTrackedDelivery(null);
    try {
      const response = await fetch(
        `${API_URL}/deliveries/track/${trackingNumber}?tenantId=${DEFAULT_TENANT_ID}`
      );
      if (response.ok) {
        const data = await response.json();
        setTrackedDelivery(data);
      } else if (response.status === 404) {
        setError('No delivery found with this tracking number');
      } else {
        setError('Failed to track delivery. Please try again.');
      }
    } catch (error) {
      console.error('Error tracking delivery:', error);
      setError('Failed to track delivery. Please try again.');
    }
  };

  const resetNewDelivery = () => {
    setNewDelivery({
      recipientName: '',
      recipientPhone: '',
      pickupStreet: '',
      pickupCity: 'Nairobi',
      pickupCounty: 'Nairobi',
      deliveryStreet: '',
      deliveryCity: 'Nairobi',
      deliveryCounty: 'Nairobi',
      packageWeight: 1,
      packageDescription: '',
      isFragile: false,
      specialInstructions: '',
    });
    setQuotes([]);
    setSelectedCourier(null);
    setDeliveryCreated(null);
    setShowNewDelivery(false);
    setValidationErrors({});
    setError(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur shadow-sm">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center">
              <Truck className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
              LogiFlow
            </span>
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`text-sm font-medium transition-colors ${
                activeTab === 'dashboard' ? 'text-blue-600' : 'text-slate-600 hover:text-blue-600'
              }`}
            >
              Dashboard
            </button>
            <button
              onClick={() => setActiveTab('deliveries')}
              className={`text-sm font-medium transition-colors ${
                activeTab === 'deliveries' ? 'text-blue-600' : 'text-slate-600 hover:text-blue-600'
              }`}
            >
              Deliveries
            </button>
            <button
              onClick={() => setActiveTab('track')}
              className={`text-sm font-medium transition-colors ${
                activeTab === 'track' ? 'text-blue-600' : 'text-slate-600 hover:text-blue-600'
              }`}
            >
              Track
            </button>
            <button
              onClick={() => setActiveTab('create')}
              className={`text-sm font-medium transition-colors ${
                activeTab === 'create' ? 'text-blue-600' : 'text-slate-600 hover:text-blue-600'
              }`}
            >
              Create Delivery
            </button>
          </nav>
          <Button
            onClick={() => { setShowNewDelivery(true); setActiveTab('create'); }}
            className="bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600"
          >
            <Plus className="h-4 w-4 mr-2" />
            New Delivery
          </Button>
        </div>
      </header>

      <main className="container py-8">
        {/* Error Alert */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-3">
            <AlertCircle className="h-5 w-5 text-red-500 flex-shrink-0" />
            <p className="text-sm text-red-700">{error}</p>
            <button 
              onClick={() => setError(null)}
              className="ml-auto text-red-400 hover:text-red-600"
            >
              <XCircle className="h-5 w-5" />
            </button>
          </div>
        )}

        {/* Dashboard Tab */}
        {activeTab === 'dashboard' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Card className="bg-white shadow-sm border-l-4 border-l-blue-500">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-slate-500">Total Deliveries</p>
                      <p className="text-2xl font-bold">{stats?.totalDeliveries || 0}</p>
                    </div>
                    <Package className="h-8 w-8 text-blue-500" />
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-white shadow-sm border-l-4 border-l-yellow-500">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-slate-500">Pending</p>
                      <p className="text-2xl font-bold">{stats?.pendingDeliveries || 0}</p>
                    </div>
                    <Clock className="h-8 w-8 text-yellow-500" />
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-white shadow-sm border-l-4 border-l-orange-500">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-slate-500">In Transit</p>
                      <p className="text-2xl font-bold">{stats?.inTransitDeliveries || 0}</p>
                    </div>
                    <Truck className="h-8 w-8 text-orange-500" />
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-white shadow-sm border-l-4 border-l-green-500">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-slate-500">Delivered Today</p>
                      <p className="text-2xl font-bold">{stats?.deliveredToday || 0}</p>
                    </div>
                    <CheckCircle2 className="h-8 w-8 text-green-500" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Map Placeholder & Recent Deliveries */}
            <div className="grid lg:grid-cols-3 gap-6">
              {/* Map Placeholder */}
              <Card className="lg:col-span-2 bg-white shadow-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-blue-600" />
                    Live Delivery Map
                  </CardTitle>
                  <CardDescription>Real-time tracking of all active deliveries</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg flex flex-col items-center justify-center border-2 border-dashed border-blue-200">
                    <Navigation className="h-16 w-16 text-blue-300 mb-4" />
                    <p className="text-slate-500 font-medium">Map Integration Ready</p>
                    <p className="text-sm text-slate-400">Configure MAPS_API_KEY to enable</p>
                    <div className="mt-6 flex gap-4">
                      <div className="flex items-center gap-2 text-sm text-slate-500">
                        <div className="w-3 h-3 rounded-full bg-blue-500 animate-pulse" />
                        In Transit: {stats?.inTransitDeliveries || 0}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-slate-500">
                        <div className="w-3 h-3 rounded-full bg-yellow-500" />
                        Pending: {stats?.pendingDeliveries || 0}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Stats */}
              <Card className="bg-white shadow-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-green-600" />
                    Performance
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 bg-green-50 rounded-lg">
                    <p className="text-sm text-green-600 font-medium">Total Revenue</p>
                    <p className="text-2xl font-bold text-green-700">
                      KES {(stats?.totalRevenue || 0).toLocaleString()}
                    </p>
                  </div>
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <p className="text-sm text-blue-600 font-medium">Avg. Delivery Time</p>
                    <p className="text-2xl font-bold text-blue-700">
                      {stats?.averageDeliveryTime || 0} days
                    </p>
                  </div>
                  <div className="p-4 bg-red-50 rounded-lg">
                    <p className="text-sm text-red-600 font-medium">Failed Deliveries</p>
                    <p className="text-2xl font-bold text-red-700">
                      {stats?.failedDeliveries || 0}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Deliveries */}
            <Card className="bg-white shadow-sm">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Recent Deliveries</CardTitle>
                  <CardDescription>Latest delivery transactions</CardDescription>
                </div>
                <Button variant="outline" size="sm" onClick={() => setActiveTab('deliveries')}>
                  View All
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {deliveries.slice(0, 5).map((delivery) => (
                    <div
                      key={delivery.id}
                      className="flex items-center justify-between p-3 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-2 h-2 rounded-full ${statusColors[delivery.status]}`} />
                        <div>
                          <p className="font-medium text-sm">{delivery.trackingNumber}</p>
                          <p className="text-xs text-slate-500">
                            {delivery.recipientName} • {delivery.deliveryAddress.city}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge className={statusColors[delivery.status]}>
                          {statusLabels[delivery.status]}
                        </Badge>
                        {delivery.courierName && (
                          <p className="text-xs text-slate-500 mt-1">{delivery.courierName}</p>
                        )}
                      </div>
                    </div>
                  ))}
                  {deliveries.length === 0 && (
                    <div className="text-center py-8 text-slate-500">
                      <Package className="h-12 w-12 mx-auto mb-3 opacity-50" />
                      <p>No deliveries yet</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Deliveries Tab */}
        {activeTab === 'deliveries' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <Card className="bg-white shadow-sm">
              <CardHeader>
                <CardTitle>All Deliveries</CardTitle>
                <CardDescription>Manage and track all your deliveries</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {deliveries.map((delivery) => (
                    <div
                      key={delivery.id}
                      className="flex items-center justify-between p-4 bg-slate-50 rounded-lg hover:shadow-md transition-all"
                    >
                      <div className="flex items-center gap-4">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${statusColors[delivery.status]} bg-opacity-20`}>
                          <Truck className={`h-5 w-5 ${statusColors[delivery.status].replace('bg-', 'text-')}`} />
                        </div>
                        <div>
                          <p className="font-semibold">{delivery.trackingNumber}</p>
                          <div className="flex items-center gap-2 text-sm text-slate-500">
                            <User className="h-3 w-3" />
                            {delivery.recipientName}
                            <Phone className="h-3 w-3 ml-2" />
                            {delivery.recipientPhone}
                          </div>
                          <div className="flex items-center gap-2 text-sm text-slate-500 mt-1">
                            <MapPin className="h-3 w-3" />
                            {delivery.pickupAddress.city} → {delivery.deliveryAddress.city}
                          </div>
                        </div>
                      </div>
                      <div className="text-right space-y-2">
                        <Badge className={statusColors[delivery.status]}>
                          {statusLabels[delivery.status]}
                        </Badge>
                        {delivery.courierName && (
                          <p className="text-sm font-medium">{delivery.courierName}</p>
                        )}
                        {delivery.price && (
                          <p className="text-lg font-bold text-green-600">KES {delivery.price}</p>
                        )}
                      </div>
                    </div>
                  ))}
                  {deliveries.length === 0 && (
                    <div className="text-center py-12 text-slate-500">
                      <Package className="h-16 w-16 mx-auto mb-4 opacity-50" />
                      <p className="text-lg font-medium">No deliveries found</p>
                      <p className="text-sm">Create your first delivery to get started</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Track Tab */}
        {activeTab === 'track' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <Card className="bg-white shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Search className="h-5 w-5 text-blue-600" />
                  Track Your Delivery
                </CardTitle>
                <CardDescription>Enter your tracking number to get real-time updates</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex gap-3">
                  <Input
                    placeholder="Enter tracking number (e.g., ELG...)"
                    value={trackingNumber}
                    onChange={(e) => setTrackingNumber(e.target.value)}
                    className="flex-1"
                  />
                  <Button onClick={trackDelivery} className="bg-blue-600 hover:bg-blue-700">
                    Track
                  </Button>
                </div>

                {trackedDelivery && (
                  <div className="space-y-4">
                    <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-blue-600">Tracking Number</p>
                          <p className="text-2xl font-bold">{trackedDelivery.trackingNumber}</p>
                        </div>
                        <Badge className={`${statusColors[trackedDelivery.status]} text-lg px-4 py-2`}>
                          {statusLabels[trackedDelivery.status]}
                        </Badge>
                      </div>
                      {trackedDelivery.courierName && (
                        <p className="text-blue-700 mt-2">
                          Courier: {trackedDelivery.courierName}
                        </p>
                      )}
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="p-4 bg-slate-50 rounded-lg">
                        <p className="text-sm text-slate-500 mb-2">Pickup</p>
                        <p className="font-medium">{trackedDelivery.pickupAddress.street}</p>
                        <p className="text-slate-600">{trackedDelivery.pickupAddress.city}, {trackedDelivery.pickupAddress.county}</p>
                      </div>
                      <div className="p-4 bg-slate-50 rounded-lg">
                        <p className="text-sm text-slate-500 mb-2">Delivery</p>
                        <p className="font-medium">{trackedDelivery.deliveryAddress.street}</p>
                        <p className="text-slate-600">{trackedDelivery.deliveryAddress.city}, {trackedDelivery.deliveryAddress.county}</p>
                      </div>
                    </div>

                    <div>
                      <p className="font-semibold mb-3">Tracking History</p>
                      <div className="space-y-3">
                        {trackedDelivery.trackingHistory.map((event, index) => (
                          <div key={index} className="flex gap-3">
                            <div className="flex flex-col items-center">
                              <div className={`w-3 h-3 rounded-full ${statusColors[event.status]}`} />
                              {index < trackedDelivery.trackingHistory.length - 1 && (
                                <div className="w-0.5 h-12 bg-slate-200" />
                              )}
                            </div>
                            <div className="flex-1 pb-4">
                              <p className="font-medium">{statusLabels[event.status]}</p>
                              <p className="text-sm text-slate-500">{event.location}</p>
                              {event.notes && (
                                <p className="text-sm text-slate-400">{event.notes}</p>
                              )}
                              <p className="text-xs text-slate-400">
                                {new Date(event.timestamp).toLocaleString()}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {!trackedDelivery && trackingNumber && (
                  <div className="text-center py-8 text-slate-500">
                    <AlertCircle className="h-12 w-12 mx-auto mb-3 text-slate-400" />
                    <p>No delivery found with this tracking number</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Create Delivery Tab */}
        {activeTab === 'create' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <Card className="bg-white shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Plus className="h-5 w-5 text-blue-600" />
                  Create New Delivery
                </CardTitle>
                <CardDescription>Enter delivery details and compare courier quotes</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {deliveryCreated ? (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                      <CheckCircle2 className="h-8 w-8 text-green-600" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">Delivery Created Successfully!</h3>
                    <p className="text-slate-600 mb-4">
                      Your tracking number is: <span className="font-mono font-bold">{deliveryCreated.trackingNumber}</span>
                    </p>
                    <div className="flex gap-3 justify-center">
                      <Button onClick={resetNewDelivery} variant="outline">
                        Create Another
                      </Button>
                      <Button onClick={() => setActiveTab('track')} className="bg-blue-600">
                        Track Delivery
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {/* Recipient Info */}
                    <div className="space-y-4">
                      <h3 className="font-semibold text-lg">Recipient Information</h3>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Recipient Name</Label>
                          <Input
                            placeholder="John Doe"
                            value={newDelivery.recipientName}
                            onChange={(e) => setNewDelivery({ ...newDelivery, recipientName: e.target.value })}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Phone Number</Label>
                          <Input
                            placeholder="+254 700 000000"
                            value={newDelivery.recipientPhone}
                            onChange={(e) => setNewDelivery({ ...newDelivery, recipientPhone: e.target.value })}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Pickup Address */}
                    <div className="space-y-4">
                      <h3 className="font-semibold text-lg">Pickup Address</h3>
                      <div className="grid md:grid-cols-3 gap-4">
                        <div className="space-y-2 md:col-span-3">
                          <Label>Street Address</Label>
                          <Input
                            placeholder="123 Main Street, Building"
                            value={newDelivery.pickupStreet}
                            onChange={(e) => setNewDelivery({ ...newDelivery, pickupStreet: e.target.value })}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>City</Label>
                          <Select
                            value={newDelivery.pickupCity}
                            onValueChange={(value) => setNewDelivery({ ...newDelivery, pickupCity: value })}
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {kenyanCounties.map((county) => (
                                <SelectItem key={county} value={county}>{county}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label>County</Label>
                          <Select
                            value={newDelivery.pickupCounty}
                            onValueChange={(value) => setNewDelivery({ ...newDelivery, pickupCounty: value })}
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {kenyanCounties.map((county) => (
                                <SelectItem key={county} value={county}>{county}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>

                    {/* Delivery Address */}
                    <div className="space-y-4">
                      <h3 className="font-semibold text-lg">Delivery Address</h3>
                      <div className="grid md:grid-cols-3 gap-4">
                        <div className="space-y-2 md:col-span-3">
                          <Label>Street Address</Label>
                          <Input
                            placeholder="456 Oak Avenue, Apartment"
                            value={newDelivery.deliveryStreet}
                            onChange={(e) => setNewDelivery({ ...newDelivery, deliveryStreet: e.target.value })}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>City</Label>
                          <Select
                            value={newDelivery.deliveryCity}
                            onValueChange={(value) => setNewDelivery({ ...newDelivery, deliveryCity: value })}
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {kenyanCounties.map((county) => (
                                <SelectItem key={county} value={county}>{county}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label>County</Label>
                          <Select
                            value={newDelivery.deliveryCounty}
                            onValueChange={(value) => setNewDelivery({ ...newDelivery, deliveryCounty: value })}
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {kenyanCounties.map((county) => (
                                <SelectItem key={county} value={county}>{county}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>

                    {/* Package Details */}
                    <div className="space-y-4">
                      <h3 className="font-semibold text-lg">Package Details</h3>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Weight (kg)</Label>
                          <Input
                            type="number"
                            min="0.1"
                            step="0.1"
                            value={newDelivery.packageWeight}
                            onChange={(e) => setNewDelivery({ ...newDelivery, packageWeight: parseFloat(e.target.value) || 1 })}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Description</Label>
                          <Input
                            placeholder="Electronics, Documents, etc."
                            value={newDelivery.packageDescription}
                            onChange={(e) => setNewDelivery({ ...newDelivery, packageDescription: e.target.value })}
                          />
                        </div>
                        <div className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            id="fragile"
                            checked={newDelivery.isFragile}
                            onChange={(e) => setNewDelivery({ ...newDelivery, isFragile: e.target.checked })}
                            className="w-4 h-4"
                          />
                          <Label htmlFor="fragile" className="font-normal">Fragile items</Label>
                        </div>
                      </div>
                    </div>

                    {/* Special Instructions */}
                    <div className="space-y-2">
                      <Label>Special Instructions (Optional)</Label>
                      <Textarea
                        placeholder="Handle with care, call before delivery, etc."
                        value={newDelivery.specialInstructions}
                        onChange={(e) => setNewDelivery({ ...newDelivery, specialInstructions: e.target.value })}
                      />
                    </div>

                    {/* Get Quotes Button */}
                    <Button
                      onClick={getQuotes}
                      disabled={gettingQuotes || !newDelivery.recipientName || !newDelivery.recipientPhone || !newDelivery.pickupStreet || !newDelivery.deliveryStreet}
                      className="w-full bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600"
                    >
                      {gettingQuotes ? (
                        <>
                          <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                          Getting Quotes...
                        </>
                      ) : (
                        <>
                          <DollarSign className="h-4 w-4 mr-2" />
                          Compare Courier Prices
                        </>
                      )}
                    </Button>

                    {/* Quotes Display */}
                    {quotes.length > 0 && (
                      <div className="space-y-4">
                        <h3 className="font-semibold text-lg">Available Couriers</h3>
                        <div className="grid md:grid-cols-2 gap-4">
                          {quotes.map((quote) => (
                            <div
                              key={quote.courier.id}
                              onClick={() => setSelectedCourier(quote.courier.id)}
                              className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                                selectedCourier === quote.courier.id
                                  ? 'border-blue-500 bg-blue-50'
                                  : 'border-slate-200 hover:border-blue-300'
                              }`}
                            >
                              <div className="flex items-center justify-between mb-3">
                                <div className="flex items-center gap-3">
                                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                                    <Truck className="h-5 w-5 text-white" />
                                  </div>
                                  <div>
                                    <p className="font-semibold">{quote.courier.name}</p>
                                    <p className="text-xs text-slate-500">{quote.courier.estimatedDays} day(s)</p>
                                  </div>
                                </div>
                                <div className="text-right">
                                  <p className="text-xl font-bold text-green-600">KES {quote.price}</p>
                                  <div className="flex items-center gap-1 text-xs text-slate-500">
                                    <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                                    <span>4.8</span>
                                  </div>
                                </div>
                              </div>
                              <div className="flex items-center gap-4 text-sm text-slate-600">
                                <div className="flex items-center gap-1">
                                  <Weight className="h-3 w-3" />
                                  Base: KES {quote.courier.baseRate}
                                </div>
                                <div className="flex items-center gap-1">
                                  <Car className="h-3 w-3" />
                                  KES {quote.courier.ratePerKm}/km
                                </div>
                              </div>
                              {selectedCourier === quote.courier.id && (
                                <div className="mt-3 pt-3 border-t border-blue-200">
                                  <p className="text-sm text-blue-600">
                                    Est. delivery: {new Date(quote.estimatedDelivery).toLocaleDateString()}
                                  </p>
                                </div>
                              )}
                            </div>
                          ))}
                        </div>

                        {/* Create Delivery Button */}
                        <Button
                          onClick={createDelivery}
                          disabled={creatingDelivery || !selectedCourier}
                          className="w-full bg-gradient-to-r from-green-600 to-emerald-500 hover:from-green-700 hover:to-emerald-600"
                        >
                          {creatingDelivery ? (
                            <>
                              <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                              Creating Delivery...
                            </>
                          ) : (
                            <>
                              <CheckCircle2 className="h-4 w-4 mr-2" />
                              Confirm & Create Delivery
                            </>
                          )}
                        </Button>
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t py-8 mt-12 bg-white">
        <div className="container">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center">
                <Truck className="h-5 w-5 text-white" />
              </div>
              <span className="text-lg font-bold">LogiFlow</span>
            </div>
            <p className="text-sm text-slate-500">
              Logistics Aggregator Dashboard • Built with Elo Tech
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
