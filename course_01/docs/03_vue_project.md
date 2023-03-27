# O CLI do Vue, componentes e dados, lifecycle hooks e diretivas

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

## Life cycle hooks

- Os *life cycle hooks* são eventos que podem ser ativados em determinadas partes da execução de um programa
- Exemplo: *created*
- Executa o código a partir do momento que o componente é criado.
- Esses gatilhos são interessantes para alterar a aplicação em diversas etapas diferentes.

### Usando o hook created()

Para exemplificar o uso do hook *created*, primeiro criaremos um componente novo, chamado *LifeCycle.vue*, definindo um template e um script padrão básico. Onde no template é necessário uma variável do script, e essa variável possui um valor definido pela função *data*.

```html
<template>
  <h1>Meu nome é: {{ name }}</h1>
</template>

<script>
  export default {
    name: 'LifeCycle',
    data() {
      return {
        name: 'Ainda não sei'
      }
    }
  }
</script>
```

Agora vamos chamá-lo no componente *App*, primeiramente declarando na propriedade *components* da exportação para indicar que vamos usá-lo, e depois chamando no template.

```html
<template>
  <LifeCycle />
</template>

<script>
import LifeCycle from './components/LifeCycle.vue';

export default {
  name: 'App',
  components: {
    LifeCycle
  }
}
</script>
```

Agora, se iniciarmos o projeto, vamos ver que o texto no elemento *h1* da aplicação está *Ainda não sei*, pois esse é o valor padrão definido pela função *data*.

Então vamos agora fazer esse valor ser alterado assim que o componente for criado, imprimindo no console o valor anterior e o atual.

Essa alteração deve ser feita no componente *LifeCycle*, adicionando o código do hook *created* na exportação, ficando da seguinte maneira.

```html
<template>
  <h1>Meu nome é: {{ name }}</h1>
</template>

<script>
  export default {
    name: 'LifeCycle',
    data() {
      return {
        name: 'Ainda não sei'
      }
    },
    created() {
      console.log('this.name', this.name)
      this.name = "Rudi"
      console.log('this.name', this.name)
    }
  }
</script>
```

Agora, quando o componente for criado, a função *created()* será chamada, e assim ela alterará o valor da variável *name* para *Rudi*, atualizando automaticamente a exibição. É possível conferir os valores antes e depois da alteração com os *console.log()* inseridos no código.

### Usando o hook mounted()

Como exemplo, também usaremos o hook *mounted*, ele ocorre após o hook *created*. Vamos altearar o componente *LifeCycle* adicionando o hook, alterando novamente o valor da variável *name* sem deixar de imprimir os valores de antes e depois de sua alteração, deixando o script assim:

```JavaScript
export default {
  name: 'LifeCycle',
  data() {
    return {
      name: 'Ainda não sei'
    }
  },
  created() {
    console.log('created this.name', this.name)
    this.name = "Rudi"
    console.log('created this.name', this.name)
  },
  mounted() {
    console.log('mounted this.name', this.name)
    this.name = "João"
    console.log('mounted this.name', this.name)
  }
}
```

O que aconteceu aqui foi:
1. O valor da variável *name* era inicialmente *Ainda não sei*.
2. Após o componente ter sido criado, a variável foi alterada para *Rudi*.
3. Após o componente ter sido montado, a variável foi alterada para *Pedro*.

### Simulando requisição assíncrona usando setTimeout

Como as mudanças são feitas de maneira muito rápida, vamos atrasar as chamadas usando o setTimeout, que poderíamos usar para simular a realização de uma requisição HTTP assíncrona feita a uma API.

Seguindo a lógica, o exemplo funcionará dessa maneira:
1. O componente vai obter os dados através do hook *data*
2. O componente vai ser criado e quando finalizar vai chamar a função *created*. Nesse caso vamos disparar uma função assíncrona que será executada apenas 2 segundos (2000 milissegundos) após a sua chamada.
3. O componente vai ser mounted e quando finalizar vai chamar a função *mounted*. Nesse caso vamos disparar uma função assíncrona que será executada apenas 4 segundos (4000 milissegundos) após a sua chamada.
4. Ainda estaremos vendo o valor inicial da variável que é *Ainda não sei*
5. Passados os primeiros 2 segundos da chamada da função pelo hook *created*, o valor será alterado para *Rudi* e a exibição será atualizada.
6. Passados os 4 segundos da chamada da função pelo hook *mounted*, o valor será alterado para *João* e a exibição será atualizada novamente.
7. O último valor da variável será *João*.

## Hierarquia de componentes

- É comum *componentes terem outros componentes* que dependem deles.
- Ou seja, criamos uma *árvore de componentes*.
- Precisamos ter cuidade para isso não virar uma *bagunça*.
- Com essa divisão de componentes em subcomponentes, separamos ainda mais as responsabilidades de cada um dos componentes.


### Componentização

O objetivo da componentização é reutilizar código. Pois a repetição exagerada pode deixá-lo confuso, ou, no mínimo, difícil de manter.

Porém temos de ter cautela ao usar esse conceito, para não exagerarmos e acabarmos caindo na ideia de que "componentizar tudo" é a solução. Nem sempre, se o código vai ser usado em apenas um lugar, não tem porque ele ser componentizado.

