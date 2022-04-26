import { JwtService } from "./../services/auth/jwt.service";
import { NextFunction, Request, Response } from "express";

export const authMiddleware = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const token = req.headers["authorization"];

    console.log(req.cookies["auth-api"]);
    console.log(req.headers["authorization"]);

    if (!token) {
        return res.status(401).send({
            ok: false,
            message: "no token",
        });
    }

    try {
        const [, bToken] = token.split(" ");

        const payload = JwtService.verifyToken(bToken);
        req.body.username = payload.username;

        // find(token, username)

        next();
    } catch (error) {
        console.log(error);

        return res.status(401).send({
            ok: false,
            message: "invalid token",
        });
    }
};
