import { metadata } from "./metadata";
import RichTextHomePage from "./RichTextHomePage";
import Layout from "@/components/Layout";

export { metadata };

export default function Page() {
	return (
		<Layout>
			<RichTextHomePage />
		</Layout>
	);
}