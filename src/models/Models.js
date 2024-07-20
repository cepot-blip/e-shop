import { PrismaClient } from "@prisma/client";

export const UsersModel = new PrismaClient().user;
export const ProductModel = new PrismaClient().product;
export const AddressModel = new PrismaClient().address;
export const OrderModel = new PrismaClient().order;
export const CategoryModel = new PrismaClient().category;
export const OrderItemModel = new PrismaClient().orderItem;
export const TransactionModel = new PrismaClient().transaction;
