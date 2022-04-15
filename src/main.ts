import express from "express";

import { initConnection } from "./core/database/connection";
import { setSwagger } from "./core/docs";
import { JwtService } from "./core/services/auth/jwt.service";
import { addressRoutes } from "./features/address/AddressRoutes";
import { categoryRoutes } from "./features/categories/CategoryRoutes";
import { productRoutes } from "./features/products/ProductRoutes";

const app = express();
app.use(express.json());

setSwagger(app);
app.use("/category", categoryRoutes);
app.use("/product", productRoutes);
app.use("/address", addressRoutes);

// initConnection()
//     .then(() => app.listen(8081, () => console.log("Server iniciou")))
//     .catch((error) => {
//         console.log("Error at creating connection with database");
//         console.log(error);
//     });

const payload = {
    username: "samuel addams",
    cpf: 123,
};

//const token = JwtService.createToken(payload);
const tokenJwt = JwtService.createTokenJwt(payload);
console.log(tokenJwt);

const decodedToken = JwtService.decodeTokenJwt(tokenJwt);
console.log(decodedToken);

const wrongToken =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InNhbXVlbCBhZGRhbXMiLCJjcGYiOjEyMywiaWF0IjoxNjQ5OTc5NjM2fQ.HwxhtT2SwcFj64cZ1uBVvIlWcMONLZWSXjOx8gMlMJI";
const verifiedToken = JwtService.verifyTokenJwt(wrongToken);
console.log(verifiedToken);
