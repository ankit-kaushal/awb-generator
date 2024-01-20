import React from 'react';
import styles from './style.module.css';

function PageTitle({
  title = null, onBack, subTitle = null, extra = [],
}) {
  return (
    <div>
      <h1>{title}</h1>
    </div>
  );
}

export default PageTitle;
