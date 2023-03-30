<template>
  <h1>Reutilização de componentes, props e emit</h1>
  <Reutilizacao />
  <Reutilizacao />
  <Reutilizacao />
  <Reutilizacao />
  <Reutilizacao />
  <Reutilizacao />

  <PropPai />
  <EmitPai />
</template>

<script>
import EmitPai from './components/EmitPai.vue';
import PropPai from './components/PropPai.vue';
import Reutilizacao from './components/Reutilizacao.vue';

export default {
  name: 'App',
  components: {
    Reutilizacao,
    PropPai,
    EmitPai
  }
}
</script>
