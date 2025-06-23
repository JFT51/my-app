import React, { useState, useEffect, useRef, useCallback } from 'react';

// Mock data for contract types and joint committee 302 job functions
const contractTypes = {
  nl: [
    { value: 'full-time', label: 'Voltijds' },
    { value: 'part-time', label: 'Deeltijds' },
    { value: 'flexi-job', label: 'Flexi-job' },
    { value: 'student-job', label: 'Studentenjob' },
    { value: 'extra', label: 'Extra' },
  ],
  fr: [
    { value: 'full-time', label: 'À temps plein' },
    { value: 'part-time', label: 'À temps partiel' },
    { value: 'flexi-job', label: 'Flexi-job' },
    { value: 'student-job', label: 'Job étudiant' },
    { value: 'extra', label: 'Extra' },
  ],
};

const pc302JobFunctions = {
  nl: [
    { value: 'kitchen-staff', label: 'Keukenmedewerker', icon: 'fa-solid fa-utensils' },
    { value: 'waiter', label: 'Kelner/Serveerder', icon: 'fa-solid fa-bell-concierge' },
    { value: 'bartender', label: 'Barman/Barvrouw', icon: 'fa-solid fa-solid fa-wine-glass' },
    { value: 'dishwasher', label: 'Afwasser', icon: 'fa-solid fa-soap' },
    { value: 'chef', label: 'Chef-kok', icon: 'fa-solid fa-user-chef' }, // Changed to user-chef
    { value: 'manager', label: 'Manager', icon: 'fa-solid fa-user-tie' },
    { value: 'host', label: 'Gastheer/Gastvrouw', icon: 'fa-solid fa-door-open' },
  ],
  fr: [
    { value: 'kitchen-staff', label: 'Personnel de cuisine', icon: 'fa-solid fa-utensils' },
    { value: 'waiter', label: 'Serveur/Serveuse', icon: 'fa-solid fa-bell-concierge' },
    { value: 'bartender', label: 'Barman/Barmaid', icon: 'fa-solid fa-solid fa-wine-glass' },
    { value: 'dishwasher', label: 'Plongeur/Plongeuse', icon: 'fa-solid fa-soap' },
    { value: 'chef', label: 'Chef de cuisine', icon: 'fa-solid fa-user-chef' }, // Changed to user-chef
    { value: 'manager', label: 'Manager', icon: 'fa-solid fa-user-tie' },
    { value: 'host', label: 'Hôte/Hôtesse', icon: 'fa-solid fa-door-open' },
  ],
};

