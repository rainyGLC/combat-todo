<template>
  <div id="app" class="todoapp">

    <header class="header">
      <h1>todos</h1>
      <input class="new-todo" autofocus autocomplete="off" placeholder="What needs to be done?" v-model="newtodos">
    </header>
    <section class="main">
      <input id="toggle-all" class="toggle-all" type="checkbox"
        :checked="chooseAll">
      <label for="toggle-all" @click="toggleAll">Mark all as complete</label>
      <ul class="todo-list">
        <li :class="['todo' , {'completed' : item.completed }, {'editing': editTodo == item}]" v-for="(item,index) in todos" :key="index">
          <div class="view">
            <input class="toggle" type="checkbox" v-model="item.completed">
            <label @dblclick="editModel(item)">{{item.title}}</label>
            <button class="destroy"></button>
          </div>
          <input class="edit" type="text" v-focus="editTodo == item" @blur="editModelRemove" v-model="item.title" @keyup.esc="beforeTitle(item)">
        </li>
       <!--  <li class="todo editing">
          <div class="view">
            <input class="toggle" type="checkbox" >
            <label>代办 二</label>
            <button class="destroy"></button>
          </div>
          <input class="edit" type="text">
        </li> -->
       <!--  <li class="todo">
          <div class="view">
            <input class="toggle" type="checkbox" >
            <label>代办 三</label>
            <button class="destroy"></button>
          </div>
          <input class="edit" type="text">
        </li> -->
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
  name: 'app',
  data () {
    return {
      beforeEdit: '',
      editTodo: null,
      newtodos: '',
      todos: [{
        title: '代办一',
        completed: true
      }, {
        title: '代办二',
        completed: false
      }]
    }
  },
  computed: {
    chooseAll () {
      return this.todos.every(data => data.completed)
    }
  },
  methods: {
    editModel (todo) {
      this.beforeEdit = todo.title
      this.editTodo = todo
    },
    editModelRemove () {
      this.beforeEdit = ''
      this.editTodo = null
    },
    beforeTitle (item) {
      item.title = this.beforeEdit
      this.editModelRemove()
    },
    toggleAll (e) {
      let chooseAll = this.chooseAll
      console.log(chooseAll)
      // this.todos.forEach(data => data.completed = !chooseAll)
      this.todos.forEach(function (data) {
        data.completed = !chooseAll
      })
    }
    // toggleCompleted(index){
    //   this.todos[index].completed = !this.todos[index].completed
    // }
  },
  directives: {
    focus: function (el) {
      el.focus()
    }
  }
}
</script>

<style lang="less">
</style>
