import React from 'react';
import AboutMeStyles from './AboutMe.module.scss';

function AboutMe() {
  return (
    <section className={AboutMeStyles.aboutMe}>
      <h2 className={AboutMeStyles.sectionTitle}>
        Студент
      </h2>
      <img className={AboutMeStyles.photo} />
      <h3 className={AboutMeStyles.mainTitle}>
        Екатерина
      </h3>
      <h4 className={AboutMeStyles.subtitle}>
        Фронтенд-разработчик, 32 года
      </h4>
      <p className={AboutMeStyles.text}>
        Начала кодить в 2020 году, до этого был опыт работы в веб-студиях - занималась вёрсткой и контентом.
        Тогда и появился интерес к веб-разработке. Стала много читать про IT-технологии, потом пошла учиться в Яндекс.
        По образованию лингвист, переводчик. Знаю английский и немецкий языки.
        Увлекаюсь чтением книг, люблю мир Средиземья Толкиена. Занимаюсь иногда спортом (плавание, велосипед, коньки).
        Люблю путешествовать, ходить в походы. Замужем, есть дочь.
        Очень хочу развиваться и расти как фронтенд-разработчик.
      </p>
      <div className={AboutMeStyles.contactsArea}>
        <a className={AboutMeStyles.contact} href='https://t.me/even_starr'>
          Telegram
        </a>
        <a className={AboutMeStyles.contact} href='https://github.com/KateSmychok'>
          Github
        </a>
      </div>
    </section>
  )
}

export default AboutMe;
