/**
 * Global type declaration, no need to import, you can get type hints by using it directly in `.vue`, `.ts`, `.tsx` files
 */

declare global {
  /**
   * Type declaration of global custom environment variables
   */
  interface ViteEnv {
    VITE_PORT: number
    VITE_PUBLIC_PATH: string
    VITE_ROUTER_HISTORY: string
  }
}
