<script setup>
import { onMounted, onUnmounted } from "vue";
import { useLobbyStore } from "../store/lobby.store";
import { useSocketStore } from "../store/socket.store";
import { useRouter } from 'vue-router';
const router = useRouter();
const lobbyStore = useLobbyStore();
const socketStore = useSocketStore();
onMounted(() => {
  socketStore.listen("message", lobbyStore.parse);
  lobbyStore.refresh(socketStore.socket);
});
onUnmounted(() => {
  socketStore.unlisten("message", lobbyStore.parse);
});
function refresh() {
  lobbyStore.refresh(socketStore.socket);
}
function attemptjoin(id) {
  lobbyStore.attemptjoin(socketStore.socket, id,
    function() { router.push(`/play/${id}`) });
}
</script>

<template>
  <div class="row">
    <div class="col-12">
      <h6>Lobby</h6>
      <button @click="refresh">Refresh list</button>
      <ul>
	<li v-for="game in lobbyStore.games">
	  <a @click="attemptjoin(game)">{{game}}</a>
	</li>
      </ul>
    </div>
  </div>
</template>

<style scoped></style>
