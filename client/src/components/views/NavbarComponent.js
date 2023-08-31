import { NavLink } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { clsx } from 'clsx';
import styles from './Navbar.module.scss';

const NavbarComponent = () => {
  return (
    <Navbar
      bg="primary"
      variant="dark"
      expand="lg"
      className="mt-4 mb-4 rounded flex-nowrap"
    >
      <span className="text-light align-items-center col-10 ms-2">
        AdsBoard
      </span>
      <Nav className="justify-content-end col-2 ">
        <Nav.Link
          as={NavLink}
          to="/"
          className={({ isActive }) =>
            isActive ? styles.linkActive : undefined
          }
        >
          Home
        </Nav.Link>
        <Nav.Link
          as={NavLink}
          to="/auth/register"
          className={clsx('me-3', ({ isActive }) =>
            isActive ? styles.linkActive : undefined
          )}
        >
          Sign up
        </Nav.Link>
        <Nav.Link
          as={NavLink}
          to="/auth/login"
          className={clsx('me-3', ({ isActive }) =>
            isActive ? styles.linkActive : undefined
          )}
        >
          Sign in
        </Nav.Link>
        <Nav.Link
          as={NavLink}
          to="/auth/logout"
          className={clsx('me-3', ({ isActive }) =>
            isActive ? styles.linkActive : undefined
          )}
        >
          Sign out
        </Nav.Link>
      </Nav>
    </Navbar>
  );
};

export default NavbarComponent;
