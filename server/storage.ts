import { orders, hostels, flavors, type Order, type InsertOrder, type Hostel, type Flavor } from "@shared/schema";

export interface IStorage {
  createOrder(order: InsertOrder): Promise<Order>;
  getOrder(id: number): Promise<Order | undefined>;
  getHostels(): Promise<Hostel[]>;
  getFlavors(): Promise<Flavor[]>;
}

export class MemStorage implements IStorage {
  private orders: Map<number, Order>;
  private hostels: Map<number, Hostel>;
  private flavors: Map<number, Flavor>;
  private currentOrderId: number;
  private currentHostelId: number;
  private currentFlavorId: number;

  constructor() {
    this.orders = new Map();
    this.hostels = new Map();
    this.flavors = new Map();
    this.currentOrderId = 1;
    this.currentHostelId = 1;
    this.currentFlavorId = 1;
    
    this.initializeData();
  }

  private initializeData() {
    // Initialize hostels
    const hostelData = [
      { name: "Sunrise Hostel", value: "sunrise-hostel" },
      { name: "Golden Inn", value: "golden-inn" },
      { name: "Morning Lodge", value: "morning-lodge" },
      { name: "Dawn Residence", value: "dawn-residence" },
      { name: "Daybreak Hostel", value: "daybreak-hostel" },
    ];

    hostelData.forEach(hostel => {
      const id = this.currentHostelId++;
      this.hostels.set(id, { id, ...hostel });
    });

    // Initialize flavors with user-requested flavors
    const flavorData = [
      { name: "Plain", value: "plain", emoji: "🥞" },
      { name: "Cinnamon", value: "cinnamon", emoji: "🎂" },
      { name: "Orange", value: "orange", emoji: "🍊" },
      { name: "Lemon", value: "lemon", emoji: "🍋" },
      { name: "Pineapple", value: "pineapple", emoji: "🍍" },
      { name: "Vanilla", value: "vanilla", emoji: "🤍" },
    ];

    flavorData.forEach(flavor => {
      const id = this.currentFlavorId++;
      this.flavors.set(id, { id, ...flavor });
    });
  }

  async createOrder(insertOrder: InsertOrder): Promise<Order> {
    const id = this.currentOrderId++;
    
    // Calculate total price (8 per stack, 15 for 2 stacks)
    const total = insertOrder.quantity === 2 ? 1500 : insertOrder.quantity * 800; // in cents
    
    const order: Order = {
      id,
      hostel: "default", // Default hostel since dropdown is removed
      room: insertOrder.room,
      quantity: insertOrder.quantity,
      flavors: insertOrder.flavors,
      customerName: null,
      phoneNumber: null,
      total,
      status: "pending",
    };
    
    this.orders.set(id, order);
    return order;
  }

  async getOrder(id: number): Promise<Order | undefined> {
    return this.orders.get(id);
  }

  async getHostels(): Promise<Hostel[]> {
    return Array.from(this.hostels.values());
  }

  async getFlavors(): Promise<Flavor[]> {
    return Array.from(this.flavors.values());
  }
}

export const storage = new MemStorage();
