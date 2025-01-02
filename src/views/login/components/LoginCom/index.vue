<script setup lang="ts">
import { ref } from 'vue'
import PwdLogin from '../PwdLogin/index.vue'

const activeName = ref('pwd')
</script>

<template>
  <div
    class="relative w-full min-h-[100vh] flex flex-col bg bg-no-repeat bg-cover px-[20px]"
  >
    <!-- top -->
    <div
      class="flex max-md:flex-col justify-between md:items-center w-full mt-[24px] h-[55px]"
    >
      <div class="h-[55px] ml-[40px] max-md:ml-0">
        <img src="../../assets/logo.png" class="h-[55px]" alt="">
      </div>
    </div>
    <!-- content -->
    <div class="flex-c flex-1">
      <div
        class="max-md:justify-center flex justify-between items-center max-w-[1100px] w-full z-[99]"
      >
        <div class="max-md:hidden flex">
          <!-- <img src="../assets/login_left.png" class="w-[466px] h-full" alt=""> -->
        </div>
        <div
          class="flex max-w-[406px] h-[454px] rounded-[10px] flex-col w-full shadow-[0px_0px_20px_0px_#D6DFEAB2] bg-[#fff] px-[32px] pt-[32px] pb-[52px]"
        >
          <!-- header -->
          <div
            class="text-[26px] font-[600] leading-[38px] mb-[26px] text-[#1D2129]"
          >
            登录
          </div>
          <div class="text-[#13203E] text-[20px] mb-[30px]">
            <el-tabs v-model="activeName">
              <el-tab-pane
                label="密码登录"
                name="pwd"
              />
            </el-tabs>
          </div>

          <!--
              @common-login-emit="commonLoginHandler"
           -->
          <!-- 内容区 -->
          <div class="w-full h-full">
            <PwdLogin
              v-if="activeName === 'pwd'"
              class="flex-1"
            />

            <div
              class="text-[12px] text-[#90A0B4] leading-[14px] mt-[14px] text-center"
            >
              首次登陆时自动创建账号
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- footer -->
    <div
      class="flex max-md:flex-col justify-between md:items-center w-full mt-[24px] h-[55px]"
    />
  </div>
</template>

<style lang="scss" scoped>
.bg {
  background-image: url('../../assets/gradient_bg.png');
}
</style>
