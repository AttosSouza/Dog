import React from 'react';
import styles from './LoginPasswordLost.module.css';
import Input from '../../components/Input';
import Button from '../../components/Button';
import Error from '../../components/Helper/Error';
import useForm from '../../hooks/useForm';
import useFetch from '../../hooks/useFetch';
import { PASSWORD_LOST } from '../../services/api/api';
import { Link } from 'react-router-dom';

const LoginPasswordLost = () => {
  const login = useForm();
  const { data, loading, error, request } = useFetch();

  async function handleSubmit(event) {
    event.preventDefault();

    if (login.validate()) {
      const { url, options } = PASSWORD_LOST({
        login: login.value,
        url: window.location.href.replace('perdeu', 'resetar'),
      });
      const { json } = await request(url, options);
      console.log(json);
    }
  }

  return (
    <section className={`${styles.password} animeLeft`}>
      <div className={styles.wrapper}>
        <h1 className="title">Perdeu a senha?</h1>
        {data ? (
          <p style={{ color: '#4c1' }}>{data}</p>
        ) : (
          <form className={styles.form} onSubmit={handleSubmit}>
            <Input
              label="Email / Usuário"
              type="text"
              name="login"
              {...login}
            />
            {loading ? (
              <Button disabled>Enviando...</Button>
            ) : (
              <Button>Enviar Email</Button>
            )}
            <Link to="/">Back to Home</Link>
          </form>
        )}
        <Error error={error} />
      </div>
    </section>
  );
};

export default LoginPasswordLost;
