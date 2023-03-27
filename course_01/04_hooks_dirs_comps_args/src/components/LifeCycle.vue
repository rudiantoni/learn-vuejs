<template>
  <h1>Meu nome é: {{ name }}</h1>
</template>

<script>
  export default {
    name: 'LifeCycle',
    data() {
      return {
        name: 'Ainda não sei'
      }
    },
    created() {
      setTimeout(() => {
        console.log('created this.name', this.name)
        this.name = "Rudi"
        console.log('created this.name', this.name)
      }, 2000);
    },
    mounted() {
      setTimeout(() => {
        console.log('mounted this.name', this.name)
        this.name = "João"
        console.log('mounted this.name', this.name)
      }, 4000);      
    },
  }
</script>