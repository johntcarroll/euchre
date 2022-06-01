<script setup>
import { onMounted, onUnmounted } from "vue";
import { useLobbyStore } from "../store/lobby.store";
import { useSocketStore } from "../store/socket.store";
const lobbyStore = useLobbyStore();
const socketStore = useSocketStore();
onMounted(() => {
  socketStore.listen("message", lobbyStore.parse);
  lobbyStore.refresh();
});
onUnmounted(() => {
  socketStore.unlisten("message", lobbyStore.parse);
});
</script>

<template>
  <div class="row">
    <div class="col-12">
      <h6>Lobby</h6>
      <button @click="lobbyStore.refresh">&#8635; Refresh list</button>
      <button @click="lobbyStore.create">&#43; Create new game</button>
      <ul>
	<li v-for="game in lobbyStore.games">
	  <a :href="'/play/' + game" @click.prevent="lobbyStore.attemptjoin(game)">{{game}}</a>
	</li>
      </ul>
    </div>
  </div>
</template>

<style scoped></style>
