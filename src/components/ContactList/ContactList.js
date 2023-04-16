import PropTypes from 'prop-types';
import css from './ContactList.module.css';
import ContactItem from 'components/ContactItem/ContactItem';
export default function ContactList({ contacts, onButtonDeleteClick }) {
  if (contacts.length === 0) return;
  return (
    <ul className={css.contactList}>
      {contacts.map(({ id, name, number }) => (
        <li key={id} className={css.contactItem}>
          <ContactItem
            className={css.contactItem}
            name={name}
            number={number}
            onButtonDeleteClick={() => onButtonDeleteClick(id)}
          />
        </li>
      ))}
    </ul>
  );
}
ContactList.propTypes = {
  onButtonDeleteClick: PropTypes.func.isRequired,
  contacts: PropTypes.arrayOf(
    PropTypes.exact({
      name: PropTypes.string,
      number: PropTypes.string,
      id: PropTypes.string,
    })
  ),
};
