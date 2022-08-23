const crud = require("../../crud");
const nomeTabela = "Livros";

//1 - Receber os dados por parâmetro:
//Título
//Quantidade de páginas
//Lista de autores
//2 - Verificar se o título foi preenchido
//3 - Verificar se a quantidade de páginas foi preeenchida
//4 - Verificar se foi passado pelo menos um autor
//5 - Verificar se o autor está cadastrado
//6 - Retornar um erro caso não atenda a uma das condições
//7 - Realizar o cadastro do livro
//8 - Retornar o sucesso do cadastro do livro

async function cadastrarLivro(dados = { titulo: "", quantidadePaginas: 0, listaAutores: [] }) {
    if (!dados.titulo) {
        return {
            error: "0001",
            message: "É necessário preencher os parâmetros da requisição!",
            camposNecessarios: ["titulo"]
        }
    }
    if (!dados.quantidadePaginas || !(dados.quantidadePaginas > 0)) {
        return {
            error: "0001",
            message: "É necessário preencher os parâmetros da requisição!",
            camposNecessarios: ["quantidadePaginas"]
        }
    }
    if (typeof dados.quantidadePaginas != "number") {
        return {
            error: "0002",
            message: "O tipo de dado passado não corresponde ao esperado!",
            tipoDeDado: typeof dados.quantidadePaginas,
            tipoEsperado: "number"
        }
    }
    if (!Array.isArray(dados.listaAutores)) {
        return {
            error: "0002",
            message: "O tipo de dado passado não corresponde ao esperado!",
            tipoDeDado: typeof dados.listaAutores,
            tipoEsperado: "array"
        }
    }
    if (!dados.listaAutores || dados.listaAutores.length == 0) {
        return {
            error: "0001",
            message: "É necessário preencher os parâmetros da requisição!",
            camposNecessarios: ["listaAutores"]
        }
    }
    if (await verificarListaAutoresCadastrados(dados.listaAutores)) {
        return {
            error: "0003",
            message: "Not found",
            situation: "Algum autor não está cadastrado!"
        }
    }

}

async function verificarListaAutoresCadastrados(list = []) {
    let naoCadastrado = false;
    for (const idAutor of list) {
        try {
            await crud.getById("Autores", idAutor);
        } catch (erro) {
            naoCadastrado = true;
            return naoCadastrado;
        }
    }
    return naoCadastrado;
}

module.exports = {
    cadastrarLivro
}