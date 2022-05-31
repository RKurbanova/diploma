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
                        <Space>
                            <p style={{marginBottom: 0}}>{user.LastName} {user.FirstName} {user.Patronymic}</p>
                            <Link to="/profile">
                                <Badge count={user.WantPromotion ? 1 : 0}>
                                    <Avatar icon={<UserOutlined />} />
                                </Badge>
                            </Link>
                        </Space>
                        :
                        null
                }
            </Space>
        </Space>
    </Layout.Header>
}
