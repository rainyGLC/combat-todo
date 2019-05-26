# combat-todos

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your tests
```
npm run test
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

### 项目名称
一个轻量而高效的待办清单，无论是工作计划，个人生活或者家庭学习，都能保证你更好的完成自己的事项。


本项目为 Vue 构建 Todos 应用，通过对数据的操作驱动视图变化，完成 Todo 项目的增删改查，并使用 Vue Router 和 Vuex 生态插件进行路由的控制和全局数据的处理。

掌握以下知识点:
1. Vue CLI , 快速构建 Vue 项目
2. Vue data 数据的绑定
3. Vue class 属性绑定
4. Vue methods 事件的绑定
5. Vue computed 计算属性
6. Vue watch 侦听器
7. Vue directive 自定义指令
8. Vue.component 组件分离、组件间数据传递
9. Vue Router 路由管理
10. Vuex 数据管理

文档

1. Vue 官方文档,  https://cn.vuejs.org/
2. Vue CLI , https://cli.vuejs.org/
3. Vue Router , https://router.vuejs.org/zh/
4. Vuex, https://vuex.vuejs.org/zh/
5. Scrimba 相关教程，https://scrimba.com/g/glearnvue



需注意点问题点:

任务添加路由中
在底部导航配置 router-link
抽离容器组件 TheTodes 使用 watch 监听 $router 的变化，在触发的回调函数中获取 params 的值，修改 filter 数据。同时在页面 created 生命周期中也调用此回调函数。

首先要router.js中配置路由

    import Vue from 'vue'
    import Router from 'vue-router'
    import Todos from './views/Todos'
    Vue.use(Router)
    export default new Router({
      mode: 'history',
      routes: [
        {
          path: '/',
          component: Todos
        },
        {
          path: '/:id',
          component: Todos
        }
      ]
    })

在组件theFooter.js中

    <template>
      <footer class="footer" v-show="todos.length">
        <span class="todo-count">
          <strong>{{todos.length}}</strong> 总数
        </span>
        <ul class="filters">
          <li v-for="(item,key) in filters">
           <!--  @click="changeFilter(key,$event)" :key="item" -->
           <!--  <a href="javascript:;" :class="[filter === key && 'selected']">{{item}}</a> -->
            <router-link :class="[filter === key && 'selected']" :to="'/' + key">{{item}}</router-link>
          </li>
        </ul>
        <button class="clear-completed" @click="clearCompleted">删除已完成</button>
      </footer>
    </template>

对底部导航进行路由配置，

再此回父组件使用 watch 监听 $router 以动态的切换底部导航的三个状态

    watch: {
        '$route': function () {
          console.log(this.$route);
          let params = this.$route.params
          let filter = params.id || 'all'
          this.filter = filter
        }
    },
当路由id为filter="all"时，会切换回all状态，展示所有状态todos
当路由id为filter="active"时，点击 active 状态，展示没有完成的todos 
当路由id为filter="completed"时，点击completed状态，展示已完成的
todos

当在某路由原地刷新，列表数据保持和路由对应的状态不变,通过created来实现

      created () {
          let params = this.$route.params
          let filter = params.id || 'all'
          //当没有params.id时就显示"all"状态
          this.filter = filter
        },

如果不使用watch监听$router的变化，当点击切换导航时候，URL 地址发送变化，列表数据也发生变化,通过绑定事件来实现状态的切换

在组件theFooter.js中

    <template>
      <footer class="footer" v-show="todos.length">
        <span class="todo-count">
          <strong>{{todos.length}}</strong> 总数
        </span>
        <ul class="filters">
          <li v-for="(item,key) in filters">
            @click="changeFilter(key,$event)" :key="item">
            <router-link :class="[filter === key && 'selected']" :to="'/' + key">{{item}}</router-link>
          </li>
        </ul>
        <button class="clear-completed" @click="clearCompleted">删除已完成</button>
      </footer>
    </template>

通过changeFilter事件来动态切换不同的状态

      changeFilter (key, event) {
        this.$emit('change-filter', key)
        this.filter = key
        <!-- this.$emit('update:filter', key) -->
      },

