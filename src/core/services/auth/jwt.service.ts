import { createHmac } from "crypto";
import jwt from "jsonwebtoken";

export class JwtService {
    private static secret: string = "abcteste";

    static createToken(data: any) {
        const header = JSON.stringify({
            alg: "HS256",
            typ: "JWT",
        });

        const iat = Date.now();
        const nbf = Date.now();
        const today = new Date();
        const exp = new Date(today).setHours(today.getHours() + 1);

        const payload = JSON.stringify({
            ...data,
            iat,
            nbf,
            exp,
        });

        const base64Header = Buffer.from(header).toString("base64url");
        const base64Payload = Buffer.from(payload).toString("base64url");

        const headerPayload = base64Header + "." + base64Payload;

        const signature = createHmac("sha256", this.secret)
            .update(headerPayload)
            .digest("base64url");

        return headerPayload + "." + signature;
    }

    // retorna o token criado
    static createTokenJwt(data: any) {
        return jwt.sign(data, this.secret);
    }

    // retorna payload se o token estiver válido
    static verifyTokenJwt(token: string) {
        return jwt.verify(token, this.secret);
    }

    // retorna payload
    static decodeTokenJwt(token: string) {
        return jwt.decode(token);
    }

    static verifyToken() {}
}
