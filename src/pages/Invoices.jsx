import { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const Invoices = () => {
  const [searchParams] = useSearchParams();
  const statusFilter = searchParams.get('status');
  
  const [invoices, setInvoices] = useState([
    { id: 1, amount: 1000, status: "Paid", date: "2023-03-01" },
    { id: 2, amount: 1500, status: "Pending", date: "2023-03-15" },
    { id: 3, amount: 800, status: "Overdue", date: "2023-02-28" },
  ]);

  const [filteredInvoices, setFilteredInvoices] = useState(invoices);

  useEffect(() => {
    if (statusFilter) {
      setFilteredInvoices(invoices.filter(invoice => 
        invoice.status.toLowerCase() === statusFilter.toLowerCase()
      ));
    } else {
      setFilteredInvoices(invoices);
    }
  }, [statusFilter, invoices]);

  const getStatusBadgeVariant = (status) => {
    switch (status.toLowerCase()) {
      case "paid":
        return "success";
      case "pending":
        return "warning";
      case "overdue":
        return "destructive";
      default:
        return "default";
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Your Invoices</h1>
      <div className="mb-4">
        <Input placeholder="Search invoices..." className="max-w-sm" />
      </div>
{filteredInvoices.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground text-lg">
            You have no invoices yet. We'll notify you when your first one is ready!
          </p>
        </div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Invoice ID</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredInvoices.map((invoice) => (
              <TableRow key={invoice.id}>
                <TableCell>{invoice.id}</TableCell>
                <TableCell>${invoice.amount}</TableCell>
                <TableCell>
                  <Badge variant={getStatusBadgeVariant(invoice.status)}>
                    {invoice.status}
                  </Badge>
                </TableCell>
                <TableCell>{invoice.date}</TableCell>
                <TableCell>
                  <Button asChild variant="outline" size="sm">
                    <Link to={`/user/invoices/${invoice.id}`}>View Details</Link>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
};

export default Invoices;
