<template>
  <footer class="footer" v-show="todoCount">
    <span class="todo-count">
      <strong>{{todoCount}}</strong> 总数
    </span>
    <ul class="filters">
      <li v-for="(item,key) in filters" :key="item">
       <!--  @click="changeFilter(key,$event)" :key="item"> -->
       <!--  <a href="javascript:;" :class="[filter === key && 'selected']">{{item}}</a> -->
        <router-link :class="[filter === key && 'selected']" :to="'/' + key">{{item}}</router-link>
      </li>
    </ul>
    <button v-if="hasCompleted" class="clear-completed" @click="clearCompleted">删除已完成</button>
  </footer>
</template>

<script>
export default {
  computed: {
    filter () {
      return this.$store.state.filter
    },
    filters () {
      return this.$store.state.filters
    },
    hasCompleted () {
      return this.$store.getters.hasCompleted
    },
    todoCount () {
      return this.$store.getters.todoCount
    }
  },
  methods: {
    // changeFilter (key, event) {
    //   console.log(key)
    //   this.$store.commit('changeFilter', key)
    // },
    clearCompleted () {
      this.$store.commit('removeCompleted')
    }
  }
}
</script>
