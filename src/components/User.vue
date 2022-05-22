<script setup>
import { onMounted, onUnmounted, ref } from "vue";
import { useSocketStore } from "../store/socket.store";
import { useUserStore } from "../store/user.store";
const socketStore = useSocketStore();
const userStore = useUserStore();
onMounted(() => {
  socketStore.listen("message", userStore.parse);
});
onUnmounted(() => {
  socketStore.listen("message", userStore.parse);
});
</script>

<template>
  <div class="row">
    <div class="col-12">
      <h6>User</h6>
    </div>
    <form @submit.prevent="userStore.attemptsetname(socketStore.socket, userStore.name)">
      <label>Name
        <input id="text-input" v-model="userStore.name" type="text" placeholder="Username">
      </label>
      <input type="submit" value="Send">
    </form>
  </div>
</template>

<style scoped></style>
