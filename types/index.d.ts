// This file is also a global type declaration like the global.d.ts file in the same directory, except that some scattered global types are stored here. You don't need to introduce them directly and use them in .vue, .ts, and .tsx files to get type hints
type Recordable<T = any> = Record<string, T>
