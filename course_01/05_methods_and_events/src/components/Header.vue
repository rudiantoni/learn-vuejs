<template>
  <h1>Esse é o componente de header</h1>
  <ul>
    <li><a href="#">Home</a></li>
    <li><a href="#">Projetos</a></li>
    <li><a href="#">Contato</a></li>
  </ul>
</template>

<script>
export default {
  name: 'Header'
}
</script>

<style scoped>
  ul {
    list-style: none;
    display: flex;
    background-color: #555;
  }
  li {
    margin-right: 10px;
  }
  a {
    color: #DDD;
    text-decoration: none;
    transition: .5s;
  }
  a:hover {
    color: turquoise
  }
</style>