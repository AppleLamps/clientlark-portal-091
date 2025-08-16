import { useState, useEffect, useMemo } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Search, Calendar, ChevronDown, Filter, DollarSign, Clock, AlertTriangle } from "lucide-react";
import { invoices as mockInvoices, getInvoiceStats } from "@/data/mock";

const Invoices = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const statusFilter = searchParams.get('status') || 'all';
  
  const [invoices] = useState(mockInvoices);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState("date");
  const [sortDirection, setSortDirection] = useState("desc");

  const stats = useMemo(() => getInvoiceStats(), []);

  const filteredAndSortedInvoices = useMemo(() => {
    let filtered = invoices;
    
    // Apply status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(invoice => 
        invoice.status.toLowerCase() === statusFilter.toLowerCase()
      );
    }
    
    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(invoice => 
        invoice.id.toString().includes(searchTerm) ||
        invoice.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        invoice.customerName.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Apply sorting
    return filtered.sort((a, b) => {
      let aValue, bValue;
      
      switch (sortField) {
        case 'amount':
          aValue = a.amount;
          bValue = b.amount;
          break;
        case 'date':
          aValue = new Date(a.date);
          bValue = new Date(b.date);
          break;
        case 'dueDate':
          aValue = new Date(a.dueDate);
          bValue = new Date(b.dueDate);
          break;
        default:
          aValue = a[sortField];
          bValue = b[sortField];
      }
      
      if (sortDirection === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });
  }, [invoices, statusFilter, searchTerm, sortField, sortDirection]);

  const handleTabChange = (value) => {
    setSearchParams(value === 'all' ? {} : { status: value });
  };

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

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
      month: 'short',
      day: 'numeric'
    });
  };

  const SortableHeader = ({ field, children }) => (
    <TableHead 
      className="cursor-pointer hover:bg-muted/50 select-none"
      onClick={() => handleSort(field)}
    >
      <div className="flex items-center gap-1">
        {children}
        <ChevronDown className={`h-4 w-4 transition-transform ${
          sortField === field ? (sortDirection === 'asc' ? 'rotate-180' : '') : 'opacity-50'
        }`} />
      </div>
    </TableHead>
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Your Invoices</h1>
        <p className="text-muted-foreground mt-2">
          Manage and track all your invoices in one place
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Invoices</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.counts.total}</div>
            <p className="text-xs text-muted-foreground">
              {formatCurrency(stats.amounts.total)} total value
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Paid</CardTitle>
            <div className="h-4 w-4 rounded-full bg-success"></div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">{stats.counts.paid}</div>
            <p className="text-xs text-muted-foreground">
              {formatCurrency(stats.amounts.paid)}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
            <Clock className="h-4 w-4 text-warning" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-warning">{stats.counts.pending}</div>
            <p className="text-xs text-muted-foreground">
              {formatCurrency(stats.amounts.pending)}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Overdue</CardTitle>
            <AlertTriangle className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">{stats.counts.overdue}</div>
            <p className="text-xs text-muted-foreground">
              {formatCurrency(stats.amounts.overdue)}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input 
            placeholder="Search by invoice ID, description, or customer..." 
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Status Tabs */}
      <Tabs value={statusFilter} onValueChange={handleTabChange} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="all">All ({stats.counts.total})</TabsTrigger>
          <TabsTrigger value="paid">Paid ({stats.counts.paid})</TabsTrigger>
          <TabsTrigger value="pending">Pending ({stats.counts.pending})</TabsTrigger>
          <TabsTrigger value="overdue">Overdue ({stats.counts.overdue})</TabsTrigger>
        </TabsList>

        <TabsContent value={statusFilter} className="space-y-4">
          {filteredAndSortedInvoices.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <DollarSign className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">No invoices found</h3>
                <p className="text-muted-foreground text-center max-w-sm">
                  {statusFilter === 'all' 
                    ? "You don't have any invoices yet. We'll notify you when your first one is ready!"
                    : `No ${statusFilter} invoices match your current search criteria.`
                  }
                </p>
                {searchTerm && (
                  <Button 
                    variant="outline" 
                    onClick={() => setSearchTerm("")}
                    className="mt-4"
                  >
                    Clear search
                  </Button>
                )}
              </CardContent>
            </Card>
          ) : (
            <>
              {/* Desktop Table */}
              <div className="hidden md:block">
                <Card>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <SortableHeader field="id">Invoice ID</SortableHeader>
                        <TableHead>Description</TableHead>
                        <TableHead>Customer</TableHead>
                        <SortableHeader field="amount">Amount</SortableHeader>
                        <TableHead>Status</TableHead>
                        <SortableHeader field="date">Date</SortableHeader>
                        <SortableHeader field="dueDate">Due Date</SortableHeader>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredAndSortedInvoices.map((invoice) => (
                        <TableRow key={invoice.id} className="hover:bg-muted/50">
                          <TableCell className="font-medium">#{invoice.id}</TableCell>
                          <TableCell className="max-w-[200px] truncate">
                            {invoice.description}
                          </TableCell>
                          <TableCell>{invoice.customerName}</TableCell>
                          <TableCell className="font-semibold">
                            {formatCurrency(invoice.amount)}
                          </TableCell>
                          <TableCell>
                            <Badge variant={getStatusBadgeVariant(invoice.status)}>
                              {invoice.status}
                            </Badge>
                          </TableCell>
                          <TableCell>{formatDate(invoice.date)}</TableCell>
                          <TableCell>{formatDate(invoice.dueDate)}</TableCell>
                          <TableCell>
                            <Button asChild variant="outline" size="sm">
                              <Link to={`/user/invoices/${invoice.id}`}>View Details</Link>
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </Card>
              </div>

              {/* Mobile Cards */}
              <div className="md:hidden space-y-4">
                {filteredAndSortedInvoices.map((invoice) => (
                  <Card key={invoice.id}>
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">#{invoice.id}</CardTitle>
                        <Badge variant={getStatusBadgeVariant(invoice.status)}>
                          {invoice.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground truncate">
                        {invoice.description}
                      </p>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-muted-foreground">Amount:</span>
                          <div className="font-semibold">{formatCurrency(invoice.amount)}</div>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Due Date:</span>
                          <div>{formatDate(invoice.dueDate)}</div>
                        </div>
                      </div>
                      <div>
                        <span className="text-muted-foreground text-sm">Customer:</span>
                        <div className="text-sm">{invoice.customerName}</div>
                      </div>
                      <Button asChild className="w-full" variant="outline">
                        <Link to={`/user/invoices/${invoice.id}`}>View Details</Link>
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Invoices;
