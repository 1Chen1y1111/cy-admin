<script setup lang="ts">
import { computed } from 'vue'

interface ButtonProps {
  primary?: boolean
  gray?: boolean
  primaryPlain?: boolean
  plain?: boolean
  disabled?: boolean
  loading?: boolean
}

const props = withDefaults(defineProps<ButtonProps>(), {
  primary: false,
  gray: false,
  primaryPlain: false,
  plain: false,
  disabled: false,
  loading: false,
})

const buttonClass = computed(() => {
  const baseClasses = [
    'rounded-[4px]',
    'flex-c',
    'h-[36px]',
    'cursor-pointer',
    'select-none',
    'leading-[20px]',
    'text-[14px]',
    'px-[16px]',
  ]

  if (props.disabled) {
    return [...baseClasses, 'opacity-50', 'cursor-not-allowed']
  }

  if (props.primary) {
    return [...baseClasses, 'bg-primary', 'text-white']
  }

  if (props.gray) {
    return [...baseClasses, 'bg-[#f7f8fa]', 'text-[#86909C]']
  }

  if (props.primaryPlain) {
    return [
      ...baseClasses,
      'bg-white',
      'border',
      'border-primary',
      'text-primary',
    ]
  }

  if (props.plain) {
    return [
      ...baseClasses,
      'bg-white',
      'border',
      'border-[#E5E6EB]',
      '!text-[#1D2129]',
    ]
  }

  return baseClasses
})
</script>

<template>
  <div :class="buttonClass" :disabled="disabled">
    <template v-if="loading">
      <div class="animate-spin mr-2">
        <svg class="w-4 h-4" viewBox="0 0 24 24">
          <circle
            class="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            stroke-width="4"
            fill="none"
          />
          <path
            class="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      </div>
    </template>
    <slot>按钮</slot>
  </div>
</template>
