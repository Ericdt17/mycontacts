import React, { useState, useEffect } from "react";
import AuthForm from "./components/AuthForm";
import Header from "./components/Header";
import ContactList from "./components/ContactList";
import ContactModal from "./components/ContactModal";
import DeleteModal from "./components/DeleteModal";
import ToastContainer from "./components/ToastContainer";
import { authAPI, contactsAPI, Contact } from "./services/api";
import { useToast } from "./hooks/useToast";
import "./App.css";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { toasts, showToast, removeToast } = useToast();

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
      showToast("Failed to load contacts", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (email: string, password: string) => {
    try {
      setLoading(true);
      const response = await authAPI.login(email, password);

      if (response.success && response.token) {
        localStorage.setItem("authToken", response.token);
        localStorage.setItem("userEmail", response.user.email);
        setUserEmail(response.user.email);
        setIsAuthenticated(true);
        showToast("Login successful!", "success");
        loadContacts();
      }
    } catch (err: any) {
      showToast(err.response?.data?.message || "Login failed", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (email: string, password: string) => {
    try {
      setLoading(true);
      const response = await authAPI.register(email, password);

      if (response.success && response.token) {
        localStorage.setItem("authToken", response.token);
        localStorage.setItem("userEmail", response.user.email);
        setUserEmail(response.user.email);
        setIsAuthenticated(true);
        showToast("Account created successfully!", "success");
        loadContacts();
      }
    } catch (err: any) {
      showToast(err.response?.data?.message || "Registration failed", "error");
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
    setSearchQuery("");
    showToast("Logged out successfully", "info");
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
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

      if (editingContact) {
        await contactsAPI.updateContact(editingContact.id, contactData);
        showToast("Contact updated successfully!", "success");
      } else {
        await contactsAPI.createContact(contactData);
        showToast("Contact created successfully!", "success");
      }

      setIsContactModalOpen(false);
      setEditingContact(null);
      loadContacts();
    } catch (err: any) {
      showToast(
        err.response?.data?.message || "Failed to save contact",
        "error"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleConfirmDelete = async () => {
    if (!deletingContactId) return;

    try {
      setLoading(true);
      await contactsAPI.deleteContact(deletingContactId);
      showToast("Contact deleted successfully!", "success");
      setIsDeleteModalOpen(false);
      setDeletingContactId(null);
      loadContacts();
    } catch (err: any) {
      showToast(
        err.response?.data?.message || "Failed to delete contact",
        "error"
      );
    } finally {
      setLoading(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="app">
        <AuthForm onLogin={handleLogin} onRegister={handleRegister} />
        <ToastContainer toasts={toasts} onRemove={removeToast} />
        {loading && <div className="loading-overlay">Loading...</div>}
      </div>
    );
  }

  return (
    <div className="app">
      <Header
        userEmail={userEmail}
        onLogout={handleLogout}
        onAddContact={handleAddContact}
        searchQuery={searchQuery}
        onSearch={handleSearch}
      />
      <ContactList
        contacts={contacts}
        onEdit={handleEditContact}
        onDelete={handleDeleteContact}
        searchQuery={searchQuery}
        loading={loading}
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

      <ToastContainer toasts={toasts} onRemove={removeToast} />
      {loading && <div className="loading-overlay">Loading...</div>}
    </div>
  );
}

export default App;
