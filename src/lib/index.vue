<template>
  {{ title }}
  <ECard></ECard>
  {{ message }}
  <nut-button type="primary" @click="click">确定</nut-button>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import ECard from '../components/ECard.vue'

const props = withDefaults(
  defineProps<{
    title: string
  }>(),
  {
    title: 'title'
  }
)

// 事件
const _emits = defineEmits(['recharge']);

const show = ref(false)
const message = ref('')
const click = () => {
  message.value = '你点击确定了'
  _emits('recharge')
}
</script>
  