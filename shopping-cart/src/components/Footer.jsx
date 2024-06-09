import React from 'react';
import githubLogo from '/src/assets/github-white.png'; 
import styles from './Footer.module.css';

function Footer() {
  return (
    <footer className={styles.footer}>
      <img src={githubLogo} alt="GitHub" className={styles.githubLogo} />
      <span>Copyright @yuusan64</span>
    </footer>
  );
}

export default Footer;
