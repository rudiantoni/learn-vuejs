<template>
  <h2>Essa é a descrição da pessoa: {{ nome }} </h2>
  <Info />
  <Form />
</template>

<script>
import Info from './Info.vue';
import Form from './Form.vue';

export default {
  name: "Pessoa",
  data() {
    return {
      nome: "Rudi"
    };
  },
  components: {
    Info,
    Form
  }
}
</script>