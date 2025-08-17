import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Shield, Users, Settings, ArrowRight, Lock } from "lucide-react";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 flex flex-col">
      {/* Hero Section */}
      <div className="flex-1 flex items-center justify-center px-4 py-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md space-y-8"
        >
          {/* Header */}
          <div className="text-center space-y-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="flex justify-center"
            >
              <Badge variant="secondary" className="px-4 py-2 rounded-full">
                <Lock className="w-4 h-4 mr-2" />
                Secure Access
              </Badge>
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="text-4xl font-bold tracking-tight text-foreground"
            >
              Agency Portal
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-lg text-muted-foreground max-w-sm mx-auto"
            >
              Access your dashboard and manage your account with secure authentication
            </motion.p>
          </div>

          {/* Authentication Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            <Card className="shadow-lg border-0 bg-card/50 backdrop-blur-sm">
              <CardHeader className="text-center pb-4">
                <CardTitle className="text-xl">Choose Your Access Level</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button 
                  asChild 
                  size="lg" 
                  className="w-full h-12 text-base font-medium group"
                  aria-label="Access admin dashboard"
                >
                  <Link to="/admin" className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Settings className="w-5 h-5 mr-3" />
                      Admin Login
                    </div>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
                
                <Button 
                  asChild 
                  variant="outline" 
                  size="lg" 
                  className="w-full h-12 text-base font-medium group border-2 hover:bg-accent/50"
                  aria-label="Access user dashboard"
                >
                  <Link to="/user" className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Users className="w-5 h-5 mr-3" />
                      User Login
                    </div>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </div>

      {/* Footer */}
      <motion.footer 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.6 }}
        className="py-6 px-4 border-t border-border/50 bg-background/50 backdrop-blur-sm"
      >
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4" />
            <span>Secured by enterprise-grade encryption</span>
          </div>
          <div className="flex items-center gap-6">
            <Link to="/terms" className="hover:text-foreground transition-colors">
              Terms
            </Link>
            <Link to="/privacy" className="hover:text-foreground transition-colors">
              Privacy
            </Link>
            <Link to="/support" className="hover:text-foreground transition-colors">
              Support
            </Link>
          </div>
        </div>
      </motion.footer>
    </div>
  );
};

export default LandingPage;
