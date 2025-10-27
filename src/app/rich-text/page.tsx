import Layout from "@/components/Layout";
import { metadata } from "./metadata";
import RichTextHomePage from "./RichTextHomePage";

export { metadata };

export default function Page() {
	return (
		<Layout>
			<RichTextHomePage />
		</Layout>
	);
}
