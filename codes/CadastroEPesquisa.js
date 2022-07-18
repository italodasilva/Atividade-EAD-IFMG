

var listaObras = {};

document.querySelector("#botao-funciona").addEventListener("click", function(event) {
    event.preventDefault();
    const tituloObra = document.getElementById("titulo");
    const tipoObra = document.getElementById("tipo");
    const generoObra = document.getElementById("genero");

    const textoBotao = this.querySelector("h3").textContent;
    if (textoBotao == "Cadastrar") {
        const duracaoObra = document.getElementById("duracao");
        const CartazObra = document.getElementById("cartaz");

        const obra = {
            "titulo" : tituloObra.value,
            "tipo" : tipoObra.value,
            "genero" : generoObra.value,
            "duracao" : duracaoObra.value,
            "cartaz" : CartazObra.getAttribute("src")
        };

        if (tituloObra.value == "") {
            alert("Não é possível cadastrar obra sem título! =/")
        } else {
            listaObras[obra.titulo] = obra;
            alert(obra.tipo + " - " + obra.titulo + " Cadastrado com sucesso! =)")    
        };
        
        tituloObra.value = "";
        tipoObra.value = "";
        generoObra.value = "";
        duracaoObra.value = "";
        CartazObra.setAttribute("src", "");
        document.getElementById("upload").value = "";
    } else {
        let textoListagem = "";
        let contador = 1;
        for(let idObra in listaObras) {
            let obra = listaObras[idObra];
            if ((contador < 15) && ((obra.titulo == tituloObra.value) || (obra.tipo == tipoObra.value) || (obra.genero == generoObra.value))) {
                textoListagem += "<a href='#'>" + obra.titulo + "</a><br/>"
                contador += 1;
            };
        };
        areaListagem.innerHTML = textoListagem;
    };
});

const h1TextOriginal = "Cadastro de Obra";
const h1Form = document.querySelector("#content-left form h1")
h1Form.textContent = h1TextOriginal;
const BotaoFuncional = document.querySelector("#botao-funciona h3");
BotaoFuncional.textContent = "Cadastrar";
const areaCartaz = document.querySelector("#area-cartaz");
areaCartaz.style.display = ("block");

const h3TextOriginal = "Pesquise uma Obra";
const h3Botao = document.querySelector("#botao-pesquisa h3")
h3Botao.textContent = h3TextOriginal;
const areaListagem = document.querySelector("#area-listagem");
areaListagem.style.display = ("none");

function MostrarDadosObra() {
    if (h3Botao.textContent == h3TextOriginal) {
        h1Form.textContent = h3TextOriginal;
        h3Botao.textContent = h1TextOriginal;
        BotaoFuncional.textContent = "Pesquisar";
        document.querySelector("#field-duracao").style.display = "none";
        document.querySelector("#botao-pesquisa img").setAttribute("src", "IconeEntrada.png");

        areaListagem.style.display = ("block");
        areaCartaz.style.display = ("none");
        let textoListagem = "";
        let contador = 1;
        for(let idObra in listaObras) {
            let obra = listaObras[idObra];
            if (contador < 15) {
                textoListagem += "<a href='#'>" + obra.titulo + "</a><br/>"
                contador += 1;
            }
        };
        areaListagem.innerHTML = textoListagem
    } else {
        h3Botao.textContent = h3TextOriginal;
        h1Form.textContent = h1TextOriginal;
        BotaoFuncional.textContent = "Cadastrar";
        document.querySelector("#field-duracao").style.display = "block";
        document.querySelector("#botao-pesquisa img").setAttribute("src", "Search.png");

        areaListagem.style.display = ("none");
        areaCartaz.style.display = ("block");
    }
}

if (window.location.href.split("?")[1] == "pesquisa" ) {
    MostrarDadosObra();
}

const pesquisar = document.getElementById("botao-pesquisa");
pesquisar.addEventListener("click", function(event) {
    event.preventDefault();

    document.getElementById("titulo").value = "";
    document.getElementById("tipo").value = "";
    document.getElementById("genero").value = "";
    document.getElementById("duracao").value = "";
    document.getElementById("cartaz").setAttribute("src", "");
    document.getElementById("upload").value = "";

    MostrarDadosObra();
});

document.addEventListener("DOMContentLoaded", function() {
    document.querySelector("#upload").addEventListener("change", function(imagem) {
        const arquivo = imagem.target.files.item(0);
        const endereco = new FileReader();
        endereco.onloadend = function() {
            document.querySelector("#cartaz").setAttribute("src", endereco.result);
        }
        endereco.readAsDataURL(arquivo);
    });
});

document.querySelector("#area-listagem").addEventListener("click", function(event) {
    let TagClicada = event.target;
    if (TagClicada.tagName.toLowerCase() == "a") {
        let obra = listaObras[TagClicada.textContent];
        document.getElementById("titulo").value = obra.titulo;
        document.getElementById("tipo").value = obra.tipo;
        document.getElementById("genero").value = obra.genero;
        document.getElementById("duracao").value = obra.duracao;
        document.getElementById("cartaz").setAttribute("src", obra.cartaz);

        MostrarDadosObra();
    }
});