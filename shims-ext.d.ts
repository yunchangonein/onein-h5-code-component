declare module '*.vue' {
  import type { App, defineComponent } from 'vue'
  const component: ReturnType<typeof defineComponent> & {
    install(app: App): void
  }
  export default component
}

declare module '*.json' {
  const value: any;
  export default value;
}

declare module 'archiver' {
  const value: any;
  export default value;
}

declare module '*.scss' {
  const scss: Record<string, string>
  export default scss
}

declare module '*.module.scss' {
  const classes: { [key: string]: string }
  export default classes
}

// 图片声明导入文件
declare module '*.svg'
declare module '*.png'
declare module '*.jpg'
declare module '*.jpeg'
declare module '*.gif'
declare module '*.bmp'
declare module '*.tiff'