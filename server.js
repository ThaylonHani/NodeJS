const http = require('http');



const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'application/json' })

    if (req.url === "/produto") {
        res.end(JSON.stringify({
            message: 'Produto'
        }))
    }
    if (req.url === "/users") {
        res.end(JSON.stringify({
            message: "rota de usuarios"
        }))
    } else {
        res.end(JSON.stringify({
            message: " qualquer outra rota"
        }))
    }





});
const port = 5000;
server.listen(port, () => console.log("servidor rodando, porta 5000"))