<template>
  <button @click="$emit('trocarTexto')">Trocar texto do componente pai</button>
</template>

<script>
export default {
  name: 'EmitFilho',
  emits: ['trocarTexto']
}
</script>