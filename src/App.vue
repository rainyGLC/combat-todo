<template>
  <div id="app">
    <header class="header">
      <h1>todos</h1>
      <input class="new-todo" autofocus autocomplete="off" placeholder="What needs to be done?" v-model="newtodos">
    </header>
    <section class="main">
      <input id="toggle-all" class="toggle-all" type="checkbox">
      <label for="toggle-all">Mark all as complete</label>
      <ul class="todo-list">
        <li :class="[item.completed ? 'completed' : 'todo']" v-for="(item,index) in todos">
          <div class="view">
            <input class="toggle" type="checkbox" :checked="item.completed"
              @click="toggleCompleted(index)">
            <label>{{item.title}}</label>
            <button class="destroy"></button>
          </div>
          <input class="edit" type="text">
        </li>
      </ul>
    </section>
    <footer class="footer">
      <span class="todo-count">
        <strong>3</strong> todo
      </span>
      <ul class="filters">
        <li><a href="#/all" class="selected">All</a></li>
        <li><a href="#/active">Active</a></li>
        <li><a href="#/completed">Completed</a></li>
      </ul>
      <button class="clear-completed">Clear completed</button>
    </footer>
    <!-- <footer class="info">
    <p>Double-click to edit a todo</p>
    <p>Written by <a href="http://evanyou.me">Evan You</a></p>
    <p>Part of <a href="http://todomvc.com">TodoMVC</a></p>
    </footer> -->
  </div>
</template>

<script>
import '@/assets/css/base.css'
import '@/assets/css/index.css'
export default {
  name:'app',
  data() {
    return {
      newtodos:'',
      todos: [{
        title: '代办一',
        completed:true
      }]
    }
  },
  methods:{
    toggleCompleted(index){
      this.todos[index].completed = !this.todos[index].completed
    }
  }
}
</script>

<style lang="less">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
