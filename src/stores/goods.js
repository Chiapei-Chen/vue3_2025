import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { getGoodsList } from '@/service/api'

export const useGoodsStore = defineStore('goods', () => {
  // state
  const goodsData = ref([])

  // getters
  const getGoodsData = computed(() => {
    return goodsData.value
  })

  // actions
  const goodsListRequest = async () => {
    try {
      const res = await getGoodsList({
        Page: 0,
        PageLimit: 20
      })
      goodsData.value = res.data.Data
    } catch (error) {
      console.error(error)
    }

  }

  return {
    goodsData,
    getGoodsData,
    goodsListRequest
  }
})