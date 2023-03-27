<template>
  <p v-if="esta_trabalhando">Estou trabalhando no momento.</p>
  <p v-else>Estou em busca de novas oportunidades!</p>
  <p>Utilizo as seguintes tecnologias:</p>
  <ul>
    <li>JavaScript</li>
    <li>PHP</li>
    <li>Python</li>
    <li>Java</li>
    <li>Kotlin</li>
  </ul>
  <p v-show="mostrar_email">Mande uma mensagem para: {{ email }}</p>
  <p>Para acessar meu portfólio <a v-bind:href="meu_link" v-bind:title="link_title" target="_blank" >basta clicar aqui</a>.</p>
  <Picture />
</template>

<script>
import InputSubmit from './form/InputSubmit.vue';
import Picture from './Picture.vue';

export default {
  name: "Info",
  data() {
    return {
      esta_trabalhando: true,
      mostrar_email: true,
      email: 'email@teste.com',
      meu_link: 'https://www.google.com',
      link_title: 'Ir para o meu portfólio.'
    };
  },
  components: {
    InputSubmit,
    Picture
  }
}
</script>