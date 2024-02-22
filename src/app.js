const express = require("express");
const app = express();
const PUERTO = 8080;
const ProductManager = require("./controllers/product-manager.js");
const productManager = new ProductManager("./src/models/products.json");

//Middleware
app.use(express.json());

//Rutas
//1) Listar los prpductos del archivo JSON
app.get("/products", async (req, res) => {
  try {
    const limit = req.query.limit;
    const products = await productManager.getProducts();
    if (limit) {
      res.json(products.slice(0, limit));
    } else {
      res.json(products);
    }
  } catch (error) {
    res.status(500).json({ error: "error interno del servidor" });
  }
});

//2) Retornamos producto por ID
app.get("/products/:pid", async (req, res) => {
  try {
    let id = req.params.pid;
    const products = await productManager.getProductById(parseInt(id));
    if (!products) {
      return res.json({ error: "ID no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ error: "error interno del servidor" });
  }
});

//Listen del servidor
app.listen(PUERTO, () => {
  console.log(`Escuchando en el puerto: ${PUERTO}`);
});
