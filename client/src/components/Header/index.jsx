import { Space, Layout, PageHeader, Avatar, Badge} from "antd";
import {
    ExperimentOutlined,
    UserOutlined
  } from '@ant-design/icons';
import {
    useNavigate,
    Link
} from "react-router-dom";

import './index.css'

export default function Header({user}) {
    const navigate = useNavigate();

    return  <Layout.Header className="header">
        <Space className="header-wrapper">
            <PageHeader
                className="site-page-header"
                backIcon={<ExperimentOutlined style={{ fontSize: '30px', color: '#1890ff' }} />}
                onBack={() => navigate('/')}
                title={<span className="site-page-header__title">Краудфандинг</span>}
            />
            <Space>
                {
                    user ?
                    <Link to="/profile">
                        <Badge count={1}>
                            <Avatar icon={<UserOutlined />} />
                        </Badge>
                    </Link>
                    :
                    null
                }
            </Space>
        </Space>
    </Layout.Header>
}
