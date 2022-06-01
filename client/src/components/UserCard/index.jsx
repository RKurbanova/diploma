import { Space, Tag, Button, Typography, InputNumber} from "antd";
import { useState } from "react";
import SmallUserCard from "../SmallUserCard";

const { Paragraph } = Typography;

const roleToString = [
    'Пользователь',
    'Модератор',
    'Админ'
]

export default function UserCard({user, currentuser, updateUser, isLoading}) {
    const [loadBalance, setLoadBalance] = useState(0)
    const [unloadBalance, setUnloadBalance] = useState(0)
    const isDifferentUser = currentuser.ID !== user.ID
    const isAdmin = currentuser.Role === 2
    const isUser = currentuser.Role === 0
    
    return  <Space direction='vertical'>
        {isDifferentUser && isUser ? null : <Paragraph>Логин: {user.Login}</Paragraph>}
        {!isUser ? <Paragraph>Роль: {roleToString[user.Role]}</Paragraph> : null}
        <Paragraph>Имя: {user.FirstName}</Paragraph>
        <Paragraph>Фамилия: {user.LastName}</Paragraph>
        <Paragraph>Отчество: {user.Patronymic}</Paragraph>
        <Paragraph>Почта: {user.Email}</Paragraph>
        <Paragraph>День рождения: {user.Birthday}</Paragraph>
        {isDifferentUser && isUser ? null : <Paragraph>Телефон: {user.Phone}</Paragraph>}
        {isDifferentUser && isUser ? null : <Paragraph>Паспорт: {user.Passport}</Paragraph>}
        {isDifferentUser && isUser ? null : <Paragraph>Баланс: {user.Balance} руб.</Paragraph>}
        {isDifferentUser && !isUser && !user.IsPromoted && user.WantPromotion ? <Tag color="#ff4d4f">
            Ожидается подтверждение как исполнителя проекта или сделки
            </Tag> : null}
        {!isDifferentUser && !user.IsPromoted && user.WantPromotion ? <Tag color="#ff4d4f">
            Ожидается подтверждение как исполнителя проекта или сделки
            </Tag> : null}
        {!isDifferentUser ?
            <>  
                <InputNumber min={100} disabled={isLoading} value={loadBalance} onChange={(e) => setLoadBalance(e)} size="large" placeholder="На пополнение" />
                <Button onClick={() => updateUser({ID: user.ID, Balance: user.Balance + loadBalance })} loading={isLoading} disabled={isLoading}>
                    Пополнить баланс
                </Button>
            </> : null}
        {!isDifferentUser && user.Balance >= 100 ?
            <>  
                <InputNumber min={100} max={user.Balance} disabled={isLoading} value={unloadBalance} onChange={(e) => setUnloadBalance(e)} size="large" placeholder="На вывод" />
                <Button onClick={() => updateUser({ID: user.ID, Balance: user.Balance - unloadBalance })} loading={isLoading} disabled={isLoading}>
                    Вывести баланс
                </Button>
            </> : null}
        {!isDifferentUser && !user.IsPromoted && !user.WantPromotion ?
            <Button onClick={() => updateUser({ID: user.ID, WantPromotion:true })} loading={isLoading} disabled={isLoading}>
                Стать исполнитель проекта или сделки</Button> : null}
        {isDifferentUser && !isUser && !user.IsPromoted && !user.WantPromotion ?
            <Button onClick={() => updateUser({ID: user.ID, WantPromotion: false, IsPromoted: true })} loading={isLoading} disabled={isLoading}>
                Сделать исполнителем проекта или сделки</Button> : null}
        {!isUser && !user.IsPromoted && user.WantPromotion ?
            <Button onClick={() => updateUser({ID: user.ID, WantPromotion: false, IsPromoted: true })} loading={isLoading} disabled={isLoading}>
                Подтвердить заявку на становление исполнителем проекта или сделки</Button> : null}
        {!isUser && !user.IsPromoted && user.WantPromotion ?
            <Button type='danger' onClick={() => updateUser({ID: user.ID, WantPromotion: false, IsPromoted: false })} loading={isLoading} disabled={isLoading}>
                Отклонить заявку на становление исполнителем проекта или сделки</Button> : null}
        {user.IsPromoted ? <Tag color='green'>Исполнитель проекта или сделки</Tag> : null}
        {!isUser && user.IsPromoted ? <Button type='danger' onClick={() => updateUser({ID: user.ID, WantPromotion: false, IsPromoted: false })} loading={isLoading} disabled={isLoading}>
            Убрать статус исполнителя</Button> : null}
        {user.IsBlocked ? <Paragraph>Заблокирован</Paragraph> : null}
        {!isUser && isDifferentUser && user.IsBlocked ? <Button type='danger' onClick={() => updateUser({ID: user.ID, IsBlocked: false })} loading={isLoading} disabled={isLoading}>
            Разблокировать</Button> : null}
        {!isUser && isDifferentUser && !user.IsBlocked ? <Button type='danger' onClick={() => updateUser({ID: user.ID, IsBlocked: true })} loading={isLoading} disabled={isLoading}>
            Заблокировать</Button> : null}
        {isAdmin && user.Role === 0 ? <Button onClick={() => updateUser({ID: user.ID, Role: 1 })} loading={isLoading} disabled={isLoading}>
            Сделать модератором</Button> : null}
        {isAdmin && user.Role === 1 ? <Button onClick={() => updateUser({ID: user.ID, Role: 2 })} loading={isLoading} disabled={isLoading}>
            Сделать админом</Button> : null}
        {isAdmin && user.Role === 1 ? <Button type='danger' onClick={() => updateUser({ID: user.ID, Role: 0 })} loading={isLoading} disabled={isLoading}>
            Лишить прав модератора</Button> : null}
        {isAdmin && user.Role === 2 ? <Button type='danger' onClick={() => updateUser({ID: user.ID, Role: 1 })} loading={isLoading} disabled={isLoading}>
            Лишить прав администратора</Button> : null}
    </Space>
}
