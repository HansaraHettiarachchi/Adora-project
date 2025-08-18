export type UserErr = {
    id?: string;
    fname?: string;
    lname?: string;
    address?: string;
    nic?: string;
    email?: string;
    password?: string;
    mobile?: string;
    user_role_id?: string;
    gender_id?: string;
    city_id?: string;
    status_id?: string;
    p_img?: string | null;
};

// Category error type
export type CategoryErr = {
    id?: string;
    name?: string;
};

// MotherPlantType error type
export type MotherPlantTypeErr = {
    id?: string;
    name?: string;
};

// Size error type
export type SizeErr = {
    id?: string;
    size?: string;
    short_key?: string;
};

// Product error type
export type ProductErr = {
    id?: string;
    name?: string;
    desc?: string;
    mother_plant_type_id?: string;
    category_id?: string;
    isActive?: string;
};

// Stock error type
export type StockErr = {
    id?: string;
    product_id?: string;
    qty?: string;
    cost?: string;
    price?: string;
    size_id?: string;
    code?: string;
    images?: string;
};

// Supplier error type
export type SupplierErr = {
    id?: string;
    fullname?: string;
    company?: string;
    address?: string;
    mobile?: string;
    email?: string;
    isActive?: boolean;
    status_id?: string;
    gender_id?: string;
    city_id?: string;
};

// PaymentMethod error type
export type PaymentMethodErr = {
    id?: string;
    name?: string;
};
