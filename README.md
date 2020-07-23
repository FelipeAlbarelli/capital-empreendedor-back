# CE Test - Web Server

## Running the server

Run `npm start`  to run the server on `http://localhost:3000/`. The server will **not** automatically reload if you change any of the source files.

## Rodar o servidor em modo reload ###

Rodar `npm run run-dev` roda o servidor e recarrega com qualquer edição do código

## Configurações ##

`npm install` baixa os módulos necessários.
Colocar arquivos estáticos na pasta "/public".
`npm start` inicia o servidor.

## Resumo do projeto ##

Como o front-end é uma SPA em react, o servidor tem como função apenas servir o diretório estático e ser uma API.
A comunicação com o banco de dados é abstraída pelas funções em 'database/models.js', e o trablho de conferir se os parametros de rotas se relacionam a algo no servidor (ex : se "/user/felipe" é um usuário válido) é feito pelas func de 'routes/middleware.js'.
Assim, 'route/api.js' apenas precisa chamar essas funções em razão das urls.

Como backend e frontend estão em diretórios separados, para lançar o app em modo de *produção*, é preciso substituir o dir 'public' do backend pelo recem criado dir 'build' do frontend.