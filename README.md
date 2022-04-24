# The Security Blog

The Security Blog é uma API para manipular dados de um blog web. Nessa aplicação, existe um sistema de autenticação com três papéis de usuário que definem as ações possíveis. Um usuário com papel Padrão pode apenas ver posts e criar comentários; o Criador de conteúdo pode criar posts e apagar os próprios conteúdos; e o Moderador pode remover posts e comentários alheios, além de gerenciar os papéis e apagar usuários. Também, é possível navegar na aplicação sem estar logado, e nesse caso o “usuário” consegue apenas visualizar os conteúdos, sem conseguir interagir.

## Tecnologias utilizadas

A API foi desenvolvida na linguagem JavaScript e o sistema roda no Node.js versão 16.14.2. Também foram utilizados os frameworks Express.js e Sequelize para construir o servidor web e para realizar o mapeamento objeto-relacional, respectivamente.

Por fim, o banco de dados utilizado é o PostgreSQL na versão 14.2.

## Instalação e execução

### Banco de dados

Sugerimos utilizar o Docker para criar um container que execute uma instância do PostgreSQL. Para isso, utilize o seguinte comando:

```console
docker pull postgres

docker network create postgres-network 

docker run --name the-security-blog-postgres --network=postgres-network -e "POSTGRES_PASSWORD=toor" -p 5432:5432 -v ~/Documentos/PostgreSQL:/var/lib/postgresql/data -d postgres

docker start the-security-blog-postgres
```

Após instanciação do container, acesse o PostgreSQL através do comando:

```console
docker exec -it the-security-blog-postgres psql -U postgres
```

Crie um banco de dados com o nome `thesecurityblog` através do comando:

```console
CREATE DATABASE thesecurityblog;
```

### Aplicação

> A instalação do Node.js é um pré-requisito para execução da aplicação. Portanto, caso necessite, acesse [https://nodejs.org/en/download/](https://nodejs.org/en/download/) para baixar o Node.js.

Siga os passos para executar a aplicação:

1. Clone o projeto.

    ```console
    git clone https://github.com/phumacinha/The-Security-Blog.git
    ```

1. Acesse a pasta do projeto.

    ```console
    cd The-Security-Blog/
    ```

1. Instale as dependências.

    ```console
    npm install
    ```

1. Execute a aplicação.

    ```console
    npm run start-dev
    ```

## Documentação da API

A documentação da API pode ser acessada em [https://documenter.getpostman.com/view/12444955/Uyr7JeSm](https://documenter.getpostman.com/view/12444955/Uyr7JeSm).
