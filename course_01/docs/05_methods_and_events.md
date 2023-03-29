# Métodos, CSS, listas e eventos

- Conteúdo
  - [Métodos](#métodos)
  - [CSS Scoped e CSS global](#css-scoped-e-css-global)
    - [Estilização global](#estilização-global)
  -   [Estilização scoped](#estilização-scoped)
  - [Renderização de listas (v-for)](#renderização-de-listas-v-for)
    - [Usando um array de dados](#usando-um-array-de-dados)
    - [Atributo key](#atributo-key)
    - [Usando um array de objetos](#usando-um-array-de-objetos)
  - [Eventos (@submit e @click)](#eventos-submit-e-click)
    - [Evento @submit](#evento-submit)
    - [Diretiva v-model](#diretiva-v-model)
    - [Evento @click](#evento-click)
  - [Múltiplos eventos](#múltiplos-eventos)
    - [Ativando múltiplas funções com o mesmo evento](#ativando-múltiplas-funções-com-o-mesmo-evento)
    - [Passando valors fixos](#passando-valors-fixos)
    - [Passando variáveis](#passando-variáveis)

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

- O *CSS* no Vue pode ser dividido em duas categorias:
- *Global*: Onde definimos no App, por exemplo, e se aplica a todos os elementos.
- *Scoped*: Onde cada componente pode ter seu estilo, deixando mais fácil de personalizar or elementos.
- Geralmente utilizamos o scoped para estilizar os componentes individualmente.

### Estilização global

O estilo deve ser escrito sempre dentro de uma tag *style*.

Estilos globais podem ser inseridos no componente principal:

```html
<style>
  body {
    background-color: #333;
    color: #FFF;
  }
  a {
    color: #F00;
  }
  .teste {
    background-color: #000;
  }
</style>
```

Quando o estilo é declarado dessa maneira, ele é aplicado ao próprio componente, e a todos os componentes dentro e fora da hierarquia do componente de origem.

Isso quer dizer que estilos declarados em componentes pais afetam também componentes filhos, e estilos declarados em componentes filhos afetam também componentes pais.

### Estilização scoped

A estilização em escopo é aplicada apenas ao componente onde ela é declarada e nada mais.

Não há a "dissipação" do estilo como acontece na estilização global.

```html
<style scoped>
  a {
    color: #DDD;
    text-decoration: none;
  }
  a:hover {
    color: turquoise
  }
</style>
```

Nesse caso, a estilização desse componente não será afetada por nenhum outro componente, pois o próprio Vue especifica o componente aplicando regras de seletor mais detalhadas.

## Renderização de listas (v-for)

- As listas (*arrays*) serão renderizadas por *diretivas*.
- Utilizaremos o *v-for* para isso.
- O dado pode vir de *data*, como um array.
- E cada item pode ser impresso *junto do HTML*.

### Usando um array de dados

Primeiramente, é necessário que exista um array de algum tipo de informação como arrays de booleanos, números, textos e até mesmo objetos.

Esse array pode ser retornado do hook *data*.

Nesse exemplo, vamos criar um novo componente *TechnologyList* e adicionar um array de strings retornando do *data*:

```html
<script>
export default {
  name: 'TechnologyList',
  data() {
    return {
      backEndTechnologies: ['JavaScript', 'PHP', 'Python']
    }
  }
}
</script>
```

Agora, no template, basta adicionarmos a diretiva *v-for* no elemento que irá se repetir:

```html
<template>
  <li v-for="technology in backEndTechnologies">
    {{ technology }}
  </li>
</template>
```

Aqui, os elementos *li* vão se repetir, e o texto será atribuído a variável temporária *technology*, criada em runtime mesmo apenas para poder servir de acesso a variável sendo iterada no momento.

### Atributo key

Como em outros frameworks, no Vue também é necessário definir um atributo que identifique o elemento repetido como único dentro do DOM.

Nesse caso, como o dado de origem é um array simples, podemos usar o próprio índice gerado na iteração do *v-for*, e, usando o *v-bind*, conectá-lo ao atributo *key*:

```html
<template>
  <li v-for="(technology, index) in backEndTechnologies"  v-bind:key="index">
    {{ technology }}
  </li>
</template>
```

### Usando um array de objetos

Para usar um array de objetos, podemos fazer da seguinte maneira:

```html
<script>
export default {
  name: 'TechnologyList',
  data() {
    return {
      frontEndTechnologies: [
        {id: 1, language: 'JavaScript'},
        {id: 2, language: 'HTML'},
        {id: 3, language: 'CSS'}
      ]
    }
  }
}
</script>
```

```html
<template>
  <ul>
    <li v-for="technology in frontEndTechnologies" :key="technology.id">
      {{ technology.language }}
    </li>
  </ul>
</template>
```

## Eventos (@submit e @click)

- Os *eventos* são utilizados para complementar ações dos usuários com ativações de métodos.
- Temos diversos tipos de eventos em Vue, como o click *@click*.
- Que podem ser adicionados diretamente a elementos do HTML.
- O evento recebe um parâmetro HTML que é o método que será executado.

### Evento @submit

O evento submit é usado em formulários apenas, pois ele é disparado no disparo de um *input* (botão) do tipo *submit*.

```html
<template>
  <form action="" @submit="sendForm">
    <input type="submit" value="Enviar" />
  </form>
</template>
```

```html
<script>
export default {
  name: 'Form',
  methods: {
    sendForm() {
      console.log('Formulário enviado')
    }
  }
}
</script>
```

No exemplo, caso seja necessário bloquear o comportamento padrão do evento *@submit*, basta passar o evento para o método do evento invocado, e usar o método *preventDefault()* do evento:

```html
<form action="" @submit="sendForm($event)">
  ...
</form>
```

```javascript
<script>
export default {
  name: 'Form',
  methods: {
    sendForm(e) {
      e.preventDefault()
      console.log('Formulário enviado')
    }
  }
}
</script>
```

### Diretiva v-model

Para conectar diretamente um valor de um *input* a uma variável do *data* acessível no script, use o *v-model*:

```html
<input type="text" v-model="name" />
```

```javascript
export default {
  data() {
    return {
      name: ''
    }
  },
  methods: {
    sendForm(e) {
      e.preventDefault()
      const name = this.name
      const email = this.email
      console.log(`O nome é ${name}.`)
      console.log('Formulário enviado')
    }
  }
}
```

### Evento @click

O evento de clique também não tem muita complicação, basta declará-lo e conectar uma função válida declarada no *methods* do *data* e ela começará a ser invocada:

```html
<button type="button" @click="confirm($event)">Confirmar</button>
```

```javascript
methods: {
  confirm(e) {
    console.log('Evento: ', e)
    console.log('Confirmado.')
  }
}
```

## Múltiplos eventos

- O Vue também permite a entrada de *múltiplos eventos* em um único evento.
- A sintaxe permanece a mesma.
- Porém vamos *separar os eventos por vírgula*.
- Isso permite *executar dois ou mais métodos com um click*, por exemplo.

### Ativando múltiplas funções com o mesmo evento

Para executar mais de uma função ao disparar um único evento, basta adicionálo no atributo do evento, separando os métodos por vírgula:

```html
<button @click="primeiro($event), segundo($event)">Ativar múltiplos eventos</button>
```

```javascript
export default {
  methods: {
    primeiro(e) {
      console.log('Primeiro evento chamado.')
    },
    segundo(e) {
      console.log('Segundo evento chamado.')
    }
  }
}
```

### Passando valors fixos

É possível passar qualquer valor que seja um valor válido para o JavaScript nas funções, inclusive um valor fixo. Caso for string, não esquecer de nao usar aspas duplas dentro de aspas duplas:

```html
<button
  @click="
    primeiro('Primeiro evento', $event),
    segundo('Segundo evento', $event)">
  Ativar múltiplos eventos
</button>
```

```javascript
export default {
  methods: {
    primeiro(txt, e) {
      console.log('Primeiro evento chamado.')
      console.log(txt)
    },
    segundo(txt, e) {
      console.log('Segundo evento chamado.')
      console.log(txt)
    }
  }
}
```

### Passando variáveis

Também é possível passar qualquer variável que esteja acessível, como por exemplo, variáveis que vêm do *data*:

```html
<button
  @click="
    primeiro(txt1, $event),
    segundo(txt2, $event)">
  Ativar múltiplos eventos
</button>
```

```javascript
export default {
  data() {
    txt1: 'Primeiro evento',
    txt2: 'Segundo evento',
  },
  methods: {
    primeiro(txt, e) {
      console.log('Primeiro evento chamado.')
      console.log(txt)
    },
    segundo(txt, e) {
      console.log('Segundo evento chamado.')
      console.log(txt)
    }
  }
}
```