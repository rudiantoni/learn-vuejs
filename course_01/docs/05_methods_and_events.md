# Métodos, CSS, listas e eventos

- Conteúdo
  - []()
  - []()
  - []()
  - []()

## Métodos

- Os *métodos* do Vue são como *funções*.
- Podemos *executá-los baseados em eventos* ou por alguma lógica da aplicação.
- Eles ficam em um objeto chamado de *methods*.
- Onde criamos as funções que posteriormente serão executadas.

Para exemplificar, vamos utilizar o componente *Info* e, no template, vamos criar um botão. Ele possuirá a regra *@click*, que é o evento disparado quando o elemento recebe um clique:

```html
<h2>Informação pessoal</h2>
<p>Meu nome é {{ name }} e minha profissão é {{ profession }}.</p>
<button @click="showEmail($event)" >Mostrar e-mail</button>
```

No script, deve ser adicionado a função *showEmail()* na propriedade *methods* do objeto exportado:

```javascript
export default {
  name: 'Info',
  data() {
    return {
      name: 'Rudi',
      profession: 'Desenvolvedor de software'
    }
  },
  methods: {
    showEmail(e) {
      console.log(e)
      console.log('mostrar e-mail')
    }
  }
}
```

Por enquanto, podemos testar e ver que a função está sendo chamada no clique no botão. Falta apenas agora controlar a exibição do email:

```html
<h2>Informação pessoal</h2>
<p>Meu nome é {{ name }} e minha profissão é {{ profession }}.</p>
<button @click="showEmail($event)" >{{ texto_botao }}</button>
<p v-show="show_email">Contate-me através do e-mail {{ email }}.</p>
```

```javascript
export default {
  name: 'Info',
  data() {
    return {
      name: 'Rudi',
      profession: 'Desenvolvedor de software',
      email: 'email.teste@teste.com',
      show_email: false,
    }
  },
  methods: {
    showEmail(e) {
      this.show_email = !this.show_email
    }
  }
}
```

Você também pode chamar os métodos declarados em *methods* em outros métodos do script, como por exemplo em um hook, basta utilizar a palavra chave *this*:

```javascript
export default {
  name: 'Info',
  mounted() {
    console.log('(hook) mounted')
    this.getApiData()
  },
  methods: {
    getApiData() {
      console.log('chamado getApiData()')
    }
  }
}
```

## CSS Scoped e CSS global
