<script setup>
import Sidebar from "../nav/Sidebar.vue";
import { onMounted, onUnmounted } from "vue";
import { useFlashStore } from "../../store/flash.store";
import { useSocketStore } from "../../store/socket.store";
import { useUserStore } from "../../store/user.store";
const flashStore = useFlashStore();
const socketStore = useSocketStore();
const userStore = useUserStore();
onMounted(() => {
  socketStore.listen("message", flashStore.parse);
  socketStore.listen("message", userStore.parse);
});
onUnmounted(() => {
  socketStore.unlisten("message", flashStore.parse);
  socketStore.unlisten("message", userStore.parse);
});
</script>
<template>
  <div class="container-fluid">
  <nav class="navbar navbar-light bg-light">
    🂫 Euchre
    <div class="my-2">
      Hello, {{userStore.name}}!
    </div>
  </nav>
    <div class="row">
      <div class="col-1">
        <Sidebar />
      </div>
      <div class="col-11">
	<div v-if="flashStore.buffer.length > 0" class="col-12">
          <div class="row alert alert-danger" role="alert">
            <div class="col-11">
            <ul>
              <li v-for="(message, i) in flashStore.buffer">
                {{message}}
                <span class="clear" @click="flashStore.clearMessage(i)">✕</span>
              </li>
            </ul>
	    </div>
	    <div class="clear col-1" @click="flashStore.clearMessages">✕</div>
	  </div>
	</div>
        <div v-if="!socketStore.connected" class="lds-dual-ring">
	  Connecting...
        </div>
        <router-view v-if="socketStore.connected" />
      </div>
    </div>
  </div>
</template>
<style scoped>
.clear {
  cursor: pointer;
}
.lds-dual-ring {
  display: inline-block;
  width: 80px;
  height: 80px;
}
.lds-dual-ring:after {
  content: " ";
  display: block;
  width: 64px;
  height: 64px;
  margin: 8px;
  border-radius: 50%;
  border: 6px solid #fff;
  border-color: #333 transparent #D2042D transparent;
  animation: lds-dual-ring 1.2s linear infinite;
}
@keyframes lds-dual-ring {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
