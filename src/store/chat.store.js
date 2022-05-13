import { defineStore } from "pinia";

const useChatStore = defineStore("chat", {
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
	console.debug("Dropping call to", fn, params, "from chat store")
      };
    },
    flushBuffer() {
      let flush = this.buffer;
      this.buffer = [];
      return flush;
    },
    say(speaker, ...words) {
      words = words.join(' ');
      console.debug("speaker:", speaker, "words:", words);
      this.buffer = this.buffer + [`${speaker}: ${words}\n`];
    },
    send(socket, input) {
      socket.send(`say ${input}`);
    },
  }
});
export { useChatStore };
