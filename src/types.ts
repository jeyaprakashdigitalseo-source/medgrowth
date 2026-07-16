export interface Hospital {
  id: string;
  name: string;
  specialty: string;
  address: string;
  logoColor: string;
  accentColor: string;
}

export type CampaignStatus = "Excellent" | "Good" | "Average" | "Poor";

export interface Campaign {
  id: string;
  name: string;
  budget: number;
  leads: number;
  appointments: number;
  patients: number;
  roi: number; // multiplier, e.g. 6.8
  status: CampaignStatus;
  leadTrend: number[];
}

export type ActivityType =
  | "Newspaper Editorial"
  | "TV Interview"
  | "Instagram Reel"
  | "YouTube Video"
  | "Photoshoot"
  | "Meta Campaign"
  | "Google Campaign"
  | "Influencer Collaboration"
  | "Video Shoot"
  | "Events"
  | "Others";

export interface MarketingActivity {
  id: string;
  type: ActivityType;
  title: string;
  date: string;
  budget: number;
  status: "Completed" | "In Progress" | "Scheduled";
  previewUrl?: string;
  description?: string;
  subCategory?: string;
  hospital?: string;
  campaign?: string;
  department?: string;
  vendor?: string;
  marketingObjective?: string;
  startDate?: string;
  endDate?: string;
  expectedReach?: number;
  actualReach?: number;
  impressions?: number;
  clicks?: number;
  leads?: number;
  calls?: number;
  appointments?: number;
  patients?: number;
  revenue?: number;
  roi?: number;
  images?: string[];
  videos?: string[];
  invoices?: string[];
  pdfs?: string[];
}

export interface ExpenseBreakdown {
  category: string;
  budget: number;
  color: string;
}

export interface MonthlyComparison {
  id: string;
  metricName: string;
  juneVal: string | number;
  julyVal: string | number;
  growth: number; // positive or negative
  isCurrency?: boolean;
  isMultiplier?: boolean;
}

export interface Task {
  id: string;
  text: string;
  completed: boolean;
  dueDate: string;
  category: string;
}

export interface UpcomingActivity {
  id: string;
  title: string;
  date: string;
  time: string;
  type: string;
}

export interface Alert {
  id: string;
  type: "warning" | "danger" | "info";
  text: string;
  source: string;
}

export interface CalendarEvent {
  id: string;
  day: number; // Day of July 2026
  title: string;
  type:
    | "Campaign Launch"
    | "Doctor Visit"
    | "Video Shoot"
    | "TV Interview"
    | "Newspaper Publication"
    | "Influencer Campaign"
    | "Blog Publish"
    | "Festival Campaign";
  budget?: number;
}

export interface MediaItem {
  id: string;
  category:
    | "Newspaper"
    | "TV"
    | "Reels"
    | "Videos"
    | "Photos"
    | "Testimonials"
    | "Posters"
    | "Certificates";
  title: string;
  date: string;
  thumbnail: string;
  aspect: "aspect-video" | "aspect-square" | "aspect-[3/4]";
}

export interface SuggestedAllocation {
  category: string;
  percentage: number;
  reasoning: string;
}

export interface AIInsights {
  topCampaign: string;
  highestRoi: string;
  bestLeadSource: string;
  worstPerformingActivity: string;
  suggestedAllocation: SuggestedAllocation[];
  healthScore: number;
  executiveSummary: string;
}
