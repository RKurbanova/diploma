import { Space, Tag, Button, Typography} from "antd";

const { Paragraph } = Typography;

const roleToString = [
    'Пользователь',
    'Модератор',
    'Админ'
]

export default function DealCard({user, currentuser, updateUser, isLoading}) {
    const isDifferentUser = currentuser.ID !== user.ID
    const isAdmin = currentuser.Role === 2
    const isUser = currentuser.Role === 0
    
    return  <Space direction='vertical'>
        <Paragraph>Имя: {user.FirstName}</Paragraph>
        <Paragraph>Фамилия: {user.LastName}</Paragraph>
        <Paragraph>Отчество: {user.Patronymic}</Paragraph>

        {!isDifferentUser && !user.IsPromoted && !user.WantPromotion ?
            <Button onClick={() => updateUser({ID: user.ID, WantPromotion:true })} loading={isLoading} disabled={isLoading}>
                Стать исполнитель проекта или сделки</Button> : null}

    </Space>
}
