import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { nanoid } from 'nanoid';
import css from './Filter.module.css';

export default class Filter extends Component {
  handleFilter = event => {
    this.props.filter({ filter: event.currentTarget.value });
  };

  render() {
    const idFilter = nanoid();
    return (
      <form className={css.formFilter}>
        <label htmlFor={idFilter} className={css.filterLabel}>
          Find Contact by Name
        </label>
        <input
          type="text"
          name="filter"
          value={this.props.value}
          onChange={this.handleFilter}
        />
      </form>
    );
  }
}

// export default function Filter({ handleFilter }) {
//   return (
//     <div className={css.formFilter}>
//       <p className={css.filterLabel}>Find Contact by Name</p>
//       <input type="text" name="filter" onChange={handleFilter} />
//     </div>
//   );
// }
Filter.propTypes = {
  filter: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};
