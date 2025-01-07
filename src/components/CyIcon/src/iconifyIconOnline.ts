import { Icon } from '@iconify/vue/dist/offline.js'
import { defineComponent, h } from 'vue'

// Online environment
export default defineComponent({
  name: 'IconifyIconOnline',
  components: { Icon },
  props: {
    icon: {
      type: String,
      required: true,
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
