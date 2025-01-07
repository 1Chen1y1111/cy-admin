import { defineComponent, h } from 'vue'

export default defineComponent({
  name: 'IconFont',
  props: {
    icon: {
      type: String,
      required: true,
    },
    iconType: {
      type: String,
      default: 'font-class',
    },
  },
  render() {
    const { uni, svg, ...attrs } = this.$attrs

    switch (this.iconType) {
      case 'uni':
        return h(
          'i',
          {
            class: 'iconfont',
            ...attrs,
          },
          this.icon,
        )
      case 'svg':
        return h(
          'svg',
          {
            'class': 'icon-svg',
            'aria-hidden': true,
          },
          {
            default: () => [
              h('use', {
                'xlink:href': `#${this.icon}`,
              }),
            ],
          },
        )
      default:
        return h(
          'i',
          {
            class: `iconfont ${this.icon}`,
            ...attrs,

          },
        )
    }
  },
})
