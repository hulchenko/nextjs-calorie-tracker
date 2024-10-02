import { JWTPayload, SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';
import 'server-only';

const secretKey = process.env.SESSION_SECRET;
const encodedKey = new TextEncoder().encode(secretKey); // secretKey in bytes

export const encrypt = async (payload: JWTPayload) => {
    return new SignJWT(payload)
        .setProtectedHeader({alg: 'HS256'})
        .setIssuedAt()
        .setExpirationTime('1h')
        .sign(encodedKey)
}

export const decrypt = async (session) => {
    try {
        const { payload } = await jwtVerify(session, encodedKey, {
            algorithms: ['HS256']
        });
        return payload; // minimum user data: contains only user id
    } catch (error) {
        if (error.code === 'ERR_JWT_EXPIRED'){
            console.error('Token has expired');
            return null;
        }
        console.error('Failed to verify session', error)
    }
}

export const createSession = async (user) => {
    delete user.password;
    delete user.target;
    
    const expiresAt = new Date(Date.now() + 60 * 60 * 1000); // 1 hour

    const session = await encrypt({user, expiresAt});

    cookies().set('session', session, {
        httpOnly: true,
        secure: true,
        expires: expiresAt,
        sameSite: 'lax',
        path: '/'
    })

    return await decrypt(session)
}

export const updateSession = async () => {
    const oldSession = cookies().get('session')?.value;
    if (!oldSession) return null;

    const payload = await decrypt(oldSession);
    if (!payload) return null;

    const user = payload.user;
    const expiresAt = new Date(Date.now() + 60 * 60 * 1000); // extend by an hour
    const newSession = await encrypt({user, expiresAt});

    cookies().set('session', newSession, {
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

export const verifySession = async (): Promise<any> => {
    const session = cookies().get('session')?.value;

    if (!session){
        return null;
    }
    const payload = await decrypt(session);
    return payload
}