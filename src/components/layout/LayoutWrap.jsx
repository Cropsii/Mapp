import { Layout } from "antd";

export default function LayoutWrap({ children }) {
  return (
    <Layout
      style={{
        minHeight: "100dvh",
        backgroundImage: 'url("space.avif")',
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {children}
    </Layout>
  );
}
