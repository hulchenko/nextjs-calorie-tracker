// import 'server-only';
import {SignJWT, jwtVerify, JWTPayload} from 'jose';
import { cookies } from 'next/headers';

const secretKey = process.env.SESSION_SECRET;
const encodedKey = new TextEncoder().encode(secretKey); // secretKey in bytes

const encrypt = async (payload: JWTPayload) => {
    return new SignJWT(payload)
        .setProtectedHeader({alg: 'HS256'})
        .setIssuedAt()
        .setExpirationTime('1h')
        .sign(encodedKey)
}

const decrypt = async (session) => {
    try {
        const { payload } = await jwtVerify(session, encodedKey, {
            algorithms: ['HS256']
        });
        return payload; // minimum user data: contains only user id
    } catch (error) {
        console.error('Failed to verify session', error)
    }
}

export const createSession = async (userId: string) => {
    const expiresAt = new Date(Date.now() + 60 * 60 * 1000); // 1 hour
    const session = await encrypt({userId, expiresAt});

    cookies().set('session', session, {
        httpOnly: true,
        secure: true,
        expires: expiresAt,
        sameSite: 'lax',
        path: '/'
    })
}

export const updateSession = async () => {
    const session = cookies().get('session')?.value;
    const payload = await decrypt(session);

    if(!session || !payload){
        return null
    };

    const expiresAt = new Date(Date.now() + 60 * 60 * 1000); // 1 hour
    cookies().set('session', session, {
        httpOnly: true,
        secure: true,
        expires: expiresAt,
        sameSite: 'lax',
        path: '/'
    })
}

export const deleteSession = () => {
    cookies().delete('session');
}

export const getSession = async () => {
    const session = cookies().get('session')?.value;
    const payload = await decrypt(session);
    return payload
}