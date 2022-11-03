import { useTelegram } from '../../hooks/useTelegram'
import Button from '../Button/Button'
import './Header.css'

const Header = () => {
    const { user, onClose } = useTelegram();

    return (
        <div className={'header'}>
            <h1 className='header-text'>Test store</h1>
            <span className={'username'}>
                {user?.username}
            </span>
            <Button onClick={onClose} className="button-header">Close</Button>
        </div>
    )
}

export default Header