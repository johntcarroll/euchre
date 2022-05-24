import { defineStore } from "pinia";

const useUserStore = defineStore("user", {
  state: () => ({
    sessionId: null,
    possibleName: null,
    idNames: {},
  }),
  actions: {
    parse(e) {
      let data = e.data;
      let [fn, ...params] = data.split(' ');
      console.debug("function:", fn, "params:", params);
      (this[fn] || this.debug(fn))(...params);
    },
    debug(fn) {
      return function(...params) {
	console.debug("Dropping call to", fn, params, "from user store");
      };
    },
    attemptsetname(socket, toSet) {
      socket.send(`setname ${toSet}`);
    },
    id(id) {
      this.sessionId = id;
      if (this.idNames[id]) {
        this.possibleName = this.idNames[id];
      }
    },
    is(id, ...name) {
      this.idNames[id] = name = name.join(' ');
      if (id == this.sessionId) {
        this.possibleName = name;
      }
    },
  },
  getters: {
    name: (state) => state.idNames[state.sessionId],
  }
});
export { useUserStore };

