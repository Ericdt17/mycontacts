import React from "react";
import { FiEdit2, FiTrash2 } from "react-icons/fi";
import { Icon } from "./Icon";
import Avatar from "./Avatar";
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
      <div className="contact-main">
        <Avatar
          firstName={contact.firstName}
          lastName={contact.lastName}
          size="medium"
        />
        <div className="contact-info">
          <h3 className="contact-name">
            {contact.firstName} {contact.lastName}
          </h3>
          <p className="contact-phone">{contact.phone}</p>
        </div>
      </div>
      <div className="contact-actions">
        <button
          className="action-btn edit-btn"
          onClick={() => onEdit(contact)}
          title="Edit contact"
        >
          <Icon icon={FiEdit2} />
        </button>
        <button
          className="action-btn delete-btn"
          onClick={() => onDelete(contact.id)}
          title="Delete contact"
          style={{ color: '#6b7280' }}
        >
          <Icon icon={FiTrash2} />
        </button>
      </div>
    </div>
  );
};

export default ContactCard;
