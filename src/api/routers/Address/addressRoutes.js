import express from "express";
import { catchAsync } from "../../../utils";
import { createAddress } from "../../controllers/Address/createAddress";
import { getAddres } from "../../controllers/Address/getAddress";

const address_routes = express.Router();

address_routes.post("/address", catchAsync(createAddress));
address_routes.get("/address", catchAsync(getAddres));

export default address_routes;
