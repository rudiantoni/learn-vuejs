<template>
  <Message ref="msg" />
  <form id="burger-form" @submit="createBurger">

    <div class="input-container">
      <label for="nome">Nome do Cliente:</label>
      <input type="text" id="nome" name="nome" v-model="nome" placeholder="Digite o seu nome" />
    </div>

    <div class="input-container">
      <label for="pao">Escolha o pão:</label>
      <select name="pao" id="pao" v-model="pao">
        <option value="default">Selecione o seu pão</option>
        <option v-for="item in paes" :key="item.id" :value="item.tipo">{{ item.tipo }}</option>
      </select>
    </div>

    <div class="input-container">
      <label for="carne">Escolha a carne do seu burger:</label>
      <select name="carne" id="carne" v-model="carne">
        <option value="default">Selecione o tipo de carne</option>
        <option v-for="item in carnes" :key="item.id" :value="item.tipo">{{ item.tipo }}</option>
      </select>
    </div>

    <div id="opcionais-container" class="input-container">
      <label id="opcionais-title" for="opcionais">Selecione os opcionais:</label>
      <div v-for="item in opcionais_data" :key="item.id" class="checkbox-container">
        <input type="checkbox" name="opcionais" v-model="opcionais" :value="item.tipo" />
        <span>{{ item.tipo }}</span>
      </div>
    </div>

    <div class="input-container">
      <input type="submit" class="submit-btn" value="Criar meu Burger!">
    </div>

  </form>
</template>

<script>
import Message from './Message.vue';
import { apiService } from '../utils/apiService';

export default {
  name: 'BurgerForm',
  data() {
    return {
      paes: null,
      carnes: null,
      opcionais_data: null,
      nome: null,
      pao: 'default',
      carne: 'default',
      opcionais: [],
      status: 'Solicitado',
    };
  },
  mounted() {
    this.getIngredientes();
  },
  methods: {
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
    async createBurger(event) {
      event.preventDefault();
      const data = {
        nome: this.nome,
        pao: this.pao,
        carne: this.carne,
        opcionais: [...this.opcionais],
        status: this.status
      };

      const res = await apiService.post('/burgers', data)

      this.nome = null;
      this.pao = 'default';
      this.carne = 'default';
      this.opcionais = [];

      this.sendMessage(`Pedido número ${res.data.id} realizado com sucesso`)
    },
    sendMessage(message) {
      this.$refs.msg.send(message)
    }

  },
  components: {
    Message
  }
}
</script>

<style scoped>
#burger-form {
  max-width: 400px;
  margin: 0 auto;
}

.input-container {
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;

}

label {
  font-weight: bold;
  margin-bottom: 15px;
  color: #222;
  padding: 5px 10px;
  border-left: 4px solid #FCBA03
}

input,
select {
  padding: 5px 10px;
  width: 300px;
}

#opcionais-container {
  flex-direction: row;
  flex-wrap: wrap;
}

#opcionais-title {
  width: 100%;
}

.checkbox-container {
  display: flex;
  align-items: flex-start;
  width: 50%;
  margin-bottom: 20px;
}

.checkbox-container span,
.checkbox-container input {
  width: auto;
}

.checkbox-container span {
  margin-left: 6px;
  font-weight: bold;
}

.submit-btn {
  background-color: #222;
  color: #FCBA03;
  font-weight: bold;
  margin: 2px solid #222;
  padding: 10px;
  font-size: 16px;
  margin: 0 auto;
  cursor: pointer;
  transition: 0.5s;
}

.submit-btn:hover {
  background-color: transparent;
  color: #222;
}
</style>