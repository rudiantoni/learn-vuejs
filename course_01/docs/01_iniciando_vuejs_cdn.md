# Iniciando com VueJS e CDN

- Conteúdo
  - [O que é o Vuejs?](#o-que-é-o-vuejs)
  - [Pré-requisitos](#pré-requisitos)
  - [Instalação do Vue](#instalação-do-vue)
  - [Usando o VueJS pela CDN](#usando-o-vuejs-pela-cdn)

## O que é o Vuejs?

- VueJS é um framework progressivo para criar interfaces,
- Tem a construção de layouts baseada em componentes,
- A curva de aprendizado é baixa,
- Está entre os frameworks front-end mais utilizados,
- Possui módulos para manipulação de rotas (Vue Router) e também state (Vuex).

## Pré-requisitos

- O ideal é: conhecimentos intermediários em HTML, CSS e JavaScript.
- Principalmente JS e seus recursos da versão ES6 (map, filter, reduce e etc...).
- Porém, tudo será explicado em detalhes.
- Além disso, teremos exemplos práticos que envolvem os conhecimentos necessários.

## Instalação do Vue

- Instalar o Vue em um projeto é simples, podemos utilizar via CDN.
- Basta inserir o link de script e pronto!
- Porém para ter acesso a todas as funcionalidades do Vue.js, é recomendado instalar pelo CLI (veremos depois).
- Vamos criar nosso primeiro projeto em Vue.

## Usando o VueJS pela CDN
Referência: [Quick Start | Vue.js](https://vuejs.org/guide/quick-start.html#using-vue-from-cdn)

- Adicionar o script do CDN do VueJS na tag head:

```javascript
<script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>
```

Adicionar um elemento no corpo do HTML com um determinado id rootElementId (app) para poder indicar o elemento raiz da página:

```html
<div id="app"></div>
```

No seu script JS (adicionado por arquivo externo, tag script, etc.):
- Criar um objeto principal da aplicação ObjName (MyNameApp)
- Criar um método data() dentro do ObjName que retorne um objeto qualquer com algumas propriedades (essas propriedades serão acessíveis pelo HTML)
- Chamar a função Vue.createApp(ObjName).mount('#rootElementId') para criar a aplicação com o VueJS.

```javascript
const MyNameApp = {
  data() {
    return {
      name: "João",
      age: "30"
    }
  }
}

Vue.createApp(MyNameApp).mount('#app')
```

No HTML, adicione os valores para que seja tudo visível:

```html
<div id="app">
  <p>O meu nome é: {{ name }}, e tenho {{ age }} anos.</p>
</div>
```