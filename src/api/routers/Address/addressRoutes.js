import express from "express";
import { catchAsync } from "../../../utils";
import { createAddress } from "../../controllers/Address/createAddress";

const address_routes = express.Router();

address_routes.post("/address", catchAsync(createAddress));

export default address_routes;
