import { defineStore } from "pinia";

const useFlashStore = defineStore("flash", {
  state: () => ({
    buffer: [],
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
	console.debug("Dropping call to", fn, params, "from flash store")
      };
    },
    flushBuffer() {
      let flush = this.buffer;
      this.buffer = [];
      return flush;
    },
    error(speaker, ...words) {
      words = words.join(' ');
      this.buffer.push(words);
    },
    clearMessage(index) {
      this.buffer.splice(index, 1);
    },
    clearMessages() {
      this.buffer = [];
    },
  }
});
export { useFlashStore };
