import React from 'react';
import cn from 'classnames';
import AboutProjectStyles from './AboutProject.module.scss';

function AboutProject() {
  return (
    <section id='project' className={AboutProjectStyles.aboutProject}>
      <h2 className={AboutProjectStyles.sectionTitle}>
        О проекте
      </h2>
      <div className={AboutProjectStyles.description}>
        <div className={AboutProjectStyles.descriptionColumn}>
          <h3 className={AboutProjectStyles.descriptionTitle}>
            Дипломный проект включал 5 этапов
          </h3>
          <p className={AboutProjectStyles.descriptionText}>
            Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.
          </p>
        </div>
        <div className={AboutProjectStyles.descriptionColumn}>
          <h3 className={AboutProjectStyles.descriptionTitle}>
            На выполнение диплома ушло 5 недель
          </h3>
          <p className={AboutProjectStyles.descriptionText}>
            У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.
          </p>
        </div>
      </div>
      <div className={AboutProjectStyles.schedule}>
        <div className={AboutProjectStyles.scheduleLine}>
          <p className={AboutProjectStyles.blockFirst}>1 неделя</p>
          <p className={AboutProjectStyles.blockSecond}>4 недели</p>
        </div>
        <div className={AboutProjectStyles.scheduleLine}>
          <p className={cn(AboutProjectStyles.blockFirst, AboutProjectStyles.caption)}>Back-end</p>
          <p className={cn(AboutProjectStyles.blockSecond, AboutProjectStyles.caption)}>Front-end</p>
        </div>
      </div>
    </section>
  )
}

export default AboutProject;
