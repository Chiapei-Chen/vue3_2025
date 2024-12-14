<template>
  <div>
    <!-- 顯示當前過濾狀態 -->
    <div class="mb-4">
      <el-tag v-if="activeType">類型: {{ activeType }}</el-tag>
      <el-tag v-if="searchText">關鍵字: {{ searchText }}</el-tag>
    </div>

    <!-- 商品列表 -->
    <div class="grid grid-cols-4 gap-4">
      <GoodsCard v-for="item in goodsStore.getGoodsData" :key="item.ID" :goods="item" />
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted, nextTick } from 'vue';
import GoodsCard from './components/goodsCard.vue';
import { useGoodsProvider } from './composables/useGoodsProvider';
import { useGoodsStore } from '@/stores/goods';

const goodsStore = useGoodsStore();

const { activeType, searchText } = useGoodsProvider();

// 監聽過濾條件變化
watch([activeType, searchText], ([type, keyword]) => {
  console.log('過濾條件更新：', { type, keyword });
  // 這裡可以觸發你的過濾邏輯
});

onMounted(async () => {
  await nextTick();
  goodsStore.goodsListRequest();
});
</script>
