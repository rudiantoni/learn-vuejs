<template>
  <form action="" @submit="sendForm($event)">
    <p><input type="text" v-model="name" /></p>
    <p><input type="text" v-model="email" /></p>
    <p><input type="submit" value="Enviar" /></p>
  </form>
</template>

<script>
export default {
  name: 'Form',
  data() {
    return {
      name: '', 
      email: ''
    }
  },
  methods: {
    sendForm(e) {
      e.preventDefault()

      const name = this.name
      const email = this.email

      console.log(`O nome é ${name} e o email é ${email}.`)
      console.log('Formulário enviado')
    }
  }
}
</script>