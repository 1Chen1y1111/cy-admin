<script setup lang="ts">
import LoginCom from './components/LoginCom/index.vue'

defineOptions({
  name: 'Login',
})
</script>

<template>
  <div>
    <LoginCom />
  </div>
</template>

<style lang="scss" scoped>
:deep(.el-dialog) {
  border-radius: 0 !important;
  padding: 0 !important;
}

:deep(.el-dialog__header) {
  display: none !important;
}
</style>
