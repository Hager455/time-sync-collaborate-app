
import React from "react";
import CalendarPage from "./Calendar";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

const Index = () => {
  return (
    <div className="flex flex-col gap-4">
      <Alert variant="warning" className="bg-yellow-50 border-yellow-200 mx-4 mt-4">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          Backend connection ready: Replace API_BASE_URL in src/api/eventService.ts with your Spring Boot server URL.
        </AlertDescription>
      </Alert>
      <CalendarPage />
    </div>
  );
};

export default Index;
