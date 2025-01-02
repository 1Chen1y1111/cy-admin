<script setup lang="ts">
import type { FormInstance, FormRules } from 'element-plus'
import { initRouter } from '@/router/utils'

import { useUserStoreHook } from '@/store/modules/user'
import { reactive, ref } from 'vue'
// import { phoneRules } from "../utils/rule";
// import { debounce } from "@pureadmin/utils";

// import { loginByAccountApi } from "@/api/login";

// const emits = defineEmits(['commonLoginEmit'])

const loading = ref(false)
const ruleFormRef = ref<FormInstance>()

const ruleForm = reactive({
  account: 'admin',
  password: 'admin123',
})

const rules = reactive<FormRules>({
  account: [
    {
      required: true,
      message: '请输入用户名',
      trigger: 'blur',
    },
  ],
  password: [
    {
      required: true,
      message: '请输入密码',
      trigger: 'blur',
    },
  ],
})

async function onLogin(formEl: FormInstance | undefined) {
  loading.value = true
  if (!formEl)
    return
  await formEl.validate(async (valid) => {
    if (valid) {
      loading.value = true
      useUserStoreHook().loginByAccount({
        account: ruleForm.account,
        password: ruleForm.password,
      }).then((res) => {
        console.log('🚀 ~ useUserStoreHook ~ res:', res)
        if (res?.code === 0) {
          return initRouter().then((res) => {
            console.log('initrouter', res)
          })
        }
      })
    }
    else {
      loading.value = false
    }
  })
}
</script>

<template>
  <div class="h-full flex flex-col justify-between">
    <el-form ref="ruleFormRef" :model="ruleForm" :rules="rules">
      <el-form-item prop="account">
        <el-input v-model="ruleForm.account" clearable placeholder="用户名" @keyup.enter="onLogin(ruleFormRef)" />
      </el-form-item>

      <el-form-item prop="password">
        <div class="w-full flex justify-between">
          <div class="flex flex-1 w-full">
            <el-input
              v-model="ruleForm.password" clearable type="password" placeholder="密码"
              @keyup.enter="onLogin(ruleFormRef)"
            />
          </div>
        </div>
      </el-form-item>
    </el-form>

    <CyButton primary class="!h-[44px] !text-[16px]" @click="onLogin(ruleFormRef)">
      登录
    </CyButton>
  </div>
</template>

<style lang="scss" scoped>
:deep(.el-form-item__label) {
  font-size: 14px;
  color: var(--main-text-color);
}

:deep(.el-input__wrapper) {
  height: 44px;
  font-size: 14px;
  background-color: #f7f7f7;
  border: 1px solid #f7f7f7;
  box-shadow: none;
}
</style>
