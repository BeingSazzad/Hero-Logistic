import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// Deployment: Vercel-Ready v1.0.1
import './App.css';

// ── Layouts ──────────────────────────────────────────────────────
import AdminLayout from '@shared/layouts/AdminLayout';
import DispatchLayout from '@shared/layouts/DispatchLayout';
import DriverLayout from '@shared/layouts/DriverLayout';
import WarehouseLayout from '@shared/layouts/WarehouseLayout';
import AccountsLayout from '@shared/layouts/AccountsLayout';
import PlatformLayout from '@shared/layouts/PlatformLayout';
import CustomerLayout from '@shared/layouts/CustomerLayout';

// ── Auth ─────────────────────────────────────────────────────────
import Login from '@features/auth/pages/Login';

// ── Admin ────────────────────────────────────────────────────────
import AdminDashboard from '@features/jobs/pages/AdminDashboard';
import AdminCompanySetup from '@features/jobs/pages/CompanySetup';
import AdminFleetManagement from '@features/fleet/pages/FleetManagement';
import AdminDriverManagement from '@features/fleet/pages/DriverManagement';
import AdminUsers from '@features/auth/pages/Users';
import AdminJobsConfig from '@features/jobs/pages/JobsConfig';
import AdminCustomers from '@features/jobs/pages/Customers';
import AdminFinance from '@features/finance/pages/Finance';
import AdminMessaging from '@features/jobs/pages/Messaging';
import AdminReports from '@features/jobs/pages/AdminReports';
import AdminNotifications from '@features/jobs/pages/AdminNotifications';
import AdminHelpline from '@features/jobs/pages/Helpline';
import AdminIntegrations from '@features/jobs/pages/Integrations';
import AdminAuditLogs from '@features/jobs/pages/AdminAuditLogs';
import AdminAddVehicle from '@features/fleet/pages/AddVehicle';
import AdminAddDriver from '@features/fleet/pages/AddDriver';
import AdminAddCustomer from '@features/jobs/pages/AddCustomer';
import AdminInviteUser from '@features/auth/pages/AddUser';
import AdminDriverDetail from '@features/fleet/pages/DriverDetail';
import AdminVehicleDetail from '@features/fleet/pages/VehicleDetail';
import AdminSettings from '@features/jobs/pages/AdminSettings';
import AdminLoads from '@features/jobs/pages/Loads';
import AdminCreateLoad from '@features/jobs/pages/CreateLoad';
import AdminLoadDetail from '@features/jobs/pages/LoadDetail';
import AdminExceptions from '@features/jobs/pages/Exceptions';
import AdminBranches from '@features/jobs/pages/Branches';
import AdminAddBranch from '@features/jobs/pages/AddBranch';
import AdminBranchDetail from '@features/jobs/pages/BranchDetail';
import AdminCustomerDetail from '@features/jobs/pages/CustomerDetail';
import AdminUserDetail from '@features/auth/pages/UserDetail';
import AdminSafetyChecklists from '@features/jobs/pages/SafetyChecklists';
import AdminBilling from '@features/finance/pages/Billing';
import AdminSubscriptionPlans from '@features/finance/pages/SubscriptionPlans';
import AdminVehicleRegistry from '@features/fleet/pages/VehicleRegistry';
import AdminEditLoad from '@features/jobs/pages/EditLoad';

// ── Dispatch ─────────────────────────────────────────────────────
import DispatchDashboard from '@features/jobs/pages/DispatchDashboard';
import DispatchJobs from '@features/jobs/pages/Jobs';
import DispatchJobDetail from '@features/jobs/pages/JobDetail';
import DispatchCreateJob from '@features/jobs/pages/CreateJob';
import DispatchLoadInbox from '@features/jobs/pages/LoadInbox';
import DispatchTracking from '@features/tracking/pages/Tracking';
import DispatchDrivers from '@features/fleet/pages/Drivers';
import DispatchMessages from '@features/jobs/pages/DispatchMessages';
import DispatchSettings from '@features/jobs/pages/DispatchSettings';
import DispatchVehicleDetail from '@features/fleet/pages/VehicleDetail';
import DispatchFleet from '@features/fleet/pages/Fleet';
import DispatchTerminal from '@features/jobs/pages/TerminalWorkspace';
import DispatchAssetRegistry from '@features/fleet/pages/AssetRegistry';
import DispatchVehicleRegistry from '@features/fleet/pages/VehicleRegistry';
import DispatchEditJob from '@features/jobs/pages/EditJob';

