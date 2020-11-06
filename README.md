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
* Yarn

## Configuração de Banco de Dados

Crie um usuário e defina sua senha (987654) no PosgreSQL:

```
sudo -u postgres createuser -s geopoints
sudo -u postgres psql
\password geopoints
```

Você também pode escolher usar outra senha e inserir no arquivo `config/database.js`

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

