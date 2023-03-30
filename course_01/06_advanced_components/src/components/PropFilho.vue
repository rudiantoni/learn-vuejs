<template>
  <h2>Prop Filho</h2>
  <p>Email: {{ email }}</p>
  <p>Nome: {{ name }}</p>
</template>
<script>
export default {
  name: 'PropFilho',
  props: {
    email: String,
    name: String
  }
}
</script>