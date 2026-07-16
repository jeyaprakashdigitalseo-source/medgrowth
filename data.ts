import { Hospital, Campaign, MarketingActivity, ExpenseBreakdown, MonthlyComparison, Task, UpcomingActivity, Alert, CalendarEvent, MediaItem } from "./types";

// Hospitals
export const HOSPITALS: Hospital[] = [
  {
    id: "epione",
    name: "Epione Pain Management Centre",
    specialty: "Clinical Sciatica & Joint-Pain Therapies",
    address: "42 Healthcare Boulevard, Suite A",
    logoColor: "bg-blue-600",
    accentColor: "#2563EB"
  },
  {
    id: "apollo",
    name: "Apollo Heart & Vascular Institute",
    specialty: "Interventional Cardiology & Cardio-Rehab",
    address: "712 Cardiovascular Drive",
    logoColor: "bg-red-600",
    accentColor: "#DC2626"
  },
  {
    id: "zenith",
    name: "Zenith Joint Care Centre",
    specialty: "Orthopedic Care & Knee/Hip Arthroplasty",
    address: "99 Ortho-Surgical Plaza",
    logoColor: "bg-purple-600",
    accentColor: "#7C3AED"
  }
];

// Epione Data (July vs June)
export const EPIONE_DATA = {
  july: {
    metrics: {
      spend: "₹342,000",
      spendGrowth: "+18%",
      leads: "586",
      leadsGrowth: "+14%",
      appointments: "218",
      appointmentsGrowth: "+10%",
      patients: "149",
      patientsGrowth: "+12%",
      revenue: "₹18.4 Lakhs",
      revenueGrowth: "+22%",
      roi: "5.4X",
      roiGrowth: "Excellent",
      // sparklines
      spendSparkline: [210, 240, 280, 260, 290, 310, 342],
      leadsSparkline: [410, 430, 480, 460, 510, 550, 586],
      appointmentsSparkline: [160, 175, 190, 185, 200, 210, 218],
      patientsSparkline: [110, 115, 125, 122, 135, 140, 149],
      revenueSparkline: [12, 13.5, 15, 14.2, 16.5, 17.8, 18.4],
      roiSparkline: [4.8, 4.9, 5.1, 5.0, 5.2, 5.3, 5.4],
    },
    chartMonthlySpend: [
      { month: "January", spend: 180000, leads: 280, appointments: 98 },
      { month: "February", spend: 210000, leads: 340, appointments: 120 },
      { month: "March", spend: 235000, leads: 380, appointments: 145 },
      { month: "April", spend: 260000, leads: 430, appointments: 168 },
      { month: "May", spend: 290000, leads: 490, appointments: 185 },
      { month: "June", spend: 310000, leads: 520, appointments: 198 },
      { month: "July", spend: 342000, leads: 586, appointments: 218 }
    ],
    campaigns: [
      { id: "c1", name: "Back Pain Therapy (Google Search)", budget: 25000, leads: 82, appointments: 31, patients: 18, roi: 6.8, status: "Excellent", leadTrend: [2, 5, 4, 8, 7, 10, 12] },
      { id: "c2", name: "Shoulder Rehab (Meta Video Reels)", budget: 18000, leads: 45, appointments: 17, patients: 10, roi: 5.2, status: "Good", leadTrend: [1, 3, 2, 5, 4, 6, 7] },
      { id: "c3", name: "Knee Joint Pain (Google Search)", budget: 30000, leads: 96, appointments: 38, patients: 24, roi: 7.1, status: "Excellent", leadTrend: [3, 4, 6, 8, 9, 11, 14] },
      { id: "c4", name: "Migraine Clinical Therapy (Meta Ads)", budget: 15000, leads: 38, appointments: 12, patients: 8, roi: 4.1, status: "Average", leadTrend: [1, 2, 2, 3, 4, 3, 4] }
    ] as Campaign[],
    leadSources: [
      { name: "Google Ads", value: 246, color: "#2563EB" },
      { name: "Meta Ads", value: 164, color: "#1877F2" },
      { name: "SEO", value: 72, color: "#10B981" },
      { name: "Website", value: 45, color: "#6366F1" },
      { name: "Influencer", value: 28, color: "#EC4899" },
      { name: "Walk In", value: 16, color: "#F59E0B" },
      { name: "Referral", value: 11, color: "#8B5CF6" },
      { name: "TV", value: 4, color: "#EF4444" }
    ],
    expenseBreakdown: [
      { category: "Meta Ads", budget: 85000, color: "#1877F2" },
      { category: "Google Ads", budget: 110000, color: "#4285F4" },
      { category: "SEO", budget: 35000, color: "#10B981" },
      { category: "Newspaper", budget: 40000, color: "#78716C" },
      { category: "Influencer", budget: 25000, color: "#EC4899" },
      { category: "TV", budget: 30000, color: "#6366F1" },
      { category: "Video Shoot", budget: 12000, color: "#EF4444" },
      { category: "Photography", budget: 5000, color: "#F59E0B" },
      { category: "Events", budget: 0, color: "#8B5CF6" },
      { category: "Others", budget: 0, color: "#94A3B8" }
    ] as ExpenseBreakdown[],
    comparisons: [
      { id: "comp1", metricName: "Marketing Spend", juneVal: 310000, julyVal: 342000, growth: 10, isCurrency: true },
      { id: "comp2", metricName: "Leads Captured", juneVal: 520, julyVal: 586, growth: 12 },
      { id: "comp3", metricName: "Appointments Scheduled", juneVal: 198, julyVal: 218, growth: 10 },
      { id: "comp4", metricName: "Patients Visited", juneVal: 135, julyVal: 149, growth: 11 },
      { id: "comp5", metricName: "Generated Revenue", juneVal: "15.1L", julyVal: "18.4L", growth: 22 },
      { id: "comp6", metricName: "Overall ROI Factor", juneVal: 4.8, julyVal: 5.4, growth: 12, isMultiplier: true }
    ] as MonthlyComparison[]
  },
  june: {
    metrics: {
      spend: "₹310,000",
      spendGrowth: "+12%",
      leads: "520",
      leadsGrowth: "+9%",
      appointments: "198",
      appointmentsGrowth: "+6%",
      patients: "135",
      patientsGrowth: "+8%",
      revenue: "₹15.1 Lakhs",
      revenueGrowth: "+15%",
      roi: "4.8X",
      roiGrowth: "Good",
      spendSparkline: [190, 210, 220, 240, 270, 290, 310],
      leadsSparkline: [380, 410, 420, 440, 480, 500, 520],
      appointmentsSparkline: [130, 145, 150, 165, 180, 190, 198],
      patientsSparkline: [95, 102, 108, 115, 122, 128, 135],
      revenueSparkline: [10.5, 11.2, 12.0, 13.1, 14.2, 14.8, 15.1],
      roiSparkline: [4.2, 4.3, 4.4, 4.5, 4.6, 4.7, 4.8],
    },
    chartMonthlySpend: [
      { month: "January", spend: 180000, leads: 280, appointments: 98 },
      { month: "February", spend: 210000, leads: 340, appointments: 120 },
      { month: "March", spend: 235000, leads: 380, appointments: 145 },
      { month: "April", spend: 260000, leads: 430, appointments: 168 },
      { month: "May", spend: 290000, leads: 490, appointments: 185 },
      { month: "June", spend: 310000, leads: 520, appointments: 198 }
    ],
    campaigns: [
      { id: "c1", name: "Back Pain Therapy (Google Search)", budget: 22000, leads: 70, appointments: 26, patients: 14, roi: 6.2, status: "Excellent", leadTrend: [2, 3, 4, 5, 6, 7, 8] },
      { id: "c2", name: "Shoulder Rehab (Meta Video Reels)", budget: 16000, leads: 38, appointments: 14, patients: 8, roi: 4.8, status: "Good", leadTrend: [1, 2, 2, 3, 3, 4, 5] },
      { id: "c3", name: "Knee Joint Pain (Google Search)", budget: 28000, leads: 84, appointments: 32, patients: 20, roi: 6.8, status: "Excellent", leadTrend: [2, 3, 5, 6, 7, 8, 10] }
    ] as Campaign[],
    leadSources: [
      { name: "Google Ads", value: 210, color: "#2563EB" },
      { name: "Meta Ads", value: 145, color: "#1877F2" },
      { name: "SEO", value: 65, color: "#10B981" },
      { name: "Website", value: 40, color: "#6366F1" },
      { name: "Influencer", value: 25, color: "#EC4899" },
      { name: "Walk In", value: 15, color: "#F59E0B" },
      { name: "Referral", value: 10, color: "#8B5CF6" },
      { name: "TV", value: 10, color: "#EF4444" }
    ],
    expenseBreakdown: [
      { category: "Meta Ads", budget: 75000, color: "#1877F2" },
      { category: "Google Ads", budget: 95000, color: "#4285F4" },
      { category: "SEO", budget: 30000, color: "#10B981" },
      { category: "Newspaper", budget: 45000, color: "#78716C" },
      { category: "Influencer", budget: 25000, color: "#EC4899" },
      { category: "TV", budget: 40000, color: "#6366F1" }
    ] as ExpenseBreakdown[],
    comparisons: [
      { id: "comp1", metricName: "Marketing Spend", juneVal: 290000, julyVal: 310000, growth: 7, isCurrency: true },
      { id: "comp2", metricName: "Leads Captured", juneVal: 490, julyVal: 520, growth: 6 },
      { id: "comp3", metricName: "Appointments Scheduled", juneVal: 185, julyVal: 198, growth: 7 },
      { id: "comp4", metricName: "Patients Visited", juneVal: 122, julyVal: 135, growth: 10 },
      { id: "comp5", metricName: "Generated Revenue", juneVal: "13.4L", julyVal: "15.1L", growth: 12 },
      { id: "comp6", metricName: "Overall ROI Factor", juneVal: 4.5, julyVal: 4.8, growth: 6, isMultiplier: true }
    ] as MonthlyComparison[]
  }
};

