# Título

- Conteúdo
  - [atualizar](atualizar)

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

## HTTP GET e DOM: Resgatando pedidos do banco

Agora vamos resgatar os pedidos que haviam sido gerados no banco, na rota */burgers* e popular a lista que criamos anteriormente.

*Dashboard.vue*

```javascript
export default {
  //...
    data() {
    return {
      burgers: null,
      burgerId: null,
      status: []
    }
  },
  methods: {
    async getPedidos() {
      const req = await fetch('http://localhost:3000/burgers')
      const data = await req.json()
      this.burgers = data;
    }
  },
  mounted() {
    this.getPedidos();
  }
  //...
}
```

Para popular os dados no template HTML que criamos anteriormente:

```html
<!-- ... -->
<div id="burger-table-rows">
  <div class="burger-table-row"
    v-show="burgers && burgers.length > 0"
    v-for="burgerItem in burgers" :key="burgerItem.id"
    >
    <div class="order-number">{{ burgerItem.id }}</div>
    <div>{{ burgerItem.nome }}</div>
    <div>{{ burgerItem.pao }}</div>
    <div>{{ burgerItem.carne }}</div>
    <div>
      <ul v-show="burgerItem.opcionais && burgerItem.opcionais.length > 0">
        <li v-for="opcionalItem, i in burgerItem.opcionais" :key="i">{{ opcionalItem }}</li>
      </ul>
    </div>
    <!-- ... -->
  </div>
  <!-- ... -->
</div>
```

## HTTP GET e DOM: Recebendo os status dos pedidos

Primeiramente, trazer os dados do banco de dados:

```javascript
export default {
  name: 'Dashboard',
  //...
  data() {
    return {
      // ...
      burgerStatus: null
    }
  },
  methods: {
    //...
    async getStatus() {
      const req = await fetch('http://localhost:3000/status')
      const data = await req.json()
      this.status = data;
    }
    //...
  },
  mounted() {
    //...
    this.getStatus();
    //...
  }
}
```

Após isso, é só realizar o loop e marcar no template as variáveis correspondentes. Observe que para deixar pré-selecionado no *select* do pedido, foi usado o atributo *selected* do elemento HTML *option*. Caso usássemos o *v-model* no *select* com algum valor pré-determinado combinando ou não com algum *value* de algum option, esse ignoraria de qualquer maneira o atributo *selected*.

Como esse select ainda está dentro do loop do *burgerItem*, da lista *burgers*, ainda conseguimos acessá-lo e será o uso dessa variável em uma dada condição que determinará a opção pré-selecionada.

```html
<!-- ... -->
<select name="status" class="status">
  <option value="default">Selecione</option>
  <option
    v-for="item in status" :key="item.id" value="item.tipo"
    :selected="burgerItem.status === item.tipo">
    {{ item.tipo }}
  </option>
</select>
<!-- ... -->
```

## HTTP DELETE: Removendo pedidos do sistema

Para remover um pedido do sistema, normalmente enviamos uma requisição HTTP DELETE para a API que estamos utilizando, informando o dado que a identifica como um registro único que, no nosso caso é o campo *id*. Sendo assim, basta adicionarmos um evento de clique no botão de cancelar que enviará o id atual (lembre-se que o botão está dentro do loop de burgers então ele tem acesso a essa propriedade) para um método do componente, este fará uma requisição DELETE para a API:

```html
<!-- ... -->
<button class="delete-btn" @click="deleteBurger(burgerItem.id)">Cancelar</button>
<!-- ... -->
```

```javascript
export default {
  name: 'Dashboard',
  //..
  methods: {
    //..
    async deleteBurger(burgerId) {
      const url = `http://localhost:3000/burgers/${burgerId}`
      const config = {
        method: 'DELETE'
      }
      const req = await fetch(url, config)
      const res = await req.json()

      this.getPedidos();

    },
  //...
}
```

## HTTP PATCH: Atualização de pedidos

Nessa parte vamos atualizar o status de um pedido quando o campo de status for alterado. Como não vamos atualizar o recurso inteiro, o padrão é que se envie uma requisição PATCH:

```html
<!-- ... -->
<select name="status" class="status" @change="updateBurger($event, burgerItem.id)">
<!-- ... -->
```

```javascript
export default {
  name: 'Dashboard',
  //...
  methods: {
    //...
    async updateBurger(event, burgerId) {      
      const option = event.target.value
      const dataJsonStr = JSON.stringify({status: option})

      const url = `http://localhost:3000/burgers/${burgerId}`
      const config = {
        method: 'PATCH',
        headers: {
          'content-type': 'application/json'
        },
        body: dataJsonStr
      }

      const req = await fetch(url, config);
      const res = await req.json();
    }
  },
  //...
}
```

## Mensagens nas atualizações e remoções de pedido, chamado com $refs

Aqui vamos ir um pouco além do demonstrado na aula, e vamos deixar a lógica de exibição de mensagem apenas no componente *Message*.

Primeiro vamos adaptá-lo para não receber mais props, e sim, apenas exibir a mensagem após a chamada de um método dentro do próprio componente, para podermos chamá-lo a partir de outro componente:

```html
<template>
  <div class="message-container" v-show="message">
    <p>{{ message }}</p>
  </div>
