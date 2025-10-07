import React from "react";
import ContactCard from "./ContactCard";
import "./ContactList.css";

interface Contact {
  id: string;
  firstName: string;
  lastName: string;
  phone: string;
  createdAt: string;
  updatedAt: string;
}

interface ContactListProps {
  contacts: Contact[];
  onEdit: (contact: Contact) => void;
  onDelete: (contactId: string) => void;
  onAddContact: () => void;
}

const ContactList: React.FC<ContactListProps> = ({
  contacts,
  onEdit,
  onDelete,
  onAddContact,
}) => {
  return (
    <div className="contact-list-container">
      <div className="contact-list-header">
        <button className="add-contact-btn" onClick={onAddContact}>
          <span className="add-icon">+</span>
          Add Contact
        </button>
      </div>

      <div className="contact-list-content">
        {contacts.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state-card">
              <p className="empty-state-text">
                No contacts yet. Create your first contact!
              </p>
            </div>
          </div>
        ) : (
          <div className="contacts-grid">
            {contacts.map((contact) => (
              <ContactCard
                key={contact.id}
                contact={contact}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ContactList;
