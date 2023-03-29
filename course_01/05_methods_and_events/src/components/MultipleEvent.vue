<template>
  <div>
    <h1>Múltiplos eventos</h1>
    <button
      @click="
        primeiro(txt1, $event),
        segundo('Segundo evento ativado!', $event)">
      Ativar múltiplos eventos
    </button>
    <p>{{multiplosEventos}}</p>
  </div>
</template>

<script>
export default {
  name: 'MultipleEvent',
  data() {
    return {
      multiplosEventos: '',
      txt1: 'Primeiro evento',
      txt2: 'Segundo evento'
    }
  },
  methods: {
    primeiro(txt, e) {
      console.log('Primeiro evento chamado.')
      this.multiplosEventos = txt
    },
    segundo(txt, e) {
      console.log('Segundo evento chamado.')
      setTimeout(() => {
        this.multiplosEventos = txt
      }, 500)
    }
  }
}
</script>

<style scoped>
  div {
    margin: 100px;
  }
</style>
