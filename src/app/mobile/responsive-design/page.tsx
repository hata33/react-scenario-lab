import Layout from "@/components/Layout";
import ResponsiveDesignContent from "./ResponsiveDesignContent";

export const metadata = {
  title: "响应式设计系统",
  description: "移动端响应式设计解决方案，包括断点系统、触摸交互、移动端导航",
};

export default function ResponsiveDesignPage() {
  return (
    <Layout>
      <ResponsiveDesignContent />
    </Layout>
  );
}