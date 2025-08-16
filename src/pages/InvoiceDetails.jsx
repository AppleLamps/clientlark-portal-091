import { useParams, Link } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, Calendar, User, Mail, FileText, DollarSign } from "lucide-react";
import { getInvoiceById, getRelatedUpdates } from "@/data/mock";

const InvoiceDetails = () => {
  const { id } = useParams();
  const invoice = getInvoiceById(id);
  const relatedUpdates = getRelatedUpdates(id);

  if (!invoice) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button asChild variant="outline" size="sm">
            <Link to="/user/invoices">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Invoices
            </Link>
          </Button>
        </div>
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <FileText className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">Invoice not found</h3>
            <p className="text-muted-foreground text-center">
              The invoice you're looking for doesn't exist or has been removed.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

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

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-4">
          <Button asChild variant="outline" size="sm">
            <Link to="/user/invoices">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Invoices
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Invoice #{invoice.id}</h1>
            <p className="text-muted-foreground mt-1">
              {invoice.description}
            </p>
          </div>
        </div>
        <Badge variant={getStatusBadgeVariant(invoice.status)} className="text-sm px-3 py-1">
          {invoice.status}
        </Badge>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Invoice Details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Invoice Summary */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="h-5 w-5" />
                Invoice Summary
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-3">Amount</h4>
                  <p className="text-3xl font-bold text-primary">
                    {formatCurrency(invoice.amount)}
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-3">Status</h4>
                  <Badge variant={getStatusBadgeVariant(invoice.status)} className="text-sm">
                    {invoice.status}
                  </Badge>
                </div>
              </div>
              
              <Separator />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-2 flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    Invoice Date
                  </h4>
                  <p className="text-muted-foreground">{formatDate(invoice.date)}</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2 flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    Due Date
                  </h4>
                  <p className="text-muted-foreground">{formatDate(invoice.dueDate)}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Customer Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Customer Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">Customer Name</h4>
                <p>{invoice.customerName}</p>
              </div>
              <div>
                <h4 className="font-semibold mb-2 flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  Email Address
                </h4>
                <p className="text-muted-foreground">{invoice.customerEmail}</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full">
                <FileText className="h-4 w-4 mr-2" />
                Download PDF
              </Button>
              <Button variant="outline" className="w-full">
                <Mail className="h-4 w-4 mr-2" />
                Send Reminder
              </Button>
              {invoice.status === "Pending" && (
                <Button variant="outline" className="w-full">
                  Mark as Paid
                </Button>
              )}
            </CardContent>
          </Card>

          {/* Related Updates */}
          {relatedUpdates.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Related Updates</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {relatedUpdates.slice(0, 3).map((update) => (
                  <div key={update.id} className="text-sm">
                    <p className="mb-1">{update.content.replace(`#${invoice.id}`, 'this invoice')}</p>
                    <p className="text-xs text-muted-foreground">
                      {formatDate(update.date)}
                    </p>
                    {relatedUpdates.indexOf(update) < relatedUpdates.slice(0, 3).length - 1 && (
                      <Separator className="mt-3" />
                    )}
                  </div>
                ))}
                {relatedUpdates.length > 3 && (
                  <Button asChild variant="link" className="p-0 h-auto text-sm">
                    <Link to="/user/updates">
                      View all updates →
                    </Link>
                  </Button>
                )}
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default InvoiceDetails;