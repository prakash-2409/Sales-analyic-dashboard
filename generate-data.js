import fs from 'fs';
import path from 'path';

// Indian Context Data
const firstNames = ["Aarav", "Vivaan", "Aditya", "Vihaan", "Arjun", "Sai", "Reyansh", "Ayaan", "Krishna", "Ishaan", "Shaurya", "Atharv", "Ananya", "Diya", "Sanya", "Kavya", "Isha", "Riya", "Aarohi", "Avni", "Neha", "Priya", "Rahul", "Rohan", "Vikram", "Suresh", "Ramesh", "Anjali", "Pooja", "Kiran"];
const lastNames = ["Sharma", "Verma", "Gupta", "Patel", "Singh", "Kumar", "Reddy", "Rao", "Nair", "Menon", "Das", "Bose", "Jain", "Shah", "Mehta", "Agarwal", "Bansal", "Chauhan", "Bhat", "Iyer"];
const companies = ["TechMahindra", "Infosys", "Wipro", "TCS", "HCL", "Reliance", "Tata Motors", "Mahindra", "L&T", "Adani", "Bajaj", "Godrej", "Birla", "ITC", "JSW", "Vedanta", "Hindalco", "Maruti", "Sun Pharma", "Cipla"];
const segments = ["Enterprise", "SMB", "Startup", "Mid-Market"];
const regions = ["North India", "South India", "East India", "West India", "Central India"];

const products = [
  { id: "P001", name: "Cloud CRM Pro", category: "Software", price: 12000 },
  { id: "P002", name: "Enterprise ERP", category: "Software", price: 45000 },
  { id: "P003", name: "Data Analytics Suite", category: "Analytics", price: 25000 },
  { id: "P004", name: "HR Management Platform", category: "Software", price: 18000 },
  { id: "P005", name: "Cybersecurity Shield", category: "Security", price: 30000 },
  { id: "P006", name: "Cloud Storage 5TB", category: "Infrastructure", price: 8000 },
  { id: "P007", name: "Marketing Automation", category: "Marketing", price: 15000 },
  { id: "P008", name: "AI Chatbot License", category: "AI", price: 22000 },
  { id: "P009", name: "Supply Chain Manager", category: "Software", price: 35000 },
  { id: "P010", name: "Sales Enablement Tool", category: "Sales", price: 14000 },
  { id: "P011", name: "Customer Support Portal", category: "Support", price: 11000 },
  { id: "P012", name: "Financial Planning Suite", category: "Finance", price: 28000 },
  { id: "P013", name: "IoT Device Manager", category: "Infrastructure", price: 19000 },
  { id: "P014", name: "Predictive AI Engine", category: "AI", price: 40000 },
  { id: "P015", name: "Compliance Tracker", category: "Finance", price: 16000 },
  { id: "P016", name: "Team Collaboration Hub", category: "Software", price: 9000 },
  { id: "P017", name: "Video Conferencing Pro", category: "Software", price: 10000 },
  { id: "P018", name: "E-commerce Backend", category: "Platform", price: 32000 },
  { id: "P019", name: "Mobile App Builder", category: "Platform", price: 21000 },
  { id: "P020", name: "API Gateway Manager", category: "Infrastructure", price: 17000 }
];

const statuses = ["Completed", "Pending", "Processing"];

// Seeded random function for consistency
let seed = 12345;
function random() {
  const x = Math.sin(seed++) * 10000;
  return x - Math.floor(x);
}
function getRandomInt(min, max) {
  return Math.floor(random() * (max - min + 1)) + min;
}
function getRandomItem(arr) {
  return arr[getRandomInt(0, arr.length - 1)];
}

// Generate 150 Customers
const customers = [];
for (let i = 1; i <= 150; i++) {
  const fName = getRandomItem(firstNames);
  const lName = getRandomItem(lastNames);
  const company = getRandomItem(companies);
  customers.push({
    id: `CUST-${String(i).padStart(4, '0')}`,
    name: `${fName} ${lName}`,
    email: `${fName.toLowerCase()}.${lName.toLowerCase()}@${company.replace(/\\s+/g, '').toLowerCase()}.in`,
    company: company,
    segment: getRandomItem(segments),
    region: getRandomItem(regions),
    joinedAt: new Date(2022, getRandomInt(0, 11), getRandomInt(1, 28)).toISOString()
  });
}

// Generate 500 Sales for the last 12 months (April 2025 - March 2026 roughly)
// Using current year as base (2025/2026 for realistic dates)
const sales = [];
const startDate = new Date(2025, 4, 1); // May 1, 2025
const endDate = new Date(2026, 3, 30); // April 30, 2026
const timeRange = endDate.getTime() - startDate.getTime();

for (let i = 1; i <= 500; i++) {
  const customer = getRandomItem(customers);
  const product = getRandomItem(products);
  const saleDate = new Date(startDate.getTime() + (random() * timeRange));
  
  // Create seasonal spikes (end of financial year in March, Diwali in Oct/Nov)
  const month = saleDate.getMonth();
  const baseQty = getRandomInt(1, 5);
  let multiplier = 1;
  if (month === 2) multiplier = 1.8; // March year end
  if (month === 9 || month === 10) multiplier = 1.4; // Diwali
  
  const quantity = Math.max(1, Math.floor(baseQty * (multiplier * (0.8 + random() * 0.4))));
  const amount = product.price * quantity;

  sales.push({
    id: `INV-${String(i).padStart(5, '0')}`,
    customerId: customer.id,
    customerName: customer.name,
    customerEmail: customer.email,
    productId: product.id,
    productName: product.name,
    category: product.category,
    amount: amount,
    status: getRandomItem(statuses),
    region: customer.region,
    date: saleDate.toISOString()
  });
}

sales.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

const fileContent = `// Auto-generated static mock data
export const products = ${JSON.stringify(products, null, 2)};

export const customers = ${JSON.stringify(customers, null, 2)};

export const sales = ${JSON.stringify(sales, null, 2)};
`;

fs.writeFileSync(path.join(process.cwd(), 'src', 'lib', 'mock-data.ts'), fileContent);
console.log("Mock data generated successfully in src/lib/mock-data.ts");
