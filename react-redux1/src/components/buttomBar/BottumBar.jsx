import React from 'react'
import "./BottomBar.css"
import HomeIcon from '@mui/icons-material/Home';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FavoriteIcon from '@mui/icons-material/Favorite';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import { Link } from 'react-router-dom';

const BottumBar = () => {
    return (
        <div className="bottum-bar">
            <div className="buttom-navigate">
                <div>
                    <Link to="/cart">
                    <ShoppingCartIcon />
                    </Link>
                </div>
                <div>
                    <Link to="/special">
                    <AutoAwesomeIcon />
                    </Link>
                </div>
                <div>
                    <Link to="/favorite">
                    <FavoriteIcon />
                    </Link>
                </div>
                <div>
                    <Link to="/">
                    <HomeIcon />
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default BottumBar