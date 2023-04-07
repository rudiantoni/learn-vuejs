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

## Resgatando pedidos do banco

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