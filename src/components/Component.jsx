import React, { Component } from "react";
import { nanoid } from "nanoid";
import Filter from "../components/Filter";
import Contact from "../components/contacts";
import AlertContact from "./AlertContact";
import styles from "../modulocss/component.module.css";

class MyContactComponent extends Component {
  state = {
    contacts: [],
    filter: "",
    name: "",
    number: "",
  };

  componentDidMount() {
    const storedContacts = localStorage.getItem("contacts");
    if (storedContacts) {
      this.setState({ contacts: JSON.parse(storedContacts) });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.contacts !== this.state.contacts) {
      localStorage.setItem("contacts", JSON.stringify(this.state.contacts));
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();

    const isNameDuplicate = this.state.contacts.some(
      (contact) => contact.name.toLowerCase() === this.state.name.toLowerCase()
    );

    if (isNameDuplicate) {
      console.log(`${this.state.name} is already in contacts!`);
      return;
    }

    this.addNewContact({ name: this.state.name, number: this.state.number });
    this.setState({ name: "", number: "" });
  };

  nameInputId = nanoid();
  numberInputId = nanoid();

  addNewContact = (input) => {
    this.setState((prevState) => ({
      contacts: [...prevState.contacts, { ...input, id: nanoid() }],
    }));
  };

  handleNameChange = (e) => {
    this.setState({ name: e.target.value });
  };

  handleNumberChange = (e) => {
    this.setState({ number: e.target.value });
  };

  handleFilterChange = (e) => {
    const filterValue = e.target.value.toLowerCase();
    this.setState({ filter: filterValue });
  };

  handleDeleteContact = (contactId) => {
    const updatedContacts = this.state.contacts.filter(
      (contact) => contact.id !== contactId
    );

    this.setState({ contacts: updatedContacts });
  };

  render() {
    const { name, number, filter, contacts } = this.state;

    return (
      <div className={styles["container"]}>
        <div className={styles["container-form"]}>
          <h1 className={styles["title"]}>Phonebook</h1>
          <Contact
            name={name}
            number={number}
            handleNameChange={this.handleNameChange}
            handleNumberChange={this.handleNumberChange}
            handleSubmit={this.handleSubmit}
          />
          <AlertContact name={name} contacts={contacts} />
          <Filter
            contacts={contacts}
            filter={filter}
            handleFilterChange={this.handleFilterChange}
            handleDeleteContact={this.handleDeleteContact}
          />
        </div>
      </div>
    );
  }
}

export default MyContactComponent;