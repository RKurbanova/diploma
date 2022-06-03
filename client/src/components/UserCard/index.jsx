import { Space, Typography} from "antd";

const { Paragraph } = Typography;

const roleToString = [
    'Пользователь',
    'Админ'
]

export default function UserCard({user, currentuser}) {
    const isDifferentUser = currentuser.ID !== user.ID
    const isUser = currentuser.Role === 0
    
    return  <Space direction='vertical'>
        {isDifferentUser && isUser ? null : <Paragraph>Логин: {user.Login}</Paragraph>}
        {!isUser ? <Paragraph>Роль: {roleToString[user.Role]}</Paragraph> : null}
        <Paragraph>Имя: {user.FirstName}</Paragraph>
        <Paragraph>Фамилия: {user.LastName}</Paragraph>
        <Paragraph>Отчество: {user.Patronymic}</Paragraph>
        <Paragraph>Почта: {user.Email}</Paragraph>
        <Paragraph>День рождения: {user.Birthday}</Paragraph>
    </Space>
}
