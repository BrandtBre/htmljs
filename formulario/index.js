const formulario = document.getElementById('formulario');
const tabelaCadastrados = document.getElementById('tabelaCadastrados');

popularTabelaAoCarregarPagina();

formulario.addEventListener('submit', (evento) =>{
    evento.preventDefault();
    

    let data = $('#formulario').serializeArray();
    let registro = arrayToObject(data);

    adicionarRegistroNaTabela(registro);

    let clientes = JSON.parse(localStorage.getItem('clientes')) || [];
    clientes.push(JSON.stringify(registro));
    localStorage.setItem('clientes', JSON.stringify(clientes))   
});

function arrayToObject(array) {
    let object = {};
    array.forEach(campo =>{
        object[campo.name] = campo.value;
    })
    return object;
}

function adicionarRegistroNaTabela(registro) {
    let tr = document.createElement('tr');
    tr.innerHTML = `
        <tr>
            
            <td>${registro.primeiroNome}</td>
            <td>${registro.Sobrenome}</td>
            <td>${registro.nomeDeUsuario}</td>
            <td>${registro.cidade}</td>
            <td>${registro.estado}</td>
            <td>${registro.cep}</td>   

        </tr>

    `;
    
    tabelaCadastrados.appendChild(tr);
}

function popularTabelaAoCarregarPagina(params) {
    let registrosLocalStorage = JSON.parse(localStorage.getItem('clientes')) || [];
    registrosLocalStorage.forEach(registro => {
        registro = JSON.parse(registro);
        adicionarRegistroNaTabela(registro)
    })
}

    
    
