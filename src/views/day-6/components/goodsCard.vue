<template>
  <el-card shadow="hover">
    <!-- 商品圖片 -->
    <el-image :src="goods.ImageUrls[0]?.Url" fit="cover" class="w-full h-48 object-cover" />

    <!-- 商品資訊 -->
    <div class="mt-3">
      <!-- 可點擊的商品名稱 -->
      <h3 class="text-lg font-bold cursor-pointer hover:text-blue-500" @click="handleNameClick">
        {{ goods.Name }}
      </h3>

      <!-- 可點擊的類型標籤 -->
      <el-tag class="mt-2 cursor-pointer" @click="handleTypeClick">
        {{ goods.GoodsType.Name }}
      </el-tag>

      <!-- 規格標籤 -->
      <div class="mt-2 space-x-2">
        <el-tag v-for="spec in goods.GoodsSpecs" :key="spec.ID" size="small" type="info">
          {{ spec.Specs }}
        </el-tag>
      </div>
    </div>
  </el-card>
</template>

<script setup>
import { inject } from 'vue';
import { GOODS_KEY } from '../composables/useGoodsProvider';

const props = defineProps({
  goods: {
    type: Object,
    required: true
  }
});

const { updateFilter } = inject(GOODS_KEY);

// 點擊商品類型標籤
const handleTypeClick = () => {
  updateFilter({ type: props.goods.GoodsType.Alias });
};

// 點擊商品名稱
const handleNameClick = () => {
  updateFilter({ keyword: props.goods.Name });
};
</script>
