import React from 'react';
import styles from './LoginPasswordReset.module.css';
import Input from '../../components/Input';
import Button from '../../components/Button';
import Error from '../../components/Helper/Error';
import useForm from '../../hooks/useForm';
import useFetch from '../../hooks/useFetch';
import { useNavigate } from 'react-router-dom';
import { PASSWORD_RESET } from '../../services/api/api';

const LoginPasswordReset = () => {
  const [login, setLogin] = React.useState('');
  const [key, setKey] = React.useState('');

  const password = useForm();
  const { error, loading, request } = useFetch();

  const navigate = useNavigate();

  React.useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const key = params.get('key');
    const login = params.get('login');
    if (key) setKey(key);
    if (login) setLogin(login);
  }, []);

  async function handleSubmit(event) {
    event.preventDefault();
    if (password.validate()) {
      const { url, options } = PASSWORD_RESET({
        login,
        key,
        password: password.value,
      });
      const { response } = await request(url, options);
      if (response.ok) navigate('/');
    }
  }

  return (
    <section className={`${styles.reset} animeLeft`}>
      <div className={styles.wrapper}>
        <h1 className="title">Reset password</h1>
        <form className={styles.form} onSubmit={handleSubmit}>
          <Input
            label="New password"
            type="password"
            name="password"
            {...password}
          />
          {loading ? (
            <Button disabled>Reseting...</Button>
          ) : (
            <Button>Reset</Button>
          )}
        </form>
        <Error error={error} />
      </div>
    </section>
  );
};

export default LoginPasswordReset;
