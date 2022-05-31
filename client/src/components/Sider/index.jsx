import { Layout } from "antd";

export default function Sider({children}) {
    return  <Layout.Sider className="sider">
        {children}
    </Layout.Sider>
}
