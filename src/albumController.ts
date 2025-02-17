import { PrismaClient } from "@prisma/client"
import { Request, Response } from "express"

const albumClient = new PrismaClient().album

interface CustomRequest extends Request {
    usuario?: {id: string}; // ou o tipo adequado para o usuario
}

export const criarAlbum = async (req: CustomRequest, res: Response) => {
    const { nome, banda } = req.body
    

    try{

        const albumUnico = await albumClient.findFirst({where: {nome: nome}})
        

        if(!albumUnico){

            const albumCriado = await albumClient.create({
                data: {
                    nome,
                    banda
                }
            })

            const seguirAlbum = await albumClient.update({
                where: {id: albumCriado.id},
                data: {
                    usuarios:{
                        push: req.usuario?.id
                    }
                }
            })
            res.status(201).json({message: "O álbum foi criado com sucesso"})

            return
        }

        if(albumUnico.banda == banda){
            if(!albumUnico.usuarios.includes(req.usuario?.id as string)){

                const seguirAlbum = await albumClient.update({
                    where: {id: albumUnico.id},
                    data: {
                        usuarios:{
                            push: req.usuario?.id
                        }
                    }
                })

                res.status(201).json({message: "O usuário está seguindo o álbum selecionado"})
                return
            }

            res.status(401).json({message: "O usuário já está seguindo o álbum selecionado"})
            return
        }

        

    }

    catch(err){
        res.status(500).json({error: err})
    }
}

export const listarAlbunsUsuario = async (req: CustomRequest, res: Response) => {
    const albums = await albumClient.findMany({where: {
        usuarios: {
            has: req.usuario?.id
        }
    }})

    res.status(200).json({albums})
    return
}