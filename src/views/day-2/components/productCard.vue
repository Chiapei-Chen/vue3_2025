<template>
  <el-card shadow="hover">
    <template #header>
      <div class="flex justify-between items-center">
        <span class="text-lg font-medium">{{ product.name }}</span>
        <el-tag :type="product.stock < 5 ? 'danger' : 'success'">{{ `Stock: ${product.stock}` }}</el-tag>
      </div>
    </template>
    <div class="my-4">
      <div>Original Price: {{ formatPrice(product.price) }}</div>
      <div class="text-xl">{{ formatPrice(finalPrice) }}</div>
    </div>
    <div>
      <el-input-number v-model="quantity" :min="1" :max="product.stock"> </el-input-number>
      <el-button type="primary" :disabled="!product.stock" @click="emit('add-to-cart', quantity)">
        Add to Cart
      </el-button>
    </div>
  </el-card>
</template>

<script setup>
import { computed } from 'vue';
import { Decimal } from 'decimal.js';

const props = defineProps({
  product: {
    type: Object
  }
});

const emit = defineEmits(['add-to-cart']);

const quantity = defineModel('quantity', {
  type: Number,
  default: 1
});

const discountStrategies = {
  PERCENTAGE: (price, discount) => {
    const originalPrice = new Decimal(price);
    // 1 - 0.1 = 0.9
    const discountRate = new Decimal(1).minus(new Decimal(discount));
    return originalPrice.mul(discountRate).toDecimalPlaces(0);
  },
  FIXED: (price, discount) => {
    const originalPrice = new Decimal(price);
    // 2000 - 100 = 1900
    const discountAmount = new Decimal(discount);
    return originalPrice.minus(discountAmount).toDecimalPlaces(0);
  },
  NONE: price => new Decimal(price)
};

const finalPrice = computed(() => {
  const { price, discountType, discount } = props.product;
  const calDiscount = discountStrategies[discountType] ?? discountStrategies.NONE;
  return calDiscount(price, discount).toNumber();
});

// 格式化價格顯示方式

const formatPrice = price => {
  return new Intl.NumberFormat('zh-TW', {
    style: 'currency',
    currency: 'TWD',
    minimumFractionDigits: 0
  }).format(price);
};
</script>
