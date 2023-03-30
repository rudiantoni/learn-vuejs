<template>
  <h2>Prop Filho com Array</h2>
  <p>Email: {{ email }}</p>
  <p>Nome: {{ name }}</p>
  <p v-show="exibirDescricao">Eu sou um desenvolvedor.</p>
  <p>{{ exibirDescricao }}</p>
</template>
<script>
export default {
  name: 'PropFilhoArray',
  props: ["exibirDescricao", 'name', 'email']
}
</script>