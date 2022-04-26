import { Request, Response, Router } from "express";
import { v4 } from "uuid";
import { JwtService } from "../../core/services/auth/jwt.service";

const router = Router();

router.post("/login", (req: Request, res: Response) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).send({
            ok: false,
            message: "missing fields",
        });
    }

    // ... verificar se username e senha estão corretos
    if (username !== "teste" || password !== "123123") {
        return res.status(401).send({
            ok: false,
            message: "access not authorized",
        });
    }

    const token = JwtService.createToken(
        {
            username,
        },
        3600
    );

    const refreshToken = v4();
    // include na tabela de refresh token

    res.setHeader("authorization", token);

    res.cookie("auth-api", "Bearer " + token, {
        httpOnly: true,
        secure: false,
    });

    res.cookie("refresh", refreshToken, {
        httpOnly: true,
        secure: false,
    });

    res.status(200).send({
        ok: true,
    });
});

router.post("/refresh", (req: Request, res: Response) => {
    const refreshToken = req.cookies.refresh;

    if (!refreshToken) {
        return res.status(401).send({
            ok: false,
            message: "no token",
        });
    }

    // validar o refresh token
    const user = {
        username: "teste",
    };

    const token = JwtService.createToken(user, 20);
    const newRefreshToken = v4();

    // atualizar a tabela refresh token
    res.cookie("auth-api", "Bearer " + token, {
        httpOnly: true,
        secure: false,
    });

    res.cookie("refresh", newRefreshToken, {
        httpOnly: true,
        secure: false,
    });

    res.status(200).send({
        ok: true,
    });
});

export default router;
