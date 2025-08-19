/**
 * INSTRUCTIONS FOR MAINTAINING AND EXTENDING ProductRoutes.ts
 *
 * Purpose:
 *   - This file defines all Express routes for product, category, mother plant type, and size management.
 *   - Each route connects HTTP endpoints to ProductController methods for CRUD and query operations.
 *
 * Structure:
 *   - Uses Express Router.
 *   - Instantiates ProductController as 'controller'.
 *   - Each route is documented with JSDoc comments specifying method, endpoint, description, and request details.
 *
 * Route Groups:
 *   1. Products
 *      - GET /products: Paginated list (query: page, pageSize)
 *      - GET /product-detail/:id: Nested product detail by ID
 *      - POST /create-product: Create new product
 *      - GET /get-all-products: All products
 *      - GET /get-product-by-id/:id: Product by ID
 *      - DELETE /delete-product/:id: Delete product by ID
 *   2. Categories
 *      - POST /set-category: Create category
 *      - GET /get-all-category: All categories
 *      - GET /get-category-by-id/:id: Category by ID
 *      - DELETE /delete-category/:id: Delete category
 *   3. Mother Plant Types
 *      - POST /set-mother-plant-type: Create mother plant type
 *      - GET /get-all-mother-plant-type: All mother plant types
 *      - GET /get-mother-plant-type-by-id/:id: Mother plant type by ID
 *      - DELETE /delete-mother-plant-type/:id: Delete mother plant type
 *   4. Sizes
 *      - POST /set-size: Create size
 *      - GET /get-all-size: All sizes
 *      - GET /get-size-by-id/:id: Size by ID
 *      - DELETE /delete-size/:id: Delete size
 *
 * Error Handling:
 *   - All routes use try/catch.
 *   - On error, respond with status 500 and a JSON error message.
 *
 * Adding New Routes:
 *   - Add a JSDoc comment above the route for documentation.
 *   - Use productRoutes.<method>(<path>, async (req, res) => { ... })
 *   - Call the appropriate method on 'controller'.
 *   - Handle errors as shown in existing routes.
 *
 * Export:
 *   - The router is exported as default for use in the main app.
 *
 * Follow this structure and style for consistency and maintainability when updating or adding routes.
 */
declare const productRoutes: import("express-serve-static-core").Router;
export default productRoutes;
//# sourceMappingURL=ProductRoutes.d.ts.map