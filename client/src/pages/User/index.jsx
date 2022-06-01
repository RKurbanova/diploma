import { usePostUpdateUserMutation, useGetUserByIdQuery } from '../../queries/user'

import { Space, PageHeader, Spin, Result } from "antd";
import './index.css'
import UserCard from '../../components/UserCard';
import { useParams } from 'react-router-dom';

export default function User({user: currentUser}) {
    const {id} = useParams()

    const {data: user, isLoading: isUserLoading, isError: isUserError }= useGetUserByIdQuery({ID: id})

    const [updateUser, {isLoading}] = usePostUpdateUserMutation()

    if (isUserLoading) {
        return <Spin className="main-spinner" size="large" />
    }

    if (isUserError) {
        return <Result status="404" title="404" subTitle="Такого пользователя не существует" />
    }

    return <Space style={{padding: '20px', width: '100%'}} direction='vertical'>
        <Space align='center' style={{justifyContent: 'space-between', width: '100%'}}>
            <PageHeader
                style={{padding: 0}}
                className="site-page-header"
                title={<span className="user-header">{user.lastname} {user.firstname} {user.patronymic}</span>}
            />
        </Space>

        <UserCard user={user} currentuser={currentUser} updateUser={updateUser} isLoading={isLoading} />
    </Space>
}
