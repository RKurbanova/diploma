import { usePostUpdateUserMutation, useGetAllUsersQuery } from '../../queries/user'

import { Space, PageHeader, Spin } from "antd";
import UserCard from '../../components/UserCard';
import SmallUserCard from '../../components/SmallUserCard';

export default function UsersPage({user: currentUser}) {
    const {data: users, isLoading: isUserLoading, isError: isUserError }= useGetAllUsersQuery()

    if (isUserLoading) {
        return <Spin className="main-spinner" size="large" />
    }

    if (isUserError || !users) {
        return <div style={{padding: '10px', color: 'red'}}>Произошла ошибка</div>
    }

    return <Space style={{padding: '20px', width: '100%'}} direction='vertical'>
        <Space align='center' style={{justifyContent: 'space-between', width: '100%'}}>
            <PageHeader
                style={{padding: 0}}
                className="site-page-header"
                title={<span className="user-header">Пользователи</span>}
            />
        </Space>

        <Space direction='vertical'>
            {users.map(user => <SmallUserCard key={user.ID} user={user} currentuser={currentUser} />)}
        </Space>
    </Space>
}
