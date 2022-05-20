import Vue from 'vue'
import Vuex from 'vuex'
import db from '../getdb.js'

db.all('select * from test', function (err, res) {
  if (!err) {
    console.log(JSON.stringify(res))
  } else {
    console.log(err)
  }
})


Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    database: null,
    data: []
  },
  getters:{
  },
  mutations: {
    init(state, data) {
      state.database = data;
    },
    load(state, data) {
      state.data = [];
      for(var i = 0; i < data.data.length; i++) {
          state.data.push({
              firstname: data.data[i][0],
              lastname: data.data[i][1]
          });
      }
    },
    save(state, data) {
      state.data.push({
        firstname: data.data.firstname,
        lastname: data.data.lastname
      });
    },
  },
  actions: {
    insert(context, data) {
      context.state.database.run("INSERT INTO policy (name, policy) VALUES (?, ?)", [data.name, data.policy]).then(() => {
          context.commit("save", { data: data });
      }, error => {
          console.log("INSERT ERROR", error);
      });
    },
    query(context) {
      context.state.database.run("SELECT name, policy FROM policy", []).then(result => {
          context.commit("load", { data: result });
      }, error => {
          console.log("SELECT ERROR", error);
      });
    }
  },
  modules: {
  }
})
