import { defineStore } from "pinia";

const useSocketStore = defineStore("socket", {
  state: () => ({
    connected: false,
    socket: null,
  }),
  actions: {
    connect() {
      this.socket =
        this.socket ||
        new WebSocket(`${location.origin.replace(/^http/, 'ws')}/websocket`);
      this.socket.addEventListener("open", () => {
        this.connected = true;
      });
    },
    listen(event, fn) {
      this.socket.addEventListener(event, fn);
    },
    unlisten(event, fn) {
      this.socket.removeEventListener(event, fn);
    },
    send(msg) {
      this.socket.send(msg);
    }
  },
});
export { useSocketStore };
