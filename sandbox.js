const crud = require("./crud")

async function executar() {
    // const dado = {nome: "Gustavo Zap", idade: 17};
    // await crud.save("usuario", "bhaI0JbVjlR3KiaKbtA2", dado)

    const resultado = await crud.getWithFilter("usuario", "idade", "!=", 23)

    console.log(resultado)
    // console.log("existe",resultado.map(e => {
    //     // const r = e.idade >= 18
    //     const r = "O nome é : " + e.nome
    //     console.log(r, e.nome, e.idade, e.id);

    //     return r
    // }));
}

executar().catch(e => console.log("Aconteceu um erro", e))