import express from "express";

import { initConnection } from "./core/database/connection";
import { setSwagger } from "./core/docs";
import { addressRoutes } from "./features/address/AddressRoutes";
import { categoryRoutes } from "./features/categories/CategoryRoutes";
import { productRoutes } from "./features/products/ProductRoutes";

const app = express();
app.use(express.json());

setSwagger(app);
app.use("/category", categoryRoutes);
app.use("/product", productRoutes);
app.use("/address", addressRoutes);

initConnection()
    .then(() => app.listen(8081, () => console.log("Server iniciou")))
    .catch((error) => {
        console.log("Error at creating connection with database");
        console.log(error);
    });
