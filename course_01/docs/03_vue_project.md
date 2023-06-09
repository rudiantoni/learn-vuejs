# O CLI do Vue, componentes e dados

- Conteúdo
  - [Introdução](#introdução)
  - [Utilizando o create-vue do Vue](#utilizando-o-create-vue-do-vue)
  - [Estrutura dos arquivos no projeto](#estrutura-dos-arquivos-no-projeto)
  - [Criando componentes](#criando-componentes)
    - [Criação da estrutura básica](#criação-da-estrutura-básica)
    - [Importando e utilizando o componente](#importando-e-utilizando-o-componente)
  - [Dados nos componentes](#dados-nos-componentes)

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
    - Arquivo *App.vue*: Componente principal/inicial da aplicação.
    - Arquivo *main.js*: Arquivo de script principal/inicial da aplicação.
      - Caso queira desabilitar o estilo CSS padrão que já vem o com o Vue quando é usado o *create-vue*, basta comentar/remover a linha de importação de estilo CSS.

## Criando componentes

- É por meio de componentes que podemos dividir o nosso layout em partes.
- Cada componente tem a sua responsabilidade, por exemplo: um componente que é uma tabela e outro que é um rodapé.
- Dividir as entidades desta maneira deixa o projeto com uma separação de responsabilidade maior.
- Cada um tendo o seu CSS e também os dados que manipula.

### Criação da estrutura básica

Primeiro, crie um arquivo com a extensão .vue na pasta src/components. Neste exemplo vamos criar um arquivo *PrimeiroComponente.vue*.

Adicione o seguinte conteúdo no arquivo *PrimeiroComponente.vue*:

```html
<template>
  <h1>Olá Vue!</h1>
</template>

<script>
  export default {
    name: 'PrimeiroComponente'
  }
</script>
```

O que está no elemento *template* é o conteúdo que será enviado ao HTML. E no elemento *script* é o código JavaScript a ser executado.

O objeto exportado precisa conter a propriedade *name*, que indica para o Vue o nome do componente.

### Importando e utilizando o componente

Agora, vamos usar este componente em algum lugar, neste exemplo vamos usá-lo no componente *App.vue*, que é o componente principal criado pelo CLI (NPM create-vue). 

```html
<script>
  import PrimeiroComponente from './components/PrimeiroComponente.vue'
  
  export default {
    name: 'App',
    components: {
      PrimeiroComponente
    }
  }
</script>

<template>
  <PrimeiroComponente />
</template>
```

Aqui, no *script*, primeiro importamos o componente *PrimeiroComponente* criado no arquivo *PrimeiroComponente.vue* para utilizá-lo no componente atual, *App*.

Depois, exportamos o componente com o seu nome através da propriedade *name* e expomos o componente através da propriedade *components* que foi importado para usar no *template*.

Por último, no *template*, chamamos o componente como uma tag HTML normal, mas o nome deve ser o nome exato do componente importado ou com kebab-case, ficando *primeiro-componente*.

## Dados nos componentes

- Os componentes podem conter dados
- Podemos *inicializar já com algum valor*, e também modificar durante a execução do programa
- Os dados ficam em uma função chamada *data*
- Esta função deve retornar os dados em *formato de objeto*

Para poder utilizar dados nos componentes:

Primeiro, no componente *PrimeiroComponente*, vamos exportar também a função *data()*, retornando as propriedades que serão os dados a serem acessados.

Após isso, podemos chamar na view (elemento *template*) do componente, o dado exportado através do *double mustache* usando a intepolação de strings:

```html
<template>
  <h1>Olá Vue!</h1>
  <p>Meu nome é {{ name }} e trabalho como {{ profession }}.</p>
</template>

<script>
  export default {
    name: 'PrimeiroComponente',
    data() {
      return {
        name: "Rudi",
        profession: "Desenvolvedor"
      }
    }
  }
</script>
```
