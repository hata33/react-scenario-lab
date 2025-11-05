"use client";

import dynamic from "next/dynamic";
import Layout from "@/components/Layout";

// Dynamically import the component with SSR disabled
const ExperimentalLiquidGlass = dynamic(
	() => import("@/components/pages/SpecialEffects/LiquidGlass/Experimental/ExperimentalLiquidGlass"),
	{
		ssr: false,
	},
);

export default function ExperimentalLiquidGlassPage() {
	return (
		<Layout>
			<ExperimentalLiquidGlass />
		</Layout>
	);
}
