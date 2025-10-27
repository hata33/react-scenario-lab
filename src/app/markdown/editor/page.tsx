import Layout from "@/components/Layout";
import MarkdownEditorPage from "./MarkdownEditorPage";
import { metadata } from "./metadata";

export { metadata };

export default function MarkdownEditorPageWrapper() {
	return (
		<Layout>
			<MarkdownEditorPage />
		</Layout>
	);
}
