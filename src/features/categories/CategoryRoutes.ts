import { Request, Response, Router } from "express";
import { CategoryController } from "./CategoryController";

const categoryRoutes = Router();

categoryRoutes.get("/", async (req: Request, res: Response) => {
    try {
        const result = await new CategoryController().list();

        return res.status(200).send(result); 
    } catch(error) {
        return res.status(500).send({
            ok: false,
            error
        });
    }
});

categoryRoutes.post("/", async (req: Request, res: Response) => {
    try {
        const { nome, descricao, tag } = req.body;
        const result = await new CategoryController().create(nome, descricao, tag);

        return res.status(200).send(result); 
    } catch(error) {
        return res.status(500).send({
            ok: false,
            error
        });
    }
});

categoryRoutes.put("/:id", async (req: Request, res: Response) => {
    try {
        const { description } = req.body;
        const uid = req.params.id;

        const result = await new CategoryController().update(uid, description);

        return res.status(200).send(result); 
    } catch(error) {
        return res.status(500).send({
            ok: false,
            error
        });
    }
});

// categoryRoutes.get("/:id", async (req: Request, res: Response) => {
//     try {
//         const uid = req.params.id;

//         const result = await new CategoryController().get(uid);

//         return res.status(200).send(result); 
//     } catch(error) {
//         return res.status(500).send({
//             ok: false,
//             error
//         });
//     }
// });

export { categoryRoutes };