import { computed } from 'vue'

export const getLocaleString = computed(() => (num: number | string, round?: boolean) => {
  let _num = Number(num)
  if (round) {
    _num = Math.round(_num)
  }
  return _num.toLocaleString()
})
