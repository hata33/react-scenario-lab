import Layout from "@/components/Layout";
import MarkdownHomePage from "./MarkdownHomePage";
import { metadata } from "./metadata";

export { metadata };

export default function MarkdownPage() {
	return (
		<Layout>
			<MarkdownHomePage />
		</Layout>
	);
}
