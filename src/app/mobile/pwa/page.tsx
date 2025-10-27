import Layout from "@/components/Layout";
import PWAContent from "./PWAContent";

export const metadata = {
	title: "PWA功能",
	description: "渐进式Web应用功能，包括Service Worker、离线缓存、推送通知等",
};

export default function PWAPage() {
	return (
		<Layout>
			<PWAContent />
		</Layout>
	);
}
