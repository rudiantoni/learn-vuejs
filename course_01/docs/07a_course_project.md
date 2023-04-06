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

## Criando componente de mensagens do sistema

Agora vamos criar o componente para podermos definir mensagens de feedback para o cliente.

**Message.vue**

```html
<div class="message-container">
  <p>{{ msg }}</p>
</div>
```

```javascript
export default {
  name: 'Message',
  props: ['msg']
}
```

```css
.message-container {
  color: #004085;
  background-color: #CCE5FF;
  border: 2px solid #88DAFF;
  border-radius: 5px;
  padding: 10px;
  max-width: 400px;
  margin: 30px auto;
}
```

No componente *BurgerForm*, vamos chamar o novo componente *Message*, passand a prop da mensagem e mais uma propriedade *v-show* para que o componente não seja exibido caso a mensagem não for definida.

```html
<!-- ... -->
<Message :msg="msg" v-show="msg" />
<form id="burger-form" @submit="createBurger">
<!-- ... -->
```

```javascript
import Message from './Message.vue';

export default {
  // ...
  data() {
    return {
      // ...
      msg: null
      // ...
    };
  },
  // ...
  methods: {
    // ...
    async createBurger(event) {
      
      // ...

      const res = await req.json();
      this.nome = null;
      this.pao = 'default';
      this.carne = 'default';
      this.opcionais = [];

      this.msg = `Pedido número ${res.id} realizado com sucesso`

      setTimeout(() => this.msg = '', 3000)
    }
  },
  components: {
    Message
  }
```

Aqui, a resposta da requisição POST foi obtida pela variável *res*, e o dado de *id* foi aproveitado na mensagem enviada para o componente através da variável *msg* disponível no *data* e passada por prop para o componente.

Também foi definido um timeout de 3000ms, ou 3s, para fazer a mensagem desaparecer 3s após a mensagem ser exibida.

## Criando a tela de pedidos (Dashboard)

No componente de *Pedidos*, já vamos importar o componente de *Dashboard* preparando para sua criação:

```html
  <div class="main-container">
    <h1>Gerenciar pedidos</h1>
    <Dashboard />
  </div>
```

```javascript
import Dashboard from '../components/Dashboard.vue';

export default {
  name: "Pedidos",
  components: {
    Dashboard
  }
}
```

Agora vamos criar o componente *Dashboard*:

```html
<div id="burger-table">

  <div>
    <div id="burger-table-heading">
      <div class="order-id">#:</div>
      <div>Cliente:</div>
      <div>Pão:</div>
      <div>Carne:</div>
      <div>Opcionais:</div>
      <div>Ações:</div>
    </div>
  </div>

  <div id="burger-table-rows">
    <div class="burger-table-row">
      <div class="order-number">1</div>
      <div>João</div>
      <div>Pão integral</div>
      <div>Maminha</div>
      <div>
        <ul>
          <li>Salame</li>
          <li>Tomate</li>
        </ul>
      </div>

      <div>
        <select name="status" class=".status">
          <option value="default">Selecione</option>
        </select>
        <button class="delete-btn">Cancelar</button>
      </div>

      <div></div>
    </div>
  </div>

</div>
```

```javascript
export default {
  name: 'Dashboard'
}
```

```css
#burger-table {
  max-width: 1200px;
  margin: 0 auto;
}

#burger-table-heading,
#burger-table-rows,
.burger-table-row {
  display: flex;
  flex-wrap: wrap;
}

#burger-table-heading {
  font-weight: bold;
  padding: 12px;
  border-bottom: 3px solid #333;
}

#burger-table-heading div,
.burger-table-row div {
  width: 19%;
}

.burger-table-row {
  width: 100%;
  padding: 12px;
  border-bottom: 1px solid #CCC;
}

#burger-table-heading .order-id,
.burger-table-row .order-number {
  width: 5%;
}

select {
  padding: 12px 6px;
  margin-right: 12px;
}

.delete-btn {
  background-color: #222;
  color: #FCBA03;
  font-weight: bold;
  border: 2px solid #222;
  padding: 10px;
  font-size: 16px;
  margin: 0 auto;
  cursor: pointer;
  transition: .5s;
}

.delete-btn:hover {
  background-color: transparent;
  color: #222;
}
```