// Main App Component
const App = () => {
  // State for the active navigation section
  const [activeSection, setActiveSection] = useState('planning'); // Set default to planning for easier testing
  // State for language (Dutch default)
  const [language, setLanguage] = useState('nl'); // 'nl' for Dutch, 'fr' for French
  // State for managing employees (mock data for now)
  const [employees, setEmployees] = useState([
    {
      id: 'emp-1',
      firstName: 'Jan',
      lastName: 'Peeters',
      dob: '1990-05-15',
      address: 'Kerkstraat 10',
      postalCode: '2000',
      city: 'Antwerpen',
      country: 'België',
      nationalRegisterNumber: '90051512345',
      phone: '+32470123456',
      email: 'jan.peeters@example.com',
      emergencyContact: { name: 'Annelies Jansen', relation: 'Vrouw', phone: '+32470654321' },
      contractType: 'full-time',
      contractStartDate: '2020-01-01',
      grossSalary: '2500',
      hourlyWage: '15',
      jobFunction: 'kitchen-staff',
    },
    {
      id: 'emp-2',
      firstName: 'Marie',
      lastName: 'Dubois',
      dob: '2001-11-20',
      address: 'Rue de la Gare 5',
      postalCode: '1000',
      city: 'Brussel',
      country: 'België',
      nationalRegisterNumber: '01112067890',
      phone: '+32480987654',
      email: 'marie.dubois@example.com',
      emergencyContact: { name: 'Pierre Dubois', relation: 'Vader', phone: '+32480123456' },
      contractType: 'student-job',
      contractStartDate: '2023-09-01',
      hourlyWage: '12',
      jobFunction: 'waiter',
    },
    {
      id: 'emp-3',
      firstName: 'Tom',
      lastName: 'Vermeulen',
      dob: '1995-03-25',
      address: 'Nijverheidslaan 1',
      postalCode: '9000',
      city: 'Gent',
      country: 'België',
      nationalRegisterNumber: '95032512345',
      phone: '+32499112233',
      email: 'tom.vermeulen@example.com',
      contractType: 'part-time',
      contractStartDate: '2022-06-01',
      hourlyWage: '14',
      jobFunction: 'bartender',
    },
    {
        id: 'emp-4',
        firstName: 'Sofie',
        lastName: 'De Clercq',
        dob: '1988-08-01',
        address: 'Grote Markt 1',
        postalCode: '8000',
        country: 'België',
        nationalRegisterNumber: '88080112345',
        phone: '+32475112233',
        email: 'sofie.de.clercq@example.com',
        emergencyContact: { name: 'Wim Verstraeten', relation: 'Partner', phone: '+32475998877' },
        contractType: 'full-time',
        contractStartDate: '2019-03-10',
        grossSalary: '3000',
        hourlyWage: '18',
        jobFunction: 'chef',
    },
    {
        id: 'emp-5',
        firstName: 'Jean-Luc',
        lastName: 'Dupont',
        dob: '1975-01-20',
        address: 'Avenue Louise 150',
        postalCode: '1050',
        city: 'Brussel',
        country: 'België',
        nationalRegisterNumber: '75012012345',
        phone: '+32497665544',
        email: 'jeanluc.dupont@example.com',
        emergencyContact: { name: 'Isabelle Dubois', relation: 'Épouse', phone: '+32497332211' },
        contractType: 'full-time',
        contractStartDate: '2015-07-01',
        grossSalary: '4000',
        hourlyWage: '25',
        jobFunction: 'manager',
    },
    {
        id: 'emp-6',
        firstName: 'Laura',
        lastName: 'Hermans',
        dob: '2003-09-10',
        address: 'Mechelsesteenweg 50',
        postalCode: '2800',
        city: 'Mechelen',
        country: 'België',
        nationalRegisterNumber: '03091012345',
        phone: '+32468776655',
        email: 'laura.hermans@example.com',
        emergencyContact: { name: 'Dirk Hermans', relation: 'Vader', phone: '+32468112233' },
        contractType: 'flexi-job',
        contractStartDate: '2024-02-15',
        hourlyWage: '13',
        jobFunction: 'waiter',
    },
  ]);

  // State for showing the employee form modal
  const [showEmployeeForm, setShowEmployeeForm] = useState(false);
  // State for the employee being edited (null for new employee)
  const [currentEmployee, setCurrentEmployee] = useState(null);

  // State for weekly shifts (mock data)
  const [weeklyShifts, setWeeklyShifts] = useState({
    'Monday': [
      { id: 'shift-1', employeeId: 'emp-1', startTime: '17:00', endTime: '22:00', jobFunction: 'kitchen-staff', day: 'Monday' },
      { id: 'shift-2', employeeId: 'emp-2', startTime: '18:00', endTime: '23:00', jobFunction: 'waiter', day: 'Monday' },
      { id: 'shift-12', employeeId: 'emp-5', startTime: '09:00', endTime: '17:00', jobFunction: 'manager', day: 'Monday' },
    ],
    'Tuesday': [
      { id: 'shift-3', employeeId: 'emp-1', startTime: '10:00', endTime: '14:00', jobFunction: 'kitchen-staff', day: 'Tuesday' },
      { id: 'shift-13', employeeId: 'emp-4', startTime: '14:00', endTime: '22:00', jobFunction: 'chef', day: 'Tuesday' },
    ],
    'Wednesday': [
      { id: 'shift-14', employeeId: 'emp-6', startTime: '16:00', endTime: '21:00', jobFunction: 'waiter', day: 'Wednesday' },
    ],
    'Thursday': [
      { id: 'shift-4', employeeId: 'emp-3', startTime: '19:00', endTime: '00:00', jobFunction: 'bartender', day: 'Thursday' },
      { id: 'shift-15', employeeId: 'emp-5', startTime: '10:00', endTime: '18:00', jobFunction: 'manager', day: 'Thursday' },
    ],
    'Friday': [
      { id: 'shift-5', employeeId: 'emp-1', startTime: '17:00', endTime: '23:00', jobFunction: 'kitchen-staff', day: 'Friday' },
      { id: 'shift-6', employeeId: 'emp-2', startTime: '16:00', endTime: '22:00', jobFunction: 'waiter', day: 'Friday' },
      { id: 'shift-7', employeeId: 'emp-3', startTime: '18:00', endTime: '01:00', jobFunction: 'bartender', day: 'Friday' },
      { id: 'shift-16', employeeId: 'emp-4', startTime: '12:00', endTime: '20:00', jobFunction: 'chef', day: 'Friday' },
    ],
    'Saturday': [
      { id: 'shift-8', employeeId: 'emp-1', startTime: '12:00', endTime: '20:00', jobFunction: 'kitchen-staff', day: 'Saturday' },
      { id: 'shift-9', employeeId: 'emp-2', startTime: '11:00', endTime: '19:00', jobFunction: 'waiter', day: 'Saturday' },
      { id: 'shift-10', employeeId: 'emp-3', startTime: '13:00', endTime: '21:00', jobFunction: 'bartender', day: 'Saturday' },
      { id: 'shift-17', employeeId: 'emp-4', startTime: '10:00', endTime: '18:00', jobFunction: 'chef', day: 'Saturday' },
      { id: 'shift-18', employeeId: 'emp-6', startTime: '17:00', endTime: '23:00', jobFunction: 'waiter', day: 'Saturday' },
    ],
    'Sunday': [
      { id: 'shift-11', employeeId: 'emp-1', startTime: '11:00', endTime: '18:00', jobFunction: 'kitchen-staff', day: 'Sunday' },
      { id: 'shift-19', employeeId: 'emp-5', startTime: '11:00', endTime: '19:00', jobFunction: 'manager', day: 'Sunday' },
    ],
  });

  // State for time registrations
  const [timeRegistrations, setTimeRegistrations] = useState([]);
  const [clockedInEmployees, setClockedInEmployees] = useState({}); // Stores { employeeId: { clockInTime: Date, currentRegistrationId: 'uuid' } }
  const [selectedEmployeeForTimeReg, setSelectedEmployeeForTimeReg] = useState(''); // For dropdown selection


  // State for custom logo and colors
  const [customLogoUrl, setCustomLogoUrl] = useState('logolight.png');
  const [customColors, setCustomColors] = useState({});

  // Define color palette (green-themed)
  const defaultColors = {
    primaryGreen: '#4CAF50', // A nice vibrant green
    darkGreen: '#388E3C',   // A darker shade for accents
    lightGreen: '#C8E6C9',  // A lighter shade for backgrounds
    accentGreen: '#8BC34A', // Another accent green
    textDark: '#333333',
    textLight: '#FFFFFF',
    backgroundLight: '#F5F5F5',
    cardBackground: '#FFFFFF',
    borderLight: '#E0E0E0',
    inputBorder: '#BDBDBD',
    inputFocusBorder: '#4CAF50',
    buttonHover: '#43A047',
    deleteButton: '#EF5350',
    deleteButtonHover: '#D32F2F',
    // Contract Type Colors
    contractTypeColors: {
      'full-time': '#E0F2F1', // Light Teal
      'part-time': '#E3F2FD', // Light Blue
      'flexi-job': '#FFF3E0', // Light Orange
      'student-job': '#FCE4EC', // Light Pink
      'extra': '#F3E5F5', // Light Purple
      'default': '#E8F5E9', // Fallback green
    },
    shiftBorder: '#A5D6A7',    // Green border for shifts
  };

  const colors = { ...defaultColors, ...customColors };


  // Define navigation items
  const navItems = {
    nl: [
      { id: 'dashboard', name: 'Dashboard Overzicht', icon: 'fa-solid fa-gauge-high' }, // Home icon
      { id: 'employees', name: 'Werknemersbeheer', icon: 'fa-solid fa-users' }, // Users icon
      { id: 'planning', name: 'Weekplanning', icon: 'fa-solid fa-calendar-week' }, // Calendar icon
      { id: 'timeregistration', name: 'Tijdregistratie', icon: 'fa-solid fa-clock' }, // QR Code (simplified to flash for now, to be replaced by actual QR code icon or generated later)
      { id: 'reports', name: 'Rapporten', icon: 'fa-solid fa-chart-column' }, // Chart icon
      { id: 'settings', name: 'Instellingen', icon: 'fa-solid fa-gear' } // Cog icon
    ],
    fr: [
      { id: 'dashboard', name: 'Aperçu du Tableau de Bord', icon: 'fa-solid fa-gauge-high' },
      { id: 'employees', name: 'Gestion des Employés', icon: 'fa-solid fa-users' },
      { id: 'planning', name: 'Planification Hebdomadaire', icon: 'fa-solid fa-calendar-week' },
      { id: 'timeregistration', name: 'Enregistrement du temps', icon: 'fa-solid fa-clock' },
      { id: 'reports', name: 'Rapports', icon: 'fa-solid fa-chart-column' },
      { id: 'settings', name: 'Paramètres', icon: 'fa-solid fa-gear' }
    ]
  };

  // Helper function to render SVG icons (used for Lucide icons or similar stroke-based icons)
  // Replaced by Font Awesome <i> tags where applicable
  const Icon = ({ d, className, onClick = () => {} }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" onClick={onClick}>
      <path strokeLinecap="round" strokeLinejoin="round" d={d} />
    </svg>
  );

  // State for side navigation collapse
  const [isNavCollapsed, setIsNavCollapsed] = useState(false);

  // Employee Form Component
  const EmployeeForm = ({ employee, onClose, onSave, language, colors }) => {
    // Robust initialization for formData and nested emergencyContact
    const initialFormData = {
      id: '',
      firstName: '',
      lastName: '',
      dob: '',
      address: '',
      postalCode: '',
      city: '',
      country: 'België',
      nationalRegisterNumber: '',
      phone: '',
      email: '',
      emergencyContact: { name: '', relation: '', phone: '' }, // Always initialized default
      contractType: '',
      contractStartDate: '',
      contractEndDate: '',
      grossSalary: '',
      hourlyWage: '',
      jobFunction: '',
    };

    const [formData, setFormData] = useState(() => {
      if (employee) {
        return {
          ...initialFormData, // Start with a complete default structure
          ...employee,        // Overlay with employee's top-level data
          // Explicitly ensure emergencyContact is an object, merging if employee.emergencyContact exists
          emergencyContact: {
            ...initialFormData.emergencyContact, // Ensures {name:'', relation:'', phone:''} defaults
            ...(employee.emergencyContact || {}) // Overrides with employee's data if available (handles null/undefined)
          }
        };
      }
      return initialFormData;
    });

    const handleChange = (e) => {
      const { name, value } = e.target;
      if (name.includes('.')) {
        // Handle nested properties like emergencyContact.name
        const [parent, child] = name.split('.');
        setFormData(prev => ({
          ...prev,
          [parent]: {
            ...prev[parent],
            [child]: value
          }
        }));
      } else {
        setFormData(prev => ({ ...prev, [name]: value }));
      }
    };

    const handleSubmit = (e) => {
      e.preventDefault();
      onSave(formData);
      onClose();
    };

    const handleDelete = () => {
      if (window.confirm(language === 'nl' ? 'Weet u zeker dat u deze werknemer wilt verwijderen?' : 'Êtes-vous sûr de vouloir supprimer cet employé ?')) {
        onSave(formData, true); // Pass true to indicate deletion
        onClose();
      }
    };

    // Close modal when clicking outside of the content area
    const handleOverlayClick = (e) => {
      if (e.target === e.currentTarget) {
        onClose();
      }
    };

    return (
      <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex justify-center items-center z-50" onClick={handleOverlayClick}>
        <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto custom-scrollbar" style={{ border: `1px solid ${colors.borderLight}` }}>
          <h2 className="text-xl font-bold mb-4" style={{ color: colors.darkGreen }}>
            {employee ? (language === 'nl' ? 'Werknemer Bewerken' : 'Modifier l\'Employé') : (language === 'nl' ? 'Nieuwe Werknemer Toevoegen' : 'Ajouter un Nouvel Employé')}
          </h2>
          <form onSubmit={handleSubmit}>
            {/* Personal Information */}
            <h3 className="text-lg font-semibold mb-3" style={{ color: colors.primaryGreen }}>{language === 'nl' ? 'Persoonlijke Gegevens' : 'Informations Personnelles'}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
              <div>
                <label htmlFor="firstName" className="block text-xs font-medium text-gray-700 mb-1">{language === 'nl' ? 'Voornaam' : 'Prénom'}</label>
                <input type="text" id="firstName" name="firstName" value={formData.firstName} onChange={handleChange} required
                       className="mt-1 block w-full rounded-md shadow-sm p-2 text-sm" style={{ border: `1px solid ${colors.inputBorder}`}} />
              </div>
              <div>
                <label htmlFor="lastName" className="block text-xs font-medium text-gray-700 mb-1">{language === 'nl' ? 'Achternaam' : 'Nom de Famille'}</label>
                <input type="text" id="lastName" name="lastName" value={formData.lastName} onChange={handleChange} required
                       className="mt-1 block w-full rounded-md shadow-sm p-2 text-sm" style={{ border: `1px solid ${colors.inputBorder}`}} />
              </div>
              <div>
                <label htmlFor="dob" className="block text-xs font-medium text-gray-700 mb-1">{language === 'nl' ? 'Geboortedatum' : 'Date de Naissance'}</label>
                <input type="date" id="dob" name="dob" value={formData.dob} onChange={handleChange} required
                       className="mt-1 block w-full rounded-md shadow-sm p-2 text-sm" style={{ border: `1px solid ${colors.inputBorder}`}} />
              </div>
              <div>
                <label htmlFor="nationalRegisterNumber" className="block text-xs font-medium text-gray-700 mb-1">{language === 'nl' ? 'Rijksregisternummer' : 'Numéro de Registre National'}</label>
                <input type="text" id="nationalRegisterNumber" name="nationalRegisterNumber" value={formData.nationalRegisterNumber} onChange={handleChange}
                       placeholder="JJMMDD-XXX-YY" maxLength="11"
                       className="mt-1 block w-full rounded-md shadow-sm p-2 text-sm" style={{ border: `1px solid ${colors.inputBorder}`}} />
              </div>
              <div className="md:col-span-2">
                <label htmlFor="address" className="block text-xs font-medium text-gray-700 mb-1">{language === 'nl' ? 'Adres' : 'Adresse'}</label>
                <input type="text" id="address" name="address" value={formData.address} onChange={handleChange}
                       className="mt-1 block w-full rounded-md shadow-sm p-2 text-sm" style={{ border: `1px solid ${colors.inputBorder}`}} />
              </div>
              <div>
                <label htmlFor="postalCode" className="block text-xs font-medium text-gray-700 mb-1">{language === 'nl' ? 'Postcode' : 'Code Postal'}</label>
                <input type="text" id="postalCode" name="postalCode" value={formData.postalCode} onChange={handleChange}
                       className="mt-1 block w-full rounded-md shadow-sm p-2 text-sm" style={{ border: `1px solid ${colors.inputBorder}`}} />
              </div>
              <div>
                <label htmlFor="city" className="block text-xs font-medium text-gray-700 mb-1">{language === 'nl' ? 'Stad' : 'Ville'}</label>
                <input type="text" id="city" name="city" value={formData.city} onChange={handleChange}
                       className="mt-1 block w-full rounded-md shadow-sm p-2 text-sm" style={{ border: `1px solid ${colors.inputBorder}`}} />
              </div>
              <div>
                <label htmlFor="country" className="block text-xs font-medium text-gray-700 mb-1">{language === 'nl' ? 'Land' : 'Pays'}</label>
                <input type="text" id="country" name="country" value={formData.country} onChange={handleChange} readOnly
                       className="mt-1 block w-full rounded-md bg-gray-100 shadow-sm p-2 text-sm" style={{ border: `1px solid ${colors.inputBorder}`}} />
              </div>
              <div>
                <label htmlFor="phone" className="block text-xs font-medium text-gray-700 mb-1">{language === 'nl' ? 'Telefoonnummer' : 'Numéro de Téléphone'}</label>
                <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange}
                       className="mt-1 block w-full rounded-md shadow-sm p-2 text-sm" style={{ border: `1px solid ${colors.inputBorder}`}} />
              </div>
              <div className="md:col-span-2">
                <label htmlFor="email" className="block text-xs font-medium text-gray-700 mb-1">{language === 'nl' ? 'E-mailadres' : 'Adresse E-mail'}</label>
                <input type="email" id="email" name="email" value={formData.email} onChange={handleChange}
                       className="mt-1 block w-full rounded-md shadow-sm p-2 text-sm" style={{ border: `1px solid ${colors.inputBorder}`}} />
              </div>
            </div>

            {/* Emergency Contact */}
            <h3 className="text-lg font-semibold mb-3" style={{ color: colors.primaryGreen }}>{language === 'nl' ? 'Noodcontact' : 'Contact d\'Urgence'}</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
              <div>
                <label htmlFor="emergencyContact.name" className="block text-xs font-medium text-gray-700 mb-1">{language === 'nl' ? 'Naam' : 'Nom'}</label>
                <input type="text" id="emergencyContact.name" name="emergencyContact.name" value={formData.emergencyContact.name} onChange={handleChange}
                       className="mt-1 block w-full rounded-md shadow-sm p-2 text-sm" style={{ border: `1px solid ${colors.inputBorder}`}} />
              </div>
              <div>
                <label htmlFor="emergencyContact.relation" className="block text-xs font-medium text-gray-700 mb-1">{language === 'nl' ? 'Relatie' : 'Relation'}</label>
                <input type="text" id="emergencyContact.relation" name="emergencyContact.relation" value={formData.emergencyContact.relation} onChange={handleChange}
                       className="mt-1 block w-full rounded-md shadow-sm p-2 text-sm" style={{ border: `1px solid ${colors.inputBorder}`}} />
              </div>
              <div>
                <label htmlFor="emergencyContact.phone" className="block text-xs font-medium text-gray-700 mb-1">{language === 'nl' ? 'Telefoonnummer' : 'Numéro de Téléphone'}</label>
                <input type="tel" id="emergencyContact.phone" name="emergencyContact.phone" value={formData.emergencyContact.phone} onChange={handleChange}
                       className="mt-1 block w-full rounded-md shadow-sm p-2 text-sm" style={{ border: `1px solid ${colors.inputBorder}`}} />
              </div>
            </div>

            {/* Contract Information */}
            <h3 className="text-lg font-semibold mb-3" style={{ color: colors.primaryGreen }}>{language === 'nl' ? 'Contract Informatie' : 'Informations sur le Contrat'}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
              <div>
                <label htmlFor="contractType" className="block text-xs font-medium text-gray-700 mb-1">{language === 'nl' ? 'Contract Type' : 'Type de Contrat'}</label>
                <select id="contractType" name="contractType" value={formData.contractType} onChange={handleChange} required
                        className="mt-1 block w-full rounded-md shadow-sm p-2 text-sm" style={{ border: `1px solid ${colors.inputBorder}`}}>
                  <option value="">{language === 'nl' ? 'Selecteer een type' : 'Sélectionner een type'}</option>
                  {contractTypes[language]?.map(type => (
                    <option key={type.value} value={type.value}>{type.label}</option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="contractStartDate" className="block text-xs font-medium text-gray-700 mb-1">{language === 'nl' ? 'Startdatum Contract' : 'Date de Début du Contrat'}</label>
                <input type="date" id="contractStartDate" name="contractStartDate" value={formData.contractStartDate} onChange={handleChange} required
                       className="mt-1 block w-full rounded-md shadow-sm p-2 text-sm" style={{ border: `1px solid ${colors.inputBorder}`}} />
              </div>
              {formData.contractType !== 'full-time' && ( // Only show end date if not full-time (or other specific types)
                <div>
                  <label htmlFor="contractEndDate" className="block text-xs font-medium text-gray-700 mb-1">{language === 'nl' ? 'Einddatum Contract (Optioneel)' : 'Date de Fin du Contrat (Optionnel)'}</label>
                  <input type="date" id="contractEndDate" name="contractEndDate" value={formData.contractEndDate} onChange={handleChange}
                         className="mt-1 block w-full rounded-md shadow-sm p-2 text-sm" style={{ border: `1px solid ${colors.inputBorder}`}} />
                </div>
              )}
              {formData.contractType !== 'student-job' && formData.contractType !== 'flexi-job' && ( // Show salary fields for non-student/flexi
                <div>
                  <label htmlFor="grossSalary" className="block text-xs font-medium text-gray-700 mb-1">{language === 'nl' ? 'Brutoloon (€)' : 'Salaire Brut (€)'}</label>
                  <input type="number" id="grossSalary" name="grossSalary" value={formData.grossSalary} onChange={handleChange}
                         className="mt-1 block w-full rounded-md shadow-sm p-2 text-sm" style={{ border: `1px solid ${colors.inputBorder}`}} />
                </div>
              )}
              <div>
                <label htmlFor="hourlyWage" className="block text-xs font-medium text-gray-700 mb-1">{language === 'nl' ? 'Uurloon (€)' : 'Salaire Horaire (€)'}</label>
                <input type="number" id="hourlyWage" name="hourlyWage" value={formData.hourlyWage} onChange={handleChange} required
                       className="mt-1 block w-full rounded-md shadow-sm p-2 text-sm" style={{ border: `1px solid ${colors.inputBorder}`}} />
              </div>
            </div>

            {/* Job Function */}
            <h3 className="text-lg font-semibold mb-3" style={{ color: colors.primaryGreen }}>{language === 'nl' ? 'Functie Informatie' : 'Informations sur la Fonction'}</h3>
            <div className="mb-4">
              <label htmlFor="jobFunction" className="block text-xs font-medium text-gray-700 mb-1">{language === 'nl' ? 'Functie (Paritair Comité 302)' : 'Fonction (Commission Paritaire 302)'}</label>
              <select id="jobFunction" name="jobFunction" value={formData.jobFunction} onChange={handleChange} required
                      className="mt-1 block w-full rounded-md shadow-sm p-2 text-sm" style={{ border: `1px solid ${colors.inputBorder}`}}>
                  <option value="">{language === 'nl' ? 'Selecteer een functie' : 'Sélectionner een functie'}</option>
                  {pc302JobFunctions[language]?.map(func => (
                    <option key={func.value} value={func.value}>{func.label}</option>
                  ))}
              </select>
            </div>

            {/* Legal Checkboxes (Placeholder) */}
            <h3 className="text-lg font-semibold mb-3" style={{ color: colors.primaryGreen }}>{language === 'nl' ? 'Wettelijke Vereisten' : 'Exigences Légales'}</h3>
            <div className="mb-4 space-y-2">
                <div className="flex items-center">
                    <input type="checkbox" id="privacyConsent" name="privacyConsent" className="mr-2" />
                    <label htmlFor="privacyConsent" className="text-sm text-gray-700">{language === 'nl' ? 'Ik ga akkoord met de privacyverklaring en databankvoorwaarden.' : 'J\'accepte la politique de confidentialité et les conditions de la base de données.'}</label>
                </div>
                <p className="text-xs text-gray-500">{language === 'nl' ? 'Links naar relevante Belgische wetgeving en CAO\'s.' : 'Liens vers la législation belge et les CCT pertinentes.'}</p>
            </div>


            {/* Action Buttons */}
            <div className="flex justify-end space-x-3 mt-4">
              {employee && (
                <button
                  type="button"
                  onClick={handleDelete}
                  className="px-4 py-2 rounded-lg text-white font-semibold shadow-md text-sm transition-colors duration-200 hover:brightness-90"
                  style={{ backgroundColor: colors.deleteButton }}
                >
                  {language === 'nl' ? 'Verwijderen' : 'Supprimer'}
                </button>
              )}
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-lg border text-gray-700 font-semibold shadow-sm text-sm transition-colors duration-200 hover:bg-gray-100"
                style={{ borderColor: colors.borderLight }}
              >
                {language === 'nl' ? 'Annuleren' : 'Annuler'}
              </button>
              <button
                type="submit"
                className="px-4 py-2 rounded-lg text-white font-semibold shadow-md text-sm transition-colors duration-200 hover:brightness-90"
                style={{ backgroundColor: colors.primaryGreen }}
              >
                {employee ? (language === 'nl' ? 'Opslaan' : 'Enregistrer') : (language === 'nl' ? 'Toevoegen' : 'Ajouter')}
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  // Shift Form Modal for adding/editing shifts
  const ShiftFormModal = ({ shift, onClose, onSave, employees, language, colors }) => {
    const [formData, setFormData] = useState(shift || {
      employeeId: '',
      startTime: '09:00',
      endTime: '17:00',
      jobFunction: '',
      day: '', // Will be passed when adding
    });

    // Determine initial job function if editing or based on selected employee
    useEffect(() => {
        if (!formData.jobFunction && formData.employeeId) {
            const selectedEmployee = employees.find(emp => emp.id === formData.employeeId);
            if (selectedEmployee) {
                setFormData(prev => ({ ...prev, jobFunction: selectedEmployee.jobFunction }));
            }
        }
    }, [formData.employeeId, formData.jobFunction, employees]);


    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData(prev => ({ ...prev, [name]: value }));
      // If employee changes, update job function
      if (name === 'employeeId') {
        const selectedEmployee = employees.find(emp => emp.id === value);
        if (selectedEmployee) {
          setFormData(prev => ({ ...prev, jobFunction: selectedEmployee.jobFunction }));
        }
      }
    };

    const handleSubmit = (e) => {
      e.preventDefault();
      onSave(formData);
      onClose();
    };

    const getEmployeeNameById = (id) => {
      const emp = employees.find(e => e.id === id);
      return emp ? `${emp.firstName} ${emp.lastName}` : (language === 'nl' ? 'Selecteer werknemer' : 'Sélectionner een employé');
    };

    const getJobFunctionLabelForModal = (jobFunctionValue) => {
      return pc302JobFunctions[language]?.find(f => f.value === jobFunctionValue)?.label || jobFunctionValue;
    }
    const getJobFunctionIconClass = (jobFunctionValue) => {
        return pc302JobFunctions[language]?.find(f => f.value === jobFunctionValue)?.icon || '';
    }

    // Close modal when clicking outside of the content area
    const handleOverlayClick = (e) => {
      if (e.target === e.currentTarget) {
        onClose();
      }
    };

    return (
      <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex justify-center items-center z-50" onClick={handleOverlayClick}>
        <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md" style={{ border: `1px solid ${colors.borderLight}` }}>
          <h2 className="text-xl font-bold mb-4" style={{ color: colors.darkGreen }}>
            {shift ? (language === 'nl' ? 'Dienst Bewerken' : 'Modifier le Service') : (language === 'nl' ? 'Nieuwe Dienst Toevoegen' : 'Ajouter een Nouveau Service')}
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="employeeId" className="block text-xs font-medium text-gray-700 mb-1">{language === 'nl' ? 'Werknemer' : 'Employé'}</label>
              <select
                id="employeeId"
                name="employeeId"
                value={formData.employeeId}
                onChange={handleChange}
                required
                className="mt-1 block w-full rounded-md shadow-sm p-2 text-sm"
                style={{ border: `1px solid ${colors.inputBorder}` }}
              >
                <option value="">{language === 'nl' ? 'Selecteer een werknemer' : 'Sélectionner een employé'}</option>
                {employees.map(emp => (
                  <option key={emp.id} value={emp.id}>{getEmployeeNameById(emp.id)}</option>
                ))}
              </select>
            </div>
            <div className="grid grid-cols-2 gap-3 mb-3">
              <div>
                <label htmlFor="startTime" className="block text-xs font-medium text-gray-700 mb-1">{language === 'nl' ? 'Starttijd' : 'Heure de Début'}</label>
                <input
                  type="time"
                  id="startTime"
                  name="startTime"
                  value={formData.startTime}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full rounded-md shadow-sm p-2 text-sm"
                  style={{ border: `1px solid ${colors.inputBorder}` }}
                />
              </div>
              <div>
                <label htmlFor="endTime" className="block text-xs font-medium text-gray-700 mb-1">{language === 'nl' ? 'Eindtijd' : 'Heure de Fin'}</label>
                <input
                  type="time"
                  id="endTime"
                  name="endTime"
                  value={formData.endTime}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full rounded-md shadow-sm p-2 text-sm"
                  style={{ border: `1px solid ${colors.inputBorder}` }}
                />
              </div>
            </div>
            <div className="mb-4">
                <label htmlFor="jobFunction" className="block text-xs font-medium text-gray-700 mb-1">{language === 'nl' ? 'Functie' : 'Fonction'}</label>
                <div className="flex items-center mt-1 w-full rounded-md bg-gray-100 shadow-sm p-2 text-sm" style={{ border: `1px solid ${colors.inputBorder}` }}>
                    {getJobFunctionIconClass(formData.jobFunction) && (
                        <i className={`${getJobFunctionIconClass(formData.jobFunction)} text-gray-600 mr-2`}></i>
                    )}
                    <input
                        type="text"
                        id="jobFunction"
                        name="jobFunction"
                        value={getJobFunctionLabelForModal(formData.jobFunction)}
                        readOnly
                        className="bg-transparent w-full outline-none"
                    />
                </div>
            </div>
            <div className="flex justify-end space-x-3 mt-4">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-lg border text-gray-700 font-semibold shadow-sm text-sm transition-colors duration-200 hover:bg-gray-100"
                style={{ border: `1px solid ${colors.borderLight}` }}
              >
                {language === 'nl' ? 'Annuleren' : 'Annuler'}
              </button>
              <button
                type="submit"
                className="px-4 py-2 rounded-lg text-white font-semibold shadow-md text-sm transition-colors duration-200 hover:brightness-90"
                style={{ backgroundColor: colors.primaryGreen }}
              >
                {shift ? (language === 'nl' ? 'Dienst Opslaan' : 'Enregistrer le Service') : (language === 'nl' ? 'Dienst Toevoegen' : 'Ajouter le Service')}
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };


  // Handle saving/deleting employees
  const handleSaveEmployee = (employeeData, isDelete = false) => {
    if (isDelete) {
      setEmployees(prev => prev.filter(emp => emp.id !== employeeData.id));
      // Also remove any shifts associated with the deleted employee
      setWeeklyShifts(prevShifts => {
        const newShifts = { ...prevShifts };
        for (const day in newShifts) {
          newShifts[day] = newShifts[day].filter(shift => shift.employeeId !== employeeData.id);
        }
        return newShifts;
      });
    } else if (employeeData.id) {
      // Edit existing employee
      setEmployees(prev => prev.map(emp => emp.id === employeeData.id ? employeeData : emp));
    } else {
      // Add new employee
      const newId = `emp-${Date.now()}`; // Simple unique ID
      setEmployees(prev => [...prev, { ...employeeData, id: newId }]);
    }
    setShowEmployeeForm(false);
    setCurrentEmployee(null);
  };

  // Helper to get employee full name by ID
  const getEmployeeData = (id) => {
    return employees.find(emp => emp.id === id);
  };

  const getEmployeeName = (id) => {
    const employee = getEmployeeData(id);
    return employee ? `${employee.firstName} ${employee.lastName}` : 'Onbekend';
  };

  const getJobFunctionLabel = (jobFunctionValue) => {
    return pc302JobFunctions[language]?.find(f => f.value === jobFunctionValue)?.label || jobFunctionValue;
  }
  const getJobFunctionIconClass = (jobFunctionValue) => {
    return pc302JobFunctions[language]?.find(f => f.value === jobFunctionValue)?.icon || '';
  }

  // Helper to convert time string "HH:MM" to total minutes from 00:00
  const timeToMinutes = (time) => {
    const [hours, minutes] = time.split(':').map(Number);
    return hours * 60 + minutes;
  };

  // Helper to convert total minutes to time string "HH:MM"
  const minutesToTime = (totalMinutes) => {
    // Handle cases where totalMinutes might be negative or exceed 24 hours
    totalMinutes = totalMinutes % (24 * 60);
    if (totalMinutes < 0) totalMinutes += (24 * 60); // Normalize negative to positive equivalent within 24h cycle

    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return `${hours < 10 ? '0' + hours : hours}:${minutes < 10 ? '0' + minutes : minutes}`;
  };

  // Helper functions for time formatting (Moved to top-level scope)
  const formatTime = (isoString) => {
    if (!isoString) return '-';
    const date = new Date(isoString);
    return date.toLocaleTimeString(language === 'nl' ? 'nl-BE' : 'fr-BE', { hour: '2-digit', minute: '2-digit' });
  };

  const formatDate = (isoString) => {
    if (!isoString) return '-';
    const date = new Date(isoString);
    return date.toLocaleDateString(language === 'nl' ? 'nl-BE' : 'fr-BE');
  };

  const formatDuration = (minutes) => {
      if (minutes === null) return '-';
      const hours = Math.floor(minutes / 60);
      const remainingMinutes = minutes % 60;
      return `${hours}${language === 'nl' ? 'u' : 'h'} ${remainingMinutes}${language === 'nl' ? 'm' : 'm'}`;
  };


  // Week planning component with Drag and Drop (using native HTML D&D) and Resizable Shifts
  const WeekPlanner = ({ employees, weeklyShifts, setWeeklyShifts, language, colors, getEmployeeName, getJobFunctionLabel, getEmployeeData }) => {
    const daysOfWeek = {
      nl: ['Maandag', 'Dinsdag', 'Woensdag', 'Donderdag', 'Vrijdag', 'Zaterdag', 'Zondag'],
      fr: ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'],
    };
    const hours = Array.from({ length: 24 }, (_, i) => `${i < 10 ? '0' + i : i}:00`); // 00:00 to 23:00

    const dayRowRefs = useRef({}); // Refs for each day row for accurate drop/resize calculations
    const resizingShiftRef = useRef(null); // { shiftId, day, type: 'start' | 'end', startX, initialOffset, originalShiftData }

    const [draggingShiftId, setDraggingShiftId] = useState(null); // State to track the currently dragged shift
    const [copiedShift, setCopiedShift] = useState(null); // State to store copied shift data

    const [showShiftModal, setShowShiftModal] = useState(false);
    const [currentShiftToEdit, setCurrentShiftToEdit] = useState(null);
    const [modalTargetDay, setModalTargetDay] = useState(null);

    // State for current week's starting date (Monday)
    const [currentWeekStartDate, setCurrentWeekStartDate] = useState(new Date('2025-06-16T00:00:00')); // Default to Monday, June 16, 2025

    const cellWidthPerHour = 80; // Increased width for better visibility of horizontal shifts

    // Helper to get all dates for the current week based on currentWeekStartDate (always Monday)
    const getDatesForWeek = useCallback((startDate) => {
      const dates = [];
      let current = new Date(startDate);
      for (let i = 0; i < 7; i++) {
        dates.push(new Date(current));
        current.setDate(current.getDate() + 1);
      }
      return dates;
    }, []);

    const weekDates = getDatesForWeek(currentWeekStartDate);

    // Function to navigate weeks
    const goToPreviousWeek = () => {
        const newDate = new Date(currentWeekStartDate);
        newDate.setDate(newDate.getDate() - 7);
        setCurrentWeekStartDate(newDate);
    };

    const goToNextWeek = () => {
        const newDate = new Date(currentWeekStartDate);
        newDate.setDate(newDate.getDate() + 7);
        setCurrentWeekStartDate(newDate);
    };


    const handleDragStart = (e, employeeId = null, shift = null) => {
      // Prevent drag if already resizing
      if (resizingShiftRef.current) {
        e.preventDefault();
        return;
      }

      if (employeeId) {
        e.dataTransfer.setData('type', 'employee');
        e.dataTransfer.setData('employeeId', employeeId);
      } else if (shift) {
        e.dataTransfer.setData('type', 'shift');
        e.dataTransfer.setData('shiftId', shift.id);
        e.dataTransfer.setData('originalDay', shift.day);
        setDraggingShiftId(shift.id); // Mark this shift as being dragged
      }
      e.dataTransfer.effectAllowed = "move";
      e.stopPropagation(); // Stop propagation to prevent parent draggable containers from interfering
    };

    const handleDragEnd = () => {
      setDraggingShiftId(null); // Clear dragging state
    };

    const handleDragOver = (e) => {
      e.preventDefault(); // Essential to allow dropping
      e.currentTarget.classList.add('bg-opacity-20'); // Visual feedback for droppable area
      e.dataTransfer.dropEffect = "move"; // Indicate that a move is allowed
    };

    const handleDragLeave = (e) => {
      e.currentTarget.classList.remove('bg-opacity-20');
    };

    const handleDrop = (e, targetDay) => {
      e.preventDefault();
      e.currentTarget.classList.remove('bg-opacity-20');

      if (resizingShiftRef.current) {
        return; // Do not process drop if currently resizing a shift
      }

      const type = e.dataTransfer.getData('type');
      const dayRowElement = dayRowRefs.current[targetDay];
      const hourSlotsContainer = dayRowElement ? dayRowElement.querySelector('.hour-slots-container') : null;

      if (!hourSlotsContainer) {
          console.error(`Could not find .hour-slots-container for day: ${targetDay}`);
          return;
      }

      const dayRowRect = hourSlotsContainer.getBoundingClientRect();
      // Calculate the minute based on the X position of the drop within the hour slots container
      const dropX = e.clientX - dayRowRect.left;
      const minutesPerPixel = 60 / cellWidthPerHour;
      let droppedMinutes = Math.round((dropX * minutesPerPixel) / 15) * 15; // Snap to nearest 15 mins

      // Ensure droppedMinutes is within 00:00 to 23:45 range
      droppedMinutes = Math.max(0, Math.min(droppedMinutes, (23 * 60) + 45));


      if (type === 'employee') {
        const employeeId = e.dataTransfer.getData('employeeId');
        const draggedEmployee = employees.find(emp => emp.id === employeeId);

        if (draggedEmployee) {
          const newShift = {
            id: `shift-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`, // More unique ID
            employeeId: draggedEmployee.id,
            startTime: minutesToTime(droppedMinutes),
            endTime: minutesToTime(droppedMinutes + 120), // Default 2-hour shift
            jobFunction: draggedEmployee.jobFunction,
            day: targetDay,
          };

          setWeeklyShifts(prev => ({
            ...prev,
            [targetDay]: [...(prev[targetDay] || []), newShift].sort((a, b) => timeToMinutes(a.startTime) - timeToMinutes(b.startTime)),
          }));
        }
      } else if (type === 'shift') {
        const shiftId = e.dataTransfer.getData('shiftId');
        const originalDay = e.dataTransfer.getData('originalDay');
        let movedShift = null;

        setWeeklyShifts(prev => {
          const newPrev = { ...prev };
          // Find and remove the shift from its original day
          if (newPrev[originalDay]) { // Defensive check
            newPrev[originalDay] = newPrev[originalDay].filter(shift => {
              if (shift.id === shiftId) {
                movedShift = { ...shift }; // Capture the shift data
                return false; // Filter it out
              }
              return true;
            });
          }


          // Add the shift to the new day with updated times if it was found
          if (movedShift) {
            const originalDurationMinutes = timeToMinutes(movedShift.endTime) - timeToMinutes(movedShift.startTime);
            const normalizedOriginalDuration = originalDurationMinutes < 0 ? originalDurationMinutes + (24 * 60) : originalDurationMinutes;

            let newEndTimeMinutes = droppedMinutes + normalizedOriginalDuration;

            const updatedShift = {
              ...movedShift,
              day: targetDay, // Update to new day
              startTime: minutesToTime(droppedMinutes),
              endTime: minutesToTime(newEndTimeMinutes),
            };

            // Ensure target day array exists
            newPrev[targetDay] = [...(newPrev[targetDay] || []), updatedShift].sort((a, b) => timeToMinutes(a.startTime) - timeToMinutes(b.startTime));
          }
          return newPrev;
        });
      }
      setDraggingShiftId(null); // Clear dragging state immediately after state update for drop
    };

    // Resizing logic for shifts (now horizontal)
    const handleSliderMouseDown = useCallback((e, shiftId, day, type) => {
        e.stopPropagation(); // Prevent drag of the entire card or calendar cell
        const targetShift = weeklyShifts[day]?.find(s => s.id === shiftId); // Optional chaining
        if (!targetShift) return;

        resizingShiftRef.current = {
            shiftId,
            day,
            type,
            initialClientX: e.clientX,
            initialShift: { ...targetShift } // Store original shift data
        };

        // Add listeners to document to capture movements outside the component
        document.addEventListener('mousemove', handleSliderMouseMove);
        document.addEventListener('mouseup', handleSliderMouseUp);
    }, [weeklyShifts]);

    const handleSliderMouseMove = useCallback((e) => {
        if (!resizingShiftRef.current) return;

        const { shiftId, day, type, initialClientX, initialShift } = resizingShiftRef.current;
        const deltaX = e.clientX - initialClientX; // Change in X from initial mouse down

        // Pixels to minutes conversion (cellWidthPerHour is 80px/hour = 1.33px/min)
        const minutesPerPixel = 60 / cellWidthPerHour;
        const deltaMinutes = Math.round(deltaX * minutesPerPixel / 15) * 15; // Snap to 15-minute intervals

        setWeeklyShifts(prev => {
            const newWeeklyShifts = { ...prev };
            // Defensive check for newWeeklyShifts[day]
            if (newWeeklyShifts[day]) {
                newWeeklyShifts[day] = newWeeklyShifts[day].map(shift => {
                    if (shift.id === shiftId) {
                        let newStartTimeMinutes = timeToMinutes(initialShift.startTime);
                        let newEndTimeMinutes = timeToMinutes(initialShift.endTime);

                        if (type === 'start') {
                            newStartTimeMinutes = newStartTimeMinutes + deltaMinutes;
                            newStartTimeMinutes = Math.max(0, newStartTimeMinutes);
                            newStartTimeMinutes = Math.min(newStartTimeMinutes, newEndTimeMinutes - 15);
                        } else { // type === 'end'
                            newEndTimeMinutes = newEndTimeMinutes + deltaMinutes;
                            newEndTimeMinutes = Math.max(newStartTimeMinutes + 15, newEndTimeMinutes);
                            newEndTimeMinutes = Math.min(newEndTimeMinutes, 24 * 60 + (24 * 60)); // Allow past 24h for duration
                        }
                        return {
                            ...shift,
                            startTime: minutesToTime(newStartTimeMinutes),
                            endTime: minutesToTime(newEndTimeMinutes),
                        };
                    }
                    return shift;
                });
            }
            return newWeeklyShifts;
        });
    }, [cellWidthPerHour]);

    const handleSliderMouseUp = useCallback(() => {
        resizingShiftRef.current = null; // Clear the resizing state
        document.removeEventListener('mousemove', handleSliderMouseMove);
        document.removeEventListener('mouseup', handleSliderMouseUp);
    }, []);


    // Calculate position and width of shifts and handle overlaps
    const calculateShiftLayout = (shiftsForDay) => {
        try {
            // Ensure shiftsForDay is always an array, even if null/undefined is passed.
            const effectiveShiftsForDay = Array.isArray(shiftsForDay) ? shiftsForDay : [];

            if (effectiveShiftsForDay.length === 0) {
                return { shifts: [], totalHeight: 0 };
            }

            // Sort shifts by start time, then by end time for consistent overlap handling
            const sortedShifts = [...effectiveShiftsForDay].sort((a, b) => {
                const startA = timeToMinutes(a.startTime);
                const startB = timeToMinutes(b.startTime);
                if (startA !== startB) return startA - startB;
                return timeToMinutes(a.endTime) - timeToMinutes(b.endTime);
            });

            const rows = []; // Represents visual rows (tracks) for shifts within a day

            sortedShifts.forEach(shift => {
                const shiftStart = timeToMinutes(shift.startTime);
                let shiftEnd = timeToMinutes(shift.endTime);
                if (shiftEnd < shiftStart) shiftEnd += 24 * 60; // Normalize for duration calculation

                let placed = false;
                // Try to place the shift in an existing row
                for (let i = 0; i < rows.length; i++) {
                    const row = rows[i];
                    // Check if this shift overlaps with any shift already in this row
                    const overlaps = row.some(placedShift => {
                        const placedStart = timeToMinutes(placedShift.startTime);
                        let placedEnd = timeToMinutes(placedShift.endTime);
                        if (placedEnd < placedStart) placedEnd += 24 * 60;

                        // Overlap if (startA < endB AND endA > startB)
                        return (shiftStart < placedEnd && shiftEnd > placedStart);
                    });

                    if (!overlaps) {
                        // No overlap, place it in this row
                        row.push(shift);
                        shift._row = i; // Store row index on the shift object
                        placed = true;
                        break;
                    }
                }

                if (!placed) {
                    // No existing row found, create a new row for this shift
                    rows.push([shift]);
                    shift._row = rows.length - 1;
                }
            });

            // Now, calculate height and top for each shift based on its assigned row and total rows
            const maxRows = rows.length > 0 ? rows.length : 1; // Ensure at least 1 for division
            const shiftHeight = 40; // Fixed height for each shift
            const rowSpacing = 5; // Spacing between rows

            const shiftsWithLayout = sortedShifts.map(shift => {
                const employee = getEmployeeData(shift.employeeId);
                const backgroundColor = colors.contractTypeColors[employee?.contractType] || colors.contractTypeColors.default;

                const startMinutes = timeToMinutes(shift.startTime);
                let endMinutes = timeToMinutes(shift.endTime);
                if (endMinutes < startMinutes) endMinutes += 24 * 60;

                const leftPx = (startMinutes / 60) * cellWidthPerHour;
                const widthPx = ((endMinutes - startMinutes) / 60) * cellWidthPerHour;

                // Calculate top based on assigned row
                const topPx = (shift._row * (shiftHeight + rowSpacing)); // Use fixed height + spacing

                return {
                    ...shift,
                    style: {
                        top: `${topPx}px`,
                        left: `${leftPx}px`,
                        width: `${widthPx}px`,
                        height: `${shiftHeight}px`,
                        position: 'absolute',
                        backgroundColor: backgroundColor,
                        border: `1px solid ${colors.shiftBorder}`,
                        opacity: draggingShiftId === shift.id ? '0' : '1', // Hide if being dragged using opacity
                        zIndex: resizingShiftRef.current?.shiftId === shift.id ? 30 : 20, // Bring resizing shift to front
                    }
                };
            });

            return { shifts: shiftsWithLayout, totalHeight: maxRows * (shiftHeight + rowSpacing) };

        } catch (error) {
            console.error("Error in calculateShiftLayout:", error);
            // Fallback in case of any internal error that might prevent a valid return
            return { shifts: [], totalHeight: 0 };
        }
    };

    // Handle shift deletion
    const handleDeleteShift = (day, shiftId) => {
        setWeeklyShifts(prev => {
            const newShifts = { ...prev };
            // Defensive check for newShifts[day]
            if (newShifts[day]) {
                newShifts[day] = newShifts[day].filter(shift => shift.id !== shiftId);
            }
            return newShifts;
        });
    };

    // Handle shift copying
    const handleCopyShift = (shift) => {
        setCopiedShift({
            employeeId: shift.employeeId,
            startTime: shift.startTime,
            endTime: shift.endTime,
            jobFunction: shift.jobFunction,
        });
    };

    // Handle manual add/edit shift
    const handleOpenShiftModalForAdd = (day) => {
        setModalTargetDay(day);
        setCurrentShiftToEdit(null); // Clear any existing shift data
        setShowShiftModal(true);
    };

    const handleOpenShiftModalForEdit = (shift) => {
        setCurrentShiftToEdit(shift);
        setModalTargetDay(shift.day); // Set the day for the modal context
        setShowShiftModal(true);
    };

    const handleSaveShiftModal = (updatedShiftData) => {
        setWeeklyShifts(prev => {
            const newShifts = { ...prev };
            if (currentShiftToEdit) {
                // Editing an existing shift
                if (newShifts[modalTargetDay]) { // Defensive check
                    newShifts[modalTargetDay] = newShifts[modalTargetDay].map(shift =>
                        shift.id === currentShiftToEdit.id ? { ...shift, ...updatedShiftData } : shift
                    );
                }
            } else {
                // Adding a new shift
                const newShift = {
                    id: `shift-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
                    day: modalTargetDay,
                    ...updatedShiftData,
                };
                newShifts[modalTargetDay] = [...(newShifts[modalTargetDay] || []), newShift];
            }
            // Re-sort shifts for the day after save
            if (newShifts[modalTargetDay]) { // Defensive check
                newShifts[modalTargetDay] = newShifts[modalTargetDay].sort((a, b) => timeToMinutes(a.startTime) - timeToMinutes(b.startTime));
            }
            return newShifts;
        });
        setShowShiftModal(false);
        setCurrentShiftToEdit(null);
        setModalTargetDay(null);
    };

    const handleApplyCopiedShift = (day) => {
        if (copiedShift) {
            const newShift = {
                id: `shift-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
                day: day,
                employeeId: copiedShift.employeeId,
                startTime: copiedShift.startTime,
                endTime: copiedShift.endTime,
                jobFunction: copiedShift.jobFunction,
            };
            setWeeklyShifts(prev => ({
                ...prev,
                [day]: [...(prev[day] || []), newShift].sort((a, b) => timeToMinutes(a.startTime) - timeToMinutes(b.startTime)),
            }));
            // Copied shift remains active here, no setCopiedShift(null)
        }
    };

    // Format week start and end dates for display in header
    const formatWeekRange = (startDate) => {
        const start = new Date(startDate);
        const end = new Date(startDate);
        end.setDate(end.getDate() + 6); // Add 6 days to get to Sunday

        const startDay = start.toLocaleDateString(language === 'nl' ? 'nl-BE' : 'fr-BE', { day: 'numeric', month: 'long' });
        const endDay = end.toLocaleDateString(language === 'nl' ? 'nl-BE' : 'fr-BE', { day: 'numeric', month: 'long', year: 'numeric' });

        if (language === 'nl') {
            return `Week van ${startDay} - ${endDay}`;
        } else {
            return `Semaine du ${startDay} - ${endDay}`;
        }
    };


    return (
      <div className="flex flex-col h-full">
        {/* Navigation for weeks */}
        <div className="flex justify-between items-center mb-3 p-3 rounded-lg shadow-md" style={{ backgroundColor: colors.cardBackground }}>
          <button
            onClick={goToPreviousWeek}
            className="px-3 py-1.5 rounded-lg text-white text-sm font-semibold hover:brightness-90 flex items-center" style={{ backgroundColor: colors.primaryGreen }}>
            <i className="fa-solid fa-chevron-left mr-2 text-xs"></i>
            {language === 'nl' ? 'Vorige Week' : 'Semaine Précédente'}
          </button>
          <h3 className="text-lg font-semibold" style={{ color: colors.darkGreen }}>
            {formatWeekRange(currentWeekStartDate)}
          </h3>
          <button
            onClick={goToNextWeek}
            className="px-3 py-1.5 rounded-lg text-white text-sm font-semibold hover:brightness-90 flex items-center" style={{ backgroundColor: colors.primaryGreen }}>
            {language === 'nl' ? 'Volgende Week' : 'Semaine Suivante'}
            <i className="fa-solid fa-chevron-right ml-2 text-xs"></i>
          </button>
        </div>

        {/* Main Planner Grid and Available Employees */}
        <div className="flex flex-1 overflow-hidden">
            {/* Available Employees for Drag-and-Drop (Left Panel) */}
            <div className="w-64 flex-shrink-0 p-4 rounded-lg shadow-md mr-4 overflow-y-auto" style={{ backgroundColor: colors.cardBackground, border: `1px solid ${colors.borderLight}` }}>
                <h3 className="text-lg font-semibold mb-3 sticky top-0 bg-white p-2 z-10" style={{ color: colors.darkGreen, backgroundColor: colors.cardBackground }}>
                    {language === 'nl' ? 'Beschikbare Werknemers' : 'Employés Disponibles'}
                    {copiedShift && (
                        <span className="text-xs font-normal text-gray-500 ml-2">
                            ({language === 'nl' ? 'Gekopieerd:' : 'Copié:'} {getEmployeeName(copiedShift.employeeId)} {copiedShift.startTime}-{copiedShift.endTime})
                        </span>
                    )}
                </h3>
                <div className="flex flex-col gap-2">
                    {employees.map((emp) => (
                    <div
                        key={emp.id}
                        draggable // Make the employee card draggable
                        onDragStart={(e) => handleDragStart(e, emp.id, null)} // Pass employee ID
                        className="p-2 border rounded-md text-sm cursor-grab shadow-sm flex items-center"
                        style={{
                            borderColor: colors.borderLight,
                            backgroundColor: colors.contractTypeColors[emp.contractType] || colors.contractTypeColors.default,
                            color: colors.textDark, // Ensure text is readable on colored background
                            fontWeight: '600'
                        }}
                    >
                        {getJobFunctionIconClass(emp.jobFunction) && (
                            <i className={`${getJobFunctionIconClass(emp.jobFunction)} text-gray-600 text-xs mr-2`}></i>
                        )}
                        {emp.firstName} {emp.lastName}
                    </div>
                    ))}
                </div>
            </div>

            {/* Calendar Grid - Inverted Rows and Columns */}
            <div className="flex-1 flex flex-col overflow-auto rounded-lg shadow-md" style={{ border: `1px solid ${colors.borderLight}` }}>
                {/* Hours Header Row */}
                <div className="flex flex-row sticky top-0 z-20" style={{ backgroundColor: colors.cardBackground, borderBottom: `1px solid ${colors.borderLight}` }}>
                    <div className="w-20 flex-shrink-0 p-2 font-semibold text-center text-sm" style={{ color: colors.darkGreen }}></div> {/* Empty corner cell */}
                    <div className="flex-1 flex overflow-x-auto"> {/* Scrollable hours */}
                        {hours.map((hour) => (
                            <div key={hour} className="flex-none p-2 text-xs text-gray-600 text-center flex items-center justify-center"
                                style={{ width: `${cellWidthPerHour}px`, borderLeft: `1px dashed ${colors.borderLight}` }}>{hour}</div>
                        ))}
                    </div>
                </div>

                {/* Day Rows */}
                <div className="flex-1 flex flex-col overflow-y-auto">
                    {daysOfWeek[language]?.map((dayName, dayIndex) => { // Optional chaining for daysOfWeek[language]
                        // Ensure weeklyShifts[dayName] is an array before passing to calculateShiftLayout
                        const shiftsForCurrentDay = weeklyShifts[dayName] || [];
                        const { shifts, totalHeight } = calculateShiftLayout(shiftsForCurrentDay);
                        const minDayHeight = Math.max(80, totalHeight + 10); // Minimum height for day row, adjusted

                        const currentDayDate = weekDates[dayIndex];
                        const formattedDate = currentDayDate.toLocaleDateString(language === 'nl' ? 'nl-BE' : 'fr-BE', { day: '2-digit', month: '2-digit' });

                        return (
                            <div
                                key={dayName}
                                ref={(el) => (dayRowRefs.current[dayName] = el)} // Assign ref to the day row
                                className={`flex flex-row relative ${copiedShift ? 'cursor-copy hover:bg-gray-100' : ''}`}
                                style={{
                                    borderBottom: dayIndex < daysOfWeek[language].length - 1 ? `1px solid ${colors.borderLight}` : 'none',
                                    minHeight: `${minDayHeight}px`
                                }}
                                onDragOver={handleDragOver}
                                onDragLeave={handleDragLeave}
                                onClick={(e) => { // This onClick is for manual add/paste copied
                                    if (e.target.closest('.shift-card') || e.target.closest('.w-20.flex-shrink-0')) {
                                        return; // Don't trigger if clicked on a shift card or day header
                                    }
                                    if (copiedShift) {
                                        handleApplyCopiedShift(dayName);
                                    } else {
                                        handleOpenShiftModalForAdd(dayName);
                                    }
                                }}
                                onDrop={(e) => handleDrop(e, dayName)}
                            >
                                {/* Day Header Cell */}
                                <div className="w-20 flex-shrink-0 p-2 font-semibold text-center sticky left-0 z-10 flex flex-col items-center justify-center"
                                     style={{ color: colors.darkGreen, backgroundColor: colors.cardBackground, borderRight: `1px solid ${colors.borderLight}` }}>
                                    <span className="text-xs">{dayName}</span>
                                    <span className="text-xs font-normal text-gray-500">{formattedDate}</span>
                                </div>

                                {/* Hour Slots Container for Shifts */}
                                <div className="flex-1 relative flex-grow overflow-x-auto hour-slots-container" style={{ minWidth: `${24 * cellWidthPerHour}px` }}> {/* Full 24-hour width */}
                                    {/* Hourly grid lines */}
                                    {hours.map((hour, index) => (
                                        <div
                                            key={`line-${dayName}-${hour}`}
                                            className="absolute top-0 h-full"
                                            style={{
                                                left: `${index * cellWidthPerHour}px`,
                                                width: `${cellWidthPerHour}px`,
                                                borderLeft: `1px dashed ${colors.borderLight}`,
                                                pointerEvents: 'none',
                                            }}
                                        ></div>
                                    ))}

                                    {/* Shifts within this day row */}
                                    {/* Added defensive check for shifts being an array, although calculateShiftLayout should ensure this */}
                                    {Array.isArray(shifts) && shifts.map((shift) => (
                                        <div
                                            key={shift.id}
                                            draggable
                                            onDragStart={(e) => handleDragStart(e, null, shift)}
                                            onDragEnd={handleDragEnd}
                                            className="shift-card px-2 py-1 rounded-md shadow-sm overflow-hidden text-xs cursor-grab flex flex-col justify-between hover:opacity-80 transition-opacity duration-100"
                                            style={shift.style}
                                            onClick={(e) => { e.stopPropagation(); handleOpenShiftModalForEdit(shift); }}
                                        >
                                            {/* Left slider handle */}
                                            <div
                                                className="absolute top-0 left-0 h-full w-2 cursor-ew-resize z-20"
                                                style={{ background: 'rgba(0,0,0,0.1)' }}
                                                onMouseDown={(e) => handleSliderMouseDown(e, shift.id, dayName, 'start')}
                                            ></div>
                                            <div className="flex justify-between items-center w-full">
                                                <p className="font-semibold truncate flex items-center">
                                                    {getJobFunctionIconClass(shift.jobFunction) && (
                                                        <i className={`${getJobFunctionIconClass(shift.jobFunction)} text-gray-600 text-xs mr-2`}></i>
                                                    )}
                                                    {getEmployeeName(shift.employeeId)}
                                                </p>
                                                <div className="flex space-x-1">
                                                    {/* Copy Button */}
                                                    <button
                                                        onClick={(e) => { e.stopPropagation(); handleCopyShift(shift); }}
                                                        className="p-1 rounded-full hover:bg-gray-200 text-gray-500 hover:text-blue-700"
                                                        title={language === 'nl' ? 'Kopiëren' : 'Copier'}
                                                    >
                                                        <i className="fa-solid fa-copy text-xs"></i>
                                                    </button>
                                                    {/* Delete Button */}
                                                    <button
                                                        onClick={(e) => { e.stopPropagation(); handleDeleteShift(dayName, shift.id); }}
                                                        className="p-1 rounded-full hover:bg-gray-200 text-gray-500 hover:text-red-700"
                                                        title={language === 'nl' ? 'Verwijderen' : 'Supprimer'}
                                                    >
                                                        <i className="fa-solid fa-trash-can text-xs"></i>
                                                    </button>
                                                </div>
                                            </div>
                                            <p className="text-gray-700 text-xs">{shift.startTime} - {shift.endTime}</p>
                                            <p className="text-gray-500 text-xs truncate">{getJobFunctionLabel(shift.jobFunction)}</p>
                                            {/* Right slider handle */}
                                            <div
                                                className="absolute top-0 right-0 h-full w-2 cursor-ew-resize z-20"
                                                style={{ background: 'rgba(0,0,0,0.1)' }}
                                                onMouseDown={(e) => handleSliderMouseDown(e, shift.id, dayName, 'end')}
                                            ></div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>

        {/* Save/Publish Buttons */}
        <div className="flex justify-end space-x-3 mt-4 p-3 bg-white rounded-lg shadow-md">
          <button
            className="px-4 py-2 rounded-lg text-white font-semibold text-sm shadow-md transition-colors duration-200 hover:brightness-90"
            style={{ backgroundColor: colors.primaryGreen }}
          >
            {language === 'nl' ? 'Planning Opslaan' : 'Enregistrer de Planification'}
          </button>
          <button
            className="px-4 py-2 rounded-lg text-white font-semibold text-sm shadow-md transition-colors duration-200 hover:brightness-90"
            style={{ backgroundColor: colors.darkGreen }}
          >
            {language === 'nl' ? 'Planning Publiceren' : 'Publier de Planification'}
          </button>
        </div>

        {showShiftModal && (
            <ShiftFormModal
                shift={currentShiftToEdit}
                onClose={() => { setShowShiftModal(false); setCurrentShiftToEdit(null); setModalTargetDay(null); }}
                onSave={handleSaveShiftModal}
                employees={employees}
                language={language}
                colors={colors}
            />
        )}
      </div>
    );
  };


  // Content for each section
  const renderContent = () => {
    // Calculate employee count by contract type for dashboard
    const employeeContractCounts = employees.reduce((acc, emp) => {
        const contractTypeLabel = contractTypes[language]?.find(c => c.value === emp.contractType)?.label || emp.contractType;
        acc[contractTypeLabel] = (acc[contractTypeLabel] || 0) + 1;
        return acc;
    }, {});

    switch (activeSection) {
      case 'dashboard':
        return (
          <div className="p-4 text-gray-700">
            <h2 className="text-2xl font-semibold mb-3" style={{ color: colors.darkGreen }}>{language === 'nl' ? 'Welkom bij het Dashboard Overzicht!' : 'Bienvenue sur le Tableau de Bord !'}</h2>
            <p className="text-base">{language === 'nl' ? 'Hier vindt u een snel overzicht van uw restaurantactiviteiten.' : 'Vous trouverez hier een snel overzicht van uw restaurantactiviteiten.'}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
              <div className="bg-white p-4 rounded-lg shadow-md flex items-center justify-between" style={{ border: `1px solid ${colors.borderLight}` }}>
                <div>
                  <h3 className="text-lg font-semibold" style={{ color: colors.primaryGreen }}>{language === 'nl' ? 'Actieve Werknemers' : 'Employés Actifs'}</h3>
                  <p className="text-2xl font-bold text-gray-800">{employees.length}</p>
                </div>
                <i className="fa-solid fa-users text-gray-400 text-4xl"></i>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-md flex items-center justify-between" style={{ border: `1px solid ${colors.borderLight}` }}>
                <div>
                  <h3 className="text-lg font-semibold" style={{ color: colors.primaryGreen }}>{language === 'nl' ? 'Geplande Diensten (Vandaag)' : 'Services Planifiés (Aujourd\'hui)'}</h3>
                  <p className="text-2xl font-bold text-gray-800">12</p>
                </div>
                <i className="fa-solid fa-calendar-day text-gray-400 text-4xl"></i>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-md flex items-center justify-between" style={{ border: `1px solid ${colors.borderLight}` }}>
                <div>
                  <h3 className="text-lg font-semibold" style={{ color: colors.primaryGreen }}>{language === 'nl' ? 'Open Tijdregistraties' : 'Enregistrements de Temps Ouverts'}</h3>
                  <p className="text-2xl font-bold text-gray-800">{Object.keys(clockedInEmployees).length}</p>
                </div>
                <i className="fa-solid fa-hourglass-start text-gray-400 text-4xl"></i>
              </div>
            </div>

            {/* Employee Breakdown by Contract Type */}
            <div className="mt-6 p-4 bg-white rounded-lg shadow-md" style={{ border: `1px solid ${colors.borderLight}` }}>
                <h3 className="text-lg font-semibold mb-3" style={{ color: colors.primaryGreen }}>{language === 'nl' ? 'Werknemers per Contracttype' : 'Employés par Type de Contrat'}</h3>
                <ul className="space-y-1 text-sm">
                    {Object.entries(employeeContractCounts).map(([type, count]) => (
                        <li key={type} className="flex justify-between items-center py-1.5 border-b border-gray-100 last:border-b-0">
                            <span className="font-medium text-gray-800">{type}</span>
                            <span className="text-gray-600">{count}</span>
                        </li>
                    ))}
                </ul>
            </div>
          </div>
        );
      case 'employees':
        return (
          <div className="p-4">
            <h2 className="text-2xl font-semibold mb-4" style={{ color: colors.darkGreen }}>{language === 'nl' ? 'Werknemersbeheer' : 'Gestion des Employés'}</h2>
            <div className="flex justify-end mb-4">
              <button
                onClick={() => { setCurrentEmployee(null); setShowEmployeeForm(true); }}
                className="px-4 py-2 rounded-lg text-white font-semibold text-sm shadow-md transition-colors duration-200 hover:brightness-90 flex items-center space-x-2"
                style={{ backgroundColor: colors.primaryGreen }}
              >
                <i className="fa-solid fa-user-plus text-base"></i>
                <span>{language === 'nl' ? 'Nieuwe Werknemer Toevoegen' : 'Ajouter un Nouvel Employé'}</span>
              </button>
            </div>

            {employees.length === 0 ? (
              <div className="bg-white p-6 rounded-lg shadow-md text-center" style={{ border: `1px solid ${colors.borderLight}` }}>
                <p className="text-lg text-gray-600">{language === 'nl' ? 'Nog geen werknemers toegevoegd.' : 'Aucun employé added for the moment.'}</p>
                <p className="text-sm text-gray-500 mt-2">{language === 'nl' ? 'Klik op "Nieuwe Werknemer Toevoegen" om te beginnen.' : 'Cliquez op "Ajouter een Nouvel Employé" for to begin.'}</p>
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-md overflow-hidden" style={{ border: `1px solid ${colors.borderLight}` }}>
                <table className="min-w-full divide-y divide-gray-200">
                  <thead style={{ backgroundColor: colors.lightGreen }}>
                    <tr>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">{language === 'nl' ? 'Naam' : 'Nom'}</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">{language === 'nl' ? 'Functie' : 'Fonction'}</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">{language === 'nl' ? 'Contract' : 'Contrat'}</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">{language === 'nl' ? 'Startdatum' : 'Date de début'}</th>
                      <th className="px-4 py-2 text-right text-xs font-medium text-gray-700 uppercase tracking-wider">{language === 'nl' ? 'Acties' : 'Actions'}</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {employees.map(emp => (
                      <tr key={emp.id} className="hover:bg-gray-50">
                        <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900 flex items-center">
                          {emp.firstName} {emp.lastName}
                          {getJobFunctionIconClass(emp.jobFunction) && (
                              <i className={`${getJobFunctionIconClass(emp.jobFunction)} text-gray-600 text-xs ml-2`}></i>
                          )}
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">{pc302JobFunctions[language]?.find(f => f.value === emp.jobFunction)?.label || emp.jobFunction}</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">{contractTypes[language]?.find(c => c.value === emp.contractType)?.label || emp.contractType}</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">{emp.contractStartDate}</td>
                        <td className="px-4 py-3 whitespace-nowrap text-right text-sm font-medium">
                          <div className="flex justify-end space-x-2">
                            <button
                              onClick={(e) => { e.stopPropagation(); setCurrentEmployee(emp); setShowEmployeeForm(true); }}
                              className="text-gray-500 hover:text-blue-700 p-1 rounded-full hover:bg-gray-200 transition-colors"
                              title={language === 'nl' ? 'Bewerken' : 'Modifier'}
                            >
                              <i className="fa-solid fa-pencil text-sm"></i>
                            </button>
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    const newEmployee = { ...emp, id: `emp-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`, firstName: `${emp.firstName} (Kopie)` };
                                    setEmployees(prev => [...prev, newEmployee]);
                                }}
                                className="text-gray-500 hover:text-green-700 p-1 rounded-full hover:bg-gray-200 transition-colors"
                                title={language === 'nl' ? 'Dupliceren' : 'Dupliquer'}
                            >
                                <i className="fa-solid fa-copy text-sm"></i>
                            </button>
                            <button
                              onClick={(e) => { e.stopPropagation(); handleDelete(emp); }}
                              className="text-gray-500 hover:text-red-700 p-1 rounded-full hover:bg-gray-200 transition-colors"
                              title={language === 'nl' ? 'Verwijderen' : 'Supprimer'}
                            >
                              <i className="fa-solid fa-trash-can text-sm"></i>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {showEmployeeForm && (
              <EmployeeForm
                employee={currentEmployee}
                onClose={() => setShowEmployeeForm(false)}
                onSave={handleSaveEmployee}
                language={language}
                colors={colors}
              />
            )}
          </div>
        );
        function handleDelete(employeeToDelete) {
          if (window.confirm(language === 'nl' ? `Weet u zeker dat u ${employeeToDelete.firstName} ${employeeToDelete.lastName} wilt verwijderen?` : `Êtes-vous sûr de vouloir supprimer ${employeeToDelete.firstName} ${employeeToDelete.lastName} ?`)) {
            handleSaveEmployee(employeeToDelete, true);
          }
        }
      case 'planning':
        return (
          <div className="p-4 h-full">
            <h2 className="text-2xl font-semibold mb-3" style={{ color: colors.darkGreen }}>{language === 'nl' ? 'Weekplanning' : 'Planification Hebdomadaire'}</h2>
            <WeekPlanner
              employees={employees}
              weeklyShifts={weeklyShifts}
              setWeeklyShifts={setWeeklyShifts}
              language={language}
              colors={colors}
              getEmployeeName={getEmployeeName}
              getJobFunctionLabel={getJobFunctionLabel}
              getEmployeeData={getEmployeeData} // Pass this helper
            />
          </div>
        );
      case 'timeregistration':
        // Handlers for clock in/out
        const handleClockIn = () => {
          if (!selectedEmployeeForTimeReg) {
            // Using window.alert for now as per previous instructions, will replace with custom modal later if needed
            window.alert(language === 'nl' ? 'Selecteer een werknemer om in te klokken.' : 'Veuillez sélectionner un employé pour pointer.');
            return;
          }
          if (clockedInEmployees[selectedEmployeeForTimeReg]) {
            window.alert(language === 'nl' ? 'Deze werknemer is al ingeklokt.' : 'Cet employé a déjà pointé.');
            return;
          }

          const clockInTime = new Date();
          const newRegistrationId = `reg-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;

          setClockedInEmployees(prev => ({
            ...prev,
            [selectedEmployeeForTimeReg]: { clockInTime, currentRegistrationId: newRegistrationId }
          }));

          // Add initial entry to timeRegistrations, without clockOutTime yet
          setTimeRegistrations(prev => [
            {
              id: newRegistrationId,
              employeeId: selectedEmployeeForTimeReg,
              clockIn: clockInTime.toISOString(),
              clockOut: null,
              duration: null,
            },
            ...prev, // Add to top for easy viewing
          ]);

          setSelectedEmployeeForTimeReg(''); // Clear selection after clock in
        };

        const handleClockOut = (employeeIdToClockOut) => {
          if (!clockedInEmployees[employeeIdToClockOut]) {
            window.alert(language === 'nl' ? 'Deze werknemer is niet ingeklokt.' : 'Cet employé n\'a pas pointé.');
            return;
          }

          const { clockInTime, currentRegistrationId } = clockedInEmployees[employeeIdToClockOut];
          const clockOutTime = new Date();
          const durationMs = clockOutTime.getTime() - clockInTime.getTime();
          const durationMinutes = Math.round(durationMs / (1000 * 60)); // Duration in minutes

          setClockedInEmployees(prev => {
            const newState = { ...prev };
            delete newState[employeeIdToClockOut];
            return newState;
          });

          setTimeRegistrations(prev =>
            prev.map(reg =>
              reg.id === currentRegistrationId
                ? {
                    ...reg,
                    clockOut: clockOutTime.toISOString(),
                    duration: durationMinutes, // Store duration in minutes
                  }
                : reg
            )
          );
        };


        return (
          <div className="p-4">
            <h2 className="text-2xl font-semibold mb-4" style={{ color: colors.darkGreen }}>{language === 'nl' ? 'Tijdregistratie' : 'Enregistrement du temps'}</h2>

            {/* Clock In/Out Section */}
            <div className="bg-white p-4 rounded-lg shadow-md mb-6" style={{ border: `1px solid ${colors.borderLight}` }}>
              <h3 className="text-lg font-semibold mb-3" style={{ color: colors.primaryGreen }}>{language === 'nl' ? 'In- en Uitklokken' : 'Pointer à l\'arrivée et au départ'}</h3>
              <div className="flex flex-col md:flex-row items-center gap-3">
                <div className="flex-1 w-full md:w-auto">
                  <label htmlFor="employeeSelect" className="sr-only">{language === 'nl' ? 'Selecteer Werknemer' : 'Sélectionner een Employé'}</label>
                  <select
                    id="employeeSelect"
                    value={selectedEmployeeForTimeReg}
                    onChange={(e) => setSelectedEmployeeForTimeReg(e.target.value)}
                    className="mt-1 block w-full rounded-md shadow-sm p-2 text-sm text-gray-700"
                    style={{ border: `1px solid ${colors.inputBorder}` }}
                  >
                    <option value="">{language === 'nl' ? 'Selecteer werknemer' : 'Sélectionner een employé'}</option>
                    {employees.map(emp => (
                      <option key={emp.id} value={emp.id}>
                        {getEmployeeName(emp.id)} ({getJobFunctionLabel(emp.jobFunction)})
                      </option>
                    ))}
                  </select>
                </div>
                <button
                  onClick={handleClockIn}
                  className="px-4 py-2 rounded-lg text-white font-semibold text-sm shadow-md transition-colors duration-200 hover:brightness-90 w-full md:w-auto"
                  style={{ backgroundColor: colors.primaryGreen }}
                >
                  {language === 'nl' ? 'Inklokken' : 'Pointer à l\'arrivée'}
                </button>
              </div>

              {/* Currently Clocked In */}
              <div className="mt-4">
                <h4 className="font-semibold mb-2 text-base" style={{ color: colors.darkGreen }}>{language === 'nl' ? 'Momenteel Ingelokt:' : 'Actuellement Pointé:'}</h4>
                {Object.keys(clockedInEmployees).length === 0 ? (
                  <p className="text-sm text-gray-500">{language === 'nl' ? 'Geen werknemers ingeklokt.' : 'Aucun employé pointé.'}</p>
                ) : (
                  <ul className="space-y-2">
                    {Object.entries(clockedInEmployees).map(([empId, data]) => (
                      <li key={empId} className="flex justify-between items-center bg-gray-50 p-2 rounded-md text-sm" style={{ border: `1px solid ${colors.borderLight}` }}>
                        <span>
                          {getEmployeeName(empId)} - {language === 'nl' ? 'Ingeklokt om' : 'Pointé à'} {formatTime(data.clockInTime.toISOString())}
                        </span>
                        <button
                          onClick={() => handleClockOut(empId)}
                          className="ml-3 px-3 py-1.5 rounded-lg text-white font-semibold shadow-sm transition-colors duration-200 hover:brightness-90 text-xs"
                          style={{ backgroundColor: colors.deleteButton }}
                        >
                          {language === 'nl' ? 'Uitklokken' : 'Pointer au depart'}
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>

            {/* Shift Logs Section */}
            <div className="bg-white p-4 rounded-lg shadow-md" style={{ border: `1px solid ${colors.borderLight}` }}>
              <h3 className="text-lg font-semibold mb-3" style={{ color: colors.primaryGreen }}>{language === 'nl' ? 'Tijdregistratie Logs' : 'Historique des Pointages'}</h3>
              {timeRegistrations.length === 0 ? (
                <p className="text-sm text-gray-500">{language === 'nl' ? 'Nog geen tijdregistraties.' : 'Aucun enregistrement de temps.'}</p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead style={{ backgroundColor: colors.lightGreen }}>
                      <tr>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">{language === 'nl' ? 'Datum' : 'Date'}</th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">{language === 'nl' ? 'Werknemer' : 'Employé'}</th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">{language === 'nl' ? 'Functie' : 'Fonction'}</th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">{language === 'nl' ? 'Inklokken' : 'Arrivée'}</th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">{language === 'nl' ? 'Uitklokken' : 'Départ'}</th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">{language === 'nl' ? 'Duur' : 'Durée'}</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {timeRegistrations.map(reg => {
                        const employee = getEmployeeData(reg.employeeId);
                        return (
                          <tr key={reg.id}>
                            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">{formatDate(reg.clockIn)}</td>
                            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">{getEmployeeName(reg.employeeId)}</td>
                            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 flex items-center">
                                {employee ? (
                                    <>
                                        {getJobFunctionIconClass(employee.jobFunction) && (
                                            <i className={`${getJobFunctionIconClass(employee.jobFunction)} text-gray-600 text-xs mr-2`}></i>
                                        )}
                                        {getJobFunctionLabel(employee.jobFunction)}
                                    </>
                                ) : '-'}
                            </td>
                            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">{formatTime(reg.clockIn)}</td>
                            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">{formatTime(reg.clockOut)}</td>
                            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">{formatDuration(reg.duration)}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        );
      case 'reports':
        // Mock data for reports
        const totalHoursWorked = timeRegistrations.reduce((sum, reg) => sum + (reg.duration || 0), 0);
        const monthlyRevenue = 15000; // Example data
        const topSellingDish = 'Pasta Carbonara'; // Example data

        return (
          <div className="p-4">
            <h2 className="text-2xl font-semibold mb-3" style={{ color: colors.darkGreen }}>{language === 'nl' ? 'Rapporten' : 'Rapports'}</h2>
            <p className="text-base text-gray-700">{language === 'nl' ? 'Analyseer de prestaties van uw restaurant met gedetailleerde rapporten.' : 'Analysez les performances de votre restaurant met des rapports détaillés.'}</p>

            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Total Hours Worked */}
                <div className="bg-white p-4 rounded-lg shadow-md" style={{ border: `1px solid ${colors.borderLight}` }}>
                    <h3 className="text-lg font-semibold mb-3" style={{ color: colors.primaryGreen }}>{language === 'nl' ? 'Totaal Gewerkte Uren (Deze Maand)' : 'Total Heures Travaillées (Ce Mois-ci)'}</h3>
                    <p className="text-3xl font-bold text-gray-800">{formatDuration(totalHoursWorked)}</p>
                    <p className="text-xs text-gray-500 mt-2">{language === 'nl' ? 'Gebaseerd op geregistreerde tijden.' : 'Basé sur les heures enregistrées.'}</p>
                </div>

                {/* Monthly Revenue */}
                <div className="bg-white p-4 rounded-lg shadow-md" style={{ border: `1px solid ${colors.borderLight}` }}>
                    <h3 className="text-lg font-semibold mb-3" style={{ color: colors.primaryGreen }}>{language === 'nl' ? 'Maandelijkse Omzet' : 'Chiffre d\'affaires Mensuel'}</h3>
                    <p className="text-3xl font-bold text-gray-800">€ {monthlyRevenue.toLocaleString(language === 'nl' ? 'nl-BE' : 'fr-BE')}</p>
                    <p className="text-xs text-gray-500 mt-2">{language === 'nl' ? 'Cijfers van de verkoop.' : 'Données des ventes.'}</p>
                </div>

                {/* Top Selling Dish (Placeholder) */}
                <div className="bg-white p-4 rounded-lg shadow-md md:col-span-2" style={{ border: `1px solid ${colors.borderLight}` }}>
                    <h3 className="text-lg font-semibold mb-3" style={{ color: colors.primaryGreen }}>{language === 'nl' ? 'Meest Verkochte Gerecht' : 'Plat le Plus Vendu'}</h3>
                    <p className="text-xl font-bold text-gray-800">{topSellingDish}</p>
                    <p className="text-xs text-gray-500 mt-2">{language === 'nl' ? 'Gebaseerd op verkoopdata.' : 'Basé sur les données de vente.'}</p>
                </div>

                {/* Employee Hours Breakdown (Simple List) */}
                <div className="bg-white p-4 rounded-lg shadow-md md:col-span-2" style={{ border: `1px solid ${colors.borderLight}` }}>
                    <h3 className="text-lg font-semibold mb-3" style={{ color: colors.primaryGreen }}>{language === 'nl' ? 'Urenoverzicht per Werknemer' : 'Répartition des Heures par Employé'}</h3>
                    {employees.length === 0 ? (
                        <p className="text-sm text-gray-500">{language === 'nl' ? 'Geen werknemers om rapporten voor te genereren.' : 'Aucun employé pour générer des rapports.'}</p>
                    ) : (
                        <ul className="space-y-1 text-sm">
                            {employees.map(emp => {
                                const employeeHours = timeRegistrations
                                    .filter(reg => reg.employeeId === emp.id && reg.duration !== null)
                                    .reduce((sum, reg) => sum + reg.duration, 0);
                                return (
                                    <li key={emp.id} className="flex justify-between py-1.5 border-b border-gray-100 last:border-b-0">
                                        <span className="font-medium text-gray-800">{getEmployeeName(emp.id)}</span>
                                        <span className="text-gray-600">{formatDuration(employeeHours)}</span>
                                    </li>
                                );
                            })}
                        </ul>
                    )}
                </div>

                {/* Example "Chart" (text representation) */}
                <div className="bg-white p-4 rounded-lg shadow-md md:col-span-2" style={{ border: `1px solid ${colors.borderLight}` }}>
                    <h3 className="text-lg font-semibold mb-3" style={{ color: colors.primaryGreen }}>{language === 'nl' ? 'Activiteit Overzicht (Afgelopen 7 Dagen)' : 'Aperçu de l\'Activité (7 Derniers Jours)'}</h3>
                    <pre className="bg-gray-50 p-3 rounded-md text-xs overflow-x-auto" style={{ border: `1px solid ${colors.borderLight}` }}>
                        {`
                          Dag  | Uren | Omzet
                          ------------------
                          Ma   |  80  | € 2500
                          Di   |  75  | € 2300
                          Wo   |  60  | € 2000
                          Do   |  90  | € 3000
                          Vr   | 110  | € 4500
                          Za   | 130  | € 5500
                          Zo   |  95  | € 3200
                        `}
                    </pre>
                    <p className="text-xs text-gray-500 mt-2">{language === 'nl' ? 'Dit is een simpele tekstweergave. Voor visuele grafieken kunnen bibliotheken zoals Recharts worden geïntegreerd.' : 'Ceci is een simple text representation. For visual charts, libraries like Recharts can be integrated.'}</p>
                </div>

            </div>
          </div>
        );
      case 'settings':
        return (
          <div className="p-4">
            <h2 className="text-2xl font-semibold mb-3" style={{ color: colors.darkGreen }}>{language === 'nl' ? 'Instellingen' : 'Paramètres'}</h2>
            <p className="text-base text-gray-700">{language === 'nl' ? 'Beheer de algemene en visuele instellingen van uw dashboard.' : 'Gérez les paramètres généraux en visuele instellingen van uw dashboard.'}</p>
             <div className="mt-6 p-4 bg-white rounded-lg shadow-md" style={{ border: `1px solid ${colors.borderLight}` }}>
                <h3 className="text-lg font-semibold mb-3" style={{ color: colors.primaryGreen }}>{language === 'nl' ? 'Visuele Instellingen' : 'Paramètres Visuels'}</h3>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">{language === 'nl' ? 'Logo Uploaden' : 'Télécharger le Logo'}</label>
                    <div className="flex items-center space-x-4">
                        <img src={customLogoUrl} alt="Current Logo" className="h-20 w-auto rounded-md shadow-sm border" style={{ border: `1px solid ${colors.borderLight}` }} onError={(e) => { e.target.onerror = null; e.target.src='https://placehold.co/80x50/388E3C/FFFFFF?text=Logo'; }} />
                        <input type="file" accept="image/*" onChange={handleLogoUpload} className="block text-sm text-gray-500 file:mr-3 file:py-1.5 file:px-3 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100"/>
                    </div>
                    <p className="text-xs text-gray-500 mt-2">{language === 'nl' ? 'Upload een nieuw logo om uw dashboard te personaliseren.' : 'Téléchargez een nieuw logo om uw dashboard te personaliseren.'}</p>
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">{language === 'nl' ? 'Kleurenpalet Aanpassen' : 'Personnaliser la Palette de Couleurs'}</label>
                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <label htmlFor="primaryGreen" className="block text-xs font-medium text-gray-600 mb-1">Primary Green</label>
                            <input type="color" id="primaryGreen" name="primaryGreen" value={colors.primaryGreen} onChange={(e) => handleColorChange('primaryGreen', e.target.value)}
                                   className="w-full h-8 rounded-md border" />
                        </div>
                        <div>
                            <label htmlFor="darkGreen" className="block text-xs font-medium text-gray-600 mb-1">Dark Green</label>
                            <input type="color" id="darkGreen" name="darkGreen" value={colors.darkGreen} onChange={(e) => handleColorChange('darkGreen', e.target.value)}
                                   className="w-full h-8 rounded-md border" />
                        </div>
                        <div>
                            <label htmlFor="lightGreen" className="block text-xs font-medium text-gray-600 mb-1">Light Green</label>
                            <input type="color" id="lightGreen" name="lightGreen" value={colors.lightGreen} onChange={(e) => handleColorChange('lightGreen', e.target.value)}
                                   className="w-full h-8 rounded-md border" />
                        </div>
                        <div>
                            <label htmlFor="accentGreen" className="block text-xs font-medium text-gray-600 mb-1">Accent Green</label>
                            <input type="color" id="accentGreen" name="accentGreen" value={colors.accentGreen} onChange={(e) => handleColorChange('accentGreen', e.target.value)}
                                   className="w-full h-8 rounded-md border" />
                        </div>
                    </div>
                    <button
                        onClick={() => setCustomColors({}) // Reset to default
                        }
                        className="mt-3 px-3 py-1.5 rounded-lg border text-gray-700 font-semibold text-sm shadow-sm transition-colors duration-200 hover:bg-gray-100"
                        style={{ border: `1px solid ${colors.borderLight}` }}
                    >
                        {language === 'nl' ? 'Reset Kleuren' : 'Réinitialiser les Couleurs'}
                    </button>
                </div>
             </div>
          </div>
        );
      default:
        return null;
    }
  };

  // Logo upload and color customization logic (moved outside renderContent for global access)
  const handleLogoUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCustomLogoUrl(reader.result);
        // Simple color extraction from logo (mock functionality)
        const newColors = {
          primaryGreen: '#A5D6A7', // Example derived color
          darkGreen: '#66BB6A',
        };
        setCustomColors(newColors);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleColorChange = (colorName, value) => {
      setCustomColors(prev => ({
          ...prev,
          [colorName]: value
      }));
  };


  return (
    // The Font Awesome CDN link is assumed to be loaded in the main HTML file, not within the React component's render.
    <>
      <div className="flex h-screen font-['Montserrat']">
        {/* Global Styles */}
        <style>{`
          body {
            font-family: 'Montserrat', sans-serif;
            margin: 0;
            background-color: ${colors.backgroundLight};
          }
          .scroll-container::-webkit-scrollbar {
            width: 8px;
          }
          .scroll-container::-webkit-scrollbar-track {
            background: ${colors.lightGreen};
            border-radius: 10px;
          }
          .scroll-container::-webkit-scrollbar-thumb {
            background: ${colors.darkGreen};
            border-radius: 10px;
          }
          .scroll-container::-webkit-scrollbar-thumb:hover {
            background: ${colors.primaryGreen};
          }
          /* Custom scrollbar for modal */
          .custom-scrollbar::-webkit-scrollbar {
              width: 8px;
          }
          .custom-scrollbar::-webkit-scrollbar-track {
              background: #f1f1f1;
              border-radius: 10px;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb {
              background: #888;
              border-radius: 10px;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb:hover {
              background: #555;
          }
        `}</style>

        {/* Side Navigation Bar */}
        <div className={`flex flex-col justify-between shadow-lg transition-all duration-300 ${isNavCollapsed ? 'w-20' : 'w-64'}`} style={{ backgroundColor: colors.primaryGreen, color: colors.textLight }}>
          <div>
            {/* Logo Section */}
            <div className="mb-6 flex justify-center py-4 relative">
              <img src={customLogoUrl} alt="Restaurant Logo" className={`h-14 w-auto rounded-md shadow-sm transition-all duration-300 ${isNavCollapsed ? 'h-10' : 'h-14'}`} onError={(e) => { e.target.onerror = null; e.target.src='https://placehold.co/80x50/388E3C/FFFFFF?text=Logo'; }} />
              <button
                onClick={() => setIsNavCollapsed(!isNavCollapsed)}
                className="absolute top-1/2 -right-3 transform -translate-y-1/2 p-1 rounded-full bg-white text-gray-700 shadow-md hover:bg-gray-100 focus:outline-none z-20"
                title={isNavCollapsed ? (language === 'nl' ? 'Uitklappen' : 'Déplier') : (language === 'nl' ? 'Inklappen' : 'Replier')}
              >
                <i className={`fa-solid ${isNavCollapsed ? 'fa-chevron-right' : 'fa-chevron-left'} text-sm`}></i>
              </button>
            </div>

            {/* Navigation Items */}
            <nav>
              <ul>
                {navItems[language]?.map((item) => ( // Optional chaining added
                  <li key={item.id} className="mb-1">
                    <button
                      onClick={() => setActiveSection(item.id)}
                      className={`flex items-center w-full p-3 rounded-lg text-left transition-colors duration-200 
                                  ${activeSection === item.id ? 'bg-opacity-20 bg-white shadow-md' : 'hover:bg-opacity-10 hover:bg-white'} `}
                      style={{ backgroundColor: activeSection === item.id ? colors.darkGreen : 'transparent' }}
                    >
                      <i className={`${item.icon} text-lg ${isNavCollapsed ? 'mx-auto' : 'mr-3'}`}></i>
                      <span className={`text-base font-medium ${isNavCollapsed ? 'hidden' : ''}`}>{item.name}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* User Profile/Logout Placeholder */}
          <div className="mt-6 pt-3 border-t border-opacity-30 border-white">
            <button className="flex items-center w-full p-3 rounded-lg text-left transition-colors duration-200 hover:bg-opacity-10 hover:bg-white">
              <i className={`fa-solid fa-user-circle text-lg ${isNavCollapsed ? 'mx-auto' : 'mr-3'}`}></i>
              <span className={`text-base font-medium ${isNavCollapsed ? 'hidden' : ''}`}>{language === 'nl' ? 'Mijn Profiel' : 'Mon Profil'}</span>
            </button>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Top Bar */}
          <header className="flex items-center justify-between p-3 shadow-md z-10" style={{ backgroundColor: colors.cardBackground, borderBottom: `1px solid ${colors.borderLight}` }}>
            <h1 className="text-xl font-bold" style={{ color: colors.primaryGreen }}>{language === 'nl' ? 'Restaurant Dashboard' : 'Tableau de Bord du Restaurant'}</h1>
            <div className="flex items-center space-x-3">
              {/* Logo in top bar */}
              <img src={customLogoUrl} alt="Restaurant Logo" className="h-7 w-auto rounded-md" onError={(e) => { e.target.onerror = null; e.target.src='https://placehold.co/70x25/388E3C/FFFFFF?text=Logo'; }} />
              {/* Language Toggle */}
              <div className="relative inline-block text-left">
                <button
                  onClick={() => setLanguage(language === 'nl' ? 'fr' : 'nl')}
                  className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-3 py-1.5 bg-white text-xs font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100"
                >
                  {language === 'nl' ? 'NL' : 'FR'}
                  <i className="fa-solid fa-chevron-down -mr-0.5 ml-1.5 h-4 w-4"></i>
                </button>
              </div>
              {/* Notifications and User Settings */}
              <button className="p-1.5 rounded-full hover:bg-gray-100 transition-colors duration-200">
                <i className="fa-solid fa-bell text-gray-500 text-lg"></i>
              </button>
              <button className="p-1.5 rounded-full hover:bg-gray-100 transition-colors duration-200">
                <i className="fa-solid fa-user-circle text-gray-500 text-lg"></i>
              </button>
            </div>
          </header>

          {/* Main Content */}
          <main className="flex-1 overflow-y-auto p-4 scroll-container" style={{ backgroundColor: colors.backgroundLight }}>
            {renderContent()}
          </main>
        </div>
      </div>
    </>
  );
};

export default App;
