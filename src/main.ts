import express from "express";

import { initConnection } from "./core/database/connection";
import { setSwagger } from "./core/docs";
import { addressRoutes } from "./features/address/AddressRoutes";
import { categoryRoutes } from "./features/categories/CategoryRoutes";
import { productRoutes } from "./features/products/ProductRoutes";
import authRoutes from "./features/auth/AuthRoutes";
import postsRoutes from "./features/posts/PostsRoutes";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();
app.use(
    cors({
        origin: "http://localhost:3000",
        credentials: true,
        exposedHeaders: ["authorization"],
    })
);
app.use(express.json());
app.use(cookieParser());

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header("Access-Control-Allow-Credentials", "true");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
});

setSwagger(app);
app.use("/auth", authRoutes);

// area logada
app.use("/category", categoryRoutes);
app.use("/product", productRoutes);
app.use("/address", addressRoutes);
app.use("/posts", postsRoutes);

initConnection()
    .then(() => app.listen(8081, () => console.log("Server iniciou")))
    .catch((error) => {
        console.log("Error at creating connection with database");
        console.log(error);
    });
