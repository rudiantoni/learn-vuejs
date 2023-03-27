<template>
  <PrimeiroComponente />
  <p>O componente que possui um componente também pode exportar dados: {{ dadoTeste }}.</p>
  <LifeCycle />
  <Pessoa />
  
</template>

<script>
import PrimeiroComponente from './components/PrimeiroComponente.vue';
import LifeCycle from './components/LifeCycle.vue';
import Pessoa from './components/Pessoa.vue';

export default {
  name: 'App',
  components: {
    PrimeiroComponente,
    LifeCycle,
    Pessoa
  },
  data() {
    return {
      dadoTeste: 'Esse é um dado de teste'
    }
  }
}
</script>