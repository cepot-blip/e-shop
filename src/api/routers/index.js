import address_routes from "./Address/addressRoutes";
import category_routes from "./Category/categoryRoutes";
import product_routes from "./Product/productRoutes";
import users_routes from "./Users/usersRoutes";

const routes = [users_routes, address_routes, product_routes, category_routes];

const router = (app) => {
  routes.forEach((route) => {
    app.use("/api_v1", route);
  });
};

export default router;
