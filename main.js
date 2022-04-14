// ローカルストレージ API
let STORAGE_KEY = 'todos-vuejs-demo'
let todoStorage = {
  fetch: function() {
    let todos = JSON.parse(
      localStorage.getItem(STORAGE_KEY) || '[]'
    )
    todos.forEach(function(todo, index) {
      todo.id = index
    })
    todoStorage.uid = todos.length
    return todos
  },
  save: function(todos) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos))
  }
}




const app = new Vue({
  el: '#app',
  data: {
    todos: [],


  current: -1,

    options: [
      { value: -1, label: 'すべて' },
      { value: 0,  label: '作業中' },
      { value: 1,  label: '完了' }
    ],
  },


  watch: {
      todos: {
        handler: function(todos) {
          todoStorage.save(todos)
        },
        deep: true
      }
    },

      created() {
        this.todos = todoStorage.fetch()
      },


  methods: {
        doAdd: function(event, value) {
          let comment = this.$refs.comment
          if (!comment.value.length) {
            return
          }

          this.todos.push({
            id: todoStorage.uid++,
            comment: comment.value,
            state: 0
          })
          comment.value = ''
        },

        doChangeState: function(item) {
          item.state = item.state ? 0 : 1
        },

        doRemove: function(item) {
          var index = this.todos.indexOf(item)
          this.todos.splice(index, 1)

        }
      }
    })
  