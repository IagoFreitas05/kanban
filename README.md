# Bem-vindo ao KANBAN!

Uma plataforma simples e fácil para ser sua aliada para gerir suas tarefas. O projeto consiste em pastas: `"service"` e `"client"`. Na pasta `service` existe um projeto Node.js + MongoDB + Express que consiste no backend da ferramenta. Para iniciá-lo, use o comando:

```shell
yarn install
yarn dev
```

Isso executará o backend. Para realizar a execução do serviço de banco de dados MongoDB, utilize o comando:
```shell 
    docker-compose up
```

Ou inicie somente o serviço do MongoDB dentro do docker-compose.yml. Lembre-se de que o comando "docker-compose up" irá iniciar tanto o backend, frontend e banco de dados.

Falando no frontend, ele está dentro da pasta "client", e foi construído usando Vite + React. Pode ser iniciado também usando os comandos:

```shell
yarn install
yarn dev
```
### Estrutura de pastas
#### Estrutura de pastas service: 
*   Service
    *   src
        *   app
            *   middlewares →  estão os middlewares de authenticação e de verificação de edição e deleção;
            *   models → estão os models usados na persistência do banco de dados;
            *   types → tipagens usadas no projeto;
            *   useCases → após o redirecioamento do router, os casos de uso abrigam a camada de serviço que utilize a persistência gerada através do models.
### Estrutura de pastas client:
*   Client
    *   src
    *   assets →  estão os arquivos estáticos usados;
    *   components → estão os components utilizados na ferramenta;
    *   services → camada responsável pela comunicação com a API;
    *   types → Tipos usados dentro do client;
    *   utils → Funções e configurações auxiliaries ao sistema.

### endpoints

 O principal endpoint é o usado para salvar um novo card, ele é dotado das seguintes características:
```javascript
{
    id: uuid | null (somente para criações),
    titulo: string,
    conteudo: string,
    lista: string
}
```
Os restantes endpoints que a aplicação possuí são os listados abaixo, vale lembrar que para editar um card, é necessário passar os valores exemplificados na interface acima **todos preenchidos.**
```
(POST)      http://0.0.0.0:5000/login/
(GET)       http://0.0.0.0:5000/cards/
(POST)      http://0.0.0.0:5000/cards/
(PUT)       http://0.0.0.0:5000/cards/{id}
(DELETE)    http://0.0.0.0:5000/cards/{id}

```

Vale lembrar que todos os endpoins necessitam da autenticação com o header ```json {"Authorization: Bearer {token}"}```, exceto o endpoint de login, qual você pode setar o usuário e senha que será criado através das variáveis de ambiente tanto do service quanto no client, não se esqueça de setar os valores usando o arquivo ```.env```.