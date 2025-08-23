import express from "express";
import cors from 'cors';
import { PrismaClient } from "./generated/prisma/index.js";

const prisma = new PrismaClient();
const port = process.env.PORT || 3000;

const app = express();
app.use(express.json());
app.use(cors())

app.post("/usuarios", async (req, res) => {
  await prisma.user.create({
    data: {
      email: req.body.email,
      name: req.body.name,
      age: req.body.age,
    },
  });

  res.status(201).json(req.body);
});

app.get("/usuarios", async (req, res) => {
  //aqui eu to pegando o app e utilizando o metodo 'get' para me direcionar ao endereço de '/usuarios' e por meio das informaçôes contidas nesse endereço eu posso satisfazer a requisão e gerar uma resposta
  let users = []

  if (req.query) { // esse codigo tem a função de realizar uma filtragem de usuarios baseado nas informações que os compõem
    users = await prisma.user.findMany({
        where: {
          name: req.query.name,
          email: req.query.email,
          age: req.query.age
        }
    })
  } else {
   users = await prisma.user.findMany(); // me retorna todos os usuarios contidos em users
  }
  res.status(200).json(users); // resposta
});

app.put("/usuarios/:id", async (req, res) => { //editando o usuario
  await prisma.user.update({
    where: {
      // aqui eu to especificando o usuario que eu quero modificar
      id: req.params.id,
    },
    data: {
      // aqui eu to setando o que eu quero atualizar do usuario
      email: req.body.email,
      name: req.body.name,
      age: req.body.age,
    },
  });

  res.status(201).json(req.body);
});

app.delete("/usuarios/:id", async (req, res) => {
  await prisma.user.delete({
    where: {
      id: req.params.id,
    },
  });

  res.status(203).json({ message: "Usuário moggado com Sucesso!" }); // Não sobra nada pra quem é deletado
});

app.listen(port);

/* 
Para ciar uma rota de comunicação entre Front e Back, preciso de duas coisas:
1) Tipo de Rota/ Método HTTP
2) Endereço (Exemplo: www.lojadevilmaycry.com ou /users; ou seja um caminho/endereço a ser utilizado para alguma coisa)
*/

/* 
    Criar minha API de Usuários

    - Criar um usuário
    - Listar todos os usuários
    - Editar um usuários
    - Deletar um usuários    
*/
// node --watch server.js (serve para executar o servidor e não precisar ficar parando o mesmo para realizar alguma atualização, basta faze-la e em seguida salvar que ele vai automaticamente resetar o servdor para setar a atualização)
