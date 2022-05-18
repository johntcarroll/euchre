import { defineStore } from "pinia";

const useChatStore = defineStore(
  "chat",
  {
    state: () => ({
      buffer: [],
    }),
    actions: {
      flushBuffer() {
        let flush = this.buffer;
        this.buffer = [];
        return flush;
      },
      say(speaker, ...words) {
        words = words.join(" ");
        console.debug("speaker:", speaker, "words:", words);
        this.buffer = this.buffer + [`${speaker}: ${words}\n`];
      },
      send(socket, input) {
        socket.send(`say ${input}`);
      },
    },
  },
  { socketed: true, socketPrefix: "chat" }
);
export { useChatStore };
