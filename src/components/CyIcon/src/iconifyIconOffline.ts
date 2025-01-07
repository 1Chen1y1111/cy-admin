import { Icon } from '@iconify/vue/dist/offline.js'
import { defineComponent, h } from 'vue'

// Offline environment
export default defineComponent({
  name: 'IconifyIconOffline',
  components: { Icon },
  props: {
    icon: {
      default: null,
    },
  },
  render() {
    const { style = {}, ...attrs } = this.$attrs as { style?: Record<string, any> }
    return h(
      Icon,
      {
        icon: this.icon,
        style: { ...style, outline: 'none' },
        ...attrs,
      },
      {
        default: () => [],
      },
    )
  },
})
