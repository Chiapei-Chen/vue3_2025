<template>
  <el-card class="cleanup-demo">
    <template #header>
      <h3>Vue 3.5 onWatcherCleanup 示範</h3>
    </template>

    <!-- 搜索區域 -->
    <el-form>
      <el-form-item label="搜索使用者">
        <el-input v-model="searchQuery" placeholder="輸入使用者名稱" :suffix-icon="Search" />
      </el-form-item>
    </el-form>

    <!-- 結果展示 -->
    <el-card v-if="isSearching" shadow="never" class="result-card">
      <el-skeleton :rows="3" animated />
    </el-card>

    <el-card v-else-if="searchResult" shadow="never" class="result-card">
      <template #header>
        <div class="result-header">搜索結果</div>
      </template>
      <div class="user-info">
        <div>姓名：{{ searchResult.name }}</div>
        <div>郵箱：{{ searchResult.email }}</div>
        <div>電話：{{ searchResult.phone }}</div>
      </div>
    </el-card>

    <!-- 日誌面板 -->
    <el-card class="mt-4">
      <template #header>
        <div class="log-header">
          <span>操作日誌</span>
          <el-button text @click="logs = []">清除日誌</el-button>
        </div>
      </template>

      <el-timeline>
        <el-timeline-item v-for="(log, index) in logs" :key="index" :type="log.type">
          <span class="time">{{ log.time }}</span>
          <span :class="['message', log.type]">{{ log.message }}</span>
        </el-timeline-item>
      </el-timeline>
    </el-card>
  </el-card>
</template>

<script setup>
import { ref, watch, watchEffect } from 'vue';
import { Search } from '@element-plus/icons-vue';
import { onWatcherCleanup } from 'vue';

const searchQuery = ref('');
const searchResult = ref(null);
const isSearching = ref(false);
const logs = ref([]);

// 模擬 API 請求
const searchUser = async query => {
  // 模擬 API 延遲
  await new Promise(resolve => setTimeout(resolve, 1500));

  // 模擬回傳資料
  return {
    name: `User ${query}`,
    email: `${query}@example.com`,
    phone: '1234567890'
  };
};

// 添加日誌
const addLog = (message, type = 'info') => {
  logs.value.unshift({
    time: new Date().toLocaleTimeString(),
    message,
    type
  });
};

let effectVal = 0;

watchEffect(() => {
  console.log('#### Effect searchQuery:', searchQuery.value);
  console.log('#### Effect effectVal:', effectVal);
});

// 使用 watch 和 onWatcherCleanup 處理搜索
watch(
  searchQuery,
  async newQuery => {
    if (!newQuery.trim()) {
      searchResult.value = null;
      return;
    }
    effectVal++;
    let canceled = false;

    // 註冊清理函數
    onWatcherCleanup(() => {
      canceled = true;
      addLog('取消前次搜索請求', 'warning');
    });

    isSearching.value = true;
    addLog(`開始搜索: ${newQuery}`, 'primary');

    try {
      const result = await searchUser(newQuery);

      // 如果在等待期間已經觸發了新的搜索，則放棄這次結果
      if (!canceled) {
        searchResult.value = result;
        addLog(`搜索完成: 找到使用者 ${result.name}`, 'success');
      }
    } catch (error) {
      if (!canceled) {
        addLog('搜索失敗', 'danger');
      }
    } finally {
      if (!canceled) {
        isSearching.value = false;
      }
    }
  },
  { immediate: true }
);
</script>

<style scoped>
.cleanup-demo {
  max-width: 800px;
  margin: 20px auto;
}

.result-card {
  margin-top: 20px;
}

.user-info {
  line-height: 1.8;
}

.log-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.time {
  color: #909399;
  margin-right: 8px;
}

.message {
  &.primary {
    color: #409eff;
  }
  &.success {
    color: #67c23a;
  }
  &.warning {
    color: #e6a23c;
  }
  &.danger {
    color: #f56c6c;
  }
}

.mt-4 {
  margin-top: 16px;
}
</style>
