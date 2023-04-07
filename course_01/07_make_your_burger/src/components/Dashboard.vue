<template>
  <Message ref="msg" />
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
            <li v-for="(opcionalItem, i) in burgerItem.opcionais" :key="i">{{ opcionalItem }}</li>
          </ul>
        </div>

        <div>
          <select name="status" class="status" @change="updateBurger($event, burgerItem.id)">
            <option
              v-for="item in status" :key="item.id" :value="item.tipo"
              :selected="burgerItem.status === item.tipo">
              {{ item.tipo }}
            </option>
          </select>
          <button class="delete-btn" @click="deleteBurger(burgerItem.id)">Cancelar</button>
        </div>

      </div>
    </div>

  </div>
</template>

<script>
import Message from './Message.vue'
import { apiService } from '../utils/apiService';

export default {
  name: 'Dashboard',
  components: {
    Message
  },
  methods: {
    async getPedidos() {
      const res = await apiService.get('/burgers')
      this.burgers = res.data;
    },
    async getStatus() {
      const res = await apiService.get('/status')
      this.status = res.data;
    },
    async deleteBurger(burgerId) {
      await apiService.delete(`/burgers/${burgerId}`)
      
      this.sendMessage(`Pedido número ${burgerId} removido com sucesso`)

      this.getPedidos();

    },
    async updateBurger(event, burgerId) {      
      const option = event.target.value
      const data = {status: option}

      const res = await apiService.patch(`/burgers/${burgerId}`, data)

      this.sendMessage(`Pedido número ${res.data.id} atualizado para ${res.data.status} com sucesso.`)

    },
    sendMessage(message) {
      this.$refs.msg.send(message)
    }
  },
  mounted() {
    this.getPedidos();
    this.getStatus();
  },
  data() {
    return {
      burgers: [],
      burgerId: null,
      status: [],
      burgerStatus: null,
      msg: null
    }
  }
}
</script>

<style scoped>
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
</style>
