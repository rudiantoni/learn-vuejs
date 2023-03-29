# Input e data binding

- Conteúdo
  - [Introdução](#introdução)
  - [Data-binding](#data-binding)

## Introdução

- Uma das funcionalidades mais interessantes é o data binding
- Onde temos a possibilidade de mudar em tempo real um dado, por meio do que é recebido de um input, por exemplo
- O Vue torna isso mais fácil ainda, algumas linhas e pronto.
- Vamos ver o data binding na prática.

## Data-binding

O data binding é a conexão de uma informação realizada entre o HTML e o JS.

No exemplo abaixo, o elemento input de texto possui um atributo `v-model="input_name"` onde v-model é o atributo que indica qual vai ser o nome da variável a ser atribuída aquele input, e o input_name é o nome da variável.

No elemento input de evnio, há um atributo `v-on:click="submitForm"`, ele serve para fazer o bind de eventos, ou seja quando esse botão for pressionado, será chamado uma função com o nome submitForm declarada no JS.

HTML:

```html
<div id="app">
  <form id="app-form">
    <input type="text" v-model="input_name" placeholder="Digite seu nome" />
    <input type="submit" value="Enviar" v-on:click="submitForm" />
  </form>
  <p>O meu nome é: {{ name }}.</p>
  <p>Data binding: {{ input_name }}.</p>
</div>
```

JavaScript:

```javascript
const MyNameApp = {
  data() {
    return {
      name: "",
      age: "30",
      input_name: ""
    }
  },
  methods: {
    submitForm(e) {
      e.preventDefault();
      console.log(this.input_name);
      this.name = this.input_name;
    }
  }
}

Vue.createApp(MyNameApp).mount('#app')
```

Assim notamos que, sempre que alteramos o valor no input de texto, o valor da variável input_name é automaticamente alterado e já altera o elemento p onde ela é chamada, mesmo sem chamar nenhuma função.
