import type { Response, ProductCreate, ProductImage } from '../types/EntityType.js';
export declare class ProductService {
    createProduct(product: ProductCreate): Promise<Response>;
    getAllProducts(): Promise<Response>;
    getPaginatedProducts(page: number, pageSize: number): Promise<{
        status: number;
        message: string;
        data: {
            products: {
                id: number;
                name: string;
                desc: string | null | undefined;
                mother_plant_type_id: number;
                category_id: number;
                isActive: boolean;
                productImage: string | null;
            }[];
            total: number;
            page: number;
            pageSize: number;
        };
    }>;
    getProductById(id: number): Promise<Response>;
    getProductDetailById(id: number): Promise<{
        status: number;
        message: string;
        data: null;
    } | {
        status: number;
        message: string;
        data: {
            batches: {
                images: ProductImage[];
                id: number;
                qty: number;
                price: number;
                cost: number;
                desc?: string | null;
                product_id: number;
                size_id: number;
                code: string;
                product_images: ProductImage[];
            }[];
            category: {
                id: number;
                name: string;
            };
            mother_plant_type: {
                id: number;
                name: string;
            };
            id: number;
            name: string;
            desc: string | null;
            mother_plant_type_id: number;
            category_id: number;
            isActive: boolean;
        };
    }>;
    deleteProduct(id: number): Promise<Response>;
    setCategory(name: string): Promise<Response>;
    getAllCategory(): Promise<Response>;
    getCategoryById(id: number): Promise<Response>;
    deleteCategory(id: number): Promise<Response>;
    setMotherPlantType(name: string): Promise<Response>;
    getAllMotherPlantType(): Promise<Response>;
    getMotherPlantTypeById(id: number): Promise<Response>;
    deleteMotherPlantType(id: number): Promise<Response>;
    setSize(size: string, short_key: string): Promise<Response>;
    getAllSize(): Promise<Response>;
    getSizeById(id: number): Promise<Response>;
    deleteSize(id: number): Promise<Response>;
}
//# sourceMappingURL=ProductService.d.ts.map