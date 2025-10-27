import Layout from "@/components/Layout";
import DeviceAPIContent from "./DeviceAPIContent";

export const metadata = {
	title: "设备API集成",
	description: "移动端设备API集成方案，包括地理位置、摄像头、陀螺仪、震动反馈等功能",
};

export default function DeviceAPIPage() {
	return (
		<Layout>
			<DeviceAPIContent />
		</Layout>
	);
}
