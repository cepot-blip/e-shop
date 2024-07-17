import address_routes from "./Address/addressRoutes";
import users_routes from "./Users/usersRoutes";

const routes = [users_routes, address_routes];

const router = (app) => {
  routes.forEach((route) => {
    app.use("/api_v1", route);
  });
};

export default router;
