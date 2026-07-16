-- ====================================================================
-- MedGrowth OS: Complete Enterprise Hospital Marketing Platform Schema
-- Database: PostgreSQL
-- Version: 15+
-- ====================================================================

-- 1. HOSPITALS / CLINICAL ENTITIES
-- Serves as the primary multi-tenant boundary. Each hospital or clinic
-- controls its own local campaigns, users, budgets, and reporting currencies.
CREATE TABLE IF NOT EXISTS hospitals (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(100) UNIQUE NOT NULL,
    location VARCHAR(255),
    contact_phone VARCHAR(50),
    contact_email VARCHAR(255),
    website_url VARCHAR(255),
    branding_primary_color VARCHAR(7) DEFAULT '#2563EB', -- Tailwind blue-600
    branding_secondary_color VARCHAR(7) DEFAULT '#0F172A', -- Tailwind slate-900
    logo_url VARCHAR(512),
    currency VARCHAR(10) DEFAULT 'INR',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 2. USERS / WORKSPACE MEMBERS
-- Represents employees, doctors, administrators, and outsourced marketers.
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    hospital_id UUID REFERENCES hospitals(id) ON DELETE CASCADE,
    email VARCHAR(255) UNIQUE NOT NULL,
    full_name VARCHAR(150) NOT NULL,
    role VARCHAR(50) CHECK (role IN ('Administrator', 'Marketing Director', 'Clinical Liaison', 'Outsourced Agent')),
    phone VARCHAR(50),
    avatar_url VARCHAR(512),
    status VARCHAR(20) DEFAULT 'Active' CHECK (status IN ('Active', 'Suspended', 'Pending Invitation')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 3. CAMPAIGNS (Marketing Initiatives)
-- Enterprise campaigns have budgets and core objectives across multiple departments.
CREATE TABLE IF NOT EXISTS campaigns (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    hospital_id UUID NOT NULL REFERENCES hospitals(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    objective TEXT NOT NULL, -- e.g., "Increase Orthopaedics Joint Replacements"
    budget NUMERIC(15, 2) NOT NULL DEFAULT 0.00,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    status VARCHAR(50) DEFAULT 'Draft' CHECK (status IN ('Draft', 'Scheduled', 'Active', 'Completed', 'Paused')),
    created_by UUID REFERENCES users(id) ON DELETE SET NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 4. VENDORS / OUTSOURCED PARTNERS
-- Agencies, video production houses, publishers, and influencers who receive payments.
CREATE TABLE IF NOT EXISTS vendors (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    hospital_id UUID NOT NULL REFERENCES hospitals(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    service_type VARCHAR(100) NOT NULL, -- e.g., "Meta Ad Agency", "Print Publisher"
    contact_person VARCHAR(150),
    email VARCHAR(255),
    phone VARCHAR(50),
    address TEXT,
    status VARCHAR(20) DEFAULT 'Active' CHECK (status IN ('Active', 'Inactive')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 5. MASTER MARKETING ACTIVITIES
-- The core table tracking all physical and digital operational activities.
-- Links to a campaign and is classified by a core Channel Type.
CREATE TABLE IF NOT EXISTS marketing_activities (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    campaign_id UUID NOT NULL REFERENCES campaigns(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    channel_type VARCHAR(50) NOT NULL CHECK (channel_type IN (
        'Digital Marketing', 
        'Offline Marketing', 
        'Influencer Marketing', 
        'PR & Media', 
        'Branding'
    )),
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    budget NUMERIC(15, 2) NOT NULL DEFAULT 0.00,
    status VARCHAR(50) DEFAULT 'Scheduled' CHECK (status IN ('Scheduled', 'In Progress', 'Completed', 'Cancelled')),
    description TEXT,
    department VARCHAR(100), -- e.g. "Cardiology"
    created_by UUID REFERENCES users(id) ON DELETE SET NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 6. CHANNEL-SPECIFIC SUB-TYPES (1:1 Extension Tables)
-- Instead of cramming all specialized fields into one generic table, 
-- we use clean 1:1 sub-tables to capture unique metadata for each marketing discipline.

-- A) DIGITAL MARKETING DETAILS
CREATE TABLE IF NOT EXISTS digital_marketing_details (
    activity_id UUID PRIMARY KEY REFERENCES marketing_activities(id) ON DELETE CASCADE,
    platform VARCHAR(100) NOT NULL, -- e.g. "Google Search", "Meta Instagram", "Bing Ads", "Local SEO"
    target_keywords TEXT[],
    utm_campaign VARCHAR(150),
    utm_source VARCHAR(100),
    utm_medium VARCHAR(100),
    pixel_id VARCHAR(100),
    landing_page_url VARCHAR(512)
);

-- B) OFFLINE MARKETING DETAILS
CREATE TABLE IF NOT EXISTS offline_marketing_details (
    activity_id UUID PRIMARY KEY REFERENCES marketing_activities(id) ON DELETE CASCADE,
    medium VARCHAR(100) NOT NULL, -- e.g. "Newspaper Ad", "TV Commercial", "Radio Spot", "Physical Billboard"
    outlet_name VARCHAR(255) NOT NULL, -- e.g. "Sunday Chronicle", "Regional TV 9"
    spot_duration_seconds INTEGER, -- TV/Radio duration
    physical_dimensions VARCHAR(100), -- Newspaper size (e.g. "Quarter Page") or Billboard size
    circulation_or_footfall VARCHAR(100) -- Estimated circulation
);

-- C) INFLUENCER MARKETING DETAILS
CREATE TABLE IF NOT EXISTS influencer_marketing_details (
    activity_id UUID PRIMARY KEY REFERENCES marketing_activities(id) ON DELETE CASCADE,
    influencer_name VARCHAR(255) NOT NULL,
    social_handle VARCHAR(150) NOT NULL, -- e.g., "@dr_spine_expert"
    platform VARCHAR(100) NOT NULL, -- "Instagram", "YouTube", "LinkedIn"
    follower_count INTEGER,
    post_format VARCHAR(100) NOT NULL, -- "Reel", "Long Form Video", "Static Post", "Story"
    contract_terms TEXT
);

-- D) PR & MEDIA LOGS
CREATE TABLE IF NOT EXISTS pr_media_logs (
    activity_id UUID PRIMARY KEY REFERENCES marketing_activities(id) ON DELETE CASCADE,
    journalist_name VARCHAR(150),
    media_outlet VARCHAR(255) NOT NULL,
    syndication_coverage TEXT, -- List of secondary outlets pick ups
    interview_topic TEXT,
    publication_url VARCHAR(512)
);

-- E) BRANDING & LEAFLET COLLATERALS
CREATE TABLE IF NOT EXISTS branding_details (
    activity_id UUID PRIMARY KEY REFERENCES marketing_activities(id) ON DELETE CASCADE,
    collateral_type VARCHAR(100) NOT NULL, -- "Clinic Brochure", "Inpatient Welcome Pack", "OPD Standees", "Uniforms"
    print_quantity INTEGER,
    paper_specifications VARCHAR(150), -- e.g., "300 GSM Matte Finish"
    distribution_locations TEXT -- e.g., "OPD Waiting Rooms, Reception Desk"
);

-- 7. EXPENSES
-- Keeps track of individual disbursements. Each expense connects to a marketing
-- activity, an invoice vendor, and handles payment tracking.
CREATE TABLE IF NOT EXISTS expenses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    activity_id UUID NOT NULL REFERENCES marketing_activities(id) ON DELETE CASCADE,
    vendor_id UUID REFERENCES vendors(id) ON DELETE SET NULL,
    amount NUMERIC(15, 2) NOT NULL DEFAULT 0.00,
    description VARCHAR(255),
    payment_status VARCHAR(50) DEFAULT 'Pending' CHECK (payment_status IN ('Pending', 'Approved', 'Paid', 'Disputed')),
    payment_method VARCHAR(100), -- "Corporate Card", "Bank Transfer", "PO Net 30"
    invoice_url VARCHAR(512),
    logged_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 8. PERFORMANCE METRICS (Granular Funnel Log)
-- Aggregates clinical conversion events, phone inquiries, digital actions,
-- reach, actual patient acquisitions, and revenue for dashboard widgets and reports.
CREATE TABLE IF NOT EXISTS performance_metrics (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    activity_id UUID NOT NULL REFERENCES marketing_activities(id) ON DELETE CASCADE,
    log_date DATE NOT NULL DEFAULT CURRENT_DATE,
    
    -- Upper Funnel Metrics
    expected_reach INTEGER DEFAULT 0,
    actual_reach INTEGER DEFAULT 0,
    impressions INTEGER DEFAULT 0,
    clicks INTEGER DEFAULT 0,
    
    -- Lead & Action Metrics
    leads INTEGER DEFAULT 0,
    calls_connected INTEGER DEFAULT 0,
    
    -- Clinical Outcomes
    appointments_booked INTEGER DEFAULT 0,
    patients_acquired INTEGER DEFAULT 0,
    
    -- Financial ROI Outcomes
    revenue_generated NUMERIC(15, 2) DEFAULT 0.00,
    
    -- Ensures unique log per activity per day for structured timeseries reporting
    CONSTRAINT unique_activity_daily_log UNIQUE (activity_id, log_date)
);

-- 9. MEDIA & DIGITAL ASSET LIBRARY
-- Global asset store accessible across campaigns, hospitals and activities.
CREATE TABLE IF NOT EXISTS media_library (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    hospital_id UUID NOT NULL REFERENCES hospitals(id) ON DELETE CASCADE,
    file_name VARCHAR(255) NOT NULL,
    file_url VARCHAR(512) NOT NULL,
    file_type VARCHAR(50) NOT NULL, -- 'Image', 'Video', 'Invoice Document', 'Strategy PDF'
    file_size_bytes BIGINT,
    uploaded_by UUID REFERENCES users(id) ON DELETE SET NULL,
    associated_activity_id UUID REFERENCES marketing_activities(id) ON DELETE SET NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- ====================================================================
-- INDEX OPTIMIZATIONS FOR REPORTING SPEED & PERFORMANCE
-- ====================================================================
CREATE INDEX IF NOT EXISTS idx_activities_campaign ON marketing_activities(campaign_id);
CREATE INDEX IF NOT EXISTS idx_campaigns_hospital ON campaigns(hospital_id);
CREATE INDEX IF NOT EXISTS idx_performance_metrics_date ON performance_metrics(log_date);
CREATE INDEX IF NOT EXISTS idx_expenses_activity ON expenses(activity_id);
CREATE INDEX IF NOT EXISTS idx_media_hospital ON media_library(hospital_id);
