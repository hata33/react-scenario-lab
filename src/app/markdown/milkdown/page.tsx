import Layout from "@/components/Layout";
import MilkdownEditorPage from "./MilkdownEditorPage";
import { metadata } from "./metadata";

export { metadata };

export default function MilkdownEditorPageWrapper() {
	return (
		<Layout>
			<MilkdownEditorPage />
		</Layout>
	);
}
