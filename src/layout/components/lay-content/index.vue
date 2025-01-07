<script setup lang='ts'>
import { computed, defineComponent, h, Transition } from 'vue'
import LayFrame from '../lay-frame/index.vue'

const transitions = computed(() => {
  return (route) => {
    return route.meta.transition
  }
})

const transitionMain = defineComponent({
  props: {
    route: {
      type: undefined,
      required: true,
    },
  },
  render() {
    const transitionName
    = transitions.value(this.route)?.name || 'fade-transform'
    const enterTransition = transitions.value(this.route)?.enterTransition
    const leaveTransition = transitions.value(this.route)?.leaveTransition

    return h(
      Transition,
      {
        name: enterTransition ? 'cy-classes-transition' : transitionName,
        enterActiveClass: enterTransition
          ? `animate__animated ${enterTransition}`
          : undefined,
        leaveActiveClass: leaveTransition
          ? `animate__animated ${leaveTransition}`
          : undefined,
        mode: 'out-in',
        appear: true,
      },
      {
        default: () => [this.$slots.default()],
      },
    )
  },
})
</script>

<template>
  <section class="app-main">
    <router-view>
      <template #default="{ Component, route: slotRoute }">
        <LayFrame :current-comp="Component" :current-route="slotRoute">
          <template #default="{ comp, fullPath, frameInfo }">
            <div class="grow">
              <transitionMain :route="slotRoute">
                <component
                  :is="comp"
                  :key="fullPath"
                  :frame-info="frameInfo"
                  class="main-content"
                />
              </transitionMain>
            </div>
          </template>
        </LayFrame>
      </template>
    </router-view>
  </section>
</template>

<style lang="scss" scoped>
.app-main {
  display: flex;
  flex-direction: column;
  flex: 1;
}

.main-content {
  margin: 20px;
}
</style>
