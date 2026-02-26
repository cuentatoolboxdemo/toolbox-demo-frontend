import { SignJWT, jwtVerify } from "jose";

function getSecretKey() {
    const JWT_SECRET_KEY = process.env.JWT_SECRET;
    if (!JWT_SECRET_KEY) {
        throw new Error("JWT_SECRET environment variable is not defined");
    }
    return new TextEncoder().encode(JWT_SECRET_KEY);
}

export async function encrypt(payload: any) {
    const key = getSecretKey();
    return await new SignJWT(payload)
        .setProtectedHeader({ alg: "HS256" })
        .setIssuedAt()
        .setExpirationTime("24h")
        .sign(key);
}

export async function decrypt(token: string): Promise<any> {
    try {
        const key = getSecretKey();
        const { payload } = await jwtVerify(token, key, {
            algorithms: ["HS256"],
        });
        return payload;
    } catch (error) {
        return null;
    }
}
