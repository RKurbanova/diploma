import { usePostLogoutMutation, usePostUpdateUserMutation } from '../../queries/user'

import { Space, PageHeader, Button} from "antd";
import './index.css'
import UserCard from '../../components/UserCard';
import { Link } from 'react-router-dom';

export default function ProfilePage({user}) {
    const [logout] = usePostLogoutMutation();
    const [updateUser, {isLoading}] = usePostUpdateUserMutation()

    return <Space style={{padding: '20px', width: '100%'}} direction='vertical'>
        <Space align='center' style={{justifyContent: 'space-between', width: '100%'}}>
            <PageHeader
                style={{padding: 0}}
                className="site-page-header"
                title={<span className="profile-header">Профиль</span>}
            />
            <Space>
                <Link to={`/user/${user.ID}/edit`}>
                    <Button type='primary'>Редактировать</Button>
                </Link>
                <Button type='danger' onClick={logout}>Выйти</Button>
            </Space>
        </Space>

        <UserCard user={user} currentuser={user} updateUser={updateUser} isLoading={isLoading} />
    </Space>
}
