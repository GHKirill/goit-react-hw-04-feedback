import React from 'react';
// import css from './ContactItem.Module.css';
import PropTypes from 'prop-types';
import IconButton from 'components/IconButton/IconButton';
import css from './ContactItem.module.css';

export default function ContactItem({ name, number, onButtonDeleteClick }) {
  return (
    <>
      <span className={css.contactName}>{name}</span>
      <span className={css.contactNumber}>{number}</span>
      <IconButton
        type="button"
        onClick={onButtonDeleteClick}
        aria-label="delete"
      >
        delete
      </IconButton>
    </>
  );
}

ContactItem.propTypes = {
  name: PropTypes.string.isRequired,
  number: PropTypes.number.isRequired,
  onButtonDeleteClick: PropTypes.func,
};
