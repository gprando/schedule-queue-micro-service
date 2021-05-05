

<p align="center">
  <a aria-label="Prando" href="https://github.com/gprando/">
    <img src="https://img.shields.io/github/followers/gprando?style=social"></img>
  </a>
    <img src="https://img.shields.io/github/last-commit/gprando/schedule-queue-micro-service"></img>
    <img src="https://img.shields.io/github/languages/count/gprando/schedule-queue-micro-service"></img>
</p>
<p align="center">
  <a href="https://opensource.org/licenses/MIT">
    <img src="https://img.shields.io/badge/License-MIT-blue.svg" alt="License MIT">
  </a>
</p>


##
## Descrição
● Micro serviço de fila.

● Envio de emails em background jobs.

● possibilidade de agendar o envio para um horário específico.

## Principais tecnologias utilizadas

- linguagem:
  - TypeScript.

- Backend:
  - Framework: Express.
  - Banco: mongoDB (dados e fila).
  - ORM: TypeORM.
  - Logger: Winston.
  - Testes: Jest.
  - Documentação: Swagger.
  - Padronização de código: Eslint e Prettier.
  - Build: Babel

- Infra
  - Docker e docker compose.

## Instalação - Projeto

##### Requisitos:

Clone o projeto em seu computador.
```bash
git clone https://github.com/gprando/schedule-queue-micro-service/
```
- Preferencialmente ambiente Unix.

- Ter instalado <a aria-label="docker" href="https://docs.docker.com/engine/install/">
    docker
  </a> e
  <a aria-label="docker compose" href="https://docs.docker.com/compose/install/">
    docker compose.
  </a>

- Rodar o docker compose do projeto, isso irá rodar os bancos de dados, o servidor e a fila de processamento.
* **OBS: adicione suas variáveis ambiente dentro do arquivo docker-compose.yml**

```bash
docker-compose up --build
```

- os endpoints podem ser consultados e testados a partir da documentação, acessando http://localhost:3333/docs

## 🤔 Como contribuir

Se quiser contribuir para esse repositório aqui, seja corrigindo algum problema, adicionando comentários ou melhorando a documentação, você pode seguir esse tutorial abaixo:

- Faça [um fork](https://help.github.com/pt/github/getting-started-with-github/fork-a-repo) desse repositório;
- Entre no seu perfil no GitHub e faça um clone do repositório que você fez um *fork*;
- Crie uma *branch* com a sua alteração: `git checkout -b minha-alteracao`;
- Faça as alterações necessárias no código ou na documentação;
- Faça *commit* das suas alterações: `git commit -m 'feat: Minha nova feature'`;
- Faça *push* para a sua *branch*: `git push origin minha-alteracao`;
- Agora é só abrir a sua *pull request* no repositório que você fez o *fork*;

Depois que o *merge* da sua *pull request* for feito, você pode deletar a sua *branch*.

## :memo: Licença

Esse projeto é licensiado pela MIT License - Veja a página da [licença](https://opensource.org/licenses/MIT) para detalhes