// ── Driver ───────────────────────────────────────────────────────
import DriverHome from '@features/jobs/pages/Home';
import DriverSafetyCheck from '@features/jobs/pages/SafetyCheck';
import DriverActiveTrip from '@features/jobs/pages/ActiveTrip';
import DriverJobs from '@features/jobs/pages/Jobs';
import DriverExpenses from '@features/jobs/pages/Expenses';
import DriverIncident from '@features/jobs/pages/Incident';
import DriverProfile from '@features/auth/pages/Profile';
import DriverMessages from '@features/jobs/pages/DriverMessages';
import DriverNotifications from '@features/jobs/pages/DriverNotifications';
import DriverCreateDraft from '@features/jobs/pages/CreateDraft';
import DriverJobDetail from '@features/jobs/pages/JobDetail';
import DriverEditJob from '@features/jobs/pages/EditJob';

// ── Warehouse ────────────────────────────────────────────────────
import WarehouseDashboard from '@features/inventory/pages/WarehouseDashboard';
import WarehouseInbound from '@features/inventory/pages/Inbound';
import WarehouseOutbound from '@features/inventory/pages/Outbound';
import WarehouseInventory from '@features/inventory/pages/Inventory';

// ── Accounts ─────────────────────────────────────────────────────
import AccountsDashboard from '@features/finance/pages/AccountsDashboard';
import AccountsPODReview from '@features/finance/pages/PODReview';
import AccountsInvoices from '@features/finance/pages/Invoices';
import AccountsPayments from '@features/finance/pages/Payments';
import AccountsReimbursements from '@features/finance/pages/Reimbursements';
import AccountsSettlements from '@features/finance/pages/Settlements';
import AccountsReports from '@features/finance/pages/AccountsReports';

// ── Platform ─────────────────────────────────────────────────────
import PlatformDashboard from '@features/platform/pages/PlatformDashboard';
import PlatformTenants from '@features/platform/pages/Tenants';
import PlatformTenantDetail from '@features/platform/pages/TenantDetail';
import PlatformAnalytics from '@features/platform/pages/PlatformAnalytics';
import PlatformSubscriptions from '@features/platform/pages/Subscriptions';
import PlatformSupport from '@features/platform/pages/Support';
import PlatformSupportDetail from '@features/platform/pages/SupportDetail';
import PlatformTransactions from '@features/platform/pages/Transactions';
import PlatformSettings from '@features/platform/pages/PlatformSettings';
import PlatformAuditLogs from '@features/platform/pages/PlatformAuditLogs';

// ── Customer (Public Tracking) ───────────────────────────────────
import TrackLoad from '@features/tracking/pages/TrackLoad';
// ── Customer Portal ─────────────────────────────────────────────
import CustomerDashboard from '@features/jobs/pages/CustomerDashboard';
import CustomerTracking  from '@features/tracking/pages/Tracking';
import CustomerInvoices  from '@features/finance/pages/Invoices';
import CustomerAccount   from '@features/auth/pages/Account';

// ── 404 ──────────────────────────────────────────────────────────
import NotFound from '@shared/components/NotFound';