</template>
```

```html
<script>
export default {
  name: 'Message',
  data() {
    return {
      message: null,
      timeout: null
    }
  },
  methods: {
    send(msg) {
      const oldTimeout = this.timeout
      if (oldTimeout) {
        clearTimeout(oldTimeout)
      }

      this.message = msg
      this.timeout = setTimeout(() => this.message = null, 3000)
      
    }
  },
  expose: ['send']
}
</script>
```

Quando o método *send()* for chamado:
- Ele vai obter a instância antiga do timeout anterior (se existente) e guardar na variável *oldTimeout*
- Caso tenha existido uma instância anterior do temporizador, ele vai ser removido para que a mensagem não seja zerada, e apenas o timeout atual exista.
- Vai atualizar a variável de mensagem *this.message* que está sendo interpolada no template, fazendo assim com que o DOM seja alterado, com o valor recebido pelo argumento *msg*.
- Vai ser criado um novo temporizador e armazenado na variável *this.timeout* para poder ser acessado posteriormente.

Assim, toda vez que a função for chamada, ela substituirá o texto atual do componente e resetará o temporizador.

Como esse método exige alteração do DOM, então ele tem que ser chamado utilizando a propriedade *expose*.

Agora, para chamarmos esse método em algum componente, devemos fazer o seguinte:

```html
<!-- ... -->
<Message ref="msg" />
<!-- ... -->
```

```javascript
import Message from './Message.vue';

export default {
  methods: {
    async createBurger(event) {
      const res {id: 1} // exemplo
      this.sendMessage(`Pedido número ${res.id} realizado com sucesso`)
    },
    sendMessage(message) {
      this.$refs.msg.send(message)
    }
  },
  components: {
    Message
  }
}
```

Também é possível chamar a função com *Message.methods.send(msg)*, porém não surtirá efeito na DOM, pois ela está sendo chamada sem levar em consideração o contexto em que se encontra.

## Conclusão do curso: Criando API util

Aqui vamos ainda mais além, agora vamos criar um arquivo *apiService.js* para podermos utilizar as funções de API de maneira mais simples.

Primeiro, vamos criar o seguinte arquivo em */src/utils/apiService.js*:

```javascript
const BASE_URL = 'http://localhost:3000'

const http = async (request) => {
  try {
    const response = await fetch(request)
    if (!response.ok) {
      throw new Error('HTTP response was not OK')
    }
    return { response: response, data: await response.json() }
  } catch (e) {
    console.error('HTTP error: ', e)
    throw e
  }

}

const apiService = {

  get: async (route) => {
    const reqUrl = `${BASE_URL}${route}`

    const reqConfig = {
      method: 'GET'
    }

    const req = new Request(reqUrl, reqConfig)
    return await http(req)
  },

  post: async (route, body) => {
    const reqUrl = `${BASE_URL}${route}`
    const reqBody = JSON.stringify(body)
    const reqHeaders = new Headers()
    reqHeaders.append('Content-Type', 'application/json')

    const reqConfig = {
      method: 'POST',
      headers: reqHeaders,
      body: reqBody
    }

    const req = new Request(reqUrl, reqConfig)
    return await http(req)
  },

  delete: async (route) => {
    const reqUrl = `${BASE_URL}${route}`

    const reqConfig = {
      method: 'DELETE'
    }

    const req = new Request(reqUrl, reqConfig)
    return await http(req)
  },

  patch: async (route, body) => {
    const reqUrl = `${BASE_URL}${route}`
    const reqBody = JSON.stringify(body)
    const reqHeaders = new Headers()
    reqHeaders.append('Content-Type', 'application/json')

    const reqConfig = {
      method: 'PATCH',
      headers: reqHeaders,
      body: reqBody
    }

    const req = new Request(reqUrl, reqConfig)
    return await http(req)
  }

}

export {
  apiService
}
```

Este arquivo possui todos os métodos HTTP que são utilizados no projeto: GET, POST, PATCH e DELETE.

Temos exemplos de GET e POST no componente *BurgerForm.vue*, e temos exemplos de GET, PATCH e DELETE no componente *Dashboard.vue*.

### Operação de GET

Componente *BurgerForm.vue*:

```javascript
async getIngredientes() {
  apiService.get('/ingredientes').then((res) => {
    this.paes = res.data.paes;
    this.carnes = res.data.carnes;
    this.opcionais_data = res.data.opcionais;
  }).catch((e) => {
    console.error(e)
  })

  /*
  Equivale a:
  
  try {
    const res = apiService.get('/ingredientes')
    this.paes = res.data.paes;
    this.carnes = res.data.carnes;
    this.opcionais_data = res.data.opcionais;
  } catch (e) {
    console.error(e)
  }
  */
},
```

### Operação de POST

Componente *BurgerForm.vue*:

```javascript
async createBurger(event) {
  // ...
  const res = await apiService.post('/burgers', data)
  // ...
  this.sendMessage(`Pedido número ${res.data.id} realizado com sucesso`)
},
```

### Operação de PATCH

Componente *Dashboard.vue*:

```javascript
async updateBurger(event, burgerId) {
  // ...
  const res = await apiService.patch(`/burgers/${burgerId}`, data)
  // ...
  this.sendMessage(`Pedido número ${res.data.id} atualizado para ${res.data.status} com sucesso.`)
}
```

### Operação de DELETE

Componente *Dashboard.vue*:

```javascript
async deleteBurger(burgerId) {
  await apiService.delete(`/burgers/${burgerId}`)
  this.sendMessage(`Pedido número ${burgerId} removido com sucesso`)
  // ...
},
```
