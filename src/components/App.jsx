import { nanoid } from 'nanoid';
import React, { useState, useEffect } from 'react';
import ContactList from 'components/ContactList/ContactList';
import ContactForm from './ContactForm/ContactForm';
import Filter from './Filter/Filter';

const useLocalStorage = (key, defaultValue) => {
  const [state, setState] = useState(
    () => JSON.parse(window.localStorage.getItem(key)) ?? defaultValue
  );
  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(state));
  }, [state, key]);
  return [state, setState];
};

export function App() {
  // const [contacts, setContacts] = useState(
  //   () => JSON.parse(localStorage.getItem('contacts')) ?? []
  // );
  //lazy loading => active only first render

  const [contacts, setContacts] = useLocalStorage('contacts', []);
  const [filter, setFilter] = useState('');

  const submitContactForm = ({ name, number }) => {
    if (checkContactAsCurrent(name)) {
      alert(`${name} is already is in contacts`);
      return;
    }
    setContacts(prevState => [
      ...prevState,
      { id: nanoid(), name: name, number: number },
    ]);
  };
  const checkContactAsCurrent = newName => {
    return contacts.some(({ name }) => name === newName);
  };
  const handleFilter = value => {
    setFilter(value);
  };
  const handleFilteredContacts = () => {
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter)
    );
  };
  const onButtonDeleteClick = idDelete => {
    setContacts(contacts.filter(({ id }) => id !== idDelete));
  };

  // useEffect(() => {
  //   window.localStorage.setItem('contacts', JSON.stringify(contacts));
  // }, [contacts]);
  return (
    <>
      <div>
        <h1>Phonebook</h1>
        <ContactForm onSubmit={values => submitContactForm(values)} />
        <h2>Contacts</h2>
        <Filter filter={value => handleFilter(value)} value={filter} />
        <ContactList
          contacts={handleFilteredContacts()}
          onButtonDeleteClick={onButtonDeleteClick}
        />
      </div>
    </>
  );
}

//=========================
//============================
// export class App extends Component {
//   state = {
//     contacts: [],
//     filter: '',
//   };

//   submitContactForm = ({ name, number }) => {
//     if (this.checkContactAsCurrent(name)) {
//       alert(`${name} is already is in contacts`);
//       return;
//     }
//     this.setState(prevState => ({
//       contacts: [
//         ...prevState.contacts,
//         { id: nanoid(), name: name, number: number },
//       ],
//     }));
//   };
//   checkContactAsCurrent = newName => {
//     return this.state.contacts.some(({ name }) => name === newName);
//   };
//   handleFilter = value => {
//     this.setState({ filter: value.filter });
//   };
//   handleFilteredContacts = () => {
//     // this.setState({ filter: value });
//     return this.state.contacts.filter(contact =>
//       contact.name.toLowerCase().includes(this.state.filter)
//     );
//   };
//   onButtonDeleteClick = id => {
//     this.setState({
//       contacts: this.state.contacts.filter(contact => contact.id !== id),
//     });
//   };
//   // =================================
//   componentDidMount() {
//     const contacts = localStorage.getItem('contacts');
//     if (contacts) {
//       this.setState({ contacts: JSON.parse(contacts) });
//     }
//   }
//   componentDidUpdate(prevProps, prevState) {
//     if (this.state.contacts !== prevState.contacts) {
//       localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
//     }
//   }
//   render() {
//     return (
//       <>
//         <div>
//           <h1>Phonebook</h1>
//           <ContactForm onSubmit={values => this.submitContactForm(values)} />
//           <h2>Contacts</h2>
//           <Filter
//             filter={value => this.handleFilter(value)}
//             value={this.state.filter}
//           />
//           <ContactList
//             contacts={this.handleFilteredContacts()}
//             onButtonDeleteClick={this.onButtonDeleteClick}
//           />
//         </div>
//       </>
//     );
//   }
// }
