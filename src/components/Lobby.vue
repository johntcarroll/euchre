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
  lobbyStore.redirectToGame = function(id) { router.push(`/play/${id}`); };
  lobbyStore.refresh(socketStore.socket);
});
onUnmounted(() => {
  socketStore.unlisten("message", lobbyStore.parse);
});
function refresh() {
  lobbyStore.refresh(socketStore.socket);
}
function create() {
  lobbyStore.create(socketStore.socket);
}
function attemptjoin(id) {
  lobbyStore.attemptjoin(socketStore.socket, id);
}
</script>

<template>
  <div class="row">
    <div class="col-12">
      <h6>Lobby</h6>
      <button @click="refresh">&#8635; Refresh list</button>
      <button @click="create">&#43; Create new game</button>
      <ul>
	<li v-for="game in lobbyStore.games">
	  <a :href="'/play/' + game" @click.prevent="attemptjoin(game)">{{game}}</a>
	</li>
      </ul>
    </div>
  </div>
</template>

<style scoped></style>
