import { Tag, Typography, Card} from "antd";
import { Link } from "react-router-dom";

import './index.css'

const { Paragraph } = Typography;


export default function SmallUserCard({user}) {
    return  <Card className="smallUserCard" size="small" title={<span className="smallUserCardTitle">{`${user.FirstName} ${user.LastName} ${user.Patronymic} (ID:${user.ID})`}</span>} extra={<Link to={`/user/${user.ID}`}>Перейти</Link>}>
        <Paragraph>Почта: {user.Email}</Paragraph>
        <Paragraph>День рождения: {user.Birthday}</Paragraph>
        {user.IsPromoted ? <Tag color='green'>Исполнитель проекта или сделки</Tag> : null}
     </Card>
}
