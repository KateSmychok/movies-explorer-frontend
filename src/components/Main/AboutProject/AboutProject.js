import React from 'react';
import cn from 'classnames';
import styles from './AboutProject.module.scss';

function AboutProject() {
  return (
    <section id='project' className={styles.aboutProject}>
      <h2 className={styles.sectionTitle}>
        О проекте
      </h2>
      <div className={styles.description}>
        <div className={styles.descriptionColumn}>
          <h3 className={styles.descriptionTitle}>
            Дипломный проект включал 5 этапов
          </h3>
          <p className={styles.descriptionText}>
            Составление плана, работу над бэкендом, вёрстку, добавление функциональности
            и финальные доработки.
          </p>
        </div>
        <div className={styles.descriptionColumn}>
          <h3 className={styles.descriptionTitle}>
            На выполнение диплома ушло 5 недель
          </h3>
          <p className={styles.descriptionText}>
            У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать,
            чтобы успешно защититься.
          </p>
        </div>
      </div>
      <div className={styles.schedule}>
        <div className={styles.scheduleLine}>
          <p className={styles.blockFirst}>1 неделя</p>
          <p className={styles.blockSecond}>4 недели</p>
        </div>
        <div className={styles.scheduleLine}>
          <p className={cn(styles.blockFirst, styles.caption)}>Back-end</p>
          <p className={cn(styles.blockSecond, styles.caption)}>Front-end</p>
        </div>
      </div>
    </section>
  );
}

export default AboutProject;
