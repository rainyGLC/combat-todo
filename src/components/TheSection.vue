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
    todos: {
      type: Array,
      default: function () {
        return []
      }
    },
    filter: {
      type: String,
      default: 'all'
    },
    beforeEdit: {
      type: String,
      default: ''
    },
    editTodo: {
      type: Object,
      default: null
    }
  },
  data () {
    return {
      // beforeEdit: '',
      // editTodo: null
    }
  },
  computed: {
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
      this.$emit('toggle-all', value)
    },
    editModel (item) {
      this.$emit('edit-model', item)
    },
    destroy (index) {
      this.$emit('destroy-del', index)
    },
    editModelRemove () {
      this.$emit('editmodel-remove')
    },
    beforeTitle (item) {
      this.$emit('before-title', item)
    }
  },
  directives: {
    focus: function (el) {
      el.focus()
    }
  }
}
</script>
