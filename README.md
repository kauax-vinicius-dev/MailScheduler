# MailScheduler

API REST para agendamento e processamento de envio de e-mails utilizando **Node.js**, **Express**, **MongoDB**, **RabbitMQ** e **Nodemailer**.

O projeto foi desenvolvido com foco em separar as responsabilidades da aplicação: a API recebe o agendamento, o MongoDB armazena os dados, o `QueueService` identifica e publica os e-mails que já podem ser processados, o RabbitMQ atua como fila de mensagens e o `SendMailService` realiza o envio através do Nodemailer.

## Arquitetura

![Diagrama da arquitetura](./mailScheduler.drawio.png)


## Tecnologias

| Tecnologia | Função |
|---|---|
| Node.js | Runtime da aplicação |
| Express | API REST e roteamento HTTP |
| MongoDB | Persistência dos e-mails agendados |
| Mongoose | Comunicação com o MongoDB |
| RabbitMQ | Fila e processamento assíncrono |
| amqplib | Cliente AMQP utilizado pelo Node.js |
| Nodemailer | Envio dos e-mails via SMTP |
| Gmail SMTP | Servidor responsável pelo envio |
| dotenv | Carregamento das variáveis de ambiente |
| CORS | Configuração de requisições cross-origin |
| Nodemon | Reinicialização automática em desenvolvimento |

## Pré-requisitos

Antes de executar o projeto, instale e configure:

- **Node.js**
- **MongoDB Atlas** ou uma instância MongoDB compatível com a URL utilizada em `src/config/DbConfig.js`
- **RabbitMQ Server** local, executando em `amqp://localhost`
- Uma conta do **Gmail** com credenciais SMTP válidas. Para contas que utilizam autenticação em duas etapas, recomenda-se usar uma senha de aplicativo.

## Instalação

Clone o projeto e entre na pasta:

```bash
git clone https://github.com/kauax-vinicius-dev/MailScheduler.git
cd MailScheduler
```

Instale as dependências:

```bash
npm install
```

## Variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
PORT=3000

DB_USERNAME=seu_usuario_mongodb
DB_PASSWORD=sua_senha_mongodb

SMTP_USER=seu_email@gmail.com
SMTP_PASS=sua_senha_ou_app_password
```

## Executando o RabbitMQ

O projeto espera encontrar o RabbitMQ localmente em:

```text
amqp://localhost
```

A fila utilizada pela aplicação é:

```text
emailQueue
```

A fila é criada como durável e utiliza o tipo `quorum`.

Depois de instalar o RabbitMQ, confirme que o serviço está em execução antes de iniciar a aplicação.

Caso o plugin de gerenciamento esteja habilitado, normalmente o painel fica disponível em:

```text
http://localhost:15672
```

## Executando a aplicação

Modo desenvolvimento:

```bash
npm run dev
```

O script utiliza o Nodemon e executa:

```text
src/app.js
```

O processo de inicialização realiza, nesta ordem:

1. conexão com o MongoDB;
2. conexão com o RabbitMQ;
3. teste da conexão do Nodemailer com o SMTP;
4. processamento inicial da fila;
5. início do consumer do RabbitMQ;
6. processamento periódico da fila a cada 60 segundos;
7. inicialização do servidor HTTP.

## Endpoints

### Criar um e-mail

**POST** `/email`

Exemplo de requisição:

```json
{
  "recipient": "destinatario@email.com",
  "subject": "Teste do MailScheduler",
  "body": "Este é um e-mail enviado pelo MailScheduler.",
  "sendAt": "2026-08-14T15:30:00.000-03:00"
}
```

Resposta esperada:

```json
{
  "message": "Email registered successfully."
}
```

### Excluir um e-mail

**DELETE** `/email`

A implementação atual espera o ID do MongoDB diretamente no corpo da requisição.

Exemplo:

```bash
curl -X DELETE http://localhost:3000/email \
  -H "Content-Type: application/json" \
  -d '"SEU_ID_DO_MONGODB"'
```

Resposta esperada:

```json
{
  "message": "Email deleted successfully."
}
```

## Estrutura de pastas

```text
MailScheduler/
├── .env
├── .gitignore
├── package.json
├── package-lock.json
├── README.md
├── mailScheduler.drawio.png
└── src/
    ├── app.js
    │
    ├── config/
    │   ├── DbConfig.js
    │   ├── NodemailerConfig.js
    │   └── Rabbitmq.js
    │
    ├── controllers/
    │   └── EmailController.js
    │
    ├── models/
    │   └── emailModel.js
    │
    ├── routes/
    │   └── routes.js
    │
    ├── services/
    │   ├── EmailService.js
    │   ├── QueueService.js
    │   └── SendMailService.js
    │
    └── utils/
        └── InputValidator.js
```

## Autor

**Kauã Vinicius Alves da Silva**

Projeto desenvolvido como estudo prático de **Node.js, APIs REST, persistência com MongoDB, mensageria com RabbitMQ e envio de e-mails via SMTP**.
