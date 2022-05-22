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
      this.buffer = this.buffer + [`${speaker}: ${words}\n`];
    },
    send(socket, input) {
      socket.send(`say ${input}`);
    },
    sit(player, seat) {
      this.buffer = this.buffer + [`>> ${player} sits at seat ${seat}\n`];
    },
    stand(player, _seat) {
      this.buffer = this.buffer + [`>> ${player} stands up\n`];
    }
  }
});
export { useChatStore };
