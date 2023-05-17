import { defineStore } from 'pinia'

export const useLocaleStringStore = defineStore('local-localestring-v4', {
  getters: {
    getLocaleString () {
      return (num: number | string, round?: boolean, minDigits?: number) => {
        let _num = Number(num)
        if (round) {
          _num = Math.round(_num)
        }

        if (!minDigits) {
          return _num.toLocaleString("en-US", {minimumFractionDigits: minDigits, maximumFractionDigits: 4 })
        }
        
        return _num.toLocaleString("en-US", { maximumFractionDigits: 4 })
      }
    }
  }
})
