import { metadata } from "./metadata";
import MilkdownEditorPage from "./MilkdownEditorPage";
import Layout from "@/components/Layout";

export { metadata };

export default function MilkdownEditorPageWrapper() {
	return (
		<Layout>
			<MilkdownEditorPage />
		</Layout>
	);
}