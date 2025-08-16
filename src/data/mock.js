// Centralized mock data for the User Portal

export const invoices = [
  { 
    id: 1234, 
    amount: 2500, 
    status: "Paid", 
    date: "2024-03-01", 
    dueDate: "2024-03-15",
    description: "Web Development Services - March 2024",
    customerName: "Acme Corporation",
    customerEmail: "billing@acme.com"
  },
  { 
    id: 1235, 
    amount: 1500, 
    status: "Pending", 
    date: "2024-03-15", 
    dueDate: "2024-03-30",
    description: "UI/UX Design Consultation",
    customerName: "Tech Solutions Ltd",
    customerEmail: "accounts@techsolutions.com"
  },
  { 
    id: 1236, 
    amount: 800, 
    status: "Overdue", 
    date: "2024-02-28", 
    dueDate: "2024-03-14",
    description: "Monthly Maintenance Fee",
    customerName: "StartupCo",
    customerEmail: "finance@startupco.io"
  },
  { 
    id: 5678, 
    amount: 3200, 
    status: "Pending", 
    date: "2024-03-20", 
    dueDate: "2024-04-04",
    description: "E-commerce Platform Development",
    customerName: "Global Retail Inc",
    customerEmail: "payments@globalretail.com"
  },
  { 
    id: 9012, 
    amount: 950, 
    status: "Paid", 
    date: "2024-03-05", 
    dueDate: "2024-03-19",
    description: "Logo Design & Branding",
    customerName: "Creative Agency",
    customerEmail: "billing@creativeagency.net"
  },
  { 
    id: 3456, 
    amount: 4100, 
    status: "Overdue", 
    date: "2024-02-15", 
    dueDate: "2024-03-01",
    description: "Mobile App Development Phase 1",
    customerName: "Innovation Labs",
    customerEmail: "accounting@innovationlabs.com"
  },
  { 
    id: 7890, 
    amount: 1750, 
    status: "Paid", 
    date: "2024-03-10", 
    dueDate: "2024-03-24",
    description: "Database Optimization Services",
    customerName: "DataCorp Solutions",
    customerEmail: "billing@datacorp.com"
  },
  { 
    id: 2468, 
    amount: 890, 
    status: "Pending", 
    date: "2024-03-22", 
    dueDate: "2024-04-05",
    description: "Website Security Audit",
    customerName: "SecureWeb Ltd",
    customerEmail: "finance@secureweb.co.uk"
  },
  { 
    id: 1357, 
    amount: 2200, 
    status: "Overdue", 
    date: "2024-02-20", 
    dueDate: "2024-03-06",
    description: "API Integration Services",
    customerName: "CloudTech Systems",
    customerEmail: "ap@cloudtech.com"
  },
  { 
    id: 8642, 
    amount: 1680, 
    status: "Paid", 
    date: "2024-03-12", 
    dueDate: "2024-03-26",
    description: "Performance Optimization",
    customerName: "SpeedyApps Inc",
    customerEmail: "billing@speedyapps.com"
  }
];

export const updates = [
  { 
    id: 1, 
    content: "Your invoice #1234 has been paid successfully. Thank you for your business!", 
    date: "2024-03-16", 
    type: "payment",
    read: false,
    invoiceId: 1234
  },
  { 
    id: 2, 
    content: "New feature: You can now download invoice PDFs directly from your dashboard", 
    date: "2024-03-14", 
    type: "feature",
    read: true
  },
  { 
    id: 3, 
    content: "Reminder: Invoice #5678 is due in 3 days. Please ensure timely payment.", 
    date: "2024-03-13", 
    type: "reminder",
    read: false,
    invoiceId: 5678
  },
  { 
    id: 4, 
    content: "Payment received for invoice #9012 - processing complete!", 
    date: "2024-03-12", 
    type: "payment",
    read: true,
    invoiceId: 9012
  },
  { 
    id: 5, 
    content: "Invoice #3456 is now overdue. Please contact our billing team for assistance.", 
    date: "2024-03-10", 
    type: "overdue",
    read: false,
    invoiceId: 3456
  },
  { 
    id: 6, 
    content: "Your invoice #7890 has been successfully processed and marked as paid", 
    date: "2024-03-08", 
    type: "payment",
    read: true,
    invoiceId: 7890
  },
  { 
    id: 7, 
    content: "Scheduled maintenance: Our billing system will be offline from 2-4 AM EST on March 25th", 
    date: "2024-03-07", 
    type: "maintenance",
    read: true
  },
  { 
    id: 8, 
    content: "Invoice #1357 payment is overdue. Late fees may apply after 30 days.", 
    date: "2024-03-05", 
    type: "overdue",
    read: false,
    invoiceId: 1357
  },
  { 
    id: 9, 
    content: "New invoice #2468 has been generated and sent to your registered email address", 
    date: "2024-03-04", 
    type: "invoice",
    read: true,
    invoiceId: 2468
  }
];

// Helper functions
export const getInvoiceById = (id) => {
  return invoices.find(invoice => invoice.id === parseInt(id));
};

export const getRelatedUpdates = (invoiceId) => {
  return updates.filter(update => update.invoiceId === parseInt(invoiceId));
};

export const getInvoiceStats = () => {
  const total = invoices.length;
  const paid = invoices.filter(inv => inv.status === "Paid").length;
  const pending = invoices.filter(inv => inv.status === "Pending").length;
  const overdue = invoices.filter(inv => inv.status === "Overdue").length;
  
  const totalAmount = invoices.reduce((sum, inv) => sum + inv.amount, 0);
  const paidAmount = invoices.filter(inv => inv.status === "Paid").reduce((sum, inv) => sum + inv.amount, 0);
  const pendingAmount = invoices.filter(inv => inv.status === "Pending").reduce((sum, inv) => sum + inv.amount, 0);
  const overdueAmount = invoices.filter(inv => inv.status === "Overdue").reduce((sum, inv) => sum + inv.amount, 0);
  
  return {
    counts: { total, paid, pending, overdue },
    amounts: { total: totalAmount, paid: paidAmount, pending: pendingAmount, overdue: overdueAmount }
  };
};