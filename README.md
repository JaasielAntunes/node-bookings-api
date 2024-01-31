<h1 align="center">
  Desenvolvimento e configuração de um projeto do zero utilizando a tecnologia Node.js e algumas bibliotecas.
</h1>

---

[![Codacy Badge](https://api.codacy.com/project/badge/Grade/a8230203b71b4687a5be95c35d064511)](https://app.codacy.com/manual/JaasielAntunes/node-bookings-api?utm_source=github.com&utm_medium=referral&utm_content=JaasielAntunes/node-bookings-api&utm_campaign=Badge_Grade_Settings)

## :clipboard: Sobre

Aprofundando os conhecimentos com a tecnologia Node.js com base na playlist [Youtube](https://www.youtube.com/watch?v=tHP9SHd74Rg&list=PLdDT8if5attEb6280U4qi2PZqQKSU0HFl&ab_channel=OneBitCode) criando e configurando do zero uma aplicação back-end que simula um sistema de reservas para um hotel. 
A principal regra de negócio da aplicação é que um usuário só pode ter uma reserva se estiver logado. A aplicação foi desenvolvida utilizando boas práticas como arquitetura em camadas e design patterns. Além disso a aplicação é integrada com o banco de dados PostgreSQL. As funcionalidades do 
sistema são: cadastro de usuário, login de usuário, listagem de usuários, exclusão de usuários, atualização de usuários, cadastro de reservas e listagem de reservas. A aplicação também conta com verificações e utilização de máscara nas senhas e geração de token utilizando a biblioteca jsonwebtoken.
Após a conclusão do desenvolvimento da API, por autonomia própria implementei algumas melhorias e funcionalidades tais como a exclusão e atualização de usuários.

---

# Pré-requisitos

- Node.js versão 20 ou superior;
- Banco de dados PostgreSQL.

---

## 👨‍💻️ Bibliotecas utilizadas

- uuid
- bcrypt
- date-fns
- fastify
- jsonwebtoken
- pg-promise

---

## 📦️ Instalação

```bash
  # Clonar o repositório
  ❯ git clone https://github.com/JaasielAntunes/node-bookings-api.git

  # Intale as dependências do projeto
  ❯ npm install

  # Utilize suas credenciais do PostgreSQL
  ❯ Na pasta database no arquivo index.js > const db = pgp("postgres://seu-usuario:sua-senha@localhost:5432/nome-do-seu-database");

  # Rode o servidor de desenvolvimento
  ❯ npm run dev
```

---

## Uso
- Esta API é acessível na porta http://localhost:3330

---

## Sugestão
- Utilize a extensão Thunder Client para testar as requisições (caso use o Visual Studio Code).
---

<h4 align="center">
  Feito com ❤️ por Jaasiel Antunes - <a href="mailto:contato.jaasiel@gmail.com.com">Entre em contato!</a>
</h4>

<p align="center">
  <a href="https://www.linkedin.com/in/jaasiel-antunes-1517b41bb/">
    <img alt="Jaasiel Antunes" src="https://img.shields.io/badge/LinkedIn-Jaasiel-0e76a8?style=flat&logoColor=white&logo=linkedin">
  </a>
</p>
