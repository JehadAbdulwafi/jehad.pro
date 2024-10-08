import React from 'react';

import * as styles from './Footer.module.scss';
import Dribbble from '../../assets/images/brands/dribbble.inline.svg';
import Instagram from '../../assets/images/brands/instagram.inline.svg';
import Behance from '../../assets/images/brands/behance.inline.svg';
import Github from '../../assets/images/brands/github.inline.svg';
import NPM from '../../assets/images/brands/npm.inline.svg';

const Footer = () => {
  return (
    <div className={`oldPageWrapper ${styles.container}`}>
      <ul className={styles.socials}>
        <li>
          <a
            href="https://github.com/JehadAbdulwafi"
            target="_blank"
            rel="noopener noreferrer"
          >
            Github
            <Github />
          </a>
        </li>
        <li>
          <a
            href="https://www.npmjs.com/~JehadAbdulwafi"
            target="_blank"
            rel="noopener noreferrer"
          >
            NPM
            <NPM />
          </a>
        </li>
        <li>
          <a
            href="https://www.instagram.com/j7h3dx/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Instagram
            <Instagram />
          </a>
        </li>
        {/* <li>
          <a
            href="https://www.behance.net/JehadAbdulwafi"
            target="_blank"
            rel="noopener noreferrer"
          >
            Behance
            <Behance />
          </a>
        </li> */}
        <li>
          <a
            href="https://dribbble.com/J7H3D"
            target="_blank"
            rel="noopener noreferrer"
          >
            Dribbble
            <Dribbble />
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Footer;
