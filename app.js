const { response } = require('express');
const express = require('express');

const { randomUUID } = require("crypto")
const app = express();

const fs = require('fs');

app.use(express.json())

const port = 8081

let products = [];

fs.readFile("products.json", "utf-8", (err, data) => {
    if (err) {
        console.log(err)
    } else {
        products = JSON.parse(data)
    }
});

app.post("/products", (req, res) => {
    const { name, description, price } = req.body;

    const product = {
        name,
        description,
        price,
        id: randomUUID(),
    }
    products.push(product);

    ProductFile();


    return res.json(products);

});

app.get("/products", (req, res) => {
    return res.json(products);
});

app.get("/products/:id", (req, res) => {
    const { id } = req.params;

    const product = products.find(product => product.id === id);

    return res.json(product);
});

app.put("/products/:id", (req, res) => {
    const { id } = req.params;

    const { name, description, price } = req.body

    const productIndex = products.findIndex(product => product.id === id);

    products[productIndex] = {
        ...products[productIndex],
        name,
        description,
        price,
    };
    ProductFile()

    return res.json({ message: "produto alterado com sucesso" });


});

app.delete("/products/:id", (req, res) => {
    const { id } = req.params;

    const productIndex = products.findIndex(product => product.id === id);

    products.splice(productIndex, 1);

    ProductFile()

    return res.json({ message: "produto excluído com sucesso" })
});

function ProductFile() {
    fs.writeFile("products.json", JSON.stringify(products), (err) => {
        if (err) {
            console.log(err);
        } else {
            console.log("produto inserido");
        };
    });
}

app.listen(port, () => console.log(`servidor rodando porta ${port}`));