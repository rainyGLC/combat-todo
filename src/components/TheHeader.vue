<template>
  <header class="header">
    <h1>极客 todos</h1>
    <input class="new-todo" autofocus autocomplete="off" placeholder="What needs to be done?" v-model="newtodo"
    @keyup.enter="createTodo">
  </header>
</template>

<script>
export default {
  data () {
    return {
      newtodo: ''
    }
  },
  methods: {
    createTodo () {
      let value = this.newtodo
      // this.$emit('add-todos', value)
      this.$store.commit('addTodo', {
        title: value,
        completed: false
      })
      this.newtodo = ''
    }
  }
}
</script>
