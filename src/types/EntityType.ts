export type User = {
    id: number;
    fname: string;
    lname: string;
    address: string;
    nic: string;
    email: string;
    password: string;
    mobile: string;
    user_role_id: number;
    gender_id: number;
    city_id: number;
    status_id: number;
    p_img?: string | null;
};

export type Gender = {
    id: number;
    name: string;
};

export type Status = {
    id: number;
    name: string;
};

export type UserRole = {
    id: number;
    name: string;
};

export type City = {
    id: number;
    name: string;
};

export type Response = {
    status: number;
    message: string;
    data: any;
}
// Category type for category endpoints
export type Category = {
    id: number;
    name: string;
};

// MotherPlantType type
export type MotherPlantType = {
    id: number;
    name: string;
};

// Size type
export type Size = {
    id: number;
    size: string;
    short_key: string;
};

// Product type
export type Product = {
    id: number;
    name: string;
    desc?: string | null;
    mother_plant_type_id: number;
    category_id: number;
    isActive: boolean;
};

// Product creation type for validation
export type ProductCreate = {
    name: string;
    desc?: string | null;
    mother_plant_type_id: number;
    category_id: number;
    isActive?: boolean;
};