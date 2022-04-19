import { NextFunction, Request, Response, Router } from "express";
import { JwtPayload } from "jsonwebtoken";
import { JwtService } from "../../core/services/auth/jwt.service";
import { CategoryController } from "./CategoryController";

const categoryRoutes = Router();

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    try {
        const authCookie = req.cookies?.authCookie;

        if (!authCookie) {
            throw new Error("Auth failed");
        }

        // Bearer <token>
        const bearerParts = authCookie.split(" ");
        const token = bearerParts[0];
        console.log(token);

        const payload = JwtService.verifyTokenJwt(token) as JwtPayload;
        console.log(payload);

        console.log(payload.username);
        req.body.username = payload.username;
        next();
    } catch (error) {
        console.log(error);

        res.status(401).send({
            ok: false,
            error: "invalid token",
        });
    }
};

categoryRoutes.get(
    "/",
    [authMiddleware],
    async (req: Request, res: Response) => {
        try {
            console.log(req.body.username);

            const result = await new CategoryController().list();

            return res.status(200).send(result);
        } catch (error) {
            return res.status(500).send({
                ok: false,
                error,
            });
        }
    }
);

categoryRoutes.post("/", async (req: Request, res: Response) => {
    try {
        const { nome, descricao, tag } = req.body;
        const result = await new CategoryController().create(
            nome,
            descricao,
            tag
        );

        return res.status(200).send(result);
    } catch (error) {
        return res.status(500).send({
            ok: false,
            error,
        });
    }
});

categoryRoutes.put("/:id", async (req: Request, res: Response) => {
    try {
        const { description } = req.body;
        const uid = req.params.id;

        const result = await new CategoryController().update(uid, description);

        return res.status(200).send(result);
    } catch (error) {
        return res.status(500).send({
            ok: false,
            error,
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
