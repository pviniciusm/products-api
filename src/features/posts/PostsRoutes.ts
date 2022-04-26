import { NextFunction, Request, Response, Router } from "express";
import { authMiddleware } from "../../core/middlewares/auth.middleware";
import { JwtService } from "../../core/services/auth/jwt.service";
import { postsData } from "./data";

const router = Router();

router.use(authMiddleware);

router.get("/", (req: Request, res: Response) => {
    const data = postsData;

    return res.status(200).send(data);
});

export default router;
