<template>
  <p>Utilizo as seguintes tecnologias para o back-end:</p>
  <ul>
    <li v-for="(technology, index) in backEndTechnologies"  v-bind:key="index">
      {{ technology }}
    </li>
  </ul>
  <p>Utilizo as seguintes tecnologias para o front-end:</p>
  <ul>
    <li v-for="technology in frontEndTechnologies" :key="technology.id">
      {{ technology.language }}
    </li>
  </ul>
</template>

<script>
export default {
  name: 'TechnologyList',
  data() {
    return {
      backEndTechnologies: ['JavaScript', 'PHP', 'Python'],
      frontEndTechnologies: [
        {id: 1, language: 'JavaScript'},
        {id: 2, language: 'HTML'},
        {id: 3, language: 'CSS'}
      ]
    }
  }
}
</script>