<template>
  <nut-cell>
    <nut-ecard
      v-model="money"
      @input-change="inputChange"
      @change="change"
      @change-step="changeStep"
      :data-list="dataList"
    ></nut-ecard>
  </nut-cell>
</template>
<script lang="ts" setup>
import {ref, reactive} from 'vue'
const dataList = reactive([
  {
    price: 10
  },
  {
    price: 20
  },
  {
    price: 30
  },
  {
    price: 40
  }
])
const money = ref(10)
const inputChange = val => {
  money.value = val
}
const change = item => {
  money.value = item.price
}
const changeStep = (num, price) => {
  const val = price * num
  money.value = val
}
</script>
