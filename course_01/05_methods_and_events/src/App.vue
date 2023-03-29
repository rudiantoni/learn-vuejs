<template>
  <Header />
  <h1>Curso de Vue 3</h1>
  <Info />
  <MultipleEvent />
</template>

<script>
import Info from './components/Info.vue'
import Header from './components/Header.vue';
import MultipleEvent from './components/MultipleEvent.vue';

export default {
  name: 'App',
  components: {
    Info,
    Header,
    MultipleEvent
},
  data() {
    return {

    }
  }
}
</script>

<style>
  body {
    background-color: #333;
    color: #FFF;
  }
  a {
    color: #F00;
  }
  .teste {
    background-color: #000;
  }
</style>