// Apollo Heart & Vascular Data (July vs June)
export const APOLLO_DATA = {
  july: {
    metrics: {
      spend: "₹480,000",
      spendGrowth: "+24%",
      leads: "712",
      leadsGrowth: "+18%",
      appointments: "295",
      appointmentsGrowth: "+12%",
      patients: "188",
      patientsGrowth: "+15%",
      revenue: "₹26.5 Lakhs",
      revenueGrowth: "+28%",
      roi: "5.5X",
      roiGrowth: "Excellent",
      spendSparkline: [310, 340, 390, 420, 410, 450, 480],
      leadsSparkline: [520, 560, 590, 610, 630, 680, 712],
      appointmentsSparkline: [210, 230, 245, 260, 270, 280, 295],
      patientsSparkline: [130, 142, 150, 165, 172, 180, 188],
      revenueSparkline: [18, 20, 21.5, 23.2, 24.1, 25.4, 26.5],
      roiSparkline: [5.0, 5.1, 5.2, 5.3, 5.3, 5.4, 5.5],
    },
    chartMonthlySpend: [
      { month: "January", spend: 250000, leads: 390, appointments: 155 },
      { month: "February", spend: 280000, leads: 430, appointments: 180 },
      { month: "March", spend: 310000, leads: 480, appointments: 210 },
      { month: "April", spend: 350000, leads: 530, appointments: 235 },
      { month: "May", spend: 410000, leads: 610, appointments: 260 },
      { month: "June", spend: 450000, leads: 680, appointments: 280 },
      { month: "July", spend: 480000, leads: 712, appointments: 295 }
    ],
    campaigns: [
      { id: "ac1", name: "Coronary Bypass Consults (Search)", budget: 45000, leads: 112, appointments: 48, patients: 28, roi: 7.4, status: "Excellent", leadTrend: [4, 6, 8, 12, 14, 18, 22] },
      { id: "ac2", name: "Heart Healthy Screening (Meta Reels)", budget: 25000, leads: 95, appointments: 34, patients: 18, roi: 5.6, status: "Excellent", leadTrend: [2, 4, 5, 8, 9, 11, 13] },
      { id: "ac3", name: "Valvular Disease Awareness (SEO)", budget: 15000, leads: 42, appointments: 15, patients: 9, roi: 4.4, status: "Good", leadTrend: [1, 2, 3, 3, 4, 4, 5] },
      { id: "ac4", name: "Pediatric Cardiology Launch (Events)", budget: 35000, leads: 52, appointments: 18, patients: 11, roi: 3.8, status: "Average", leadTrend: [1, 1, 2, 4, 4, 5, 6] }
    ] as Campaign[],
    leadSources: [
      { name: "Google Ads", value: 310, color: "#2563EB" },
      { name: "Meta Ads", value: 195, color: "#1877F2" },
      { name: "SEO", value: 85, color: "#10B981" },
      { name: "Website", value: 55, color: "#6366F1" },
      { name: "Walk In", value: 32, color: "#F59E0B" },
      { name: "Referral", value: 25, color: "#8B5CF6" },
      { name: "TV", value: 10, color: "#EF4444" }
    ],
    expenseBreakdown: [
      { category: "Google Ads", budget: 180000, color: "#4285F4" },
      { category: "Meta Ads", budget: 120000, color: "#1877F2" },
      { category: "SEO", budget: 45000, color: "#10B981" },
      { category: "TV", budget: 55000, color: "#6366F1" },
      { category: "Events", budget: 40000, color: "#8B5CF6" },
      { category: "Newspaper", budget: 20000, color: "#78716C" },
      { category: "Video Shoot", budget: 20000, color: "#EF4444" }
    ] as ExpenseBreakdown[],
    comparisons: [
      { id: "acomp1", metricName: "Marketing Spend", juneVal: 450000, julyVal: 480000, growth: 7, isCurrency: true },
      { id: "acomp2", metricName: "Leads Captured", juneVal: 680, julyVal: 712, growth: 5 },
      { id: "acomp3", metricName: "Appointments Scheduled", juneVal: 280, julyVal: 295, growth: 5 },
      { id: "acomp4", metricName: "Patients Visited", juneVal: 180, julyVal: 188, growth: 4 },
      { id: "acomp5", metricName: "Generated Revenue", juneVal: "24.1L", julyVal: "26.5L", growth: 10 },
      { id: "acomp6", metricName: "Overall ROI Factor", juneVal: 5.4, julyVal: 5.5, growth: 2, isMultiplier: true }
    ] as MonthlyComparison[]
  }
};

