<template>
  <h2>Prop Pai</h2>
  <PropFilho email="email.teste@teste.com" :name="personName" />
  <PropFilhoArray email="filho.array@teste.com" :name="personName" :exibirDescricao="false" />
</template>
<script>
import PropFilho from './PropFilho.vue';
import PropFilhoArray from './PropFilhoArray.vue';

export default {
  name: "PropPai",
  components: { PropFilho, PropFilhoArray },
  data() {
    return {
      personName: 'Pessoa de Testes',
    }
  }
}
</script>