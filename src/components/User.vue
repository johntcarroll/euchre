<script setup>
import { ref } from "vue";
import { useSocketStore } from "../store/socket.store";
import { useUserStore } from "../store/user.store";
const socketStore = useSocketStore();
const userStore = useUserStore();
</script>

<template>
  <div class="row">
    <div class="col-12">
      <h6>User</h6>
    </div>
    <form @submit.prevent="userStore.attemptsetname(socketStore.socket, userStore.possibleName)">
      <p>
      <label>ID</label>
	{{userStore.sessionId}}
      </p>
      <label>Name
        <input id="text-input" v-model="userStore.possibleName" type="text" placeholder="Username">
      </label>
      <input type="submit" value="Send">
    </form>
  </div>
</template>

<style scoped></style>
