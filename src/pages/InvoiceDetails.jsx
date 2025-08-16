import { useParams, Link } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const InvoiceDetails = () => {
  const { id } = useParams();
  
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Invoice #{id}</h1>
      <Card>
        <CardHeader>
          <CardTitle>Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Details for invoice #{id} will appear here.</p>
          <div className="mt-4">
            <Button asChild variant="outline">
              <Link to="/user/invoices">Back to Invoices</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default InvoiceDetails;