O conceito utilizado é: sempre que o código for utilizado no mínimo em dois lugares diferentes, aí então ele deve ser componentizado.

Para exemplificar, vamos criar um componente *Pessoa* básico.

```html
<template>
  <h2>Essa é a descrição da pessoa: {{ nome }} </h2>
</template>

<script>
export default {
  name: 'Pessoa',
  data() {
    return {
      nome: 'Rudi'
    }
  }
}
</script>
```

E vamos utilizá-lo no componente *App*:

```html
<template>
  <Pessoa />
</template>

<script>
import Pessoa from './components/Pessoa.vue';

export default {
  name: 'App',
  components: {
    Pessoa
  }
}
</script>
```

Pronto, ele já deve estar visível na página principal.

Vamos agora alterar a exibição do componente *Pessoa*:

```html
<h2>Essa é a descrição da pessoa: {{ nome }} </h2>
<p>Estou trabalhando no momento.</p>
<p>Utilizo as seguintes tecnologias:</p>
<ul>
  <li>JavaScript</li>
  <li>PHP</li>
  <li>Python</li>
  <li>Java</li>
  <li>Kotlin</li>
</ul>
```

Neste exemplo, o componente *Pessoa* possui um título *h2* e outros elementos que indicam ali dados sobre a pessoa propriamente dita. Vamos componentizar esses dados.

Para isso, criaremos um novo componente, Info:

```html
<template>
</template>

<script>
export default {
  name: 'Info'
}
</script>
```

Todo o conteúdo da exibição do componente *Pessoa* deve ser trazido para a exibição do componente *Info*, exceto o elemento *h2*, deixando a exibição do *Info* assim:

```html
<p>Estou trabalhando no momento.</p>
<p>Utilizo as seguintes tecnologias:</p>
<ul>
  <li>JavaScript</li>
  <li>PHP</li>
  <li>Python</li>
  <li>Java</li>
  <li>Kotlin</li>
</ul>
```

Vamos importar o componente *Info* e utilizá-lo no componente *Pessoa*:

```html
<template>
  <h2>Essa é a descrição da pessoa: {{ nome }} </h2>
  <Info />
</template>

<script>
import Info from './Info.vue';

export default {
  name: "Pessoa",
  data() {
    return {
        nome: "Rudi"
    };
  },
  components: {
    Info
  }
}
</script>
```

## Diretivas

- As *diretivas* em Vue são muitas.
- Por exemplo *v-if*.
- Pode mudar a exibição de uma parte do layout, baseada em uma condição.
- *As diretivas são essenciais* para uma aplicação dinâmica.
- Podemos alterar a lógica pelos valores inseridos em *data*.

Nos valores utilizados nas diretivas, podem ser enviados quaisquer expressões JavaScript válidas.

### Diretiva v-if

A diretiva *v-if* renderiza um elemento/componente quando uma dada condição é verdadeira.

Utilizando o componente *Info* previamente criado, vamos criar uma condição para que o elemento *p* seja renderizado apenas quando a variavel *esta_trabalhando* do *data* for *true*:

```html
<template>
  <p v-if="esta_trabalhando">Estou trabalhando no momento.</p>
  <p>Utilizo as seguintes tecnologias:</p>
  <ul>
    <li>JavaScript</li>
    <li>PHP</li>
    <li>Python</li>
    <li>Java</li>
    <li>Kotlin</li>
  </ul>
</template>

<script>
import InputSubmit from './form/InputSubmit.vue';

export default {
  name: "Info",
  data() {
    return {
      esta_trabalhando: true
    };
  },
  components: { InputSubmit }
}
</script>
```

Agora, sempre que a expressão dentro do *v-if* for *false*, o elemento *p* não será exibido. Neste caso, a condição é ligada diretamente a variável booleana *esta_trabalhando*.

### Diretiva v-else

A diretiva *v-else* renderiza um elemento sempre que o elemento *v-if* não renderizar. Ou seja, ele reproduz o fluxo de execução de código *if, else*.

A observação aqui, é que o elemento com a diretiva *v-else* tem que ser um irmão imediato posterior do elemento com o *v-if*. Ou seja, quando quiser usar a diretiva *v-else*, tem que haver um elemento com a diretiva *v-if* anterior a ele, sem nenhum outro elemento/componente entre eles.

Vamos novamente usar como exemplo o nosso componente *Info* alterando apenas sua exibição:

```html
<p v-if="esta_trabalhando">Estou trabalhando no momento.</p>
<p v-else>Estou em busca de novas oportunidades!</p>
```

```javascript
export default {
  name: "Info",
  data() {
    return {
      esta_trabalhando: true,
    };
  }
}
```

### Diretiva v-show

A diretiva *v-show* funciona igual o *v-if*, ela possui apenas um significado semântico diferente. É entendido que, se não for necessário usar o *v-else*, então o *v-if* pode ser substituído por um *v-show*.

```html
<p v-show="mostrar_email">Mande uma mensagem para: {{ email }}</p>
```

```javascript
export default {
  name: "Info",
  data() {
    return {
      mostrar_email: true,
      email: 'email@teste.com'
    };
  }
}
```
