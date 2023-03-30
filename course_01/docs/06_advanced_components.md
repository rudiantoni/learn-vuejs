# Reutilização de componentes, props e emit

- Conteúdo
  - [atualizar](atualizar)

## Reutilização de componentes

- No Vue, é comum a *reutilização de componentes*.
- Cada componente será completamente *independente*.
- Podendo ativar *seus métodos e mudar seus dados*, assim que necessário.
- Para utilizar o recurso, basta invocar novamente o componente após a importação do mesmo.

Para demonstrar a reutilização e a independência dos componentes, será criado um componente chamado *Reutilizacao*.

Este componente possuirá um botão e um texto no elemento *span*, sempre que esse botão for clicado, esse elemento de texto será alternado entre exibido e oculto.

```html
<template>
  <div>
    <button @click="ativar">Clique aqui!</button>
    <span v-show="ativou">Ativado!</span>
  </div>
</template>
```

```html
<script>
export default {
  name: 'Reutilizacao',
  data() {
    return {
      ativou: false
    }
  },
  methods: {
    ativar() {
      this.ativou = !this.ativou
    }
  }
}
</script>
```

Agora, vamos importar e utiizar o componente quantas vezes quisermos em qualquer lugar:

```htm
  <h1>Reutilização de componentes, props e emit</h1>
  <Reutilizacao />
  <Reutilizacao />
  <Reutilizacao />
  <Reutilizacao />
  <Reutilizacao />
  <Reutilizacao />
```

```javascript
import Reutilizacao from './components/Reutilizacao.vue';
export default {
  components: {
    Reutilizacao
  }
}
```

Agora, quando você clicar no botão, você notará que apenas o texto referente ao componente será oculto/exibido, e não haverá alterações nos elementos dos outros componentes. Demonstrando assim sua total independência.

## Utilizando props

- *Os componentes do Vue podem receber dados*, e este recurso é chamado de *props*.
- As props podem ser passadas por *valores do data*, como também podemos *inserir diretamente* eles.
- *Precisamos declarar as propriedades recebidas pelos componentes*, em um array ou objeto chamado props.

Dessa maneira é possível apenas passar dados de um componente pai para um componente filho.

### Passando props hardcoded

Primeiramente, vamos criar um componente *PropPai* e um *PropFilho*:

```html
<template>
  <h2>Prop Pai</h2>
</template>
<script>
export default {
    name: "PropPai"
}
</script>
```

```html
<template>
  <h2>Prop Filho</h2>
</template>
<script>
export default {
  name: 'PropFilho'
}
</script>
```

Vamos importar e usar o componente *PropFilho* dentro do componente *PropPai*. Porém, desta vez não vamos apenas importar e chamá-lo no template. Nós vamos passar um prop. Para isso, vamos passar no template, ao chamar o componente *PropFilho*, uma prop (que se assemelha a maneira como os atributos HTML são passados aos seus elementos) chamada email, com um valor qualquer:

```html
<h2>Prop Pai</h2>
<PropFilho email="email.teste@teste.com" />
```

No componente *PropFilho*, teremos que obter esse dado passado pelo componente pai. Para isso, crie uma nova propriedade no export default: *props*. Dentro dessa propriedade terá um objeto com o nome dos props esperados pelo componente e uma tipagem opcional. Após isso, basta usá-lo normalmente no template do componente filho. Tome cuidado para que não existam props com o mesmo nome das propriedades expostas pelo data, isso pode causar conflitos.

```html
<h2>Prop Filho</h2>
<p>Email: {{ email }}</p>
```

```javascript
export default {
  name: 'PropFilho',
  props: {
    email: String
  }
}
```

### Passando props com variáveis

Quando quisermos passar dados de maneira dinâmica, teremos de usar o auxílio do *v-bind*, conectando a prop sendo passada para o componente filho a alguma variável acessível, até mesmo variáveis expostas pelo data.

Faça o seguinte no componente pai:

```html
<PropFilho email="email.teste@teste.com" :name="personName" />
```

Agora para acessar esse dado no componente filho, é exatamente a mesma coisa que antes:

```javascript
export default {
  props: {
    email: String,
    name: String
  }
}
```

### Recebendo prop com array

Até agora, estávamos recebendo os props do componente como objeto.

