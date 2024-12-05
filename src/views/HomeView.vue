<script setup>
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { ElCard, ElButton, ElTag } from 'element-plus';

const router = useRouter();

// 章節配置
const chapters = [
  {
    day: 1,
    title: 'Vue 生命週期',
    route: 'day-1',
    topics: ['setup', 'onMounted', 'onUnmounted'],
    difficulty: 'basic'
  },
  {
    day: 2,
    title: 'Template 模板技巧',
    route: 'day-2',
    topics: ['v-if', 'v-for', 'v-slot'],
    difficulty: 'basic'
  },
  {
    day: 3,
    title: '資料加工與監聽',
    route: 'day-3',
    topics: ['computed', 'watch', 'watchEffect'],
    difficulty: 'basic'
  }
];

// 難度標籤對照
const difficultyMap = {
  basic: {
    type: 'success',
    label: '入門'
  },
  intermediate: {
    type: 'warning',
    label: '進階'
  },
  advanced: {
    type: 'danger',
    label: '高階'
  }
};

// 跳轉處理
const navigateToChapter = route => {
  router.push({ name: route });
};
</script>

<template>
  <div class="max-w-[1200px] m-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
    <el-card v-for="chapter in chapters" :key="chapter.day" class="hover:shadow-lg transition-shadow duration-300">
      <template #header>
        <div class="flex justify-between items-center">
          <span class="text-lg font-medium"> Day-{{ chapter.day }}: {{ chapter.title }} </span>
          <el-tag :type="difficultyMap[chapter.difficulty].type" size="small">
            {{ difficultyMap[chapter.difficulty].label }}
          </el-tag>
        </div>
      </template>

      <div class="flex flex-col gap-4">
        <div class="flex flex-wrap gap-2">
          <el-tag v-for="topic in chapter.topics" :key="topic" type="info" effect="plain" size="small">
            {{ topic }}
          </el-tag>
        </div>

        <el-button type="primary" @click="navigateToChapter(chapter.route)" class="w-full"> 前往學習 </el-button>
      </div>
    </el-card>
  </div>
</template>
