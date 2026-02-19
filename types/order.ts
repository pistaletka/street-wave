export interface BuyerInfo {
  name: string;
  phone: string;
  email: string;
  address: string;
  comment?: string;
}

export interface OrderItem {
  slug: string;
  title: string;
  price: number;
}

export interface Order {
  id: string;
  items: OrderItem[];
  buyer: BuyerInfo;
  total: number;
  createdAt: string;
}
