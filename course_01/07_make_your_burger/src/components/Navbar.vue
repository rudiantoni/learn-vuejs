<template>
  <div>
    <nav id="navbar">
      <RouterLink to="/">Início</RouterLink> |
      <RouterLink to="/pedidos">Pedidos</RouterLink>
    </nav>

    <RouterView />
  </div>
</template>

<script>
import { RouterLink, RouterView } from 'vue-router'
export default {
  name: 'Navbar',
  components: {
    RouterLink,
    RouterView
  }
}
</script>

<style scoped></style>
