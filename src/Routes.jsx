import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import ExecutiveSecuritySummary from './pages/executive-security-summary';
import SecurityOperationsCenterOverview from './pages/security-operations-center-overview';
import ThreatIntelligenceAnalytics from './pages/threat-intelligence-analytics';
import VulnerabilityManagementDashboard from './pages/vulnerability-management-dashboard';
import ApiIntegrationConfiguration from './pages/api-integration-configuration';
import UserProfileManagement from './pages/user-profile-management';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<ExecutiveSecuritySummary />} />
        <Route path="/executive-security-summary" element={<ExecutiveSecuritySummary />} />
        <Route path="/security-operations-center-overview" element={<SecurityOperationsCenterOverview />} />
        <Route path="/threat-intelligence-analytics" element={<ThreatIntelligenceAnalytics />} />
        <Route path="/vulnerability-management-dashboard" element={<VulnerabilityManagementDashboard />} />
        <Route path="/api-integration-configuration" element={<ApiIntegrationConfiguration />} />
        <Route path="/user-profile-management" element={<UserProfileManagement />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;