import { Button, Checkbox } from 'antd';
import React from 'react';

import CheckboxGroup from '../../../commons/Components/CheckboxGroup';

import multipleCopies from './multipleCopies';
import styles from './styles.module.css';

function SelectDocumentCopies({
  copiesValue, copiesOnChange, handleDownload, download24,
}) {
  const options = multipleCopies();

  const onChangeTableHeaderCheckbox = (event) => {
    copiesOnChange(event.currentTarget.checked ? [
      'original_3',
      'original_2',
      'original_1',
      'copy_9',
      'copy_4',
      'copy_5',
      'copy_6',
      'copy_7',
      'copy_8',
      'copy_10',
      'copy_11',
      'copy_12'] : []);
  };

  const getSelectAllCheckbox = () => {
    const isAllRowsChecked = (copiesValue || []).length === 12;

    return (
      <Checkbox
        label="Select All"
        value="select_all"
        className={styles.select_checkbox}
        checked={isAllRowsChecked}
        onChange={onChangeTableHeaderCheckbox}
      />
    );
  };

  return (
    <div className={styles.select_copies_container}>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {getSelectAllCheckbox()}
        <CheckboxGroup
          options={options}
          onChange={copiesOnChange}
          value={copiesValue}
        />
      </div>
      <div>
        <Button
          size="sm"
          themeType="accent"
          onClick={() => {
					  setSaveDocument(true);
					  handleDownload(download24);
          }}
          style={{ marginLeft: 'auto' }}
        >
          Download

        </Button>
      </div>
    </div>
  );
}

export default SelectDocumentCopies;
