<script setup>
import { onMounted, onUnmounted, ref } from "vue";
import { useSocketStore } from "../store/socket.store";
import { useChatStore } from "../store/chat.store";
import config from "../config";
const chatStore = useChatStore();
const socketStore = useSocketStore();
onMounted(() => {
  const ta = document.getElementById("ta");
  chatStore.$subscribe((m, s) => {
    if (m.events.key == "buffer" && chatStore.buffer.length > 0) {
      ta.value = (ta.value || "") + chatStore.flushBuffer();
      ta.scrollTop = ta.scrollHeight;
    }
  });
  socketStore.listen("message", chatStore.parse);
});
onUnmounted(() => {
  socketStore.unlisten("message", chatStore.parse);
});
const text = ref('');
function submit() {
  chatStore.send(socketStore.socket, text.value);
  text.value = '';
}
</script>
<style scoped>
#Chat form, #Chat textarea, #Chat input {
  width: 100%;
}
#Chat textarea {
  height: 200px;
}
</style>
<template>
<div id="Chat">
  <h6>Chat</h6>
  <textarea id="ta"></textarea>
  <form id="manual-commands" @submit.prevent="submit">
    <input id="text-input" v-model="text" type="text" placeholder="enter text here...">
    <input type="submit" value="Send">
  </form>
</div>
</template>
