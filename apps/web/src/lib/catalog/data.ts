import type { Creator, Product, Solution } from "./types";

// Realistic sample data (BRD assumption A2). Replace with services/api calls.

export const creators: Creator[] = [
  {
    slug: "alex-chen",
    name: "Alex Chen",
    bio: "Full-stack developer building web applications and business tools for small teams.",
    skills: ["CRM", "Dashboards", "Next.js"],
  },
  {
    slug: "sarah-kim",
    name: "Sarah Kim",
    bio: "Designer and developer focused on websites for local service businesses.",
    skills: ["Websites", "Booking", "Automotive"],
  },
  {
    slug: "david-lee",
    name: "David Lee",
    bio: "Indie hacker building scheduling and booking tools.",
    skills: ["Scheduling", "Notifications", "Mobile-friendly apps"],
  },
  {
    slug: "maria-garcia",
    name: "Maria Garcia",
    bio: "Small software studio owner specialising in operations tools.",
    skills: ["Inventory", "Reporting", "Workflows"],
  },
];

export const solutions: Solution[] = [
  {
    slug: "garage-management",
    name: "Garage management",
    summary: "Run an automotive service business: bookings, customers, vehicles, and repair orders.",
    problems: [
      "Appointments tracked on paper or in chat apps",
      "No history of past repairs per vehicle",
      "Customers can't book online",
    ],
  },
  {
    slug: "customer-management",
    name: "Customer management",
    summary: "Keep track of customers, leads, and deals in one place.",
    problems: [
      "Customer details spread across spreadsheets",
      "Follow-ups forgotten",
      "No view of the sales pipeline",
    ],
  },
  {
    slug: "booking-management",
    name: "Booking management",
    summary: "Let customers book appointments and manage your schedule.",
    problems: [
      "Double-booked time slots",
      "Phone calls just to book an appointment",
      "No-shows without reminders",
    ],
  },
];

const standardFaq = [
  {
    question: "Who do I contact if something stops working?",
    answer:
      "Contact WIHARD support. We are your point of contact and coordinate with the creator when a fix is needed in the product itself.",
  },
  {
    question: "Can I buy this product today?",
    answer:
      "Not yet. Purchasing opens in a later phase. Register your interest and we will contact you about your needs.",
  },
];

