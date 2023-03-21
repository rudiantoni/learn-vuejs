const MyNameApp = {
    data() {
        return {
            name: "João",
            age: "30"
        }
    }
}

Vue.createApp(MyNameApp).mount('#app')