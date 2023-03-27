<template>
  <PrimeiroComponente />
  <p>O componente que possui um componente também pode exportar dados: {{ dadoTeste }}.</p>
</template>

<script>
import PrimeiroComponente from './components/PrimeiroComponente.vue';

export default {
  name: 'App',
  components: {
    PrimeiroComponente
  },
  data() {
    return {
      dadoTeste: 'Esse é um dado de teste'
    }
  }
}
</script>