// Recent activities
export const RECENT_ACTIVITIES_SEED: MarketingActivity[] = [
  {
    id: "act-101",
    type: "Newspaper Editorial",
    title: "Regional Sunday Chronicle Spine Health Special Feature",
    date: "July 12, 2026",
    budget: 40000,
    status: "Completed",
    description: "Full-page editorial showcase featuring Epione chief pain physicians detailing state-of-the-art sciatalgia treatment. Included physical hotline for offline phone tracking."
  },
  {
    id: "act-102",
    type: "TV Interview",
    title: "State Health News Live Doctor Joint Segment",
    date: "July 10, 2026",
    budget: 30000,
    status: "Completed",
    description: "10-minute live visual stream on prime time local health network detailing minimally invasive joint rehabilitation protocols."
  },
  {
    id: "act-103",
    type: "Instagram Reel",
    title: "Diaphragmatic Breathing Chronic Pain Loop Reel",
    date: "July 08, 2026",
    budget: 12000,
    status: "Completed",
    description: "Staged micro-video tutorial teaching quick breathing routines to stabilize neuropathic joint pain. Reached 18,000 localized views on Meta platform."
  },
  {
    id: "act-104",
    type: "YouTube Video",
    title: "Epione Sciatica Decompression Walkthrough",
    date: "July 05, 2026",
    budget: 15000,
    status: "Completed",
    description: "Detailed 4K walkthrough video of Epione clinical decompression chambers and patient recovery logs."
  },
  {
    id: "act-105",
    type: "Photoshoot",
    title: "Executive Staff Clinic Team Portrait Session",
    date: "July 02, 2026",
    budget: 5000,
    status: "Completed",
    description: "Pristine staff group photoshoot for updated localized Google Maps Business Listing and medical board bio flyers."
  },
  {
    id: "act-106",
    type: "Meta Campaign",
    title: "Herniated Disc Custom Audience Dynamic Funnel",
    date: "July 01, 2026",
    budget: 85000,
    status: "Completed",
    description: "Dynamic retargeting funnel focusing on localized patients who reviewed herniated disc articles in the last 30 days."
  },
  {
    id: "act-107",
    type: "Google Campaign",
    title: "Sciatica Treatment Direct Intent Keywords",
    date: "July 01, 2026",
    budget: 110000,
    status: "Completed",
    description: "Hyper-focused search ad campaign capturing localized sciatica relief queries with direct appointment booked integration."
  },
  {
    id: "act-108",
    type: "Influencer Collaboration",
    title: "Local Marathon Runner Joint Prep Endorsement",
    date: "June 28, 2026",
    budget: 25000,
    status: "Completed",
    description: "Joint pain prep story series by local marathon icon recommending Epione pain management pre-race routines."
  }
];

