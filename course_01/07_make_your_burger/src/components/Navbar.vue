<template>
  <div>
    <nav id="navbar">
      <router-link id="logo_url" to="/"><img id="logo" :src="logo" :alt="alt" /></router-link> |
      <router-link to="/">Início</router-link> |
      <router-link to="/pedidos">Pedidos</router-link>
    </nav>
    <!-- <router-view /> -->
  </div>
</template>

<script>
export default {
  name: 'Navbar',
  props: ["logo", "alt"]
}
</script>

<style scoped>
#navbar {
  background-color: #222;
  border-bottom: 1px solid #111;
  padding:15px 50px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

logo_url {

////// TODO REPOSITÓRIO PRA MOSRTA
   }

</style>