function App() {
  return (
    <Router>
      <Routes>
        {/* Root → Login */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />

        {/* ── ADMIN ── */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="company" element={<AdminCompanySetup />} />
          <Route path="fleet" element={<AdminFleetManagement />} />
          <Route path="fleet/add" element={<AdminAddVehicle />} />
          <Route path="fleet/:vehicleId" element={<AdminVehicleDetail />} />
          <Route path="drivers" element={<AdminDriverManagement />} />
          <Route path="drivers/add" element={<AdminAddDriver />} />
          <Route path="drivers/:driverId" element={<AdminDriverDetail />} />
          <Route path="users" element={<AdminUsers />} />
          <Route path="users/invite" element={<AdminInviteUser />} />
          <Route path="users/:id" element={<AdminUserDetail />} />
          <Route path="loads" element={<AdminLoads />} />
          <Route path="loads/create" element={<AdminCreateLoad />} />
          <Route path="loads/edit/:id" element={<AdminEditLoad />} />
          <Route path="loads/:id" element={<AdminLoadDetail />} />
          <Route path="vehicle-registry" element={<AdminVehicleRegistry />} />
          <Route path="exceptions" element={<AdminExceptions />} />
          <Route path="jobs-config" element={<AdminJobsConfig />} />
          <Route path="branches" element={<AdminBranches />} />
          <Route path="branches/add" element={<AdminAddBranch />} />
          <Route path="branches/:id" element={<AdminBranchDetail />} />
          <Route path="customers" element={<AdminCustomers />} />
          <Route path="customers/add" element={<AdminAddCustomer />} />
          <Route path="customers/:id" element={<AdminCustomerDetail />} />
          <Route path="finance" element={<AdminFinance />} />
          <Route path="messaging" element={<AdminMessaging />} />
          <Route path="reports" element={<AdminReports />} />
          <Route path="notifications" element={<AdminNotifications />} />
          <Route path="helpline" element={<AdminHelpline />} />
          <Route path="integrations" element={<AdminIntegrations />} />
          <Route path="audit" element={<AdminAuditLogs />} />
          <Route path="safety-checklists" element={<AdminSafetyChecklists />} />
          <Route path="settings" element={<AdminSettings />} />
          <Route path="billing" element={<AdminBilling />} />
          <Route path="billing/plans" element={<AdminSubscriptionPlans />} />
        </Route>

        {/* ── DISPATCH ── */}
        <Route path="/dispatch" element={<DispatchLayout />}>
          <Route index element={<DispatchDashboard />} />
          <Route path="loads" element={<DispatchJobs />} />
          <Route path="inbox" element={<DispatchLoadInbox />} />
          <Route path="loads/create" element={<DispatchCreateJob />} />
          <Route path="loads/edit/:id" element={<DispatchEditJob />} />
          <Route path="loads/:id" element={<DispatchJobDetail />} />
          <Route path="tracking" element={<DispatchTracking />} />
          <Route path="drivers" element={<DispatchDrivers />} />
          <Route path="drivers/add" element={<AdminAddDriver />} />
          <Route path="drivers/:driverId" element={<AdminDriverDetail />} />
          <Route path="messages" element={<DispatchMessages />} />
          <Route path="settings" element={<DispatchSettings />} />
          <Route path="fleet" element={<DispatchFleet />} />
          <Route path="vehicles/:vehicleId" element={<DispatchVehicleDetail />} />
          <Route path="terminal" element={<DispatchTerminal />} />
          <Route path="asset-registry" element={<DispatchAssetRegistry />} />
          <Route path="vehicle-registry" element={<DispatchVehicleRegistry />} />
        </Route>

        {/* ── DRIVER ── */}
        <Route path="/driver" element={<DriverLayout />}>
          <Route index element={<DriverHome />} />
          <Route path="safety-check" element={<DriverSafetyCheck />} />
          <Route path="active" element={<DriverActiveTrip />} />
          <Route path="draft" element={<DriverCreateDraft />} />
          <Route path="loads" element={<DriverJobs />} />
          <Route path="loads/edit/:id" element={<DriverEditJob />} />
          <Route path="loads/:id" element={<DriverJobDetail />} />
          <Route path="expenses" element={<DriverExpenses />} />
          <Route path="pay" element={<DriverExpenses />} />
          <Route path="incident" element={<DriverIncident />} />
          <Route path="profile" element={<DriverProfile />} />
          <Route path="messages" element={<DriverMessages />} />
          <Route path="notifications" element={<DriverNotifications />} />
        </Route>

        {/* ── WAREHOUSE ── */}
        <Route path="/warehouse" element={<WarehouseLayout />}>
          <Route index element={<WarehouseDashboard />} />
          <Route path="inbound" element={<WarehouseInbound />} />
          <Route path="outbound" element={<WarehouseOutbound />} />
          <Route path="inventory" element={<WarehouseInventory />} />
        </Route>

        {/* ── ACCOUNTS ── */}
        <Route path="/accounts" element={<AccountsLayout />}>
          <Route index element={<AccountsDashboard />} />
          <Route path="pod-review" element={<AccountsPODReview />} />
          <Route path="invoices" element={<AccountsInvoices />} />
          <Route path="payments" element={<AccountsPayments />} />
          <Route path="reimbursements" element={<AccountsReimbursements />} />
          <Route path="settlements" element={<AccountsSettlements />} />
          <Route path="reports" element={<AccountsReports />} />
        </Route>

        {/* ── PLATFORM OWNER ── */}
        <Route path="/platform" element={<PlatformLayout />}>
          <Route index element={<PlatformDashboard />} />
          <Route path="tenants" element={<PlatformTenants />} />
          <Route path="tenants/new" element={<PlatformTenants />} />
          <Route path="tenants/:id" element={<PlatformTenantDetail />} />
          <Route path="analytics" element={<PlatformAnalytics />} />
          <Route path="subscriptions" element={<PlatformSubscriptions />} />
          <Route path="support" element={<PlatformSupport />} />
          <Route path="support/:id" element={<PlatformSupportDetail />} />
          <Route path="transactions" element={<PlatformTransactions />} />
          <Route path="settings" element={<PlatformSettings />} />
          <Route path="settings/audit" element={<PlatformAuditLogs />} />
        </Route>

        {/* ── CUSTOMER TRACKING (public, no login) ── */}
        <Route path="/track" element={<TrackLoad />} />

        {/* ── CUSTOMER PORTAL ── */}
        <Route path="/customer" element={<CustomerLayout />}>
          <Route index element={<CustomerDashboard />} />
          <Route path="tracking" element={<CustomerTracking />} />
          <Route path="invoices" element={<CustomerInvoices />} />
          <Route path="account"  element={<CustomerAccount />} />
        </Route>

        {/* ── 404 ── */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
