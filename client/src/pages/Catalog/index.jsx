import { Button, PageHeader, Space } from "antd";
import { Link } from "react-router-dom";

export default function CatalogPage({user}) {
    return <Space style={{padding: '20px', width: '100%'}} direction='vertical'>
        <PageHeader
            style={{padding: 0}}
            className="site-page-header"
            title={<span className="profile-header">Проекты и сделки</span>}
        />
        <Space>
            <Link to='/deal/create'><Button type='primary'>Создать сделку</Button></Link>
            <Link to={`/user/${user.ID}/deals`}><Button type='primary'>Ваши сделки</Button></Link>
        </Space>
    </Space>;
}
