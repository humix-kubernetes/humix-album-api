import { Router } from "express"
import { criarAlbum, listarAlbunsUsuario } from "./albumController"
import { authenticateJWT } from "./middleware"

const albumRouter = Router()

albumRouter.post("/adicionar", authenticateJWT, criarAlbum)
albumRouter.get('/', authenticateJWT, listarAlbunsUsuario)

export default albumRouter