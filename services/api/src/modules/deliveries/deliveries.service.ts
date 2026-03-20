import { Injectable, NotFoundException } from '@nestjs/common';
import { ConvexService } from '../../database/convex/convex.service';
import { CreateDeliveryDto, DeliveryStatus, DeliveryAddress, PackageDetails } from './dto/delivery.dto';

export interface Courier {
  id: string;
  name: string;
  logo: string;
  baseRate: number;
  ratePerKm: number;
  estimatedDays: number;
}

export interface CourierQuote {
  courier: Courier;
  price: number;
  estimatedDelivery: Date;
  currency: string;
}

export interface TrackingEvent {
  status: DeliveryStatus;
  location: string;
  timestamp: Date;
  notes?: string;
}

export interface Delivery {
  id: string;
  trackingNumber: string;
  recipientName: string;
  recipientPhone: string;
  pickupAddress: DeliveryAddress;
  deliveryAddress: DeliveryAddress;
  packageDetails: PackageDetails;
  status: DeliveryStatus;
  courierId: string | null;
  courierName: string | null;
  price: number | null;
  specialInstructions: string | null;
  orderId: string | null;
  trackingHistory: TrackingEvent[];
  tenantId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface DeliveryStats {
  totalDeliveries: number;
  pendingDeliveries: number;
  inTransitDeliveries: number;
  deliveredToday: number;
  failedDeliveries: number;
  totalRevenue: number;
  averageDeliveryTime: number;
}

@Injectable()
export class DeliveriesService {
  private mockCouriers: Courier[] = [
    {
      id: 'courier-1',
      name: 'SpeedPost',
      logo: '/couriers/speedpost.png',
      baseRate: 250,
      ratePerKm: 15,
      estimatedDays: 1,
    },
    {
      id: 'courier-2',
      name: 'EcoDeliver',
      logo: '/couriers/ecodeliver.png',
      baseRate: 150,
      ratePerKm: 10,
      estimatedDays: 2,
    },
    {
      id: 'courier-3',
      name: 'Premier Logistics',
      logo: '/couriers/premier.png',
      baseRate: 350,
      ratePerKm: 20,
      estimatedDays: 1,
    },
    {
      id: 'courier-4',
      name: 'Budget Cargo',
      logo: '/couriers/budget.png',
      baseRate: 100,
      ratePerKm: 8,
      estimatedDays: 3,
    },
  ];

  constructor(private convex: ConvexService) {}

  async getCourierQuotes(pickup: DeliveryAddress, delivery: DeliveryAddress, pkg: PackageDetails): Promise<CourierQuote[]> {
    const distance = this.calculateDistance(pickup, delivery);
    const weightFactor = pkg.weight <= 1 ? 1 : pkg.weight <= 5 ? 1.5 : pkg.weight <= 20 ? 2 : 3;

    return this.mockCouriers.map(courier => {
      const price = Math.round((courier.baseRate + (distance * courier.ratePerKm)) * weightFactor);
      const estimatedDate = new Date();
      estimatedDate.setDate(estimatedDate.getDate() + courier.estimatedDays);

      return {
        courier,
        price,
        estimatedDelivery: estimatedDate,
        currency: 'KES',
      };
    }).sort((a, b) => a.price - b.price);
  }

  private calculateDistance(from: DeliveryAddress, to: DeliveryAddress): number {
    if (from.latitude && from.longitude && to.latitude && to.longitude) {
      const R = 6371;
      const dLat = this.toRad(to.latitude - from.latitude);
      const dLon = this.toRad(to.longitude - from.longitude);
      const lat1 = this.toRad(from.latitude);
      const lat2 = this.toRad(to.latitude);

      const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      return R * c;
    }

    return Math.floor(Math.random() * 20) + 1;
  }

  private toRad(deg: number): number {
    return deg * (Math.PI / 180);
  }

