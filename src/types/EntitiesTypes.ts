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
}