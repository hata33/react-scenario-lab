// src/declarations.d.ts
declare module "*.jsx" {
	import type { ComponentType, JSXElementConstructor } from "react";
	const component: ComponentType<any> | JSXElementConstructor<any>;
	export default component;
}

declare module "*.png" {
	const src: import("next/image").StaticImport;
	export default src;
}

declare module "*.jpg" {
	const src: import("next/image").StaticImport;
	export default src;
}

declare module "*.jpeg" {
	const src: import("next/image").StaticImport;
	export default src;
}

declare module "*.webp" {
	const src: import("next/image").StaticImport;
	export default src;
}

declare module "*.svg" {
	const src: import("next/image").StaticImport;
	export default src;
}
