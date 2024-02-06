import React from 'react';
import styles from './Signup.module.css';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { Link } from 'react-router-dom';
import useForm from '../../hooks/useForm';
import { USER_POST } from '../../services/api/api';
import useFetch from '../../hooks/useFetch';
import Error from '../../components/Helper/Error';

const Signup = () => {
  const username = useForm();
  const email = useForm('email');
  const password = useForm('password');

  const { loading, error, request } = useFetch();

  function handleSubmit(event) {
    event.preventDefault();

    if (username.validate() && email.validate() && password.validate()) {
      const { url, options } = USER_POST({
        username: username.value,
        email: email.value,
        password: password.value,
      });
      const { response } = request(url, options);
    }
  }

  return (
    <section className={styles.signup}>
      <div className={styles.formContent}>
        <h1>sign up</h1>
        <form onSubmit={handleSubmit} className={styles.form}>
          <Input label="User" type="text" name="username" {...username} />
          <Input label="Email" type="email" name="email" {...email} />
          <Input
            label="Password"
            type="password"
            name="password"
            {...password}
          />
          {loading ? (
            <Button disabled>Loading</Button>
          ) : (
            <Button>sign up</Button>
          )}
          <Error error={error} />
        </form>
      </div>
      <div className={styles.content}>
        <h1>dogs</h1>
        <p>
          Protecting and Caring for <br /> Your Beloved Dog
        </p>
        <p>
          A pet can make your <span>HAPPINESS</span>
        </p>
        <Link to="/">Back to Sign In</Link>
      </div>
    </section>
  );
};

export default Signup;
