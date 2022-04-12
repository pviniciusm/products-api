import { Request, Response, Router } from "express";
import { AddressController } from "./AddressController";

const addressRoutes = Router();

addressRoutes.get("/", async (req: Request, res: Response) => {
    try {
        const result = await new AddressController().list();

        return res.status(200).send(result); 
    } catch(error) {
        return res.status(500).send({
            ok: false,
            error
        });
    }
});

addressRoutes.post("/", async (req: Request, res: Response) => {
    try {
        const { uid, street, number } = req.body;
        const result = await new AddressController().create(uid, street, number);

        return res.status(200).send(result); 
    } catch(error) {
        return res.status(500).send({
            ok: false,
            error
        });
    }
});

export { addressRoutes };