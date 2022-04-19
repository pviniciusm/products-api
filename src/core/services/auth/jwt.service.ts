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
        const today = new Date();
        const nbf = new Date(today).setHours(today.getHours() - 1);
        const exp = new Date(today).setSeconds(today.getSeconds() + 5);

        const payload = JSON.stringify({
            ...data,
            iat,
            nbf,
            exp,
        });

        const base64Header = Buffer.from(header, "utf8").toString("base64url");
        const base64Payload = Buffer.from(payload, "utf8").toString(
            "base64url"
        );

        const headerPayload = base64Header + "." + base64Payload;

        const signature = this.calcSignature(base64Header, base64Payload);

        return headerPayload + "." + signature;
    }

    private static calcSignature(header: string, payload: string) {
        return createHmac("sha256", this.secret)
            .update([header, payload].join("."))
            .digest("base64url");
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

    // header.payload.signature
    // payload =>
    static verifyToken(token: string) {
        const [header, payload, signature] = token.split(".");

        const decodedPayload = JSON.parse(
            Buffer.from(payload, "base64url").toString("utf8")
        );

        const actualSignature = this.calcSignature(header, payload);
        if (actualSignature !== signature) {
            throw new Error("invalid token");
        }

        // Validações do payload
        const now = Date.now();

        if (decodedPayload.nbf >= now) {
            throw new Error("Not before error");
        }

        if (decodedPayload.exp < now) {
            throw new Error("Expire time error");
        }

        return decodedPayload;
    }
}
