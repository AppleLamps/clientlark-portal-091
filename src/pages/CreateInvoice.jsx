import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";

const CreateInvoice = () => {
  const navigate = useNavigate();
  const [invoice, setInvoice] = useState({
    customerName: "",
    amount: "",
    dueDate: null,
    status: "pending",
    description: "",
  });
  
  // Sample customer suggestions for autocomplete
  const customerSuggestions = ["Acme Corp", "Globex", "Initech", "Umbrella", "Soylent", "Stark Industries"];
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInvoice((prev) => ({ ...prev, [name]: value }));
    
    // Handle autocomplete for customer name
    if (name === "customerName") {
      const filtered = customerSuggestions.filter(customer =>
        customer.toLowerCase().includes(value.toLowerCase())
      ).slice(0, 5);
      setFilteredSuggestions(filtered);
      setShowSuggestions(value.length > 0 && filtered.length > 0);
    }
  };

  const handleCustomerSelect = (customerName) => {
    setInvoice((prev) => ({ ...prev, customerName }));
    setShowSuggestions(false);
  };

  const handleDateSelect = (date) => {
    setInvoice((prev) => ({ ...prev, dueDate: date }));
  };

  const handleStatusChange = (value) => {
    setInvoice((prev) => ({ ...prev, status: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate due date
    if (!invoice.dueDate) {
      console.warn("Please select a due date");
      return;
    }
    
    // Convert date to string for submission
    const submissionData = {
      ...invoice,
      dueDate: format(invoice.dueDate, "yyyy-MM-dd")
    };
    
    console.log("Invoice created:", submissionData);
    navigate("/admin");
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Create New Invoice</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative">
          <Label htmlFor="customerName">Customer Name</Label>
          <Input
            id="customerName"
            name="customerName"
            value={invoice.customerName}
            onChange={handleChange}
            onFocus={() => {
              if (invoice.customerName.length > 0 && filteredSuggestions.length > 0) {
                setShowSuggestions(true);
              }
            }}
            onBlur={() => {
              // Delay hiding to allow for suggestion clicks
              setTimeout(() => setShowSuggestions(false), 150);
            }}
            placeholder="Start typing a customer name..."
            required
          />
          {showSuggestions && (
            <div className="absolute top-full left-0 right-0 z-50 mt-1 bg-popover border rounded-md shadow-md max-h-48 overflow-auto">
              {filteredSuggestions.map((customer, index) => (
                <div
                  key={index}
                  className="px-3 py-2 hover:bg-accent hover:text-accent-foreground cursor-pointer"
                  onClick={() => handleCustomerSelect(customer)}
                >
                  {customer}
                </div>
              ))}
            </div>
          )}
        </div>
        <div>
          <Label htmlFor="amount">Amount</Label>
          <Input
            id="amount"
            name="amount"
            type="number"
            value={invoice.amount}
            onChange={handleChange}
            placeholder="2500.00"
            required
          />
        </div>
        <div>
          <Label htmlFor="dueDate">Due Date</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !invoice.dueDate && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {invoice.dueDate ? format(invoice.dueDate, "PPP") : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={invoice.dueDate}
                onSelect={handleDateSelect}
                initialFocus
                className="p-3 pointer-events-auto"
              />
            </PopoverContent>
          </Popover>
          <p className="text-sm text-muted-foreground mt-1">Select the date the payment is due.</p>
        </div>
        <div>
          <Label htmlFor="status">Status</Label>
          <Select onValueChange={handleStatusChange} defaultValue={invoice.status}>
            <SelectTrigger>
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="paid">Paid</SelectItem>
              <SelectItem value="overdue">Overdue</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            name="description"
            value={invoice.description}
            onChange={handleChange}
            placeholder="Add any notes or line items..."
            rows={4}
          />
        </div>
        <Button type="submit">Create Invoice</Button>
      </form>
    </div>
  );
};

export default CreateInvoice;
