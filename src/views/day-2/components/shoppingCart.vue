<template>
  <el-card class="shopping-cart">
    <template #header>
      <div class="flex justify-between items-center">
        <span>Shopping Cart</span>
        <span>{{ formatPrice(totalPrice) }}</span>
      </div>
    </template>
    <template v-if="cartItems.length">
      <div v-for="item in cartItems" :key="item.id" class="my-2">
        <div class="flex justify-between items-center">
          <!-- Product name -->
          <span>{{ item.name }}</span>
          <div class="flex items-center gap-2">
            <el-input-number
              v-model="item.quantity"
              :min="1"
              :max="item.stock"
              @change="emit('update-quantity', item.id, $event)"
            />
            <el-button type="danger" :icon="Delete" circle size="small" @click="emit('remove-item', item.id)" />
          </div>
        </div>
        <div class="text-sm text-gray-600 text-right">Sub Total: {{ formatPrice(getSubtotal(item)) }}</div>
      </div>
    </template>
    <template v-else>
      <el-empty description="Cart is empty!" />
    </template>
  </el-card>
</template>

<script setup>
import { computed } from 'vue';
import { Decimal } from 'decimal.js';
import { Delete } from '@element-plus/icons-vue';

const props = defineProps({
  cartItems: {
    type: Array,
    default: () => []
  }
});

const emit = defineEmits(['update-quantity', 'remove-item']);

const totalPrice = computed(() => {
  return props.cartItems.reduce((sum, item) => {
    // 用折扣後的小計而不是原價 item.price
    return new Decimal(sum).plus(getSubtotal(item)).toNumber();
  }, 0);
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

// 格式化價格顯示方式
const formatPrice = price => {
  return new Intl.NumberFormat('zh-TW', {
    style: 'currency',
    currency: 'TWD',
    minimumFractionDigits: 0
  }).format(price);
};

// 單項商品小計
const getSubtotal = item => {
  const { price, discountType, discount } = item;
  const calDiscount = discountStrategies[discountType] ?? discountStrategies.NONE;
  return calDiscount(price, discount).mul(item.quantity).toNumber();
};
</script>
