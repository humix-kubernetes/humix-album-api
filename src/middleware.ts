import { Request, Response, NextFunction } from 'express'
import { validateToken } from './jwt'

interface CustomRequest extends Request {
    usuario?: {id: string}; // ou o tipo adequado para o usuario
}


export function authenticateJWT(req: CustomRequest, res: Response, next: NextFunction){
    const authHeader = req.headers.authorization

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        res.status(401).json({error: 'token não fornecido ou inválido'})
        return
    }

    try {
        const token = authHeader.split(' ')[1]
        const decoded = validateToken(token) as {id: string}
        req.usuario = {id: decoded.id}
        next()
    } catch (e) {
        res.status(403).json({ error: 'Token inválido ou expirado!' }) 
        return
    }
}