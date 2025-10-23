import { metadata } from "./metadata";
import MarkdownHomePage from "./MarkdownHomePage";
import Layout from "@/components/Layout";

export { metadata };

export default function MarkdownPage() {
	return (
		<Layout>
			<MarkdownHomePage />
		</Layout>
	);
}