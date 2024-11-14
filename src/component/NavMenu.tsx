import { NavLink } from 'react-router-dom';
import navMenu from '../Data/dataMenu';
export const NavMenu = () => {
    return (
        <div>
            {navMenu.map((menu) => (
                <NavLink
                    key={menu.id}
                    to={menu.link}
                    className={({ isActive }) =>
                        `text-white px-2 py-1 rounded-lg relative transition-all font-semibold text-lg ${
                            isActive
                                ? ' after:absolute after:w-full after:h-[3px] after:bg-gradient-to-r after:from-orange-500 after:to-purple-700 after:bottom-[-2px] after:left-0 after:rounded-lg '
                                : 'hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-orange-500 hover:to-purple-700 hover:transition-all '
                        }`
                    }
                >
                    {menu.name}
                </NavLink>
            ))}
        </div>
    );
};
