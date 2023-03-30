<template>
  <h2>Emit Pai</h2>
  <p>Texto de exemplo: {{ texto }}</p>
  <EmitFilho @trocar-texto="mudaTexto" />
</template>

<script>
import EmitFilho from './EmitFilho.vue';

export default {
  name: "EmitPai",
  components: { EmitFilho },
  data() {
    return {
      texto: "O texto ainda não foi alterado pelo evento emit do componente filho."
    };
  },
  methods: {
    mudaTexto() {
      this.texto = 'Texto alterado pelo emit do componente filho.'
    }
  }
}
</script>