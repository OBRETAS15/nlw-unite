let participantes = [
  {
    nome: "Diego Fernandes",
    email: "diego@gmail.com",
    dataInscricao: new Date(2024, 2, 1, 19, 23),
    dataCheckIn: new Date(2024, 2, 1, 20, 20)
  },
  {
    nome: "Mayk Brito",
    email: "mayk@gmail.com",
    dataInscricao: new Date(2024, 2, 23, 19, 23),
    dataCheckIn: null
  },
  {
    nome: "Ana Silva",
    email: "ana@gmail.com",
    dataInscricao: new Date(2024, 0, 3, 19, 23),
    dataCheckIn: new Date(2024, 0, 7, 20, 20)
  },
  {
    nome: "Pedro Souza",
    email: "pedro@gmail.com",
    dataInscricao: new Date(2023, 11, 4, 19, 23),
    dataCheckIn: new Date(2023, 11, 10, 20, 20)
  },
  {
    nome: "Carla Santos",
    email: "carla@gmail.com",
    dataInscricao: new Date(2023, 10, 5, 19, 23),
    dataCheckIn: new Date(2023, 10, 15, 20, 20)
  },
  {
    nome: "Lucas Oliveira",
    email: "lucas@gmail.com",
    dataInscricao: new Date(2023, 9, 6, 19, 23),
    dataCheckIn: null
  },
  {
    nome: "Marina Lima",
    email: "marina@gmail.com",
    dataInscricao: new Date(2023, 8, 7, 19, 23),
    dataCheckIn: new Date(2023, 8, 25, 20, 20)
  },
  {
    nome: "Gustavo Pereira",
    email: "gustavo@gmail.com",
    dataInscricao: new Date(2023, 7, 8, 19, 23),
    dataCheckIn: new Date(2023, 7, 30, 20, 20)
  },
  {
    nome: "Camila Costa",
    email: "camila@gmail.com",
    dataInscricao: new Date(2023, 6, 9, 19, 23),
    dataCheckIn: null
  },
  {
    nome: "Rafaela Almeida",
    email: "rafaela@gmail.com",
    dataInscricao: new Date(2023, 5, 10, 19, 23),
    dataCheckIn: null
  }
];

console.log(participantes);

const criarNovoParticipante = (participante) => {
  const dataInscricao = dayjs(Date.now())
  .to(participante.dataInscricao)

  let dataCheckIn = dayjs(Date.now())
  .to(participante.dataCheckIn)

  if(participante.dataCheckIn == null){
    dataCheckIn = `
    <button
    data-email="${participante.email}"
    onclick="fazerCheckIn(event)"
    >
    Confirmar check-in
    </button>
    `

  }

  return `
  <tr>
    <td>
    <strong>
    ${participante.nome}
    </strong>
    <br>
    <small>
    ${participante.email}
    </small>
    </td>
    <td>${dataInscricao}</td>
    <td>${dataCheckIn}</td>
  </tr>
  `
}

const atualizarLista = (participantes) => {
  let output = ""
for(let participante of participantes) {
  output = output + criarNovoParticipante(participante)
}

//substituir informação do HTML
document
.querySelector('tbody')
.innerHTML = output
}

atualizarLista(participantes)

const adicionarParticipante = (event) => {
  event.preventDefault()

  const dadosDoFormulario = new FormData(event.target)

  const participante = {
    nome: dadosDoFormulario.get('nome'),
    email: dadosDoFormulario.get('email'),
    dataInscricao: new Date(),
    dataCheckIn: null
  }

  //verificar se o participante já existe
  const participanteExiste = participantes.find(
  (p) => p.email == participante.email
  )

  if(participanteExiste){
    alert('Email já cadastrado!')
    return
  }

participantes = [participante, ...participantes]
atualizarLista(participantes)

//limpar o formulário
event.target.querySelector('[name="nome"]').value = ""
event.target.querySelector('[name="email"]').value = ""
}

const fazerCheckIn = (event) => {
//confirmar se realmente quer fazer o check-in
const mensagemConfirmacao = 'tem certeza que deseja fazer o check-in?'
if(confirm(mensagemConfirmacao) == false) {
  return
}

  //encontrar o participante dentro da lista
  const participante = participantes.find((p) => p.email == event.target.dataset.email
  )
  //atualizar o check-in do participante
  participante.dataCheckIn = new Date()
  //atualizar a lista do participantes
  atualizarLista(participantes)
}