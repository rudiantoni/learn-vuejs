<template>
  <div class="message-container" v-show="message">
    <p>{{ message }}</p>
  </div>
</template>

<script>
export default {
  name: 'Message',
  data() {
    return {
      message: null,
      timeout: null
    }
  },
  methods: {
    send(msg) {
      const oldTimeout = this.timeout

      this.message = msg
      this.timeout = setTimeout(() => this.message = null, 3000)
      
      if (oldTimeout) {
        clearTimeout(oldTimeout)
      }
    }
  },
  expose: ['send']
}
</script>

<style scope>
.message-container {
  color: #004085;
  background-color: #CCE5FF;
  border: 2px solid #88DAFF;
  border-radius: 5px;
  padding: 10px;
  max-width: 400px;
  margin: 30px auto;
}
</style>