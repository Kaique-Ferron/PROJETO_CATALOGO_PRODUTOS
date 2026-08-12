import FormProduto from "./components/FormProduto"
import Produto from "./components/Produto"
import ListarProduto from "./components/ListaProdutos"
import Header from "./components/Header"
import { useEffect, useState } from "react"
export default function App() {

    const [produtos, setProdutos] = useState([]);
    const [mensagem, setMensagem] = useState("");

    async function carregarProdutos() {
        try {
            const resposta = await fetch ("/api/produtos");
            const dados = await resposta.json();
            setProdutos(dados);
        } catch (error) {
            setMensagem("Não foi possivel carregar os produtos")
        }
    }
    useEffect(()=> {
        carregarProdutos();
    }, []);

    async function cadastrarProduto(produto) {
        setMensagem("");

        try {
            const resposta = await fetch("/api/produtos", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(produto)
            });

            if(!resposta.ok){
                const erro = await resposta.json();
                setMensagem(erro.mensagem);
                return;
            }

            const novoProduto = await resposta.json()

            //Atualiza o estado sem precisar recarregar a página.
            setProdutos((produtosAtuais) => 
                [...produtosAtuais, novoProduto]);
            setMensagem("Produto cadastrado com sucesso.");
        } catch (error) {
            setMensagem("Não foi possível cadastrar o produto.")
        }
    }
    return (
        <>
        <Header />
            <main className="container">
                <FormProduto aoCadastrar={cadastrarProduto}/>
                {mensagem && <p className="mensagem">{mensagem}</p>}
                <ListarProduto produtos = {produtos}/>
            </main>
        </>
    )
}