import React from 'react';
import styles from './Home.module.css';
import { Link, Navigate } from 'react-router-dom';
import Input from '../../components/Input';
import Button from '../../components/Button';
import useForm from '../../hooks/useForm';
import { UserContext } from '../../context/UserContext';
import Error from '../../components/Helper/Error';

const Home = () => {
  const { userLogin, error, loading, login } = React.useContext(UserContext);

  const username = useForm();
  const password = useForm();

  function handleSubmit(event) {
    event.preventDefault();
    if (username.validate() && password.validate()) {
      userLogin(username.value, password.value);
    }
  }
  if (login === true) return <Navigate to="/account" />;
  return (
    <section className={styles.home}>
      <div className={styles.wrapper}>
        <h1>dev dogs</h1>
        <p>
          our best <span>partner</span>{' '}
        </p>
        <form className={styles.form} onSubmit={handleSubmit}>
          <Input label="User" type="text" name="username" {...username} />
          <Input
            label="Password"
            type="password"
            name="password"
            {...password}
          />
          <Link to="/passwordlost">Forgot your password?</Link>
          {loading ? (
            <Button disabled>Loading</Button>
          ) : (
            <Button>log in</Button>
          )}
          <Error error={error && 'Incorrect data'} />
        </form>
        <div className={styles.signup}>
          <p>
            Don't have an accout? <Link to="/signup">Sign Up</Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Home;
