import { ref } from "vue";
const socket = ref(
  new WebSocket(`${location.origin.replace(/^http/, "ws")}/websocket`)
);
const buffer = ref([]);
// add code here to listen to socket and place messages in the buffer

const webSocketPlugin = ({ options, store }) => {
  store.socket = socket;
  store.buffer = buffer;
  store.parse = (e) => {
    let data = e.data;
    let [fn, ...params] = data.split(" ");
    console.debug("function:", fn, "params:", params);
    (store[fn] || store.debug(fn))(...params);
  };
  store.debug = () => {
    return function (...params) {
      console.debug("Dropping call to", fn, params, "from chat store");
    };
  };

  store.$subscribe((m, s) => {
    store.parse(m.value); //sudo code
  });
};

export { webSocketPlugin };