export const products: Product[] = [
  {
    slug: "customer-management-crm",
    name: "Customer Management CRM",
    tagline: "Manage customers, track interactions, and grow your business.",
    description:
      "A simple CRM for small and medium businesses. Organise customer information, track interactions, manage deals, and follow up on time.",
    category: "business-tools",
    solutions: ["customer-management"],
    status: "active",
    screenshots: [{ src: "", alt: "CRM dashboard with customers, deals, and revenue overview" }],
    features: ["Customer records", "Deal pipeline", "Task reminders", "Basic reports"],
    audience: ["Small sales teams", "Service businesses", "Freelancers with many clients"],
    customization: {
      allowed: ["Branding (logo, colours, fonts)", "Custom fields and deal stages", "Email templates", "Labels and language"],
      notAllowed: ["Integrations with third-party accounting systems", "Multi-company setups"],
    },
    deployment: "Hosted web application. Hosting is arranged by WIHARD once deployment is available.",
    pricing: {
      included: [{ label: "Licence", amount: "$29", note: "One-time" }],
      possibleExtras: [
        { label: "Hosting", amount: "Monthly", note: "Depends on usage" },
        { label: "Customisation beyond the listed options", amount: "Quoted per request" },
      ],
    },
    support: {
      provider: "platform-and-creator",
      coverage: ["Bug fixes", "Security updates"],
      responseTime: "Within 2 business days",
      duration: "12 months from purchase",
    },
    maintenance: "The creator publishes updates; WIHARD reviews each version before release.",
    creatorSlug: "alex-chen",
    versions: [
      { version: "1.2.0", date: "2026-09-10", notes: "Added deal stage customisation." },
      { version: "1.0.0", date: "2026-06-02", notes: "Initial release." },
    ],
    faq: standardFaq,
  },
  {
    slug: "garage-management-website",
    name: "Garage Management",
    tagline: "Book appointments, manage services, and keep customers informed.",
    description:
      "A website and booking front-end for garages and automotive service shops, with a simple service catalogue and appointment requests.",
    category: "websites",
    solutions: ["garage-management", "booking-management"],
    status: "active",
    screenshots: [{ src: "", alt: "Garage website home page with service list and booking button" }],
    features: ["Service catalogue", "Appointment requests", "Vehicle details form", "Contact and location page"],
    audience: ["Independent garages", "Tyre and service shops"],
    customization: {
      allowed: ["Branding", "Services and prices", "Opening hours", "Page content"],
      notAllowed: ["Online payments", "Parts inventory"],
    },
    deployment: "Website with a custom domain. Hosting is arranged by WIHARD once deployment is available.",
    pricing: {
      included: [{ label: "Licence", amount: "$49", note: "One-time" }],
      possibleExtras: [
        { label: "Hosting", amount: "Monthly" },
        { label: "Custom domain", amount: "Yearly", note: "Paid to the domain registrar" },
      ],
    },
    support: {
      provider: "platform",
      coverage: ["Bug fixes", "Security updates", "Content editing help"],
      responseTime: "Within 2 business days",
      duration: "12 months from purchase",
    },
    maintenance: "Maintained by the creator; critical issues are handled by WIHARD.",
    creatorSlug: "sarah-kim",
    versions: [{ version: "1.0.0", date: "2026-08-15", notes: "Initial release." }],
    faq: standardFaq,
  },
  {
    slug: "booking-system",
    name: "Booking System",
    tagline: "Let customers book appointments anytime.",
    description:
      "An online booking app with a public booking page, a staff calendar, and email reminders to reduce no-shows.",
    category: "apps",
    solutions: ["booking-management"],
    status: "beta",
    screenshots: [{ src: "", alt: "Calendar view with booked time slots" }],
    features: ["Public booking page", "Staff calendar", "Email reminders", "Service durations"],
    audience: ["Salons and clinics", "Consultants", "Repair services"],
    customization: {
      allowed: ["Branding", "Services and durations", "Working hours", "Reminder text"],
      notAllowed: ["SMS reminders", "Payment at booking"],
    },
    deployment: "Hosted web application. Hosting is arranged by WIHARD once deployment is available.",
    pricing: {
      included: [{ label: "Licence", amount: "$39", note: "One-time" }],
      possibleExtras: [
        { label: "Hosting", amount: "Monthly" },
        { label: "Email sending above the free quota", amount: "Usage-based" },
      ],
    },
    support: {
      provider: "creator",
      coverage: ["Bug fixes"],
      responseTime: "Within 5 business days",
      duration: "6 months from purchase",
    },
    maintenance: "Beta: features may change. The creator publishes updates; WIHARD reviews each version.",
    creatorSlug: "david-lee",
    versions: [{ version: "0.9.0", date: "2026-10-01", notes: "Beta release." }],
    faq: standardFaq,
  },
  {
    slug: "inventory-management",
    name: "Inventory Management",
    tagline: "Track stock, manage suppliers, and streamline operations.",
    description:
      "Track stock levels across locations, manage suppliers and purchase orders, and get alerts when items run low.",
    category: "business-tools",
    solutions: [],
    status: "active",
    screenshots: [{ src: "", alt: "Inventory list with stock levels and low-stock alerts" }],
    features: ["Stock levels", "Suppliers", "Purchase orders", "Low-stock alerts"],
    audience: ["Retail shops", "Small warehouses", "Workshops"],
    customization: {
      allowed: ["Branding", "Product fields", "Locations", "Alert thresholds"],
      notAllowed: ["Barcode hardware integration"],
    },
    deployment: "Hosted web application. Hosting is arranged by WIHARD once deployment is available.",
    pricing: {
      included: [{ label: "Licence", amount: "$45", note: "One-time" }],
      possibleExtras: [{ label: "Hosting", amount: "Monthly" }],
    },
    support: {
      provider: "platform-and-creator",
      coverage: ["Bug fixes", "Security updates"],
      responseTime: "Within 2 business days",
      duration: "12 months from purchase",
    },
    maintenance: "The creator publishes updates; WIHARD reviews each version before release.",
    creatorSlug: "maria-garcia",
    versions: [{ version: "1.1.0", date: "2026-07-20", notes: "Added purchase orders." }],
    faq: standardFaq,
  },
];
