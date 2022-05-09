<script setup>
import { onMounted, ref } from "vue";
import { useGameStore } from "../store/game.store";
import config from "../config";
const gameStore = useGameStore();
onMounted(() => {
  const ta = document.getElementById("ta");
  gameStore.$subscribe((m, s) => {
    if (m.events.key == "chatBufferOut" && gameStore.game.chatBufferOut.length > 0) {
      ta.value = (ta.value || "") + gameStore.flushChatBuffer();
      ta.scrollTop = ta.scrollHeight;
    }
  });
});
const text = ref('');
function submit() {
  gameStore.sendChat(text.value);
  text.value = '';
}
</script>
<style scoped>
#Chat {
  float: right;
  width: 100%;
}
#Chat form, #Chat textarea {
  width: 100%;
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
