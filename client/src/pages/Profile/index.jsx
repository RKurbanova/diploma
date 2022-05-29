import { usePostLogoutMutation } from '../../queries/user'

export default function ProfilePage() {
    const [logout] = usePostLogoutMutation();

    return <div>Profile<button onClick={logout}>logout</button></div>
}
