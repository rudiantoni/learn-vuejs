<template>
  <h1>Olá Vue!</h1>
  <p>Meu nome é {{ name }} e trabalho como {{ profession }}.</p>
</template>

<script>
  export default {
    name: 'PrimeiroComponente',
    data() {
      return {
        name: "Rudi",
        profession: "Desenvolvedor"
      }
    }
  }
</script>