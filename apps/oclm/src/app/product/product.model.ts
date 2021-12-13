export interface Order {
  id: number;
  is_deleted?: Date;
  created_at: Date;
  updated_at: Date;
}

export interface ProductModel {
  id: number;
  is_deleted?: Date;
  created_at: Date;
  updated_at: Date;
  name: string;
  description: string;
  image?: string;
  price: string;
  orders: Order[];
}

export interface Meta {
  total: number;
  page: number;
  last_page: number;
}

export interface ProductResponse {
  data: ProductModel[];
  meta: Meta;
}
