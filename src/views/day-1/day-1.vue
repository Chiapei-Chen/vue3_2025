<!-- day-1.vue -->
<template>
  <div class="app-container">
    <el-card>
      <template #header>
        <h2>Vue 3.5 生命週期完整示例</h2>
      </template>

      <!-- 控制面板 -->
      <el-space wrap>
        <el-button type="primary" @click="toggleComponent">
          切換組件顯示: {{ currentComponent === ComponentA ? 'A' : 'B' }}
        </el-button>
        <el-button :type="isKeepAlive ? 'success' : 'warning'" @click="toggleKeepAlive">
          Keep-Alive: {{ isKeepAlive ? '開啟' : '關閉' }}
        </el-button>
      </el-space>

      <!-- 父組件控制區 -->
      <el-card class="mt-4">
        <template #header>
          <div class="card-header">
            <span>父組件控制區</span>
          </div>
        </template>
        <el-input v-model="parentMessage" placeholder="輸入要發送給子組件的消息">
          <template #append>
            <el-button @click="sendMessageToChild">發送消息</el-button>
          </template>
        </el-input>
      </el-card>

      <!-- 組件展示區 -->
      <el-card class="mt-4">
        <template #header>
          <div class="card-header">
            <span>當前狀態：{{ isKeepAlive ? '組件狀態會保留' : '組件狀態會重置' }}</span>
          </div>
        </template>
        <template v-if="isKeepAlive">
          <keep-alive>
            <component
              :is="currentComponent"
              :parent-message="parentMessage"
              @child-event="handleChildEvent"
            ></component>
          </keep-alive>
        </template>
        <template v-else>
          <component
            :is="currentComponent"
            :parent-message="parentMessage"
            @child-event="handleChildEvent"
            :key="currentComponent === ComponentA ? 'A' : 'B'"
          ></component>
        </template>
      </el-card>

      <!-- 日誌面板 -->
      <el-card class="mt-4">
        <template #header>
          <div class="card-header">
            <span>生命週期事件日誌</span>
            <el-button text @click="clearLogs">清除日誌</el-button>
          </div>
        </template>
        <el-scrollbar height="300px">
          <el-timeline>
            <el-timeline-item v-for="(log, index) in logs" :key="index" :type="getTimelineItemType(log.type)">
              <span class="time">{{ log.message }}</span>
              <span :class="['message', log.type]">
                {{ log.message.split(' - ')[1] }}
              </span>
            </el-timeline-item>
          </el-timeline>
        </el-scrollbar>
      </el-card>

      <!-- 說明面板 -->
      <el-card class="mt-4">
        <template #header>
          <div class="card-header">
            <span>測試步驟</span>
          </div>
        </template>
        <el-steps direction="vertical" :active="1">
          <el-step title="步驟 1" description="在組件A中增加幾次計數" />
          <el-step title="步驟 2" description="切換到組件B並輸入一些文字" />
          <el-step title="步驟 3" description="再切換回組件A" />
          <el-step title="步驟 4" description="關閉 Keep-Alive 重複以上步驟" />
          <el-step title="步驟 5" description="觀察兩種情況下的狀態保留差異" />
        </el-steps>
      </el-card>
    </el-card>
  </div>
</template>

<script setup>
import { ref, shallowRef, provide } from 'vue';
import ComponentA from './components/componentA.vue';
import ComponentB from './components/componentB.vue';

// 狀態管理
//使用shallowRef是因為只需追蹤currentComponent.value是否變更 不須追蹤元件內部屬性變化 可節省效能
const currentComponent = shallowRef(ComponentA);
const isKeepAlive = ref(true);
const logs = ref([]);
const parentMessage = ref('');

// 方法
//切換目前顯示子元件
const toggleComponent = () => {
  const oldComponent = currentComponent.value === ComponentA ? 'A' : 'B';
  addLog(`組件${oldComponent} - 準備切換`, 'lifecycle');

  currentComponent.value = currentComponent.value === ComponentA ? ComponentB : ComponentA;
  const newComponent = currentComponent.value === ComponentA ? 'A' : 'B';

  addLog(`切換到組件${newComponent}`, 'info');
};

const toggleKeepAlive = () => {
  const oldState = isKeepAlive.value;
  isKeepAlive.value = !isKeepAlive.value;

  addLog(
    `${isKeepAlive.value ? '開啟' : '關閉'} Keep-Alive - ${
      isKeepAlive.value ? '組件狀態將被保留' : '組件狀態將被重置'
    }`,
    'important'
  );

  if (!isKeepAlive.value) {
    const currentName = currentComponent.value === ComponentA ? 'A' : 'B';
    addLog(`組件${currentName} - 將被重新創建`, 'lifecycle');
  }
};

const addLog = (message, type = 'info') => {
  logs.value.unshift({
    message: `${new Date().toLocaleTimeString()} - ${message}`,
    type
  });
};

const clearLogs = () => {
  logs.value = [];
};

const handleChildEvent = message => {
  addLog(`收到子組件消息: ${message}`, 'info');
};

const sendMessageToChild = () => {
  if (parentMessage.value.trim()) {
    addLog(`父組件發送消息: ${parentMessage.value}`, 'info');
  }
};

const getTimelineItemType = type => {
  const typeMap = {
    lifecycle: 'primary', // 生命週期基礎事件 (藍色)
    mounted: 'success', // 掛載相關 (綠色)
    update: 'warning', // 更新相關 (黃色)
    updated: 'warning', // 更新完成 (黃色)
    unmount: 'danger', // 卸載相關 (紅色)
    unmounted: 'danger', // 卸載完成 (紅色)
    activated: 'success', // keep-alive 啟用 (綠色)
    deactivated: 'warning', // keep-alive 停用 (黃色)
    important: 'danger', // 重要狀態變更 (紅色)
    info: 'info' // 一般信息 (灰色)
  };
  return typeMap[type] || 'info';
};

// 提供給子組件的方法
provide('addLog', addLog);
</script>

<style lang="scss" scoped>
.app-container {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.mt-4 {
  margin-top: 16px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

:deep(.el-card__header) {
  padding: 12px 20px;
}

:deep(.el-timeline-item__content) {
  font-size: 14px;
}

.message {
  margin-left: 8px;

  &.lifecycle {
    color: #409eff;
  }
  &.mounted {
    color: #67c23a;
  }
  &.update,
  &.updated {
    color: #e6a23c;
  }
  &.unmount,
  &.unmounted {
    color: #f56c6c;
  }
  &.activated {
    color: #67c23a;
  }
  &.deactivated {
    color: #e6a23c;
  }
  &.important {
    color: #f56c6c;
  }
}

.time {
  color: #909399;
  font-size: 0.9em;
}
</style>
