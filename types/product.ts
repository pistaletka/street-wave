export type ProductCategory = "sneakers" | "accessories" | "art-objects" | "clothing";

export type ProductStatus = "available" | "sold";

export interface Product {
  slug: string;
  title: string;
  category: ProductCategory;
  price: number;
  image: string;
  status: ProductStatus;
}

export interface ProductDetail extends Product {
  description: string;
  images: string[];
  specs?: { label: string; value: string }[];
}
