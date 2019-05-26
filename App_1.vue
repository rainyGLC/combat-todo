<template>
  <div id="app" class="todoapp">
    <header class="header">
      <h1>极客 todos</h1>
      <input class="new-todo" autofocus autocomplete="off" placeholder="What needs to be done?" v-model="newtodo"
      @keyup.enter="create">
    </header>
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
          <input class="edit" type="text" v-focus @blur="editModelRemove" v-model="item.title" @keyup.esc="beforeTitle(item)">
        </li>
      </ul>
    </section>
    <footer class="footer" v-show="todos.length">
      <span class="todo-count">
        <strong>{{todos.length}}</strong> 总数
      </span>
      <ul class="filters">
        <li v-for="(item,key) in filters"
          @click="changeFilter(key,$event)" :key="item">
          <a href="javascript:;" :class="[filter === key && 'selected']">{{item}}</a>
        </li>
        <!-- <li><a href="#/active">Active</a></li>
        <li><a href="#/completed">Completed</a></li> -->
      </ul>
      <button class="clear-completed" @click="clearCompleted">删除已完成</button>
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
      newtodo: '',
      todos: [{
        title: '代办一',
        completed: true
      }, {
        title: '代办二',
        completed: false
      }],
      filter: 'all',
      filters: {
        'all': '全部',
        'active': '进行中',
        'completed': '已完成'
      }
    }
  },
  computed: {
    chooseAll () {
      return this.todos.every(data => data.completed)
    },
    showTodo () {
      let filter = this.filter
      console.log(filter)
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
    },
    create (e) {
      let value = this.newtodo
      this.todos.push({
        title: value,
        completed: false
      })
      this.newtodo = ''
    },
    destroy (index) {
      this.todos.splice(index, 1)
    },
    clearCompleted () {
      let todos = this.todos.filter(data => data.completed === false)
      this.todos = todos
    },
    changeFilter (key, event) {
      this.filter = key
      console.log(this.filter)
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
