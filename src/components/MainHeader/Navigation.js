import React from 'react';
import contextCreate from '../Store/context';
import classes from './Navigation.module.css';

const Navigation = (props) => {
  return (
    <contextCreate.Consumer>
      {((ctx)=>{return(
      <nav className={classes.nav}>
        <ul>
          {ctx.isLoggedIn && (
            <li>
              <a href="/">Users</a>
            </li>
          )}
          {ctx.isLoggedIn && (
            <li>
              <a href="/">Admin</a>
            </li>
          )}
          {ctx.isLoggedIn && (
            <li>
              <button onClick={ctx.onLogout}>Logout</button>
            </li>
          )}
        </ul>
      </nav>
      ) })
          }
    </contextCreate.Consumer>
  );
};

export default Navigation;