// Tasks
export const TODAY_TASKS_SEED: Task[] = [
  { id: "t1", text: "Approve Meta Ads custom sciatica recovery video reel copy", completed: false, dueDate: "2026-07-16", category: "Campaigns" },
  { id: "t2", text: "Sign-off on Chronicle July Sunday full-page invoice (₹40,000)", completed: false, dueDate: "2026-07-16", category: "Invoicing" },
  { id: "t3", text: "Download monthly performance analytics PDF report for clinic board", completed: true, dueDate: "2026-07-15", category: "Reports" },
  { id: "t4", text: "Sync google search negative keywords for 'back pain surgery'", completed: false, dueDate: "2026-07-16", category: "Google Campaign" },
  { id: "t5", text: "Review doctor bio portrait edits for the medical listing boards", completed: true, dueDate: "2026-07-14", category: "Photoshoot" }
];

// Upcoming activities
export const UPCOMING_SEED: UpcomingActivity[] = [
  { id: "up1", title: "Video Shoot: Sciatica Recovery Walk", date: "July 18, 2026", time: "11:00 AM", type: "Video Production" },
  { id: "up2", title: "Local Doctor CME Pain Summit Seminar", date: "July 22, 2026", time: "02:00 PM", type: "Offline Events" },
  { id: "up3", title: "National TV Live Pain-Management Panel", date: "July 25, 2026", time: "09:30 AM", type: "TV Segment" },
  { id: "up4", title: "Blog Publish: 'Sciatalgia vs. Piriformis Syndrome'", date: "July 28, 2026", time: "10:00 AM", type: "SEO Writing" }
];

