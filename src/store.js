import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
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
  },
  getters: {
    todoCount: (state) => {
      return state.todos.length
    },
    hasCompleted: (state) => {
      return state.todos.some(data => data.completed)
    }
  },
  mutations: {
    addTodo (state, todo) {
      state.todos.push(todo)
    },
    removeTodo (state, index) {
      state.todos.splice(index, 1)
    },
    toggleAll (state, value) {
      state.todos.forEach(function (data) {
        data.completed = !value
      })
    },
    removeCompleted (state) {
      state.todos = state.todos.filter(data => !data.completed)
    },
    changeFilter (state, filter) {
      state.filter = filter
    }
  },
  actions: {

  }
})
