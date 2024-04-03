let participantes = [
  {
    nome: "Leonardo Frazão",
    email: "leo@gmail.com",
    dataInscricao: new Date (2024, 2, 22, 19, 20),
    dataCheckIn: new Date (2024, 2, 25, 22, 00)
  },
  {
    nome: "Maria Silva",
    email: "maria@gmail.com",
    dataInscricao: new Date(2024, 2, 23, 10, 30),
    dataCheckIn: new Date(2024, 2, 25, 21, 45)
  },
  {
    nome: "João Santos",
    email: "joao@hotmail.com",
    dataInscricao: new Date(2024, 2, 24, 14, 15),
    dataCheckIn: null
  },
  {
    nome: "Ana Oliveira",
    email: "ana@yahoo.com",
    dataInscricao: new Date(2024, 2, 25, 16, 50),
    dataCheckIn: new Date(2024, 2, 27, 13, 20)
  },
  {
    nome: "Pedro Costa",
    email: "pedro@hotmail.com",
    dataInscricao: new Date(2024, 2, 26, 20, 10),
    dataCheckIn: new Date(2024, 2, 28, 8, 45)
  },
  {
    nome: "Carla Vieira",
    email: "carla@gmail.com",
    dataInscricao: new Date(2024, 2, 27, 12, 30),
    dataCheckIn: new Date(2024, 2, 29, 10, 15)
  },
  {
    nome: "Rafael Oliveira",
    email: "rafael@yahoo.com",
    dataInscricao: new Date(2024, 2, 28, 18, 20),
    dataCheckIn: new Date(2024, 3, 1, 11, 30)
  },
  {
    nome: "Sara Pereira",
    email: "sara@hotmail.com",
    dataInscricao: new Date(2024, 2, 29, 9, 40),
    dataCheckIn: null
  },
  {
    nome: "Hugo Santos",
    email: "hugo@gmail.com",
    dataInscricao: new Date(2024, 2, 30, 15, 10),
    dataCheckIn: null
  },
  {
    nome: "Mariana Costa",
    email: "mariana@yahoo.com",
    dataInscricao: new Date(2024, 3, 1, 11, 20),
    dataCheckIn: new Date(2024, 3, 4, 12, 30)
  }
]

const criarNovoParticipante = (participante) => {
  const dataInscricao = dayjs(Date.now()).to(participante.dataInscricao)
  let dataCheckIn = dayjs(Date.now()).to(participante.dataCheckIn)

  if(participante.dataCheckIn == null) {
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
  for(let participante of participantes){
    output = output + criarNovoParticipante(participante)
  }
  document.querySelector('tbody')
  .innerHTML = output
}

atualizarLista(participantes)

const adicionarParticipante = (event) => {
  event.preventDefault()

  const formData = new FormData(event.target)

  const participante = {
    nome: formData.get("nome"),
    email: formData.get("email"),
    dataInscricao: new Date(),
    dataCheckIn: null
  }

  const participanteExiste = participantes.find(
    (p) => {
      return p.email == participante.email
    }
  )

  if(participanteExiste){
    alert("E-mail já cadastrado!!")
    return
  }

  participantes = [participante, ...participantes]
  atualizarLista(participantes)

  event.target.querySelector('[name ="nome"]').value = ""
  event.target.querySelector('[name ="email"]').value = ""
}

const fazerCheckIn = (event) => {
  const mensagemConfirmacao = "Tem ceteza que deseja fazer o check-in ?"
  if(confirm(mensagemConfirmacao) == false){
    return
  }
  
  const participante = participantes.find((p) =>{
    return p.email == event.target.dataset.email
  })
  participante.dataCheckIn = new Date()
  atualizarLista(participantes)
}