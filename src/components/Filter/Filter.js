import PropTypes from 'prop-types';
import React from 'react';
import { nanoid } from 'nanoid';
import css from './Filter.module.css';

export default function Filter({ value, filter }) {
  const handleFilter = event => {
    filter({ filter: event.currentTarget.value });
  };

  const idFilter = nanoid();
  return (
    <form className={css.formFilter}>
      <label htmlFor={idFilter} className={css.filterLabel}>
        Find Contact by Name
      </label>
      <input type="text" name="filter" value={value} onChange={handleFilter} />
    </form>
  );
}

Filter.propTypes = {
  filter: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};
