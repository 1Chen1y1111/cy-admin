export interface AppType {
  sidebar: {
    opened: boolean
    withoutAnimation: boolean
    isClickCollapse: boolean
  }
  // layout: string
  device: string
  viewportSize: { width: number, height: number }
}
