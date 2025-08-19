export type ProductWithBatch = {
    id: number;
    name: string;
    desc?: string | null;
    mother_plant_type_id: number;
    category_id: number;
    isActive: boolean;
    batch: Batch[];
};
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
};
export type Category = {
    id: number;
    name: string;
};
export type MotherPlantType = {
    id: number;
    name: string;
};
export type Size = {
    id: number;
    size: string;
    short_key: string;
};
export type Product = {
    id: number;
    name: string;
    desc?: string | null;
    mother_plant_type_id: number;
    category_id: number;
    isActive: boolean;
    productImage?: string | null;
};
export type ProductCreate = {
    name: string;
    desc?: string | null;
    mother_plant_type_id: number;
    category_id: number;
    isActive?: boolean;
};
export type ProductImage = {
    id: number;
    name: string;
    batch_id: number;
};
export type Batch = {
    id: number;
    qty: number;
    price: number;
    cost: number;
    desc?: string | null;
    product_id: number;
    size_id: number;
    code: string;
    product_images: ProductImage[];
};
export type PaginatedProductResponse = {
    status: number;
    message: string;
    data: {
        products: Product[];
        total: number;
        page: number;
        pageSize: number;
    };
};
export type ProductDetailResponse = {
    status: number;
    message: string;
    data: {
        id: number;
        name: string;
        desc?: string | null;
        mother_plant_type_id: number;
        category_id: number;
        isActive: boolean;
        productImage?: string | null;
        batch: Batch[];
    };
};
export type Stock = {
    id: number;
    product_id: number;
    qty: number;
    cost?: number;
    price?: number;
    size_id?: number;
    code?: string;
};
export type Supplier = {
    id: number;
    fullname: string;
    company: string;
    address: string;
    mobile: string;
    email: string;
    isActive: boolean;
    status_id: number;
    gender_id: number;
    city_id: number;
};
export type PaymentMethod = {
    id: number;
    name: string;
};
export type Invoice = {
    id: number;
    total: number;
    qty: number;
    datetime: string;
    discount: number;
    payment_method_id: number;
    users_id: number;
    payment_method?: PaymentMethod;
    users?: User;
    invoice_items?: InvoiceItem[];
};
export type InvoiceItem = {
    id: number;
    price: number;
    cost: number;
    product_id: number;
    qty: number;
    batch_id: number;
    invoice_id: number;
    product_type_id: number;
    product_type?: ProductType;
};
export type ProductType = {
    id: number;
    name: string;
};
//# sourceMappingURL=EntityType.d.ts.map