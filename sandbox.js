const crud = require("./crud")

async function executar() {
    const dado = {nome: "Kenzo"};
    const resultado = await crud.save("Autores", undefined, dado)

    // const resultado = await crud.getWithFilter("usuario", "idade", "!=", 23)

    console.log(resultado)
    // console.log("existe",resultado.map(e => {
    //     // const r = e.idade >= 18
    //     const r = "O nome é : " + e.nome
    //     console.log(r, e.nome, e.idade, e.id);

    //     return r
    // }));
}

// executar().catch(e => console.log("Aconteceu um erro", e))


const livroHandler = require("./api/livro/livro.handler")


async function execute(){
    const livro = {
        titulo: "Harry Potter",
        quantidadePaginas: 8,
        listaAutores: ["10"]
    }
    const resultado = await livroHandler.cadastrarLivro(livro)
    console.log(resultado);
}

execute()