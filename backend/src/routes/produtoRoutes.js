const express = require ("express");

const {
    listarProduto,
    cadastrarProduto,
    listarProdutos
} = require ("../controllers/produtoController");
 const router = express.Router();

 router.get ("/", listarProdutos);
  router.post ("/", cadastrarProduto);


  module.express = router ;