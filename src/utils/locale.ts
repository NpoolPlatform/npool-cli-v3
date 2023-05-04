import { computed } from 'vue'

export const getLocaleString = computed(() => (num: number | string) => {
  const _num = Math.round(Number(num))
  return _num.toLocaleString()
})