// Alerts
export const ALERTS_SEED: Alert[] = [
  { id: "al1", type: "warning", text: "Google Ads CPC exceeds ₹120 threshold for sciatica relief keyword", source: "Google Ads Pixel" },
  { id: "al2", type: "danger", text: "Meta Conversion API pixel missing event deduplication headers", source: "Facebook Events Manager" },
  { id: "al3", type: "info", text: "July budget has reached 85% of total hospital allocation cap", source: "MedGrowth Billing Engine" }
];

// Calendar Events
export const CALENDAR_EVENTS_SEED: CalendarEvent[] = [
  { id: "e1", day: 1, title: "Sciatica Google Campaign Launch", type: "Campaign Launch", budget: 110000 },
  { id: "e2", day: 5, title: "Video Shoot: Patient Recovery Testimonials", type: "Video Shoot", budget: 15000 },
  { id: "e3", day: 10, title: "Dr. Epione TV Segment Airing", type: "TV Interview", budget: 30000 },
  { id: "e4", day: 12, title: "Chronicle Sunday Spine Column Publish", type: "Newspaper Publication", budget: 40000 },
  { id: "e5", day: 15, title: "Inter-department doctor CME lunch", type: "Doctor Visit" },
  { id: "e6", day: 18, title: "Marathon Runner Reel Publish", type: "Influencer Campaign", budget: 25000 },
  { id: "e7", day: 22, title: "Orthopedic Blog Post: Joint Pain Myths", type: "Blog Publish" },
  { id: "e8", day: 28, title: "Monsoon Joints Festival Campaign Launch", type: "Festival Campaign", budget: 12000 }
];

// Media Items
export const MEDIA_ITEMS_SEED: MediaItem[] = [
  {
    id: "m1",
    category: "Newspaper",
    title: "Regional Sunday Chronicle Page 14 scan",
    date: "12 July 2026",
    thumbnail: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&q=80&w=300&h=200",
    aspect: "aspect-[3/4]"
  },
  {
    id: "m2",
    category: "TV",
    title: "Doctor live segment stream clip",
    date: "10 July 2026",
    thumbnail: "https://images.unsplash.com/photo-1526256262350-7da7584cf5eb?auto=format&fit=crop&q=80&w=300&h=200",
    aspect: "aspect-video"
  },
  {
    id: "m3",
    category: "Reels",
    title: "Diaphragmatic joint tutorial short video",
    date: "08 July 2026",
    thumbnail: "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&q=80&w=300&h=400",
    aspect: "aspect-[3/4]"
  },
  {
    id: "m4",
    category: "Videos",
    title: "Clinic decompression tour walkthrough",
    date: "05 July 2026",
    thumbnail: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&q=80&w=300&h=200",
    aspect: "aspect-video"
  },
  {
    id: "m5",
    category: "Photos",
    title: "Executive bio portraits doctor team",
    date: "02 July 2026",
    thumbnail: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=300&h=200",
    aspect: "aspect-[3/4]"
  },
  {
    id: "m6",
    category: "Testimonials",
    title: "Joint-recovery scanned statement",
    date: "25 June 2026",
    thumbnail: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=300&h=200",
    aspect: "aspect-video"
  },
  {
    id: "m7",
    category: "Posters",
    title: "NABH compliance lobby poster draft",
    date: "22 June 2026",
    thumbnail: "https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?auto=format&fit=crop&q=80&w=300&h=200",
    aspect: "aspect-[3/4]"
  },
  {
    id: "m8",
    category: "Certificates",
    title: "Pain Association Accreditation scan",
    date: "15 June 2026",
    thumbnail: "https://images.unsplash.com/photo-1581056771107-24ca5f033842?auto=format&fit=crop&q=80&w=300&h=200",
    aspect: "aspect-video"
  }
];
