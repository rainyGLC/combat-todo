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

