<template>
  <section class="main">
    <input id="toggle-all" class="toggle-all" type="checkbox"
      :checked="chooseAll">
    <label for="toggle-all" @click="toggleAll">Mark all as complete</label>
    <ul class="todo-list">
      <li :class="['todo' , {'completed' : item.completed }, {'editing': editTodo == item}]" v-for="(item,index) in showTodo" :key="index">
        <div class="view">
          <input class="toggle" type="checkbox" v-model="item.completed">
          <label @dblclick="editModel(item)">{{item.title}}</label>
          <button class="destroy" @click="destroy(index)"></button>
        </div>
        <input class="edit" type="text" v-focus="editTodo == item" @blur="editModelRemove" v-model="item.title" @keyup.esc="beforeTitle(item)">
      </li>
    </ul>
  </section>
</template>

<script>
export default {
  props: {
    // beforeEdit: {
    //   type: String,
    //   default: ''
    // },
    // editTodo: {
    //   type: Object,
    //   default: null
    // }
  },
  data () {
    return {
      beforeEdit: '',
      editTodo: null
    }
  },
  computed: {
    todos () {
      return this.$store.state.todos
    },
    filter () {
      return this.$store.state.filter
    },
    chooseAll () {
      return this.todos.every(data => data.completed)
    },
    showTodo () {
      let filter = this.filter
      let todos = this.todos.filter(data => {
        if (filter === 'all') {
          return data
        } else if (filter === 'active') {
          return !data.completed
        } else if (filter === 'completed') {
          return data.completed
        }
      })
      return todos
    }
  },
  methods: {
    toggleAll () {
      let value = this.chooseAll
      // this.$emit('toggle-all', value)
      this.$store.commit('toggleAll', value)
    },
    editModel (item) {
      this.editTodo = item
      this.beforeEdit = item.title
    },
    destroy (index) {
      // this.$emit('destroy-del', index)
      this.$store.commit('removeTodo', index)
    },
    editModelRemove () {
      this.editTodo = null
      this.beforeEdit = ''
    },
    beforeTitle (item) {
      item.title = this.beforeEdit
      this.editTodo = null
      this.beforeEdit = ''
    }
  },
  directives: {
    focus: function (el) {
      el.focus()
    }
  }
}
</script>
