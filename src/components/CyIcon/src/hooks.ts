import type { iconType } from './types'
import { type Component, defineComponent, h } from 'vue'
import { IconFont, IconifyIconOffline, IconifyIconOnline } from '../index'

/**
 * support `iconfont`、 `svg` and `iconify`
 * @see 点击查看文档图标篇 {@link https://pure-admin.cn/pages/icon/}
 * @param icon 必传 图标
 * @param attrs 可选 iconType 属性
 * @returns Component
 */
export function useRenderIcon(icon: any, attrs?: iconType): Component {
  // iconfont
  const ifReg = /^IF-/
  // typeof icon === "function" 属于SVG
  if (ifReg.test(icon)) {
    // iconfont
    const name = icon.split(ifReg)[1]
    const iconName = name.slice(
      0,
      !name.includes(' ') ? name.length : name.indexOf(' '),
    )
    const iconType = name.slice(name.indexOf(' ') + 1, name.length)
    return defineComponent({
      name: 'FontIcon',
      render() {
        return h(
          IconFont,
          {
            icon: iconName,
            iconType,
            ...attrs,
          },
        )
      },
    })
  }
  else if (typeof icon === 'function' || typeof icon?.render === 'function') {
    // svg
    return attrs ? h(icon, { ...attrs }) : icon
  }
  else if (typeof icon === 'object') {
    return defineComponent({
      name: 'OfflineIcon',
      render() {
        return h(
          IconifyIconOffline,
          {
            icon,
            ...attrs,
          },
        )
      },
    })
  }
  else {
    // ：online or offline
    return defineComponent({
      name: 'Icon',
      render() {
        const IconifyIcon
         = icon && icon.includes(':') ? IconifyIconOnline : IconifyIconOffline
        return h(
          IconifyIcon,
          {
            icon,
            ...attrs,
          },
        )
      },
    })
  }
}
