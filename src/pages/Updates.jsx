import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Bell, CheckCircle, AlertTriangle, DollarSign, Wrench, FileText, Clock } from "lucide-react";
import { updates as mockUpdates } from "@/data/mock";

const Updates = () => {
  const [updates, setUpdates] = useState(mockUpdates);

  const markAllAsRead = () => {
    setUpdates(updates.map(update => ({ ...update, read: true })));
  };

  const markAsRead = (id) => {
    setUpdates(updates.map(update => 
      update.id === id ? { ...update, read: true } : update
    ));
  };

  const unreadCount = updates.filter(update => !update.read).length;

  const getUpdateIcon = (type) => {
    switch (type) {
      case 'payment':
        return <DollarSign className="h-4 w-4 text-success" />;
      case 'overdue':
        return <AlertTriangle className="h-4 w-4 text-destructive" />;
      case 'reminder':
        return <Clock className="h-4 w-4 text-warning" />;
      case 'invoice':
        return <FileText className="h-4 w-4 text-primary" />;
      case 'maintenance':
        return <Wrench className="h-4 w-4 text-muted-foreground" />;
      case 'feature':
        return <Bell className="h-4 w-4 text-primary" />;
      default:
        return <Bell className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const renderContent = (text) => {
    const invoiceRegex = /#(\d+)/g;
    const parts = text.split(invoiceRegex);
    
    return parts.map((part, index) => {
      if (invoiceRegex.test(`#${part}`) && !isNaN(part)) {
        return (
          <Link 
            key={index} 
            to={`/user/invoices/${part}`} 
            className="text-primary hover:underline font-medium"
          >
            #{part}
          </Link>
        );
      }
      return part;
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Your Updates</h1>
          <p className="text-muted-foreground mt-2">
            Stay informed about your invoices and account activity
          </p>
        </div>
        {unreadCount > 0 && (
          <div className="flex items-center gap-3">
            <Badge variant="secondary">
              {unreadCount} unread
            </Badge>
            <Button variant="outline" size="sm" onClick={markAllAsRead}>
              <CheckCircle className="h-4 w-4 mr-2" />
              Mark all as read
            </Button>
          </div>
        )}
      </div>

      {updates.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Bell className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">No updates yet</h3>
            <p className="text-muted-foreground text-center max-w-sm">
              We'll keep you informed about important changes to your invoices and account!
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {updates.map((update, index) => (
            <div key={update.id} className="relative">
              {index < updates.length - 1 && (
                <div className="absolute left-6 top-16 w-px h-6 bg-border" />
              )}
              
              <Card 
                className={`transition-all hover:shadow-md ${
                  !update.read ? 'ring-2 ring-primary/20 bg-primary/5' : ''
                }`}
                onClick={() => !update.read && markAsRead(update.id)}
              >
                <CardContent className="p-6">
                  <div className="flex gap-4">
                    <div className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center ${
                      !update.read ? 'bg-primary/10' : 'bg-muted'
                    }`}>
                      {getUpdateIcon(update.type)}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge 
                          variant={update.type === 'overdue' ? 'destructive' : 
                                 update.type === 'payment' ? 'success' : 
                                 update.type === 'reminder' ? 'warning' : 'secondary'}
                          className="text-xs"
                        >
                          {update.type?.charAt(0).toUpperCase() + update.type?.slice(1) || 'Update'}
                        </Badge>
                        <span className="text-sm text-muted-foreground">
                          {new Date(update.date).toLocaleDateString()}
                        </span>
                        {!update.read && (
                          <div className="w-2 h-2 bg-primary rounded-full" />
                        )}
                      </div>
                      
                      <p className={`${!update.read ? 'font-medium' : ''}`}>
                        {renderContent(update.content)}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Updates;
