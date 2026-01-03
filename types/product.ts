export interface ProductImage {
  product_image: string;
}

export interface ProductSize {
  size_id: number;
  variation_product_id: number;
  size_name: string;
  status: boolean;
  price: number;
}

export interface ProductColorVariation {
  color_id: number;
  color_name: string;
  color_images: string[];
  status: boolean;
  sizes: ProductSize[];
}

export interface Product {
  id: string;
  name: string;
  product_images: ProductImage[];
  variations_exist: boolean;
  variation_colors: ProductColorVariation[];
  sale_price: number;
  mrp: number;
  discount: number;
  new: boolean;
  out_of_stock: boolean;
  slug: string;
}
