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
