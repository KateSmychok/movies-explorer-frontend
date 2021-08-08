import React from 'react';
import styles from './AboutMe.module.scss';

function AboutMe() {
  return (
    <section id='student' className={styles.aboutMe}>
      <h2 className={styles.sectionTitle}>
        Студент
      </h2>
      <img className={styles.photo} />
      <h3 className={styles.mainTitle}>
        Екатерина
      </h3>
      <h4 className={styles.subtitle}>
        Фронтенд-разработчик, 32 года
      </h4>
      <p className={styles.text}>
        Начала кодить в 2020 году, до этого был опыт работы в веб-студиях - занималась вёрсткой и контентом.
        Тогда и появился интерес к веб-разработке. Стала много читать про IT-технологии, потом пошла учиться в Яндекс.
        По образованию лингвист, переводчик. Знаю английский и немецкий языки.
        Увлекаюсь чтением книг, люблю мир Средиземья Толкиена. Занимаюсь иногда спортом (плавание, велосипед, коньки).
        Люблю путешествовать, ходить в походы. Замужем, есть дочь.
        Очень хочу развиваться и расти как фронтенд-разработчик.
      </p>
      <div className={styles.contactsArea}>
        <a className={styles.contact} href='https://t.me/even_starr' target='_blank'>
          Telegram
        </a>
        <a className={styles.contact} href='https://github.com/KateSmychok' target='_blank'>
          Github
        </a>
      </div>
    </section>
  )
}

export default AboutMe;
