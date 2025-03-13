const url = 'https://go-wash-api.onrender.com/api/auth/address';

async function listaEndereco(){

    var user = localStorage.getItem('user');
    let token = JSON.parse(user).access_token;
    
    let resposta = await fetch(url,{
        method:"GET",
        headers:{
            'Content-Type': 'application/json',
            'Authorization': "Bearer "+token
        }        
    });

    resposta.json().then(responseData => {
        let listEnderecos = responseData.data;
        // Limpar o conteúdo da tabela
        var tabela = document.querySelector("table");
        tabela.innerHTML = "<tr><th>Title</th><th>CEP</th><th>Endereço</th><th>Numero</th></tr>";
    
        // Adicionar cada endereço à tabela
        responseData.data.forEach(endereco => {
            var novaLinha = tabela.insertRow();
            var celulaMoradia = novaLinha.insertCell(0);
            var celulaCep = novaLinha.insertCell(1);
            var celulaEndereco = novaLinha.insertCell(2);
            var celulaNumero = novaLinha.insertCell(3);
    
            celulaMoradia.innerHTML = endereco.title;
            celulaCep.innerHTML = endereco.cep;
            celulaEndereco.innerHTML = endereco.address;
            celulaNumero.innerHTML = endereco.number;
        });
    }).catch(error => {
        console.log('error', error)
    })

}

listaEndereco();
