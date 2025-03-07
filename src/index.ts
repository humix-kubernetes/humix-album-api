import express from "express"
import albumRouter from "./routes"

const app = express()
const port = process.env.PORT || 8080

app.use(express.json())

app.use(albumRouter)

app.get('/', (req, res) => {
    res.json({message: "Funcionando!"}).status(200)
})

app.listen(port, () => {
    console.log("rodando")
})