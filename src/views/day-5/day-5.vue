<template>
  <div class="p-4">
    <h1>Pinia Store</h1>
    <div class="flex items-center gap-2">
      <div class="w-[140px]">
        <el-select v-model="form.status" placeholder="Status" @change="handleSelectChange">
          <el-option
            v-for="item in metaOptionsStore.getMetaStatus"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </div>
      <div class="w-[140px]">
        <el-select v-model="form.payment" placeholder="Payment" @change="handleSelectChange">
          <el-option
            v-for="item in metaOptionsStore.getMetaPayment"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </div>
      <div class="w-[140px]">
        <el-select v-model="form.member" placeholder="Member" @change="handleSelectChange">
          <el-option
            v-for="item in metaOptionsStore.getMetaMember"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, nextTick } from 'vue';
import { useMetaOptionsStore } from '@/stores/metaOptions';
import { storeToRefs } from 'pinia';

const metaOptionsStore = useMetaOptionsStore();
// const { getMetaStatus, getMetaPayment, getMetaMember } = storeToRefs(metaOptionsStore);

const form = ref({
  status: '',
  payment: '',
  member: ''
});

const handleSelectChange = () => {
  console.log('## form', form.value);
};

onMounted(async () => {
  await nextTick();
  console.log('## metaOptionsStore', metaOptionsStore);
});
</script>

<style scoped></style>
