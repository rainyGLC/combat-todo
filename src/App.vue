<template>
  <div id="app" class="todoapp">
    <the-header v-on:add-todos="create"/>
    <the-section
      :todos="todos"
      :filter="filter"
      :beforeEdit="beforeEdit"
      :editTodo="editTodo"
      v-on:toggle-all="toggleAll"
      v-on:edit-model="editModel"
      v-on:editmodel-remove="editModelRemove"
      v-on:before-title="beforeTitle"
      v-on:destroy-del="destroy"
    />
    <the-footer
      :todos="todos"
      :filters="filters"
      :filter="filter"
      v-on:change-filter="changeFilter"
      v-on:clear-completed="clearCompleted"
    />
    <!-- <footer class="info">
    <p>Double-click to edit a todo</p>
    <p>Written by <a href="http://evanyou.me">Evan You</a></p>
    <p>Part of <a href="http://todomvc.com">TodoMVC</a></p>
    </footer> -->
  </div>
</template>

<script>
import TheHeader from '@/components/TheHeader'
import TheSection from '@/components/TheSection'
import TheFooter from '@/components/TheFooter'
import '@/assets/css/base.css'
import '@/assets/css/index.css'
export default {
  name: 'app',
  data () {
    return {
      beforeEdit: '',
      editTodo: null,
      // newtodo: '',
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
  methods: {
    editModel (item) {
      this.beforeEdit = item.title
      this.editTodo = item
    },
    editModelRemove () {
      this.beforeEdit = ''
      this.editTodo = null
    },
    beforeTitle (item) {
      item.title = this.beforeEdit
      this.editModelRemove()
    },
    toggleAll (value) {
      let chooseAll = value
      // this.todos.forEach(data => data.completed = !chooseAll)
      this.todos.forEach(function (data) {
        data.completed = !chooseAll
      })
    },
    create (value) {
      this.todos.push({
        title: value,
        completed: false
      })
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
    }
  },
  components: {
    'the-header': TheHeader,
    'the-section': TheSection,
    'the-footer': TheFooter
  }
}
</script>
<style lang="less">
</style>
