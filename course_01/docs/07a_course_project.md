# Título

- Conteúdo
  - [atualizar](atualizar)

## Resgatando dados do banco e inserindo no formulário

### Criando as variáveis, método assíncrono (async) e chamado ao montar o componente no lifecycle hook mounted()

No nosso componente *BurgerForm*, nós vamos popular algumas das entradas dos formulários com os dados do banco da API JSON.

Para isso, será necessário:
- Criar as variáveis para armazená-las no *data()*, pois como esses dados serão acessados pelo template, ela tem que estar no *data()*, mas isso não é requisito para outros casos.
- Criar o método de invocação em algum lifecycle hook, de preferência no hook *mounted()*. Esse método deve ser assíncrono (async).
- Criar o método e chamá-lo no hook previamente definido.

```javascript
export default {
  name: 'BurgerForm',
  data() {
    return {
      //...
      paes: null,
      carnes: null,
      opcionais_data: null,
      //...
    }
  },
  mounted() {
    this.getIngredientes()
  },
  methods: {
    async getIngredientes() {
      const req = await fetch('http://localhost:3000/ingredientes');
      const data = await req.json();
      
      this.paes = data.paes;
      this.carnes = data.carnes;
      this.opcionais_data = data.opcionais;
    }
  }
}
```

### Populando o template com os dados recebidos

Agora que possuimos os dados, vamos alterar o template dos itens em questão para que eles comportem os dados recebidos do back-end e popule de maneira dinâmica o front-end. Olhando para o template do componente *BurgerForm*, serão exibidas apenas as alterações feitas.

Observe que, nos itens onde temos o *select* e *option*, vamos apenas remover as opções que tínhamos colocado anteriormente para fazer a estilização.

Aqui, primeiro usamos o *v-for*, dando um nome temporário de *item* para cada item iterado e chamaos o array *paes* e *carnes*.

Nesses dois primeiros casos, as variáveis *pao* e *carne* são as que ficarão com o resultado da escolha, pois estão configuradas no *v-model*.

No bind do campo *key*, é necessário um valor único, por isso colocamos o *id*. Feito isso, basta alterar o value (que normalmente é só o *id* mas neste caso usamos o *tipo*) e o conteúdo da opção que seria o *tipo*.

Já na última parte, o *v-for* repete uma div inteira, que representa um elemento *checkbox* para cada opcional do burger.

Aqui, novamente iteramos no array que nesse caso é *opcionais_data*, é feito o bind de *key* para o *id*, e do *value* para o *tipo*. O conteído da tag é interpolado com a propriedade *tipo* também.

Nesse caso, a variável *opcionais* ficará com o resultado das escolhas selecionadas, pois está configurada no *v-model*.

```html
<!-- ... -->
<select name="pao" id="pao" v-model="pao">
  <option value="default">Selecione o seu pão</option>
  <option v-for="item in paes" :key="item.id" :value="item.tipo">{{ item.tipo }}</option>
</select>
<!-- ... -->
<select name="carne" id="carne" v-model="carne">
  <option value="default">Selecione o tipo de carne</option>
  <option v-for="item in carnes" :key="item.id" :value="item.tipo">{{ item.tipo }}</option>
</select>
<!-- ... -->
<div v-for="item in opcionais_data" :key="item.id" class="checkbox-container">
  <input type="checkbox" name="opcionais" v-model="opcionais" :value="item.tipo" />
  <span>{{ item.tipo }}</span>
</div>
<!-- ... -->
```

## Inserindo dados no banco

Para inserir os dados no banco, vamos primeiro criar um evento no *form*, para que, quando o formulário seja enviado, seja executada a função *createBurger()*:

```html
<form id="burger-form" @submit="createBurger">
```

Vamos agora criar a função na propriedade *methods* da exportação do componente.

Aqui primeiro vamos bloquear o comportamento normal com `event.preventDefault()`, assim a página não será recarregada nem serão criadas variáveis na URL.

Em segundo vamos criar o objeto que manterá os dados a serem enviados, isso é feito na variável *data*. Observe que, por padrão requisições que possuem arrays no envio de dados precisam ser convertidos para arrays normais. São exibidos dois exemplos nos comentários do código abaixo.

Por último, como estamos lidando com o JSON Server, precisaremos enviar os dados como uma string JSON válida, para isso, vamos converter o objeto *data* através da função `JSON.stringify()`. Em requisições normais isso não é feito, os dados são enviados como JSON mesmo.

Agora é só realizar a requisição, novamente, de maneira assíncrona. Note que, dessa vez, são especificados o método, o cabeçalho e o corpo da requisição, pois agora estamos fazendo um POST, e ele não é mais o padrão do fetch.

Podemos obter a resposta atraves da variável *res* demonstrada abaixo.


```javascript
async createBurger(event) {
  event.preventDefault()

  // É necessário converter o array do Proxy Array para um array normal do JS
  //opcionais: [...this.opcionais],
  //opcionais: Array.from(this.opcionais),

  const data = {
    nome: this.nome,
    pao: this.pao,
    carne: this.carne,
    opcionais: [...this.opcionais],
    status: this.status
  }

  const dataJson = JSON.stringify(data)

  const req = await fetch('http://localhost:3000/burgers', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: dataJson
  });

  const res = await req.json();

  console.log('res', res)

}
```
