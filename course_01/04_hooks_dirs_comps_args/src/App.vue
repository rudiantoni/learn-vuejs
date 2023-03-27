<template>
  <h1>App</h1>
  <LifeCycle />
  <Pessoa />
</template>

<script>
import LifeCycle from './components/LifeCycle.vue';
import Pessoa from './components/Pessoa.vue'

export default {
  name: 'App',
  components: {
    LifeCycle,
    Pessoa
  }
}
</script>