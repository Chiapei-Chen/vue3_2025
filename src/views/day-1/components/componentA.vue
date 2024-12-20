<!-- componentA.vue -->
<template>
  <div class="component">
    <h2>組件 A</h2>
    <p>計數器: {{ count }}</p>
    <button @click="increment">增加</button>

    <div class="message-area">
      <h4>來自父組件的消息: {{ parentMessage }}</h4>
      <!-- 使用v-model允許子元件將資料發送給父元件 -->
      <input v-model="childMessage" placeholder="輸入要發送給父組件的消息" />
      <div class="button-group">
        <button @click="sendToParent">發送消息到父組件</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import {
  ref,
  inject,
  onBeforeMount,
  onMounted,
  onBeforeUpdate,
  onUpdated,
  onBeforeUnmount,
  onUnmounted,
  onActivated,
  onDeactivated
} from 'vue';

const count = ref(0);
const childMessage = ref('');
const addLog = inject('addLog');

//使用defineProps接收父元件傳入的parentMessage
const props = defineProps({
  parentMessage: {
    type: String,
    default: ''
  }
});

//定義子元件事件 透過emit方法通知父元件
const emit = defineEmits(['child-event']);

// 生命週期鉤子
onBeforeMount(() => {
  addLog('組件A - beforeMount - 組件準備掛載', 'lifecycle');
});

onMounted(() => {
  addLog('組件A - mounted - 組件已掛載完成', 'mounted');
});

onBeforeUpdate(() => {
  addLog('組件A - beforeUpdate - 組件準備更新', 'update');
});

onUpdated(() => {
  addLog('組件A - updated - 組件已更新完成', 'updated');
});

onBeforeUnmount(() => {
  addLog('組件A - beforeUnmount - 組件準備卸載', 'unmount');
});

onUnmounted(() => {
  addLog('組件A - unmounted - 組件已卸載完成', 'unmounted');
});

onActivated(() => {
  addLog('組件A - activated - Keep-alive 組件已啟用', 'activated');
});

onDeactivated(() => {
  addLog('組件A - deactivated - Keep-alive 組件已停用', 'deactivated');
});

const increment = () => {
  count.value++;
  emit('child-event', `組件A計數更新：${count.value}`);
};

const sendToParent = () => {
  if (childMessage.value.trim()) {
    emit('child-event', childMessage.value);
    childMessage.value = '';
  }
};
</script>

<style scoped>
.component {
  padding: 20px;
  border: 2px solid #42b983;
  border-radius: 8px;
  margin: 10px 0;
}

.message-area {
  margin-top: 20px;
  padding-top: 15px;
  border-top: 1px solid #ddd;
}

.button-group {
  margin-top: 10px;
}

input {
  width: 100%;
  padding: 8px;
  margin: 10px 0;
  border: 1px solid #ddd;
  border-radius: 4px;
}

button {
  margin-right: 10px;
  padding: 8px 16px;
  background: #42b983;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background: #3aa876;
}
</style>
