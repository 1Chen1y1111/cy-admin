import { dirname, resolve } from 'node:path'

import process from 'node:process'

import { fileURLToPath } from 'node:url'

/** The absolute path to the working directory where the `node` process is started */
const root: string = process.cwd()

/**
 * @description Generates a new absolute path from an optional path segment
 * @param dir Path segment, default is `build`
 * @param metaUrl The full `url` of the module. If called outside the `build` directory, `import.meta.url` must be passed.
 */
function pathResolve(dir = '.', metaUrl = import.meta.url) {
  // The absolute path of the current file directory
  const currentFileDir = dirname(fileURLToPath(metaUrl))
  // Absolute path to the build directory
  const buildDir = resolve(currentFileDir, 'build')
  // The resolved absolute path
  const resolvedPath = resolve(currentFileDir, dir)
  // Check if the resolved absolute path is in the build directory
  if (resolvedPath.startsWith(buildDir)) {
    // In the build directory, return the current file path
    return fileURLToPath(metaUrl)
  }
  // Not in the build directory, return the resolved absolute path
  return resolvedPath
}

/** Handling environment variables */
function wrapperEnv(envConf: Recordable): ViteEnv {
  // default env
  const ret: ViteEnv = {
    VITE_PORT: 1016,
    VITE_PUBLIC_PATH: '',
    VITE_ROUTER_HISTORY: '',
  }

  for (const envName of Object.keys(envConf)) {
    let realName = envConf[envName].replace(/\\n/g, '\n')
    realName
            = realName === 'true'
        ? true
        : realName === 'false'
          ? false
          : realName

    if (envName === 'VITE_PORT') {
      realName = Number(realName)
    }
    ret[envName] = realName
    if (typeof realName === 'string') {
      process.env[envName] = realName
    }
    else if (typeof realName === 'object') {
      process.env[envName] = JSON.stringify(realName)
    }
  }
  return ret
}

/** Set up an alias */
const alias: Record<string, string> = {
  '@': pathResolve('../src'),
  '@build': pathResolve(),
}

export { alias, pathResolve, root, wrapperEnv }
