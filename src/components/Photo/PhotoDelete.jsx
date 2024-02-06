import React from 'react';
import styles from './PhotoDelete.module.css';
import useFetch from '../../hooks/useFetch';
import { PHOTO_DELETE } from '../../services/api/api';

const PhotoDelete = ({ id }) => {
  const { loading, request } = useFetch();

  async function handleClick() {
    const confirm = window.confirm('Are you sure?');
    if (confirm) {
      const { url, options } = PHOTO_DELETE(id);
      const { response } = await request(url, options);
      if (response.ok) window.location.reload();
    }
  }
  return (
    <>
      {loading ? (
        <button disabled className={styles.delete}>
          Removing...
        </button>
      ) : (
        <button onClick={handleClick} className={styles.delete}>
          Delete
        </button>
      )}
    </>
  );
};

export default PhotoDelete;
