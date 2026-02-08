import React, { useMemo } from "react";
import ContactCard from "./ContactCard";
import ContactCardSkeleton from "./ContactCardSkeleton";
import EmptyState from "./EmptyState";
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
  searchQuery: string;
  loading?: boolean;
}

const ContactList: React.FC<ContactListProps> = ({
  contacts,
  onEdit,
  onDelete,
  searchQuery,
  loading = false,
}) => {
  // Filter contacts based on search query
  const filteredContacts = useMemo(() => {
    if (!searchQuery.trim()) {
      return contacts;
    }

    const query = searchQuery.toLowerCase().trim();
    return contacts.filter((contact) => {
      const fullName = `${contact.firstName} ${contact.lastName}`.toLowerCase();
      const phone = contact.phone.toLowerCase();
      return fullName.includes(query) || phone.includes(query);
    });
  }, [contacts, searchQuery]);

  const hasNoContacts = contacts.length === 0 && !loading;
  const hasNoResults = !hasNoContacts && !loading && filteredContacts.length === 0;

  return (
    <div className="contact-list-container">
      <div className="contact-list-content">
        {loading ? (
          <div className="contacts-grid">
            {[...Array(6)].map((_, index) => (
              <ContactCardSkeleton key={index} />
            ))}
          </div>
        ) : hasNoContacts ? (
          <EmptyState
            message="No contacts yet. Start building your network!"
            iconType="contacts"
          />
        ) : hasNoResults ? (
          <EmptyState
            message={`No contacts found matching "${searchQuery}"`}
            iconType="search"
          />
        ) : (
          <div className="contacts-grid">
            {filteredContacts.map((contact) => (
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