  async createDelivery(dto: CreateDeliveryDto) {
    const trackingNumber = this.generateTrackingNumber();
    const trackingHistory: TrackingEvent[] = [
      {
        status: DeliveryStatus.PENDING,
        location: dto.pickupAddress.city,
        timestamp: new Date(),
        notes: 'Delivery created',
      },
    ];

    return this.convex.mutation<Delivery>('deliveries:create', {
      trackingNumber,
      recipientName: dto.recipientName,
      recipientPhone: dto.recipientPhone,
      pickupAddress: dto.pickupAddress,
      deliveryAddress: dto.deliveryAddress,
      packageDetails: dto.packageDetails,
      status: DeliveryStatus.PENDING,
      courierId: null,
      courierName: null,
      price: null,
      specialInstructions: dto.specialInstructions,
      orderId: dto.orderId,
      trackingHistory,
      tenantId: dto.tenantId,
    });
  }

  private generateTrackingNumber(): string {
    const prefix = 'ELG';
    const timestamp = Date.now().toString(36).toUpperCase();
    const random = Math.random().toString(36).substring(2, 6).toUpperCase();
    return `${prefix}${timestamp}${random}`;
  }

  async findAll(tenantId: string, filters?: { status?: DeliveryStatus; recipientPhone?: string; courierId?: string }) {
    return this.convex.query<Delivery[]>('deliveries:findAll', { tenantId, filters });
  }

  async findById(id: string, tenantId: string) {
    const delivery = await this.convex.query<Delivery | null>('deliveries:findById', { id, tenantId });
    if (!delivery) throw new NotFoundException('Delivery not found');
    return delivery;
  }

  async findByTrackingNumber(trackingNumber: string, tenantId: string) {
    const delivery = await this.convex.query<Delivery | null>('deliveries:findByTrackingNumber', { trackingNumber, tenantId });
    if (!delivery) throw new NotFoundException('Delivery not found');
    return delivery;
  }

  async assignCourier(deliveryId: string, courierId: string, tenantId: string) {
    const delivery = await this.findById(deliveryId, tenantId);
    const courier = this.mockCouriers.find(c => c.id === courierId);
    
    if (!courier) {
      throw new NotFoundException('Courier not found');
    }

    const quotes = await this.getCourierQuotes(delivery.pickupAddress, delivery.deliveryAddress, delivery.packageDetails);
    const quote = quotes.find(q => q.courier.id === courierId);

    const trackingEvent: TrackingEvent = {
      status: DeliveryStatus.COURIER_ASSIGNED,
      location: delivery.pickupAddress.city,
      timestamp: new Date(),
      notes: `Assigned to ${courier.name}`,
    };

    return this.convex.mutation<Delivery>('deliveries:assignCourier', {
      id: deliveryId,
      courierId,
      courierName: courier.name,
      price: quote?.price || courier.baseRate,
      trackingHistory: [...delivery.trackingHistory, trackingEvent],
      tenantId,
    });
  }

  async updateStatus(id: string, tenantId: string, status: DeliveryStatus, notes?: string, location?: string) {
    const delivery = await this.findById(id, tenantId);

    const trackingEvent: TrackingEvent = {
      status,
      location: location || delivery.deliveryAddress.city,
      timestamp: new Date(),
      notes,
    };

    return this.convex.mutation<Delivery>('deliveries:updateStatus', {
      id,
      status,
      trackingHistory: [...delivery.trackingHistory, trackingEvent],
      tenantId,
    });
  }

  async getStats(tenantId: string) {
    return this.convex.query<DeliveryStats>('deliveries:getStats', { tenantId });
  }

  async getCouriers(): Promise<Courier[]> {
    return this.mockCouriers;
  }

  async cancelDelivery(id: string, tenantId: string) {
    return this.updateStatus(id, tenantId, DeliveryStatus.CANCELLED, 'Delivery cancelled by user');
  }

  async trackDelivery(trackingNumber: string, tenantId: string) {
    return this.findByTrackingNumber(trackingNumber, tenantId);
  }
}
