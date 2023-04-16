import { nanoid } from 'nanoid';
import React, { Component } from 'react';
import ContactList from 'components/ContactList/ContactList';
import ContactForm from './ContactForm/ContactForm';
import Filter from './Filter/Filter';
import Modal from './Modal/Modal';

export class App extends Component {
  // initialContacts = localStorage.getItem('contacts')
  //   ? JSON.parse(localStorage.getItem('contacts'))
  //   : [];
  state = {
    contacts: [],
    filter: '',
    showModals: false,
  };

  submitContactForm = ({ name, number }) => {
    if (this.checkContactAsCurrent(name)) {
      alert(`${name} is already is in contacts`);
      return;
    }
    this.setState(prevState => ({
      contacts: [
        ...prevState.contacts,
        { id: nanoid(), name: name, number: number },
      ],
    }));
  };
  checkContactAsCurrent = newName => {
    return this.state.contacts.some(({ name }) => name === newName);
  };
  handleFilter = value => {
    this.setState({ filter: value.filter });
  };
  handleFilteredContacts = () => {
    // this.setState({ filter: value });
    return this.state.contacts.filter(contact =>
      contact.name.toLowerCase().includes(this.state.filter)
    );
  };
  onButtonDeleteClick = id => {
    this.setState({
      contacts: this.state.contacts.filter(contact => contact.id !== id),
    });
  };
  // =================================
  componentDidMount() {
    console.log('ComponentDidMount');
    const contacts = localStorage.getItem('contacts');
    if (contacts) {
      this.setState({ contacts: JSON.parse(contacts) });
    }
  }
  componentDidUpdate(prevProps, prevState) {
    console.log('ComponentDidUpdate');
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }
  // ========================
  toggleModal = () => {
    this.setState({ showModals: !this.state.showModals });
  };
  // =======================
  //===========================================
  render() {
    return (
      <>
        {/* <button type="button" onClick={this.toggleModal}>
          Open Modal
        </button> */}
        <div>
          {this.state.showModals && (
            <Modal closeModalWindow={this.toggleModal}>
              <h1>Hi. It is Modal window</h1>
              <p>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Ducimus dolore quisquam a temporibus ipsum iure exercitationem
                qui! Optio omnis pariatur facere accusantium sapiente culpa
                veniam.
              </p>
              <button type="button" onClick={this.toggleModal}>
                Close modal
              </button>
            </Modal>
          )}
        </div>

        <div>
          <h1>Phonebook</h1>
          <ContactForm onSubmit={values => this.submitContactForm(values)} />
          <h2>Contacts</h2>
          <Filter
            filter={value => this.handleFilter(value)}
            value={this.state.filter}
          />
          <ContactList
            contacts={this.handleFilteredContacts()}
            onButtonDeleteClick={this.onButtonDeleteClick}
          />
        </div>
      </>
    );
  }
}
