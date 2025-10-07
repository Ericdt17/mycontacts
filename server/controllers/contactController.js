const Contact = require("../models/Contact");
const mongoose = require("mongoose");

/**
 * @desc    Récupérer tous les contacts de l'utilisateur connecté
 * @route   GET /api/contacts
 * @access  Private
 */
const getContacts = async (req, res) => {
  try {
    const { sort = "lastName" } = req.query;

    const sortOptions = {};
    if (sort) {
      const sortField = sort.startsWith("-") ? sort.substring(1) : sort;
      const sortOrder = sort.startsWith("-") ? -1 : 1;
      sortOptions[sortField] = sortOrder;
    }
    const contacts = await Contact.find({ owner: req.user.userId }).sort(
      sortOptions
    );

    res.json({
      success: true,
      message: "Contacts récupérés avec succès",
      data: {
        contacts: contacts.map((contact) => contact.toSafeObject()),
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Erreur serveur lors de la récupération des contacts",
    });
  }
};

/**
 * @desc    Récupérer un contact spécifique par ID
 * @route   GET /api/contacts/:id
 * @access  Private
 */
const getContactById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "ID du contact invalide",
      });
    }

    const contact = await Contact.findOne({ _id: id, owner: req.user.userId });

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: "Contact non trouvé",
      });
    }

    res.json({
      success: true,
      message: "Contact récupéré avec succès",
      data: { contact: contact.toSafeObject() },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Erreur serveur lors de la récupération du contact",
    });
  }
};

/**
 * @desc    Créer un nouveau contact
 * @route   POST /api/contacts
 * @access  Private
 */
const createContact = async (req, res) => {
  try {
    const { firstName, lastName, phone } = req.body;

    if (!firstName || !lastName || !phone) {
      return res.status(400).json({
        success: false,
        message: "Tous les champs (firstName, lastName, phone) sont requis",
      });
    }

    const existingContact = await Contact.findOne({
      owner: req.user.userId,
      phone: phone.trim(),
    });

    if (existingContact) {
      return res.status(400).json({
        success: false,
        message: "Un contact avec ce numéro de téléphone existe déjà",
      });
    }

    const contact = await Contact.create({
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      phone: phone.trim(),
      owner: req.user.userId,
    });

    res.status(201).json({
      success: true,
      message: "Contact créé avec succès",
      data: { contact: contact.toSafeObject() },
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((err) => err.message);
      return res.status(400).json({
        success: false,
        message: "Données invalides",
        errors: messages,
      });
    }

    res.status(500).json({
      success: false,
      message: "Erreur serveur lors de la création du contact",
    });
  }
};

/**
 * @desc    Mettre à jour un contact (partiel)
 * @route   PATCH /api/contacts/:id
 * @access  Private
 */
const updateContact = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "ID du contact invalide",
      });
    }

    if (Object.keys(updates).length === 0) {
      return res.status(400).json({
        success: false,
        message: "Aucune donnée fournie pour la mise à jour",
      });
    }

    const allowedUpdates = ["firstName", "lastName", "phone"];
    const filteredUpdates = {};

    Object.keys(updates).forEach((key) => {
      if (allowedUpdates.includes(key) && updates[key] !== undefined) {
        filteredUpdates[key] =
          typeof updates[key] === "string" ? updates[key].trim() : updates[key];
      }
    });

    if (Object.keys(filteredUpdates).length === 0) {
      return res.status(400).json({
        success: false,
        message: "Aucun champ valide fourni pour la mise à jour",
      });
    }

    if (filteredUpdates.phone) {
      const existingContact = await Contact.findOne({
        owner: req.user.userId,
        phone: filteredUpdates.phone,
        _id: { $ne: id },
      });

      if (existingContact) {
        return res.status(400).json({
          success: false,
          message: "Un autre contact avec ce numéro de téléphone existe déjà",
        });
      }
    }

    const contact = await Contact.findOneAndUpdate(
      { _id: id, owner: req.user.userId },
      filteredUpdates,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: "Contact non trouvé",
      });
    }

    res.json({
      success: true,
      message: "Contact mis à jour avec succès",
      data: { contact: contact.toSafeObject() },
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((err) => err.message);
      return res.status(400).json({
        success: false,
        message: "Données invalides",
        errors: messages,
      });
    }

    res.status(500).json({
      success: false,
      message: "Erreur serveur lors de la mise à jour du contact",
    });
  }
};

/**
 * @desc    Supprimer un contact
 * @route   DELETE /api/contacts/:id
 * @access  Private
 */
const deleteContact = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "ID du contact invalide",
      });
    }

    const contact = await Contact.findOneAndDelete({
      _id: id,
      owner: req.user.userId,
    });

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: "Contact non trouvé",
      });
    }

    res.json({
      success: true,
      message: "Contact supprimé avec succès",
      data: { contact: contact.toSafeObject() },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Erreur serveur lors de la suppression du contact",
    });
  }
};

module.exports = {
  getContacts,
  getContactById,
  createContact,
  updateContact,
  deleteContact,
};
