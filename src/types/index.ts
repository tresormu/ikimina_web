// User and Authentication Types
export interface User {
  id: string;
  phone: string;
  fullName: string;
  nationalId: string;
  profilePhoto?: string;
  role: 'member' | 'treasurer' | 'lender' | 'admin';
  createdAt: string;
  updatedAt: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

// Group Types
export interface Group {
  id: string;
  name: string;
  inviteCode: string;
  contributionAmount: number;
  frequency: 'weekly' | 'biweekly' | 'monthly';
  currentCycle: number;
  currentWeek: number;
  totalMembers: number;
  createdAt: string;
  updatedAt: string;
}

export interface GroupMember {
  id: string;
  userId: string;
  groupId: string;
  user: User;
  joinDate: string;
  isActive: boolean;
  contributionHistory: Contribution[];
}

// Contribution Types
export interface Contribution {
  id: string;
  memberId: string;
  groupId: string;
  weekNumber: number;
  cycleNumber: number;
  amount: number;
  transactionId: string;
  status: 'pending' | 'confirmed' | 'failed';
  submittedAt: string;
  confirmedAt?: string;
  failureReason?: string;
}

export interface ContributionStatus {
  memberId: string;
  memberName: string;
  memberPhone: string;
  status: 'paid' | 'missed' | 'pending';
  amount?: number;
  transactionId?: string;
}

// Credit Score Types
export interface CreditScore {
  id: string;
  userId: string;
  score: number;
  category: 'Poor' | 'Fair' | 'Good' | 'Excellent';
  breakdown: {
    onTimePaymentPercentage: number;
    tenureInMonths: number;
    missedPaymentCount: number;
    loanRepaymentRecord: number;
    groupSize: number;
  };
  calculatedAt: string;
}

export interface CreditReport {
  user: User;
  creditScore: CreditScore;
  contributionHistory: Contribution[];
  groupDetails: Group[];
  tenureInMonths: number;
  generatedAt: string;
}

// Loan Types
export interface LoanRequest {
  id: string;
  requesterId: string;
  groupId: string;
  amount: number;
  reason: string;
  status: 'pending' | 'approved' | 'declined';
  votesFor: number;
  votesAgainst: number;
  totalVotesNeeded: number;
  createdAt: string;
  resolvedAt?: string;
}

export interface Loan {
  id: string;
  loanRequestId: string;
  borrowerId: string;
  amount: number;
  repaymentSchedule: LoanRepayment[];
  totalRepaid: number;
  remainingBalance: number;
  status: 'active' | 'completed' | 'defaulted';
  disbursedAt: string;
  completedAt?: string;
}

export interface LoanRepayment {
  id: string;
  loanId: string;
  amount: number;
  dueDate: string;
  paidAt?: string;
  status: 'pending' | 'paid' | 'overdue';
}

// Dispute Types
export interface Dispute {
  id: string;
  memberId: string;
  groupId: string;
  weekNumber: number;
  cycleNumber: number;
  description: string;
  status: 'open' | 'resolved' | 'escalated';
  resolutionNote?: string;
  createdAt: string;
  resolvedAt?: string;
  escalatedAt?: string;
}

// Notification Types
export interface Notification {
  id: string;
  userId: string;
  type: 'contribution_reminder' | 'contribution_confirmed' | 'contribution_failed' | 'your_turn' | 'loan_request' | 'loan_approved' | 'loan_declined' | 'missed_payment' | 'credit_score_updated' | 'new_member' | 'dispute_raised';
  title: string;
  message: string;
  isRead: boolean;
  createdAt: string;
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  error?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

// Form Types
export interface LoginFormData {
  phone: string;
  otp?: string;
}

export interface GroupFormData {
  name: string;
  contributionAmount: number;
  frequency: 'weekly' | 'biweekly' | 'monthly';
}

export interface LoanRequestFormData {
  amount: number;
  reason: string;
}

export interface DisputeFormData {
  description: string;
  weekNumber: number;
  cycleNumber: number;
}

// Dashboard Types
export interface TreasurerDashboard {
  groupOverview: {
    totalMembers: number;
    currentCycle: number;
    currentWeek: number;
    potAmount: number;
    thisWeekRecipient: {
      name: string;
      phone: string;
    };
  };
  memberStatuses: ContributionStatus[];
  totalCollectedThisWeek: number;
  totalExpectedThisWeek: number;
  recentActivity: Notification[];
}

export interface LenderDashboard {
  totalReportsPurchased: number;
  totalSpent: number;
  recentPurchases: {
    id: string;
    memberName: string;
    amount: number;
    purchasedAt: string;
  }[];
  prepaidBalance: number;
}

export interface AdminDashboard {
  totalGroups: number;
  totalLenders: number;
  totalRevenue: number;
  activeDisputes: number;
  recentActivity: {
    type: string;
    description: string;
    timestamp: string;
  }[];
}
