import React, { useState } from "react";
import { 
  Building2, 
  User, 
  Bell, 
  Shield, 
  Link, 
  Save, 
  CheckCircle,
  Mail,
  Phone,
  Globe
} from "lucide-react";

interface SettingsProps {
  selectedHospital: { id: string; name: string };
  setSelectedHospital: (hosp: any) => void;
}

export default function Settings({ selectedHospital, setSelectedHospital }: SettingsProps) {
  const [clinicName, setClinicName] = useState(selectedHospital.name);
  const [managerName, setManagerName] = useState("Sarah Jenkins");
  const [managerEmail, setManagerEmail] = useState("sarah.jenkins@medgrowth.com");
  const [phone, setPhone] = useState("+91 98765 43210");
  const [currency, setCurrency] = useState("INR");
  
  // Toggles state
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [weeklyReports, setWeeklyReports] = useState(true);
  const [whatsappAlerts, setWhatsappAlerts] = useState(false);
  const [aiSuggestions, setAiSuggestions] = useState(true);

  // Connection states
  const [metaConnected, setMetaConnected] = useState(true);
  const [googleConnected, setGoogleConnected] = useState(true);
  const [seoTracker, setSeoTracker] = useState(true);

  // Save feedback state
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Top Banner / Heading */}
      <div className="flex justify-between items-center bg-white p-6 rounded-[24px] border border-slate-100 shadow-sm">
        <div>
          <h3 className="text-sm font-bold text-slate-800">Workspace Settings</h3>
          <p className="text-[11px] text-slate-400 mt-0.5">Manage your clinical branding, reporting schedules, and system integrations</p>
        </div>
        {saveSuccess && (
          <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-100 text-emerald-700 px-4 py-2 rounded-xl text-xs font-semibold animate-in fade-in slide-in-from-right-3 duration-200">
            <CheckCircle className="h-4 w-4 text-emerald-600" />
            <span>Settings saved successfully!</span>
          </div>
        )}
      </div>

      <form onSubmit={handleSave} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Clinic Profile & Administrative settings */}
        <div className="lg:col-span-2 space-y-6">
          {/* Profile card */}
          <div className="bg-white rounded-[24px] p-6 shadow-sm border border-slate-100 space-y-4">
            <div className="flex items-center gap-2.5 pb-3 border-b border-slate-50">
              <Building2 className="h-4 w-4 text-blue-600" />
              <h4 className="text-xs font-bold text-slate-800">Clinic Profile</h4>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Clinic / Hospital Name</label>
                <input 
                  type="text" 
                  value={clinicName} 
                  onChange={(e) => setClinicName(e.target.value)}
                  className="w-full text-xs px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 font-semibold focus:outline-none focus:border-blue-500 focus:bg-white transition-colors"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Reporting Currency</label>
                <select 
                  value={currency} 
                  onChange={(e) => setCurrency(e.target.value)}
                  className="w-full text-xs px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 font-semibold focus:outline-none focus:border-blue-500 focus:bg-white transition-colors"
                >
                  <option value="INR">INR (₹) - Indian Rupee</option>
                  <option value="USD">USD ($) - US Dollar</option>
                  <option value="AED">AED (د.إ) - UAE Dirham</option>
                  <option value="GBP">GBP (£) - British Pound</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Primary Contact Phone</label>
                <div className="relative">
                  <Phone className="absolute left-3.5 top-3 h-3.5 w-3.5 text-slate-400" />
                  <input 
                    type="text" 
                    value={phone} 
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full text-xs pl-10 pr-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 font-semibold focus:outline-none focus:border-blue-500 focus:bg-white transition-colors"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Website URL</label>
                <div className="relative">
                  <Globe className="absolute left-3.5 top-3 h-3.5 w-3.5 text-slate-400" />
                  <input 
                    type="text" 
                    placeholder="https://clinic-website.com" 
                    className="w-full text-xs pl-10 pr-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 font-semibold focus:outline-none focus:border-blue-500 focus:bg-white transition-colors"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Account Manager Information */}
          <div className="bg-white rounded-[24px] p-6 shadow-sm border border-slate-100 space-y-4">
            <div className="flex items-center gap-2.5 pb-3 border-b border-slate-50">
              <User className="h-4 w-4 text-blue-600" />
              <h4 className="text-xs font-bold text-slate-800">Authorized Workspace Manager</h4>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Manager Name</label>
                <input 
                  type="text" 
                  value={managerName} 
                  onChange={(e) => setManagerName(e.target.value)}
                  className="w-full text-xs px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 font-semibold focus:outline-none focus:border-blue-500 focus:bg-white transition-colors"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Authorized Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-3 h-3.5 w-3.5 text-slate-400" />
                  <input 
                    type="email" 
                    value={managerEmail} 
                    onChange={(e) => setManagerEmail(e.target.value)}
                    className="w-full text-xs pl-10 pr-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 font-semibold focus:outline-none focus:border-blue-500 focus:bg-white transition-colors"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Connected Channels & Trackers */}
          <div className="bg-white rounded-[24px] p-6 shadow-sm border border-slate-100 space-y-4">
            <div className="flex items-center gap-2.5 pb-3 border-b border-slate-50">
              <Link className="h-4 w-4 text-blue-600" />
              <h4 className="text-xs font-bold text-slate-800">Tracking & Channel Integrations</h4>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="h-7 w-7 rounded-lg bg-[#1877F2]/10 flex items-center justify-center text-[#1877F2] font-bold text-xs">f</div>
                  <div>
                    <h5 className="text-[11px] font-bold text-slate-700">Meta Ads API / Conversions Pixel</h5>
                    <p className="text-[9px] text-slate-400">Pulls offline lead conversions directly from form fills</p>
                  </div>
                </div>
                <button 
                  type="button"
                  onClick={() => setMetaConnected(!metaConnected)}
                  className={`px-3 py-1.5 rounded-lg text-[10px] font-bold transition-all ${
                    metaConnected 
                      ? "bg-emerald-50 text-emerald-700 hover:bg-emerald-100" 
                      : "bg-blue-600 text-white hover:bg-blue-700"
                  }`}
                >
                  {metaConnected ? "Connected" : "Connect Channel"}
                </button>
              </div>

              <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="h-7 w-7 rounded-lg bg-[#4285F4]/10 flex items-center justify-center text-[#4285F4] font-bold text-xs">G</div>
                  <div>
                    <h5 className="text-[11px] font-bold text-slate-700">Google Ads API Link</h5>
                    <p className="text-[9px] text-slate-400">Tracks keyword bid indices, costs and appointment goals</p>
                  </div>
                </div>
                <button 
                  type="button"
                  onClick={() => setGoogleConnected(!googleConnected)}
                  className={`px-3 py-1.5 rounded-lg text-[10px] font-bold transition-all ${
                    googleConnected 
                      ? "bg-emerald-50 text-emerald-700 hover:bg-emerald-100" 
                      : "bg-blue-600 text-white hover:bg-blue-700"
                  }`}
                >
                  {googleConnected ? "Connected" : "Connect Channel"}
                </button>
              </div>

              <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="h-7 w-7 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-600 font-bold text-xs">S</div>
                  <div>
                    <h5 className="text-[11px] font-bold text-slate-700">SEO & Rank Tracker Integration</h5>
                    <p className="text-[9px] text-slate-400">Synchronizes clinical content releases with keyword ranking logs</p>
                  </div>
                </div>
                <button 
                  type="button"
                  onClick={() => setSeoTracker(!seoTracker)}
                  className={`px-3 py-1.5 rounded-lg text-[10px] font-bold transition-all ${
                    seoTracker 
                      ? "bg-emerald-50 text-emerald-700 hover:bg-emerald-100" 
                      : "bg-blue-600 text-white hover:bg-blue-700"
                  }`}
                >
                  {seoTracker ? "Connected" : "Connect Channel"}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Notification Alerts & Settings Saving */}
        <div className="space-y-6">
          {/* Notifications config */}
          <div className="bg-white rounded-[24px] p-6 shadow-sm border border-slate-100 space-y-4">
            <div className="flex items-center gap-2.5 pb-3 border-b border-slate-50">
              <Bell className="h-4 w-4 text-blue-600" />
              <h4 className="text-xs font-bold text-slate-800">Alert Notification Preferences</h4>
            </div>

            <div className="space-y-4">
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-0.5">
                  <label className="text-[11px] font-bold text-slate-700 block">Critical Budget Alerts</label>
                  <p className="text-[9px] text-slate-400 leading-normal">Notify when campaign bids reach or exceed daily allocations</p>
                </div>
                <button 
                  type="button"
                  onClick={() => setEmailAlerts(!emailAlerts)}
                  className={`w-9 h-5 rounded-full p-0.5 transition-colors duration-250 shrink-0 ${emailAlerts ? "bg-blue-600" : "bg-slate-200"}`}
                >
                  <div className={`w-4 h-4 bg-white rounded-full shadow-sm transform transition-transform duration-250 ${emailAlerts ? "translate-x-4" : ""}`} />
                </button>
              </div>

              <div className="flex items-start justify-between gap-4">
                <div className="space-y-0.5">
                  <label className="text-[11px] font-bold text-slate-700 block">Weekly Performance Digests</label>
                  <p className="text-[9px] text-slate-400 leading-normal">Weekly formatted spreadsheet summaries of patient acquisitions</p>
                </div>
                <button 
                  type="button"
                  onClick={() => setWeeklyReports(!weeklyReports)}
                  className={`w-9 h-5 rounded-full p-0.5 transition-colors duration-250 shrink-0 ${weeklyReports ? "bg-blue-600" : "bg-slate-200"}`}
                >
                  <div className={`w-4 h-4 bg-white rounded-full shadow-sm transform transition-transform duration-250 ${weeklyReports ? "translate-x-4" : ""}`} />
                </button>
              </div>

              <div className="flex items-start justify-between gap-4">
                <div className="space-y-0.5">
                  <label className="text-[11px] font-bold text-slate-700 block">Instant WhatsApp Bulletins</label>
                  <p className="text-[9px] text-slate-400 leading-normal">Push notification logs for clinic leads straight to phone</p>
                </div>
                <button 
                  type="button"
                  onClick={() => setWhatsappAlerts(!whatsappAlerts)}
                  className={`w-9 h-5 rounded-full p-0.5 transition-colors duration-250 shrink-0 ${whatsappAlerts ? "bg-blue-600" : "bg-slate-200"}`}
                >
                  <div className={`w-4 h-4 bg-white rounded-full shadow-sm transform transition-transform duration-250 ${whatsappAlerts ? "translate-x-4" : ""}`} />
                </button>
              </div>

              <div className="flex items-start justify-between gap-4">
                <div className="space-y-0.5">
                  <label className="text-[11px] font-bold text-slate-700 block">AI Growth Spark Prompts</label>
                  <p className="text-[9px] text-slate-400 leading-normal">Suggestions for shifting budget based on live ROI performance</p>
                </div>
                <button 
                  type="button"
                  onClick={() => setAiSuggestions(!aiSuggestions)}
                  className={`w-9 h-5 rounded-full p-0.5 transition-colors duration-250 shrink-0 ${aiSuggestions ? "bg-blue-600" : "bg-slate-200"}`}
                >
                  <div className={`w-4 h-4 bg-white rounded-full shadow-sm transform transition-transform duration-250 ${aiSuggestions ? "translate-x-4" : ""}`} />
                </button>
              </div>
            </div>
          </div>

          {/* Save Action Card */}
          <div className="bg-slate-900 rounded-[24px] p-6 text-white shadow-sm space-y-4">
            <div className="flex items-center gap-2 text-blue-400">
              <Shield className="h-4 w-4" />
              <h4 className="text-[10px] font-bold uppercase tracking-widest">Workspace Authority</h4>
            </div>
            <p className="text-[11px] text-slate-300 leading-relaxed font-medium">
              Updating these workspace settings modifies live parameters, sync intervals, and credential scopes for MedGrowth OS modules.
            </p>
            <button 
              type="submit"
              className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition-all shadow-lg shadow-blue-500/15 flex items-center justify-center gap-2 cursor-pointer"
            >
              <Save className="h-4 w-4" />
              <span>Save Workspace Changes</span>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
