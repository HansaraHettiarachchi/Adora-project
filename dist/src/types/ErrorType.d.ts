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
export type CategoryErr = {
    id?: string;
    name?: string;
};
export type MotherPlantTypeErr = {
    id?: string;
    name?: string;
};
export type SizeErr = {
    id?: string;
    size?: string;
    short_key?: string;
};
export type ProductErr = {
    id?: string;
    name?: string;
    desc?: string;
    mother_plant_type_id?: string;
    category_id?: string;
    isActive?: string;
};
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
export type PaymentMethodErr = {
    id?: string;
    name?: string;
};
export type InvoiceErr = {
    id?: string;
    total?: string;
    qty?: string;
    datetime?: string;
    discount?: string;
    payment_method_id?: string;
    users_id?: string;
    invoice_items?: string;
};
//# sourceMappingURL=ErrorType.d.ts.map