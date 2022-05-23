import { defineStore } from "pinia";

const useUserStore = defineStore("user", {
  state: () => ({
    id: null,
    name: null,
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
      this.id = id;
    },
    setname(...name) {
      this.name = this.possibleName = name.join(' ');
    },
  }
});
export { useUserStore };

