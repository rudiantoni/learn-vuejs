<template>
  <h2>Informação pessoal</h2>
  <p>Meu nome é {{ name }} e minha profissão é {{ profession }}.</p>
  <button @click="showEmail($event)">{{ texto_botao }}</button>
  <p v-show="show_email">Contate-me através do e-mail {{ email }}.</p>
</template>

<script>
export default {
  name: 'Info',
  data() {
    return {
      name: 'Rudi',
      profession: 'Desenvolvedor de software',
      email: 'email.teste@teste.com',
      show_email: false,
      texto_botao: 'Mostrar e-mail'
    }
  },
  mounted() {
    console.log('Componente montado')
    this.lifeCycle()
  },
  methods: {
    showEmail(e) {
      console.log(this.show_email)
      this.show_email = !this.show_email
      console.log('mostrar e-mail')

      if (this.show_email) {
        this.texto_botao = 'Ocultar e-mail'
      } else {
        this.texto_botao = 'Mostrar e-mail'
      }
    },
    lifeCycle() {
      console.log('chamado lifeCycle') 
    }

  }
}
</script>