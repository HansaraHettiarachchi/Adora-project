import type { ReactNode } from "react";

export type Product = {
  id: number;
  name: string;
  type: string;
  price: number;
  quantity: number;
  image: string;
};


export interface DecodedUserData {
  userId: string;
  email: string;
  roleId: number;
  username: string;
  status: number;
  exp?: number;
}

export interface AuthProps {
  children?: ReactNode;
}


export type BE_Product = {
  id: number;
  name: string;
  desc: string;
  mother_plant_type_id: number;
  category_id: number;
  isActive: boolean;
  price: number;
  qty: number;
  imageUrl?: string | null;
}

export type Cart_Product = {
  p_id: number;
  qty: number;
  batch_id?: number;
}

export type Pagination = {
  page: number;
  pageSize: number;
  total: number;
}

export type BatchImage = {
  id: number;
  name: string;
  batch_id: number;
};

export type Batch = {
  id: number;
  qty: number;
  price: number;
  cost: number;
  desc: string;
  size: CommonIdName;
  code: string;
  images: BatchImage[];
};

export type CartFullProductDetails = {
  id: number;
  name: string;
  desc: string;
  mother_plant_type: { id: number; name: string };
  category: { id: number; name: string };
  isActive: boolean;
  batches: Batch[];
};


export type CommonIdName = {
  id: number;
  name: string;
}

export type SizeData = {
  id: number;
  name: string;
  batch_id: number;
}