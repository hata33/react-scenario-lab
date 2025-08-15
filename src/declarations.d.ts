// src/declarations.d.ts
declare module '*.jsx' {
  import type { ComponentType, JSXElementConstructor } from 'react';
  const component: ComponentType<any> | JSXElementConstructor<any>;
  export default component;
}