Para receber as props como array, é necessário criar um componente novo, pois por causa de conflitos (o posterior sempre sobrescreve o anterior), é necessário que cada componente tenha apenas um tipo de recebimento de props: ou por array, ou por objeto.

Um ponto importante de citar é que não é possível tipar os props que são recebidos como arrays.

Quanto ao componente pai, basta continuar passando os props da mesma maneira.

Componente *PropFilhoArray*:

```html
<template>
  <h2>Prop Filho com Array</h2>
  <p>Email: {{ email }}</p>
  <p>Nome: {{ name }}</p>
  <p v-show="exibirDescricao">Eu sou um desenvolvedor.</p>
  <p>{{ exibirDescricao }}</p>
</template>
<script>
export default {
  name: 'PropFilhoArray',
  props: ["exibirDescricao", 'name', 'email']
}
</script>
```

Componente *PropPai*:

```html
<template>
  <h2>Prop Pai</h2>
  <PropFilhoArray email="filho.array@teste.com" :name="personName" :exibirDescricao="false" />
</template>
<script>
import PropFilhoArray from './PropFilhoArray.vue';
export default {
  name: "PropPai",
  components: { PropFilhoArray },
  data() {
    return {
      personName: 'Pessoa de Testes',
    }
  }
}
</script>

```

## Ouvindo eventos com $emit

- Utilizando o *$emit* é possível ouvir um evento de um componente filho em um componente pai.
- Com isso, *podemos ativar comportamentos (como métodos)* no componente pai.
- *O evento deve ser registrado* no componente.
- E é preciso definir o que será feito com a ativação do evento na chamada do componente.

Primeiramente, vamos criar dois componentes básicos: *EmitFilho* e *EmitPai*, já usando o componente *EmitFilho* no componente *EmitPai*:

Componente *EmitFilho*:

```html
<template>
  <button>Trocar texto do componente pai</button>
</template>

<script>
export default {
  name: 'EmitFilho',
}
</script>
```

Componente *EmitPai*:

```html
<template>
  <h2>Emit Pai</h2>
  <p>Texto de exemplo: {{ texto }}</p>
  <EmitFilho />
</template>

<script>
import EmitFilho from './EmitFilho.vue';

export default {
  name: "EmitPai",
  components: { EmitFilho },
  data() {
    return {
      texto: "O texto ainda não foi alterado pelo evento emit do componente filho."
    };
  }
}
</script>
```

Pronto, já podemos notar que o componente *EmitFilho* possui um botão, e o componente *EmitPai* possui um parágrafo com uma parte do texto sendo adicionado dinamicamente através da variável disponível no *data*.

A ideia aqui é: ao pressionar o botão no componente filho, o texto no parágrafo do elemento pai é alterado.

Para isso, vamos primeiro ajustar o componente filho.

Aqui, precisamos fazer duas coisas: Primeiro registar o emit (que é um evento personalizado) na exportação através da propriedade *emits*. Essa propriedade é um array de strings, que armazena o nome de todos os *emits* que esse componente possui. Nesse exemplo, o nome do emit é *trocarTexto*.

Após isso, temos de adicionar o evento de clique ao botão, mas, ao invés de colocar um métodos, vamos chamar a função *$emit()* do Vue, passando apenas o nome do emit que nesse caso é *trocarTexto* como parâmetro (também é possível passar parâmetros para o método chamado, basta adicioná-los na função).

```html
<button @click="$emit('trocarTexto')">Trocar texto do componente pai</button>
```

```javascript
export default {
  name: 'EmitFilho',
  emits: ['trocarTexto']
}
```

Agora, no componente pai, precisamos apenas fazer o componente escutar esse emit (da mesma maneira que um evento) e invocar uma função em sua chamada. Aqui o evento é igual ao nome do emit, porém sempre em kebab-case (separação por hífens).

Por fim, a última coisa necessária é apenas criar o método normalmente na propriedade *methods* na exportação do componente.

```html
<EmitFilho @trocar-texto="mudaTexto" />
```

```javascript
import EmitFilho from './EmitFilho.vue';

export default {
  name: "EmitPai",
  components: { EmitFilho },
  data() {
    return {
      texto: "O texto ainda não foi alterado pelo evento emit do componente filho."
    };
  },
  methods: {
    mudaTexto() {
      this.texto = 'Texto alterado pelo emit do componente filho.'
    }
  }
}
```