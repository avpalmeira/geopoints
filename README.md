# Geo Points

## Propósito

O objetivo da aplicação web é possibilitar ao usuário inserir o caminho para um arquivo .CSV (Com latitudes e longitudes) em um bucket na aws, importar esses dados para um banco de dados e visualizar os pontos geográficos em um mapa. Também é possível o usuário consultar o histórico de dados de arquivos importados anteriormente.

## Dependências

### Bibliotecas

* CORS
* Express
* Get-CSV
* HTTP
* PG
* Sequelize
* Sequelize-CLI

### Ferramentas

* Node
* PostgreSQL
* PostGIS
* Yarn

## Configuração de Banco de Dados

### Criação de usuário e database no PostgreSQL

Crie um usuário e defina sua senha (987654) no PosgreSQL:

```
sudo -u postgres createuser -s geopoints
sudo -u postgres psql
\password geopoints
```

Você também pode escolher usar outra senha e inserir no arquivo `config/database.js`

Crie o banco de dados no PostgreSQL:

```
sudo -u postgres psql
CREATE DATABASE geopoints OWNER geopoints;
```

### Instalação da extensão do PostGIS

Para instalar a extensão do PostGIS no banco de dados `geopoints` do Postgres:

Primeiro instale o PostGIS (no caso do Ubuntu):

```
sudo apt install postgis postgresql-12-postgis-3
```

Se você estiver utilizando uma versão do Postgres diferente da 12 substitua pela sua versão no comando acima

Habilite a extensão no banco de dados `geopoints`:

```
sudo -u postgres psql -d geopoints
CREATE EXTENSION postgis;
```

Verifique que o PostGIS está funcionando:

```
SELECT PostGIS_version();
```

### Criação das tabelas no banco

Execute as migrações com o Sequelize-CLI:

```
npx sequelize db:migrate
```

## Execução

Para executar o projeto localmente, rode na linha de comando:

```
yarn install
yarn start
```

## Testes

Para executar os testes, rode na linha de comando:

```
yarn test
```

