import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useMetaOptionsStore = defineStore('metaOptions', () => {

  const metaData = ref({
    status: ['pending', 'processing', 'complete', 'failed'],
    payment: ['cash', 'creditcard', 'linepay', 'paypal'],
    member: {
      0: 'normal',
      1: 'silver',
      2: 'gold',
      3: 'diamond',
      4: 'platinum'
    }
  })

  const formatRecord = (record) => {
    const result = []
    for (const value in record) {
      result.push({
        label: record[value],
        value
      })
    }
    return result
  }

  // 純陣列轉換
  const formatArray = (array) => {
    return array.map(item => ({
      label: item,
      value: item
    }))
  }

  const getMetaStatus = computed(() => formatArray(metaData.value.status))
  const getMetaPayment = computed(() => formatArray(metaData.value.payment))
  const getMetaMember = computed(() => formatRecord(metaData.value.member))

  return {
    metaData,
    getMetaStatus,
    getMetaPayment,
    getMetaMember
  }
})