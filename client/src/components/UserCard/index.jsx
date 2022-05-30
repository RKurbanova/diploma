import { Space, Tag, Button, Typography} from "antd";

const { Paragraph } = Typography;

const roleToString = [
    'Пользователь',
    'Модератор',
    'Админ'
]

export default function UserCard({user, currentuser, updateUser, isLoading}) {
    const isDifferentUser = currentuser.id !== user.id
    const isAdmin = currentuser.role === 2
    const isUser = currentuser.role === 0
    
    return  <Space direction='vertical'>
        <Button onClick={() => updateUser({id: user.id, wantpromotion: false })} loading={isLoading} disabled={isLoading}>Свфаыва</Button>
        {isDifferentUser && isUser ? null : <Paragraph>Логин: {user.login}</Paragraph>}
        <Paragraph>Имя: {user.firstname}</Paragraph>
        <Paragraph>Фамилия: {user.lastname}</Paragraph>
        <Paragraph>Отчество: {user.patronymic}</Paragraph>
        <Paragraph>Почта: {user.email}</Paragraph>
        <Paragraph>День рождения: {user.birthday}</Paragraph>
        {isDifferentUser && isUser ? null : <Paragraph>Телефон: {user.phone}</Paragraph>}
        {isDifferentUser && isUser ? null : <Paragraph>Паспорт: {user.passport}</Paragraph>}
        {isDifferentUser && isUser ? null : <Paragraph>Баланс: {user.balance} руб.</Paragraph>}
        {isDifferentUser && !isUser && !user.ispromoted && user.wantpromotion ? <Tag color="#ff4d4f">Ожидается подтверждение как исполнителя проекта или сделки</Tag> : null}
        {isDifferentUser && !isUser && !user.ispromoted && !user.wantpromotion ? <Button onClick={() => updateUser({id: user.id, wantpromotion:true })} loading={isLoading} disabled={isLoading}>Стать исполнитель проекта или сделки</Button> : null}
        {!isUser && !user.ispromoted ? <Button onClick={() => updateUser({id: user.id, wantpromotion: false, ispromoted: true })} loading={isLoading} disabled={isLoading}>Сделать исполнителем проекта или сделки</Button> : null}
        {user.isblocked ? <Paragraph>"Заблокирован"</Paragraph> : null}
        {!isUser && isDifferentUser && user.isblocked ? <Button type='danger' onClick={() => updateUser({id: user.id, isblocked: false })} loading={isLoading} disabled={isLoading}>Разблокировать</Button> : null}
        {!isUser && isDifferentUser && !user.isblocked ? <Button type='danger' onClick={() => updateUser({id: user.id, isblocked: true })} loading={isLoading} disabled={isLoading}>Заблокировать</Button> : null}
        {user.ispromoted ? <Tag color='green'>Исполнитель проекта или сделки</Tag> : null}
        {!isUser && isDifferentUser && user.ispromoted ? <Button type='danger' onClick={() => updateUser({id: user.id, isblocked: false })} loading={isLoading} disabled={isLoading}>Исполнитель проекта или сделки</Button> : null}
        {isAdmin ? <Paragraph>Роль: {roleToString[user.role]}</Paragraph> : null}
    </Space>
}
