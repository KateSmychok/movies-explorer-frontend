import React from 'react';
import styles from './NotFoundPage.module.scss';
import { Link } from 'react-router-dom';

function NotFoundPage() {
  return (
    <section className={styles.notFoundPage}>
      <h2 className={styles.title}>404</h2>
      <h3 className={styles.subtitle}>Страница не найдена</h3>
      <Link to='/' className={styles.link}>Назад</Link>
    </section>
  )
}

export default NotFoundPage;
