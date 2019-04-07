<template>
  <footer class="footer" v-show="todos.length">
    <span class="todo-count">
      <strong>{{todos.length}}</strong> 总数
    </span>
    <ul class="filters">
      <li v-for="(item,key) in filters"
        @click="changeFilter(key,$event)" :key="item">
        <a href="javascript:;" :class="[filter === key && 'selected']">{{item}}</a>
      </li>
    </ul>
    <button class="clear-completed" @click="clearCompleted">删除已完成</button>
  </footer>
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
    filters: {
      type: Object,
      default: function () {
        return {}
      }
    },
    filter: {
      type: String,
      default: 'all'
    }
  },
  methods: {
    changeFilter (key, event) {
      this.$emit('change-filter', key)
    },
    clearCompleted () {
      this.$emit('clear-completed')
    }
  }
}
</script>
