<template>
  <PrimeiroComponente />
  <p>O componente que possui um componente também pode exportar dados: {{ dadoTeste }}.</p>
  <LifeCycle />
</template>

<script>
import PrimeiroComponente from './components/PrimeiroComponente.vue';
import LifeCycle from './components/LifeCycle.vue';

export default {
  name: 'App',
  components: {
    PrimeiroComponente,
    LifeCycle
  },
  data() {
    return {
      dadoTeste: 'Esse é um dado de teste'
    }
  }
}
</script>