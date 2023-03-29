<template>
  <h2>Informação pessoal</h2>
  <p>Meu nome é {{ name }} e minha profissão é {{ profession }}.</p>
  <button @click="showEmail($event)">{{ texto_botao }}</button>
  <p v-show="show_email">Contate-me através do e-mail {{ email }}.</p>
  <p><a href="https://www.google.com.br" target="_blank">Acessar portfólio</a></p>
  <p class="teste">Lorem ipsum dolor, sit amet consectetur adipisicing elit. In suscipit quasi ad ut corporis, perferendis quo, quod quae voluptate voluptas tempora. Fugiat ducimus eos sit consectetur maxime excepturi neque numquam.</p>
  <TechnologyList />
  <Form />
</template>

<script>
import TechnologyList from './TechnologyList.vue'
import Form from './Form.vue'

export default {
  name: 'Info',
  components: {
    TechnologyList,
    Form
  },
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