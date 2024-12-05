<template>
  <div class="container mx-auto p-4">
    <el-row :gutter="20">
      <!-- 商品列表區 -->
      <el-col :span="16">
        <div class="grid grid-cols-2 gap-4">
          <template v-for="product in products" :key="product.id">
            <productCard
              v-model:quantity="product.quantity"
              :product="product"
              @add-to-cart="handleAddToCart(product, $event)"
            />
          </template>
        </div>
      </el-col>

      <!-- 購物車區 -->
      <el-col :span="8">
        <shoppingCart :cartItems @remove-item="handleRemoveItem" />
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import productCard from './components/productCard.vue';
import shoppingCart from './components/shoppingCart.vue';

// 商品資料
const products = ref([
  {
    id: 1,
    name: '機械鍵盤',
    price: 2000,
    stock: 20,
    discountType: 'PERCENTAGE',
    discount: 0.1
  },
  {
    id: 2,
    name: '無線滑鼠',
    price: 1000,
    stock: 20,
    discountType: 'FIXED',
    discount: 100
  }
]);

// 購物車資料
const cartItems = ref([]);

// 加入購物車處理
const handleAddToCart = (product, quantity) => {
  const existItem = cartItems.value.find(item => item.id === product.id);

  if (existItem) {
    existItem.quantity += quantity;
    return;
  }

  cartItems.value.push({
    ...product,
    quantity
  });
};

const handleRemoveItem = productId => {
  cartItems.value = cartItems.value.filter(item => item.id !== productId);
};

// 更新購物車數量
const handleUpdateQuantity = (productId, quantity) => {
  const item = cartItems.value.find(item => item.id === productId);
  if (!item) return;

  item.quantity = quantity;
};
</script>
