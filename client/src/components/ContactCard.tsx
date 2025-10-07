import React from "react";
import "./ContactCard.css";

interface Contact {
  id: string;
  firstName: string;
  lastName: string;
  phone: string;
  createdAt: string;
  updatedAt: string;
}

interface ContactCardProps {
  contact: Contact;
  onEdit: (contact: Contact) => void;
  onDelete: (contactId: string) => void;
}

const ContactCard: React.FC<ContactCardProps> = ({
  contact,
  onEdit,
  onDelete,
}) => {
  return (
    <div className="contact-card">
      <div className="contact-info">
        <h3 className="contact-name">
          {contact.firstName} {contact.lastName}
        </h3>
        <p className="contact-phone">{contact.phone}</p>
      </div>
      <div className="contact-actions">
        <button
          className="action-btn edit-btn"
          onClick={() => onEdit(contact)}
          title="Edit contact"
        >
          ✏️
        </button>
        <button
          className="action-btn delete-btn"
          onClick={() => onDelete(contact.id)}
          title="Delete contact"
        >
          🗑️
        </button>
      </div>
    </div>
  );
};

export default ContactCard;
