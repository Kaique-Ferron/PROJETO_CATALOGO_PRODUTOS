import { useState } from "react";

 function FormProduto({aoCadastrar}){

    const [nome , setNome] = useState ("");
    const [descricao, setDescricao] = useState ("");
    const [preco , setPreco] = useState ("");

    function enviarFormulario (e){
        e.preventDefault();

      if (!nome.trim() || !preco){
        return;
      }  
      aoCadastrar({
        nome : nome.trim(),
        descricao : descricao.trim (),
        preco : Number(preco)
      });

      setNome("");
      setDescricao("");
      setPreco("");
    }

    return (
        <form className = "formulario" onSubmit={enviarFormulario}>
            <h2>Novo produto</h2>

        <label>
            Nome
            <input
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            placeholder="Ex.: Teclado"
            />
        </label>
        </form>
    
    )
 }