import { metadata } from "./metadata";
import MarkdownEditorPage from "./MarkdownEditorPage";
import Layout from "@/components/Layout";

export { metadata };

export default function MarkdownEditorPageWrapper() {
	return (
		<Layout>
			<MarkdownEditorPage />
		</Layout>
	);
}