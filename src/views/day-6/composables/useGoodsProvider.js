import { provide, ref } from 'vue'

export const GOODS_KEY = Symbol('goods-filter')

export function useGoodsProvider() {
  // 當前選中的商品類型
  const activeType = ref('')
  // 搜尋關鍵字
  const searchText = ref('')

  // 提供給子組件更新狀態的方法
  const updateFilter = ({ type, keyword }) => {
    if (type !== undefined) activeType.value = type
    if (keyword !== undefined) searchText.value = keyword
  }

  provide(GOODS_KEY, {
    activeType,
    searchText,
    updateFilter
  })

  return {
    activeType,
    searchText
  }
}