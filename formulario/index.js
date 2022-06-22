const formulario = document.getElementById('formulario');
const tabelaCadastrados = document.getElementById('tabelaCadastrados');

popularTabelaAoCarregarPagina();
adicionarEventosDosBotoesDeExclusao();

formulario.addEventListener('submit', (evento) =>{
    evento.preventDefault();
    

    let data = $('#formulario').serializeArray();
    let registro = arrayToObject(data);

    let clientesCadastrados = JSON.parse(localStorage.getItem('clientes')) || []
    
    let usuarioDuplicado = clientesCadastrados
        .map(clienteCadastrado => (JSON.parse(clienteCadastrado)).nomeDeUsuario)
        .includes(registro.nomeDeUsuario);
    
    if (usuarioDuplicado) {
        alert(`O nome de usuario ${registro.nomeDeUsuario} ja existe, escolha um nome novo!`);
        return;
    }
      


    clientesCadastrados.push(JSON.stringify(registro));
    localStorage.setItem('clientes', JSON.stringify(clientesCadastrados))   
    adicionarRegistroNaTabela(registro);
    adicionarEventosDosBotoesDeExclusao();
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
            <td>
                <button class = "btn btn-outline-danger exclusao" data-usuario = "${registro.nomeDeUsuario}">
                Excluir
                </button>
            </td>

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

function adicionarEventosDosBotoesDeExclusao() {
    
    $('.exclusao').toArray().forEach(botadoDeExclusao => {
        botadoDeExclusao.removeEventListener('click', (evento) => excluirRegistro(evento))
    })

    $('.exclusao').toArray().forEach(botadoDeExclusao => {
        botadoDeExclusao.addEventListener('click', (evento) => excluirRegistro(evento))
    })

    function excluirRegistro(evento) {
        let cadastroQueSeraExcluido = evento.target.dataset.usuario;
        
        if (confirm(`Tem certeza que deseja excluir ${cadastroQueSeraExcluido}`)) {
            
            let registros = JSON.parse(localStorage.getItem('clientes')) || [];

            registros = registros.map(registro => JSON.parse(registro));
            
            let index = registros.findIndex(registro => registro.nomeDeUsuario == cadastroQueSeraExcluido);
            
            registros.splice(index, 1);

            registros = registros.map(registro => JSON.stringify(registro));
            localStorage.setItem('clientes', JSON.stringify(registros));
            document.location.reload(true);

        }
    }








}
    
