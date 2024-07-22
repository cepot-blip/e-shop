import express from "express";
import { catchAsync } from "../../../utils";
import { createAddress } from "../../controllers/Address/createAddress";
import { getAddress } from "../../controllers/Address/getAddress";
import { updateAddress } from "../../controllers/Address/updateAddress";
import { deleteAddress } from "../../controllers/Address/deleteAddress";

const address_routes = express.Router();

address_routes.post("/address", catchAsync(createAddress));
address_routes.get("/address", catchAsync(getAddress));
address_routes.put("/address", catchAsync(updateAddress));
address_routes.delete("/address/:id", catchAsync(deleteAddress));

export default address_routes;
