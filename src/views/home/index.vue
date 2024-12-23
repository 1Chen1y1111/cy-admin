<script setup lang='ts'>
import { getMockLogin } from '@/api/mock'

async function login() {
  await getMockLogin(
    {
      username: 'admin',
      password: 'admin',
    },
  ).then((res) => {
    console.log(res, 'mok')
  })
}

login()
</script>

<template>
  <div class="text-[red]">
    Home
  </div>
</template>

<style lang='less' scoped>

</style>
