import React from 'react';
import styles from './UserPhotoPost.module.css';
import useForm from '../../hooks/useForm';
import useFetch from '../../hooks/useFetch';
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';
import Error from '../../components/Helper/Error';
import { useNavigate } from 'react-router-dom';
import { PHOTO_POST } from '../../services/api/api';

const UserPhotoPost = () => {
  const name = useForm();
  const weight = useForm('number');
  const age = useForm('number');

  const [img, setImg] = React.useState([]);
  const { data, error, loading, request } = useFetch();

  const navigate = useNavigate();

  React.useEffect(() => {
    if (data) navigate('/account');
  }, [data, navigate]);

  function handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData();

    formData.append('img', img.raw);
    formData.append('name', name.value);
    formData.append('weight', weight.value);
    formData.append('age', age.value);

    const token = window.localStorage.getItem('token');
    const { url, options } = PHOTO_POST(formData, token);
    request(url, options);
  }

  function handleImgChange({ target }) {
    setImg({
      preview: URL.createObjectURL(target.files[0]),
      raw: target.files[0],
    });
  }

  return (
    <section className={`${styles.photoPost} animeLeft`}>
      <form onSubmit={handleSubmit}>
        <Input label="Name" type="text" name="name" {...name} />
        <Input label="Weight" type="text" name="weight" {...weight} />
        <Input label="Age" type="text" name="age" {...age} />
        <input
          className={styles.file}
          type="file"
          name="img"
          id="img"
          onChange={handleImgChange}
        />
        {loading ? <Button disabled>Loading...</Button> : <Button>Send</Button>}
        <Error error={error} />
      </form>
      <div>
        {img.preview && (
          <div
            className={styles.preview}
            style={{ backgroundImage: `url('${img.preview}')` }}
          ></div>
        )}
      </div>
    </section>
  );
};

export default UserPhotoPost;
