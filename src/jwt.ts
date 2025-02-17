import jwt from "jsonwebtoken"

const SECRET_KEY = 'humix-private-key-for-login'

export function validateToken(token: string) {
    return jwt.verify(token, SECRET_KEY)
}