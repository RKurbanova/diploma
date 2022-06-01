import { Layout } from "antd";

export default function Sider({children, width}) {
    return  <Layout.Sider width={width} className="sider">
        {children}
    </Layout.Sider>
}
