import React, { useState, useEffect } from "react";
import AuthForm from "./components/AuthForm";
import Header from "./components/Header";
import ContactList from "./components/ContactList";
import ContactModal from "./components/ContactModal";
import DeleteModal from "./components/DeleteModal";
import { authAPI, contactsAPI, Contact } from "./services/api";
import "./App.css";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Modal states
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [editingContact, setEditingContact] = useState<Contact | null>(null);
  const [deletingContactId, setDeletingContactId] = useState<string | null>(
    null
  );

  // Check if user is already authenticated
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    const email = localStorage.getItem("userEmail");

    if (token && email) {
      setUserEmail(email);
      setIsAuthenticated(true);
      loadContacts();
    }
  }, []);

  const loadContacts = async () => {
    try {
      setLoading(true);
      const response = await contactsAPI.getContacts();
      setContacts(response.data.contacts);
    } catch (err: any) {
      setError("Failed to load contacts");
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (email: string, password: string) => {
    try {
      setLoading(true);
      setError("");
      const response = await authAPI.login(email, password);

      if (response.success && response.token) {
        localStorage.setItem("authToken", response.token);
        localStorage.setItem("userEmail", response.user.email);
        setUserEmail(response.user.email);
        setIsAuthenticated(true);
        loadContacts();
      }
    } catch (err: any) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (email: string, password: string) => {
    try {
      setLoading(true);
      setError("");
      const response = await authAPI.register(email, password);

      if (response.success && response.token) {
        localStorage.setItem("authToken", response.token);
        localStorage.setItem("userEmail", response.user.email);
        setUserEmail(response.user.email);
        setIsAuthenticated(true);
        loadContacts();
      }
    } catch (err: any) {
      setError(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userEmail");
    setIsAuthenticated(false);
    setUserEmail("");
    setContacts([]);
  };

  const handleAddContact = () => {
    setEditingContact(null);
    setIsContactModalOpen(true);
  };

  const handleEditContact = (contact: Contact) => {
    const contactWithId = {
      ...contact,
      id: contact.id || contact._id || "",
    };

    setEditingContact(contactWithId);
    setIsContactModalOpen(true);
  };

  const handleDeleteContact = (contactId: string) => {
    setDeletingContactId(contactId);
    setIsDeleteModalOpen(true);
  };

  const handleSaveContact = async (
    contactData: Omit<Contact, "id" | "createdAt" | "updatedAt">
  ) => {
    try {
      setLoading(true);
      setError("");

      if (editingContact) {
        await contactsAPI.updateContact(editingContact.id, contactData);
      } else {
        await contactsAPI.createContact(contactData);
      }

      setIsContactModalOpen(false);
      setEditingContact(null);
      loadContacts();
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to save contact");
    } finally {
      setLoading(false);
    }
  };

  const handleConfirmDelete = async () => {
    if (!deletingContactId) return;

    try {
      setLoading(true);
      setError("");
      await contactsAPI.deleteContact(deletingContactId);
      setIsDeleteModalOpen(false);
      setDeletingContactId(null);
      loadContacts();
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to delete contact");
    } finally {
      setLoading(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="app">
        <AuthForm onLogin={handleLogin} onRegister={handleRegister} />
        {error && <div className="error-message">{error}</div>}
        {loading && <div className="loading-overlay">Loading...</div>}
      </div>
    );
  }

  return (
    <div className="app">
      <Header userEmail={userEmail} onLogout={handleLogout} />
      <ContactList
        contacts={contacts}
        onEdit={handleEditContact}
        onDelete={handleDeleteContact}
        onAddContact={handleAddContact}
      />

      <ContactModal
        isOpen={isContactModalOpen}
        onClose={() => {
          setIsContactModalOpen(false);
          setEditingContact(null);
        }}
        onSave={handleSaveContact}
        contact={editingContact}
        mode={editingContact ? "edit" : "add"}
      />

      <DeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setDeletingContactId(null);
        }}
        onConfirm={handleConfirmDelete}
        contactName={
          deletingContactId
            ? contacts.find((c) => c.id === deletingContactId)?.firstName +
                " " +
                contacts.find((c) => c.id === deletingContactId)?.lastName ||
              "this contact"
            : "this contact"
        }
      />

      {error && <div className="error-message">{error}</div>}
      {loading && <div className="loading-overlay">Loading...</div>}
    </div>
  );
}

export default App;
