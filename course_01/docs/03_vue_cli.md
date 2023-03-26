# O CLI do Vue

- Conteúdo
  - [atualizar](atualizar)

## Introdução

- O CLI (Command Line Interface) é uma ferramenta de linha de comando do Vue. Atualmente ele usa o pacote NPM create-vue.
- Possibilita criar e configurar projetos de forma mais avançada.
- Por exemplo: adicionar o Vue Router desde a instalação do projeto.
- Isso flexibiliza muito as coisas, vamos então instalar o VueCLI e testar ele.
- O Vue precisa do Node instalado.

## Utilizando o create-vue do Vue

Para instalar (se for a primeira vez) e iniciar um projeto, use o comando:
- `npm init vue@latest`
  - Nesse momento também é criado um arquivo *.gitignore*, então se não quiser que esse diretório seja versionado, é melhor remover este arquivo.

Nesse momento, vamos apenas definir um nome de projeto e escolher todas as opções como não.

Após criado o projeto, entre na pasta do projeto, e instale as dependências:
- `npm install`

Para executar o projeto, use:
- `npm run dev`

O projeto é iniciado e a página inicial é disponibilizada em http://localhost:5173

## Estrutura dos arquivos no projeto

Desde o primeiro comando até o último, foram criados alguns arquivos já com a estrutura e conteúdo prontos afim de agilizar o processe de desenvolvimento. Dentre eles, os principais arquivos e/ou pastas são:
- Pasta *node_modules*: é a pasta onde são definidas todas as dependências desse projeto descritos no *package.json*.
  - Pasta *src*: é onde fica o código da aplicação.
    - Pasta *assets*: Arquivos estáticos do projeto.
    - Pasta *components*: Aqui é onde podemos adicionar os componentes da aplicação.
