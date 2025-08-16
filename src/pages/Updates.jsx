import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Updates = () => {
  const [updates, setUpdates] = useState([
    { id: 1, content: "Your invoice #1234 has been paid", date: "2023-03-01" },
    { id: 2, content: "New feature: You can now download invoice PDFs", date: "2023-02-28" },
    { id: 3, content: "Reminder: Invoice #5678 is due next week", date: "2023-02-25" },
  ]);

  const renderContent = (text) => {
    const regex = /invoice\s+#(\d+)/gi;
    const parts = [];
    let lastIndex = 0;
    let match;
    
    while ((match = regex.exec(text)) !== null) {
      parts.push(text.slice(lastIndex, match.index));
      const id = match[1];
      parts.push(
        <Link 
          key={match.index} 
          to={`/user/invoices/${id}`} 
          className="text-blue-600 hover:underline"
        >
          {`invoice #${id}`}
        </Link>
      );
      lastIndex = regex.lastIndex;
    }
    parts.push(text.slice(lastIndex));
    return parts;
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Your Updates</h1>
      {updates.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground text-lg">
            You're all caught up. We'll notify you when there's something new.
          </p>
        </div>
      ) : (
        <div>
          {updates.map((update) => (
            <Card key={update.id} className="mb-4">
              <CardHeader>
                <CardTitle>{update.date}</CardTitle>
              </CardHeader>
              <CardContent>
                <p>{renderContent(update.content)}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default Updates;
