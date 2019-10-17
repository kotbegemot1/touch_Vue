 
<template>
  <div class="container">
    <div class="col-sm-10">
      <h1>Задачи</h1>
      <confirmation
          :message="confirmationMessage"
          v-if="showConfirmation">
      </confirmation>
        <button type="button"
                id="task-add"
                class="btn btn-success btn-sm align-left d-block"
                v-b-modal.todo-modal>
          Добавить задачу
        </button>
      <table class="table table-dark table-stripped table-hover">
        <thead class="thead-light">
          <tr>
            <th>Uid</th>
            <th>Описание</th>
            <th>Выполнена?</th>
            <th></th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="(todo, index, id) in todos" :key="index">
            <td class="todo-uid">{{ id = id + 1 }}</td>
            <td>{{ todo.split(",")[0] }}</td>
            <td>
              <span v-if="todo.split(',')[1] == 'true'">Выполнено</span>
              <span v-else>Не выполнено</span>
            </td>
            <td>
              <div class="btn-group" role="group">

                <button type="button"
                        class="btn btn-secondary btn-sm"
                        v-b-modal.todo-update-modal
                        @click="updateTodo(index)"
                        >
                    Обновить
                </button>

                &nbsp;
                <button type="button"
                        class="btn btn-danger btn-sm"
                        @click="deleteTodo(index)">
                  X
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>


      <b-modal ref="updateTodoModal"
               id="todo-update-modal"
               title="Update"
               hide-footer>
        <b-form @submit="onUpdateSubmit" @reset="onUpdateReset" class="w-100">
        <b-form-group id="form-update-description-group"
                      label="Описание:"
                      label-for="form-update-description-input">
          <b-form-input id="form-update-description-input"
                        type="text"
                        required>
          </b-form-input>
        </b-form-group>
        <b-form-group id="form-update-complete-group">
          <b-form-checkbox-group id="form-update-checks">
            <b-form-checkbox value="true">Задача выполнена?</b-form-checkbox>
          </b-form-checkbox-group>
        </b-form-group>
        <b-button-group>
          <b-button type="submit" variant="primary">Обновить</b-button>
          <b-button type="reset" variant="danger">Сброс</b-button>
        </b-button-group>
        </b-form>
      </b-modal>



      <b-modal ref="addTodoModal"
               id="todo-modal"
               title="Добавить задачу"
               hide-footer>
        <b-form @submit="onSubmit" @reset="onReset" class="w-100">

        <b-form-group id="form-description-group"
                      label="Описание:"
                      label-for="form-description-input">
          <b-form-input id="form-description-input"
                        type="text"
                        required
                        placeholder="Завести задачу">
          </b-form-input>
        
        </b-form-group>
        <b-form-group id="form-complete-group">
          <b-form-checkbox-group id="form-checks">
            <b-form-checkbox value="true">Задача выполнена?</b-form-checkbox>
          </b-form-checkbox-group>
          
          </b-form-group>
          <b-button type="submit" variant="primary">Добавить</b-button>
          <b-button type="reset" variant="danger">Сброс</b-button>
        </b-form>
      </b-modal>





    </div>
  </div>
</template>

<script>

import Confirmation from './Confirmation.vue';

export default {
  name: 'Todo',
  data() {
    return {
      todos: {},
      updateTodoForm: {
      },
      confirmationMessage: '',
      showConfirmation: false,
    };
  },
  methods: {
    getTodos() {
      for(let i=0; i<localStorage.length; i++) {
        let key = localStorage.key(i);
        if (localStorage.getItem(key) == "SILENT") continue;
        this.todos[key] = localStorage.getItem(key);
      }
    },
    onSubmit(event) {
      event.preventDefault();
      this.$refs.addTodoModal.hide();
      let id_uid = (~~(Math.random()*1e8)).toString(16);
      let array = [event.currentTarget[0].value, event.currentTarget[2].checked];
      localStorage.setItem(id_uid, array);
      this.confirmationMessage = `Задача "${event.currentTarget[0].value}" добавлена`;
      this.showConfirmation = true;
      this.getTodos()
    },
    onReset(event) {
      event.preventDefault();
      this.$refs.addTodoModal.hide();
    },
    updateTodo(index) {
      this.updateTodoForm[index] = localStorage.getItem(index);
      // console.log(this.updateTodoForm);
    },
    onUpdateSubmit(event) {
      event.preventDefault();
      this.$refs.updateTodoModal.hide();
      for (let key in this.updateTodoForm){
        localStorage.setItem(key, [event.currentTarget[0].value, event.currentTarget[2].checked])
      } 
      this.updateTodoForm = {};
      this.confirmationMessage = 'Задача обновлена';
      this.showConfirmation = true;
      this.getTodos();
    },
    onUpdateReset(event) {
      event.preventDefault();
      this.$refs.updateTodoModal.hide();
    },
    deleteTodo(index) {
      console.log(index);
      localStorage.removeItem(index)
      // location.reload();
      this.confirmationMessage = 'Задача удалена из списка';
      this.showConfirmation = true;
      this.getTodos()
    },
  },
  components: {
    confirmation: Confirmation,
  },
  created() {
    this.getTodos();
  },
};
</script>

<style>
button#task-add {
  margin-top: 20px;
  margin-bottom: 20px;
}
h1, td {
  text-align: center;
}
.todo-uid {
  text-align: right;
}
</style>
