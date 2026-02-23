import { SignJWT, jwtVerify } from "jose";

const JWT_SECRET_KEY = process.env.JWT_SECRET || "toolbox-demo-secret-key-123456";
const key = new TextEncoder().encode(JWT_SECRET_KEY);

export async function encrypt(payload: any) {
    return await new SignJWT(payload)
        .setProtectedHeader({ alg: "HS256" })
        .setIssuedAt()
        .setExpirationTime("24h")
        .sign(key);
}

export async function decrypt(token: string): Promise<any> {
    try {
        const { payload } = await jwtVerify(token, key, {
            algorithms: ["HS256"],
        });
        return payload;
    } catch (error) {
        return null;
    }
}
