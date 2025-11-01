import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Users, Database, Zap, Pencil, Trash2, Plus, TrendingUp, Check, Minus, X, AlertCircle, AlertTriangle, ArrowUp, MoreHorizontal, ArrowUpDown, Eye, RefreshCw, Calendar } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface Plan {
  id: string
  name: string
  subtitle: string
  price: string
  priceUnit: string
  users: string | number
  projects: string | number
  storage: string
  features: string[]
  isPopular?: boolean
  isHighlighted?: boolean
}

interface Feature {
  id: string
  name: string
  description: string
  enabled: boolean
}

export default function PlanBilling() {
  const [activeTab, setActiveTab] = useState<"subscription-plans" | "customer-subscriptions">("subscription-plans")
  const [billingCycle, setBillingCycle] = useState<"monthly" | "annual">("monthly")
  const [peopleCount, setPeopleCount] = useState("0")
  const [isCreatePlanOpen, setIsCreatePlanOpen] = useState(false)
  const [manageSubscriptionOpen, setManageSubscriptionOpen] = useState(false)
  const [selectedCompany, setSelectedCompany] = useState<{ company: string; plan: string; status: string; mrr: string; started: string; nextBilling: string; currentPlan: string } | null>(null)
  const [selectedPlan, setSelectedPlan] = useState<string>("Enterprise")
  
  // Form state
  const [planName, setPlanName] = useState("")
  const [price, setPrice] = useState("0")
  const [formBillingCycle, setFormBillingCycle] = useState("Monthly")
  const [maxUsers, setMaxUsers] = useState("10")
  const [maxProjects, setMaxProjects] = useState("10")
  const [storage, setStorage] = useState("10 GB")
  const [apiCalls, setApiCalls] = useState("10000")
  
  const [features, setFeatures] = useState<Feature[]>([
    { id: "basic-project", name: "Basic Project Management", description: "Create and manage projects", enabled: true },
    { id: "team-collab", name: "Team Collaboration", description: "Real-time collaboration tools", enabled: true },
    { id: "gantt", name: "Gantt Charts", description: "Advanced project visualization", enabled: true },
    { id: "api-access", name: "API Access", description: "RESTful API integration", enabled: true },
    { id: "advanced-reporting", name: "Advanced Reporting", description: "Custom reports and analytics", enabled: true },
    { id: "sso", name: "SSO Integration", description: "Single Sign-On capabilities", enabled: true },
    { id: "priority-support", name: "Priority Support", description: "24/7 priority customer support", enabled: true },
    { id: "custom-branding", name: "Custom Branding", description: "White-label solution", enabled: true },
  ])

  const toggleFeature = (id: string) => {
    setFeatures(features.map(f => f.id === id ? { ...f, enabled: !f.enabled } : f))
  }

  const handleCreatePlan = () => {
    console.log("Creating plan:", {
      planName,
      price,
      billingCycle: formBillingCycle,
      maxUsers,
      maxProjects,
      storage,
      apiCalls,
      features: features.filter(f => f.enabled),
    })
    // TODO: Implement plan creation
    handleCloseModal()
  }

  const handleCloseModal = () => {
    setIsCreatePlanOpen(false)
    // Reset form
    setPlanName("")
    setPrice("0")
    setFormBillingCycle("Monthly")
    setMaxUsers("10")
    setMaxProjects("10")
    setStorage("10 GB")
    setApiCalls("10000")
    setFeatures(features.map(f => ({ ...f, enabled: true })))
  }

  const plans: Plan[] = [
    {
      id: "free",
      name: "Free Forever",
      subtitle: "Best for individual users",
      price: "₹0",
      priceUnit: "/ monthly",
      users: 5,
      projects: 3,
      storage: "60 MB",
      features: [
        "Basic Project Management",
        "Team Collaboration",
        "Sprint Management",
        "Kanban Boards",
        "Calendar View",
        "24/7 Support",
      ],
    },
    {
      id: "professional",
      name: "Professional",
      subtitle: "Best for individual users",
      price: "₹49",
      priceUnit: "/ monthly",
      users: 25,
      projects: 50,
      storage: "100 GB",
      features: [
        "Basic Project Management",
        "Team Collaboration",
        "Gantt Charts",
        "API Access",
        "Advanced Reporting",
        "Resource Management",
        "Workspace Separation",
        "Unlimited Chat Messages",
      ],
      isPopular: true,
      isHighlighted: true,
    },
    {
      id: "enterprise",
      name: "Enterprise",
      subtitle: "",
      price: "₹199",
      priceUnit: "/ Monthly",
      users: "Unlimited",
      projects: "Unlimited",
      storage: "1 TB",
      features: [
        "Basic Project Management",
        "Team Collaboration",
        "Unlimited Message History",
        "API Access",
        "Workload Management",
        "SSO Integration",
        "Priority Support",
        "Custom Branding",
        "Automation Integrations",
      ],
    },
  ]

  const handleEditPlan = (planId: string) => {
    console.log("Edit plan:", planId)
    // TODO: Implement edit functionality
  }

  const handleDeletePlan = (planId: string) => {
    console.log("Delete plan:", planId)
    // TODO: Implement delete functionality
  }

  return (
    <div className="w-full h-full px-3 sm:px-4 lg:px-6 xl:px-8 pb-3 sm:pb-4 lg:pb-6 xl:pb-8 pt-1 sm:pt-2 lg:pt-3 xl:pt-4 overflow-auto">
      <div className="space-y-4 sm:space-y-6 lg:space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 sm:gap-6">
          <div className="flex-1 space-y-1 sm:space-y-2">
            <h1 className="text-lg sm:text-xl lg:text-2xl font-medium text-cyan-950 font-['Roboto'] leading-tight tracking-tight">
              Plans & Subscription Management
            </h1>
            <p className="text-xs sm:text-sm lg:text-base text-gray-600 font-normal font-['Roboto'] leading-5 sm:leading-6">
              Configure global, platform-wide settings
            </p>
          </div>
          <Button
            onClick={() => setIsCreatePlanOpen(true)}
            className="bg-[#67909B] hover:bg-slate-600 text-white h-9 sm:h-10 px-4 sm:px-6 rounded-lg text-xs sm:text-sm font-medium font-['Roboto'] w-full sm:w-auto"
          >
            <Plus className="w-4 h-4" />
            Create New Plan
          </Button>
        </div>

        {/* Tabs */}
        <div className="w-full">
          <div className="w-full h-10 sm:h-12 px-2 sm:px-4 py-2 bg-white rounded-2xl sm:rounded-3xl shadow-[0px_4px_4px_0px_rgba(0,0,0,0.08)] outline outline-1 outline-offset-[-1px] outline-black/10 flex flex-row justify-start items-center gap-1 sm:gap-2">
            <button
              onClick={() => setActiveTab("customer-subscriptions")}
              className={`flex-1 h-7 sm:h-8 px-2 sm:px-3 lg:px-4 py-1 rounded-2xl inline-flex justify-center items-center gap-1.5 transition-colors ${
                activeTab === "customer-subscriptions"
                  ? "bg-[#67909B] text-white"
                  : "bg-transparent text-neutral-950 hover:bg-gray-100"
              }`}
            >
              <span className="text-xs sm:text-sm font-medium font-['Roboto'] leading-5 whitespace-nowrap">
                Customer Subscriptions
              </span>
            </button>
            <button
              onClick={() => setActiveTab("subscription-plans")}
              className={`flex-1 h-7 sm:h-8 px-2 sm:px-3 lg:px-4 py-1 rounded-2xl inline-flex justify-center items-center gap-1.5 transition-colors ${
                activeTab === "subscription-plans"
                  ? "bg-[#67909B] text-white"
                  : "bg-transparent text-neutral-950 hover:bg-gray-100"
              }`}
            >
              <span className="text-xs sm:text-sm font-medium font-['Roboto'] leading-5 whitespace-nowrap">
                Subscription Plans
              </span>
            </button>
          </div>
        </div>

        {/* Customer Subscriptions Tab Content */}
        {activeTab === "customer-subscriptions" && (
          <div className="space-y-6 sm:space-y-8">
            {/* Summary Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 sm:gap-6">
              {/* Active Subscription */}
              <div className="bg-white rounded-[40px] outline outline-1 outline-offset-[-1px] outline-black/10 p-4 sm:p-6 flex flex-col justify-between gap-4 sm:gap-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-sm sm:text-base font-semibold text-cyan-950 font-['Roboto'] leading-6">
                    Active Subscription
                  </h3>
                  <TrendingUp className="w-5 h-5 text-green-600" strokeWidth={2.5} />
                </div>
                <div className="flex-1 flex items-start">
                  <p className="text-2xl sm:text-3xl font-bold text-cyan-950 font-['Roboto'] leading-9 tracking-tight">
                    4
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <ArrowUp className="w-4 h-4 text-green-600" strokeWidth={2.5} />
                  <span className="text-xs sm:text-sm font-normal text-green-600 font-['Roboto'] leading-5">
                    67% of total
                  </span>
                </div>
              </div>

              {/* Trial User */}
              <div className="bg-white rounded-[40px] outline outline-1 outline-offset-[-1px] outline-black/10 p-4 sm:p-6 flex flex-col justify-between gap-4 sm:gap-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-sm sm:text-base font-semibold text-cyan-950 font-['Roboto'] leading-6">
                    Trial User
                  </h3>
                  <Database className="w-5 h-5 text-slate-500" strokeWidth={2.5} />
                </div>
                <div className="flex-1 flex items-start">
                  <p className="text-2xl sm:text-3xl font-bold text-cyan-950 font-['Roboto'] leading-9 tracking-tight">
                    6
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <ArrowUp className="w-4 h-4 text-green-600" strokeWidth={2.5} />
                  <span className="text-xs sm:text-sm font-normal text-green-600 font-['Roboto'] leading-5">
                    12% of new users
                  </span>
                </div>
              </div>

              {/* Over Due */}
              <div className="bg-white rounded-[40px] outline outline-1 outline-offset-[-1px] outline-black/10 p-4 sm:p-6 flex flex-col justify-between gap-4 sm:gap-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-sm sm:text-base font-semibold text-cyan-950 font-['Roboto'] leading-6">
                    Over Due
                  </h3>
                  <AlertTriangle className="w-5 h-5 text-yellow-500" strokeWidth={2.5} />
                </div>
                <div className="flex-1 flex items-start">
                  <p className="text-2xl sm:text-3xl font-bold text-cyan-950 font-['Roboto'] leading-9 tracking-tight">
                    1
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs sm:text-sm font-normal text-red-600 font-['Roboto'] leading-5">
                    Suspended tenants
                  </span>
                </div>
              </div>

              {/* Billing Issues */}
              <div className="bg-white rounded-[40px] outline outline-1 outline-offset-[-1px] outline-black/10 p-4 sm:p-6 flex flex-col justify-between gap-4 sm:gap-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-sm sm:text-base font-semibold text-cyan-950 font-['Roboto'] leading-6">
                    Billing Issues
                  </h3>
                  <AlertCircle className="w-9 h-9 text-red-600" strokeWidth={2.5} />
                </div>
                <div className="flex-1 flex items-start">
                  <p className="text-2xl sm:text-3xl font-bold text-cyan-950 font-['Roboto'] leading-9 tracking-tight">
                    1
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs sm:text-sm font-normal text-neutral-400 font-['Roboto'] leading-5">
                    Across the application
                  </span>
                </div>
              </div>

              {/* Total Revenue */}
              <div className="bg-white rounded-[40px] outline outline-1 outline-offset-[-1px] outline-black/10 p-4 sm:p-6 flex flex-col justify-between gap-4 sm:gap-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-sm sm:text-base font-semibold text-cyan-950 font-['Roboto'] leading-6">
                    Total Revenue
                  </h3>
                  <span className="text-lg sm:text-xl font-medium text-green-500 font-['Roboto'] leading-6">₹</span>
                </div>
                <div className="flex-1 flex items-start">
                  <p className="text-2xl sm:text-3xl font-bold text-cyan-950 font-['Roboto'] leading-9 tracking-tight">
                    ₹72,534
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <ArrowUp className="w-4 h-4 text-green-600" strokeWidth={2.5} />
                  <span className="text-xs sm:text-sm font-normal text-green-600 font-['Roboto'] leading-5">
                    +18% from last month
                  </span>
                </div>
              </div>
            </div>

            {/* Subscriptions Table */}
            {/* <div className="w-full bg-white rounded-[40px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.08)] border border-black/10 overflow-hidden"> */}
            <div className="w-full h-auto sm:h-[600px] lg:h-[831px] bg-white rounded-[20px] sm:rounded-[30px] lg:rounded-[40px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.08)] border border-black/10 p-4 sm:p-6 lg:p-8 overflow-hidden">
              {/* Scrollable Container */}
              <div className="w-full overflow-x-auto overflow-y-hidden [&::-webkit-scrollbar]:h-2 [&::-webkit-scrollbar-thumb]:bg-gray-300 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-transparent">
                <div className="min-w-[900px] lg:min-w-[1100px]">
                  {/* Header */}
                  <div className="h-12 sm:h-14 lg:h-16 bg-[#C0CED2] rounded-[20px] sm:rounded-[30px] lg:rounded-[40px] shadow-[0px_2px_4px_0px_rgba(6,38,61,0.10)] flex items-center text-gray-700 font-semibold">
                  {/* Spacer for drag icon alignment */}
                  <div className="w-4 h-4 mr-2 flex-shrink-0"></div>
                  {/* Checkbox in header */}
                  <div className="px-2 py-2 sm:py-3 flex items-center justify-center flex-shrink-0">
                    <input
                      type="checkbox"
                      className="w-3 h-3 sm:w-3.5 sm:h-3.5 lg:w-4 lg:h-4 flex-shrink-0"
                    />
                  </div>
                  {[
                    { label: "Company name" },
                    { label: "Current Plan" },
                    { label: "Billing Status" },
                    { label: "Revenue" },
                    { label: "Next Renewal" },
                    { label: "Payment Method" },
                    { label: "Issues" },
                    { label: "Action" },
                  ].map((col, i) => (
                    <div
                      key={i}
                      className={`px-2 py-2 sm:py-3 text-center flex-1 flex-shrink-0 ${
                        col.label === "Company name" ? "flex items-center gap-1.5 text-left" : "flex items-center justify-center gap-1.5"
                      }`}
                    >
                      <span className="text-xs sm:text-sm font-semibold text-neutral-800 font-['Roboto'] whitespace-nowrap">
                        {col.label}
                      </span>
                      {col.label !== "Action" && col.label !== "Next Renewal" && col.label !== "Payment Method" && col.label !== "Issues" && (
                        <ArrowUpDown className="w-3 h-3 text-neutral-400 flex-shrink-0" />
                      )}
                    </div>
                  ))}
                </div>
                {/* Body */}
                {[
                  { company: "Apple Inc", currentPlan: "Enterprise", status: "Paid", revenue: "₹28,855", renewal: "24/09/2025", payment: "Credit Card", issues: 0 },
                  { company: "Apple Inc", currentPlan: "Pro", status: "Active", revenue: "₹3,282", renewal: "24/09/2025", payment: "Bank Transfer", issues: 1 },
                  { company: "Apple Inc", currentPlan: "Basic → Enterprise", status: "Pending Change", revenue: "₹0", renewal: "24/09/2025", payment: "N/A", issues: 0, isPlanChange: true },
                  { company: "Apple Inc", currentPlan: "Enterprise", status: "Trial", revenue: "₹0", renewal: "24/09/2025", payment: "N/A", issues: 0 },
                  { company: "Apple Inc", currentPlan: "Enterprise", status: "Active", revenue: "₹40,397", renewal: "24/09/2025", payment: "Credit Card", issues: 0 },
                  { company: "Apple Inc", currentPlan: "Pro", status: "Past Due", revenue: "₹4,800", renewal: "24/09/2025", payment: "Bank Transfer", issues: 1 },
                ].map((row, index) => (
                  <div
                    key={index}
                    className={`flex items-center px-1 sm:px-2 lg:px-4 py-4 sm:py-5 lg:py-6 hover:bg-gray-50 transition border-b border-gray-200 ${
                      index % 2 === 0 ? "bg-white" : "bg-gray-50"
                    } ${index === 5 ? "border-b-0" : ""}`}
                  >
                    {/* Drag Handle Icon - 2x2 grid of dots */}
                    <div className="w-4 h-4 flex items-center justify-center mr-2 flex-shrink-0 cursor-grab">
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="3" cy="3" r="1.5" fill="#525252"/>
                        <circle cx="9" cy="3" r="1.5" fill="#525252"/>
                        <circle cx="3" cy="9" r="1.5" fill="#525252"/>
                        <circle cx="9" cy="9" r="1.5" fill="#525252"/>
                      </svg>
                    </div>
                    {/* Checkbox */}
                    <div className="flex items-center justify-center flex-shrink-0">
                      <input
                        type="checkbox"
                        className="w-3 h-3 sm:w-3.5 sm:h-3.5 lg:w-4 lg:h-4 flex-shrink-0"
                      />
                    </div>
                    {/* Company name */}
                    <div className="flex items-center gap-1.5 text-left flex-1 flex-shrink-0">
                      <span className="text-xs sm:text-sm font-medium text-zinc-700 font-['Roboto'] truncate">
                        {row.company}
                      </span>
                    </div>
                    {/* Current Plan */}
                    <div className="text-center flex-1 flex-shrink-0 flex items-center justify-center">
                      {row.isPlanChange ? (
                        <div className="inline-flex items-center gap-1 flex-wrap justify-center">
                          <span className="px-2 py-1 bg-gray-200 rounded-lg text-xs font-medium text-zinc-700 font-['Roboto']">
                            Basic
                          </span>
                          <ArrowUpDown className="w-3 h-3 text-yellow-600" />
                          <span className="px-2 py-1 bg-yellow-100 rounded-lg text-xs font-medium text-yellow-800 font-['Roboto']">
                            Enterprise
                          </span>
                        </div>
                      ) : (
                        <span className="px-2 py-1 bg-gray-200 rounded-lg text-xs font-medium text-zinc-700 font-['Roboto'] inline-block">
                          {row.currentPlan}
                        </span>
                      )}
                    </div>
                    {/* Billing Status */}
                    <div className="text-center flex-1 flex-shrink-0 flex items-center justify-center">
                      <div className={`inline-flex items-center justify-center px-2 py-1 rounded-lg text-xs font-medium font-['Roboto'] ${
                        row.status === "Active" || row.status === "Paid"
                          ? "bg-green-100 text-green-800" 
                          : row.status === "Past Due" || row.status === "Suspended"
                          ? "bg-red-100 text-red-800"
                          : row.status === "Pending Change"
                          ? "bg-yellow-100 text-yellow-800"
                          : row.status === "Trial"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-gray-100 text-gray-800"
                      }`}>
                        {row.status}
                      </div>
                    </div>
                    {/* Revenue */}
                    <div className="text-center flex-1 flex-shrink-0 flex items-center justify-center">
                      <span className="text-xs sm:text-sm font-medium text-zinc-700 font-['Roboto'] leading-5">
                        {row.revenue}
                      </span>
                    </div>
                    {/* Next Renewal */}
                    <div className="text-center flex-1 flex-shrink-0 flex items-center justify-center">
                      <span className="text-xs sm:text-sm font-medium text-zinc-700 font-['Roboto'] leading-5 line-clamp-1">
                        {row.renewal}
                      </span>
                    </div>
                    {/* Payment Method */}
                    <div className="text-center flex-1 flex-shrink-0 flex items-center justify-center">
                      <span className="text-xs sm:text-sm font-medium text-zinc-700 font-['Roboto'] leading-5 line-clamp-1">
                        {row.payment}
                      </span>
                    </div>
                    {/* Issues */}
                    <div className="text-center flex-1 flex-shrink-0 flex items-center justify-center">
                      {row.issues > 0 ? (
                        <div className="inline-flex items-center gap-1 bg-red-100 rounded-lg px-2 py-1">
                          <AlertTriangle className="w-3 h-3 text-red-800" strokeWidth={2.5} />
                          <span className="text-xs font-medium text-red-800 font-['Roboto'] leading-4">
                            {row.issues} Issues
                          </span>
                        </div>
                      ) : (
                        <span className="text-xs sm:text-sm text-zinc-700">-</span>
                      )}
                    </div>
                    {/* Action */}
                    <div className="text-center flex-1 flex-shrink-0 flex items-center justify-center relative">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <button className="w-6 h-6 flex items-center justify-center hover:bg-gray-200 rounded transition-colors">
                            <MoreHorizontal className="w-5 h-5 text-neutral-800" />
                          </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent 
                          className="w-36 bg-white rounded-lg shadow-[0px_2px_4px_-2px_rgba(0,0,0,0.04)] shadow-[0px_4px_6px_-1px_rgba(0,0,0,0.04)] outline outline-1 outline-offset-[-1px] outline-black/10 p-[5px] min-w-[144px]"
                          align="end"
                          sideOffset={4}
                        >
                          <DropdownMenuItem 
                            className="h-8 px-[5px] py-[6.5px] rounded-md cursor-pointer focus:bg-gray-100 focus:text-neutral-950 data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
                            onClick={() => console.log("View Invoices", row.company)}
                          >
                            <div className="flex items-center gap-2 w-full pl-[3px]">
                              <Eye className="w-4 h-4 text-gray-500 flex-shrink-0" strokeWidth={2.5} />
                              <span className="text-sm font-normal text-neutral-950 font-['Roboto'] leading-5 whitespace-nowrap">
                                View Invoices
                              </span>
                            </div>
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            className="h-8 px-[5px] py-[6.5px] rounded-md cursor-pointer focus:bg-gray-100 focus:text-neutral-950 data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
                            onClick={() => {
                              setSelectedCompany({
                                company: row.company,
                                plan: row.currentPlan,
                                status: row.status,
                                mrr: row.revenue.replace("₹", "").replace(",", ""),
                                started: "15/1/2023",
                                nextBilling: row.renewal,
                                currentPlan: row.currentPlan === "Basic → Enterprise" ? "Enterprise" : row.currentPlan
                              })
                              setSelectedPlan(row.currentPlan === "Basic → Enterprise" ? "Enterprise" : row.currentPlan === "Pro" ? "Pro" : row.currentPlan === "Free" ? "Free" : "Enterprise")
                              setManageSubscriptionOpen(true)
                            }}
                          >
                            <div className="flex items-center gap-2 w-full pl-[3px]">
                              <Pencil className="w-4 h-4 text-gray-500 flex-shrink-0" strokeWidth={2.5} />
                              <span className="text-sm font-normal text-neutral-950 font-['Roboto'] leading-5 whitespace-nowrap">
                                Manage Plan
                              </span>
                            </div>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Subscription Plans Tab Content */}
        {activeTab === "subscription-plans" && (
          <>
        {/* Filters Section */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-6">
          {/* People Input */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
            <label className="text-xs sm:text-sm lg:text-base text-gray-600 font-normal font-['Roboto'] leading-5 sm:leading-6 whitespace-nowrap">
              How many people?
            </label>
            <Input
              type="number"
              value={peopleCount}
              onChange={(e) => setPeopleCount(e.target.value)}
              className="w-full sm:w-28 h-9 px-3 py-1 bg-white rounded-[10px] outline outline-[0.52px] outline-offset-[-0.52px] outline-slate-300 border-0 text-sm font-normal font-['Roboto'] leading-5 text-neutral-950 focus:outline-none focus:ring-0 focus-visible:ring-0"
              placeholder="0"
            />
          </div>

          {/* Billing Cycle Toggle */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
            <label className="text-xs sm:text-sm lg:text-base text-gray-600 font-normal font-['Roboto'] leading-5 sm:leading-6 whitespace-nowrap">
              Billing Cycle:
            </label>
            <div className="flex items-center gap-3">
              <span
                className={`text-xs sm:text-sm lg:text-base font-['Roboto'] leading-5 sm:leading-6 whitespace-nowrap cursor-pointer ${
                  billingCycle === "monthly"
                    ? "text-gray-600 font-semibold"
                    : "text-gray-600 font-normal"
                }`}
                onClick={() => setBillingCycle("monthly")}
              >
                Monthly
              </span>
              <Switch
                checked={billingCycle === "annual"}
                onCheckedChange={(checked) => setBillingCycle(checked ? "annual" : "monthly")}
                className="h-5 w-10 sm:h-6 sm:w-12 data-[state=checked]:bg-[rgba(103,144,155,0.2)] data-[state=unchecked]:bg-[rgba(103,144,155,0.4)] [&>span]:h-4 [&>span]:w-4 sm:[&>span]:h-3 sm:[&>span]:w-3 [&>span]:bg-[#67909b]"
              />
              <span
                className={`text-xs sm:text-sm lg:text-base font-['Roboto'] leading-5 sm:leading-6 whitespace-nowrap cursor-pointer ${
                  billingCycle === "annual"
                    ? "text-gray-600 font-semibold"
                    : "text-gray-600 font-normal"
                }`}
                onClick={() => setBillingCycle("annual")}
              >
                Annual (Save 40%)
              </span>
            </div>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 xl:gap-10">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`relative bg-white rounded-2xl outline outline-[0.52px] outline-offset-[-0.52px] outline-black/10 p-4 sm:p-6 lg:p-8 flex flex-col gap-4 sm:gap-5 lg:gap-6 min-h-[600px] sm:min-h-[650px] ${
                plan.isHighlighted
                  ? "shadow-[0px_0px_0px_2px_rgba(67,129,151,1.00)]"
                  : "shadow-none"
              }`}
            >
              {/* Most Popular Badge */}
              {plan.isPopular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-2 py-0.5 bg-[#67909B] rounded-lg outline outline-[0.52px] outline-offset-[-0.52px] outline-black/0 inline-flex justify-center items-center">
                  <span className="text-xs font-medium font-['Roboto'] leading-4 text-white whitespace-nowrap">
                    Most Popular
                  </span>
                </div>
              )}

              {/* Plan Header */}
              <div className="flex flex-col items-center gap-2 pt-4 sm:pt-6">
                <div className="flex flex-col items-center gap-1">
                  <h3 className="text-lg sm:text-xl font-bold text-cyan-950 font-['Roboto'] leading-7 text-center">
                    {plan.name}
                  </h3>
                  {plan.subtitle && (
                    <p className="text-xs font-normal text-cyan-950 font-['Roboto'] leading-7 text-center">
                      {plan.subtitle}
                    </p>
                  )}
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-2xl sm:text-3xl font-bold text-[#67909B] font-['Roboto'] leading-9 tracking-tight">
                    {plan.price}
                  </span>
                  <span className="text-sm sm:text-base font-normal text-gray-500 font-['Roboto'] leading-6">
                    {plan.priceUnit}
                  </span>
                </div>
              </div>

              {/* Plan Details */}
              <div className="flex flex-col gap-3">
                {/* Users */}
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-[#67909B]" strokeWidth={2.5} />
                    <span className="text-sm font-normal text-neutral-950 font-['Roboto'] leading-5">
                      Users
                    </span>
                  </div>
                  <span className="text-base font-medium text-neutral-950 font-['Roboto'] leading-6">
                    {plan.users}
                  </span>
                </div>

                {/* Projects */}
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <Database className="w-4 h-4 text-[#67909B]" strokeWidth={2.5} />
                    <span className="text-sm font-normal text-neutral-950 font-['Roboto'] leading-5">
                      Projects
                    </span>
                  </div>
                  <span className="text-base font-medium text-neutral-950 font-['Roboto'] leading-6">
                    {plan.projects}
                  </span>
                </div>

                {/* Storage */}
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <Zap className="w-4 h-4 text-[#67909B]" strokeWidth={2.5} />
                    <span className="text-sm font-normal text-neutral-950 font-['Roboto'] leading-5">
                      Storage
                    </span>
                  </div>
                  <span className="text-base font-medium text-neutral-950 font-['Roboto'] leading-6">
                    {plan.storage}
                  </span>
                </div>
              </div>

              {/* Features */}
              <div className="flex flex-col gap-2">
                <h4 className="text-sm font-semibold text-neutral-950 font-['Roboto'] leading-5">
                  Features
                </h4>
                <div className="flex flex-col gap-2">
                  {plan.features.map((feature, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-1.5 flex-shrink-0" />
                      <span className="text-sm font-normal text-gray-600 font-['Roboto'] leading-5">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 mt-auto pt-4">
                <Button
                  onClick={() => handleEditPlan(plan.id)}
                  variant="outline"
                  className="flex-1 h-8 bg-white rounded-lg outline outline-[0.52px] outline-offset-[-0.52px] outline-black/10 hover:bg-gray-50 text-sm font-medium font-['Roboto'] text-neutral-950"
                >
                  <Pencil className="w-4 h-4" />
                  Edit
                </Button>
                <Button
                  onClick={() => handleDeletePlan(plan.id)}
                  className="w-8 h-8 bg-rose-600 hover:bg-rose-700 rounded-lg p-0"
                >
                  <Trash2 className="w-4 h-4 text-white" />
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Plan Comparison Table */}
        <div className="w-full bg-white rounded-2xl shadow-[0px_4px_4px_0px_rgba(0,0,0,0.08)] outline outline-1 outline-offset-[-1px] outline-black/10 overflow-hidden">
          <div className="p-4 sm:p-6 lg:p-8">
            {/* Table Header */}
            <div className="flex items-center gap-2 mb-4 sm:mb-6">
              <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6 text-cyan-950" />
              <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-cyan-950 font-['Roboto'] leading-tight">
                Plan Comparison
              </h2>
            </div>

            {/* Comparison Table */}
            <div className="overflow-x-auto">
              <table className="w-full table-auto">
                <thead>
                  <tr className="border-b-2 border-[#67909B]">
                    <th className="px-3 sm:px-4 lg:px-6 py-3 sm:py-4 text-left">
                      <span className="text-sm sm:text-base lg:text-lg font-bold text-cyan-950 font-['Roboto']">
                        Feature
                      </span>
                    </th>
                    <th className="px-3 sm:px-4 lg:px-6 py-3 sm:py-4 text-center">
                      <span className="text-sm sm:text-base lg:text-lg font-bold text-cyan-950 font-['Roboto']">
                        Free
                      </span>
                    </th>
                    <th className="px-3 sm:px-4 lg:px-6 py-3 sm:py-4 text-center">
                      <span className="text-sm sm:text-base lg:text-lg font-bold text-cyan-950 font-['Roboto']">
                        Pro
                      </span>
                    </th>
                    <th className="px-3 sm:px-4 lg:px-6 py-3 sm:py-4 text-center">
                      <span className="text-sm sm:text-base lg:text-lg font-bold text-cyan-950 font-['Roboto']">
                        Enterprise
                      </span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { feature: "Basic Project Management", free: true, pro: true, enterprise: true },
                    { feature: "Team Collaboration", free: true, pro: true, enterprise: true },
                    { feature: "Gantt Charts", free: false, pro: true, enterprise: true },
                    { feature: "API Access", free: false, pro: true, enterprise: true },
                    { feature: "Advanced Reporting", free: false, pro: true, enterprise: true },
                    { feature: "SSO Integration", free: false, pro: false, enterprise: true },
                  ].map((row, index) => (
                    <tr
                      key={index}
                      className={`${
                        index % 2 === 0 ? "bg-white" : "bg-gray-50"
                      } transition-colors hover:bg-gray-100`}
                    >
                      <td className="px-3 sm:px-4 lg:px-6 py-3 sm:py-4">
                        <span className="text-xs sm:text-sm lg:text-base font-normal text-gray-700 font-['Roboto'] leading-5 sm:leading-6">
                          {row.feature}
                        </span>
                      </td>
                      <td className="px-3 sm:px-4 lg:px-6 py-3 sm:py-4 text-center">
                        {row.free ? (
                          <Check className="w-5 h-5 sm:w-6 sm:h-6 text-green-400 mx-auto" strokeWidth={3} />
                        ) : (
                          <Minus className="w-5 h-5 sm:w-6 sm:h-6 text-gray-400 mx-auto" strokeWidth={3} />
                        )}
                      </td>
                      <td className="px-3 sm:px-4 lg:px-6 py-3 sm:py-4 text-center">
                        {row.pro ? (
                          <Check className="w-5 h-5 sm:w-6 sm:h-6 text-green-400 mx-auto" strokeWidth={3} />
                        ) : (
                          <Minus className="w-5 h-5 sm:w-6 sm:h-6 text-gray-400 mx-auto" strokeWidth={3} />
                        )}
                      </td>
                      <td className="px-3 sm:px-4 lg:px-6 py-3 sm:py-4 text-center">
                        {row.enterprise ? (
                          <Check className="w-5 h-5 sm:w-6 sm:h-6 text-green-400 mx-auto" strokeWidth={3} />
                        ) : (
                          <Minus className="w-5 h-5 sm:w-6 sm:h-6 text-gray-400 mx-auto" strokeWidth={3} />
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
          </>
        )}
      </div>

      {/* Create New Plan Modal */}
      <Dialog open={isCreatePlanOpen} onOpenChange={setIsCreatePlanOpen}>
        <DialogContent className="w-[90vw] max-w-[512px] max-h-[90vh] overflow-y-auto bg-white rounded-[10px] shadow-[0px_4px_6px_-4px_rgba(0,0,0,0.10)] shadow-lg outline outline-[0.52px] outline-offset-[-0.52px] outline-black/10 p-0 [&>button]:hidden">
          <div className="relative p-4 sm:p-6">
            {/* Close Button */}
            <button
              onClick={handleCloseModal}
              className="absolute right-4 top-4 opacity-70 hover:opacity-100 transition-opacity z-10"
            >
              <X className="w-4 h-4 text-neutral-950" />
              <span className="sr-only">Close</span>
            </button>

            {/* Header */}
            <DialogHeader className="text-left mb-4">
              <DialogTitle className="text-base sm:text-lg font-semibold text-neutral-950 font-['Roboto'] leading-4 mb-2">
                Create New Plan
              </DialogTitle>
              <DialogDescription className="text-xs sm:text-sm font-normal text-gray-500 font-['Roboto'] leading-5">
                Create a new subscription plan with custom pricing and features.
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-6">
              {/* Plan Details */}
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Plan Name */}
                  <div className="space-y-2">
                    <label className="text-xs sm:text-sm font-medium text-neutral-950 font-['Roboto'] leading-4">
                      Plan Name
                    </label>
                    <Input
                      value={planName}
                      onChange={(e) => setPlanName(e.target.value)}
                      placeholder="e.g., Business+"
                      className="w-full h-9 px-3 py-1 bg-white rounded-[10px] outline outline-[0.52px] outline-offset-[-0.52px] outline-slate-300 border-0 text-sm font-normal font-['Roboto'] text-neutral-950 placeholder:text-gray-500 focus:outline-none focus:ring-0 focus-visible:ring-0"
                    />
                  </div>

                  {/* Price */}
                  <div className="space-y-2">
                    <label className="text-xs sm:text-sm font-medium text-neutral-950 font-['Roboto'] leading-4">
                      Price (₹)
                    </label>
                    <Input
                      type="number"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      placeholder="0"
                      className="w-full h-9 px-3 py-1 bg-white rounded-[10px] outline outline-[0.52px] outline-offset-[-0.52px] outline-slate-300 border-0 text-sm font-normal font-['Roboto'] leading-5 text-neutral-950 focus:outline-none focus:ring-0 focus-visible:ring-0"
                    />
                  </div>
                </div>

                {/* Billing Cycle */}
                <div className="space-y-2">
                  <label className="text-xs sm:text-sm font-medium text-neutral-950 font-['Roboto'] leading-4">
                    Billing Cycle
                  </label>
                  <Select value={formBillingCycle} onValueChange={setFormBillingCycle}>
                    <SelectTrigger className="w-full h-9 px-3 bg-white rounded-[10px] outline outline-[0.52px] outline-offset-[-0.52px] outline-slate-300 border-0 text-sm font-normal font-['Roboto'] leading-5 text-neutral-950 focus:outline-none focus:ring-0 focus-visible:ring-0">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Monthly">Monthly</SelectItem>
                      <SelectItem value="Annual">Annual</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Plan Limits */}
              <div className="space-y-4">
                <h3 className="text-sm sm:text-base font-normal text-cyan-950 font-['Roboto'] leading-6">
                  Plan Limits
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Max Users */}
                  <div className="space-y-2">
                    <label className="text-xs sm:text-sm font-medium text-neutral-950 font-['Roboto'] leading-4">
                      Max Users
                    </label>
                    <Input
                      type="number"
                      value={maxUsers}
                      onChange={(e) => setMaxUsers(e.target.value)}
                      placeholder="10"
                      className="w-full h-9 px-3 py-1 bg-white rounded-[10px] outline outline-[0.52px] outline-offset-[-0.52px] outline-slate-300 border-0 text-sm font-normal font-['Roboto'] leading-5 text-neutral-950 focus:outline-none focus:ring-0 focus-visible:ring-0"
                    />
                  </div>

                  {/* Max Projects */}
                  <div className="space-y-2">
                    <label className="text-xs sm:text-sm font-medium text-neutral-950 font-['Roboto'] leading-4">
                      Max Projects
                    </label>
                    <Input
                      type="number"
                      value={maxProjects}
                      onChange={(e) => setMaxProjects(e.target.value)}
                      placeholder="10"
                      className="w-full h-9 px-3 py-1 bg-white rounded-[10px] outline outline-[0.52px] outline-offset-[-0.52px] outline-slate-300 border-0 text-sm font-normal font-['Roboto'] leading-5 text-neutral-950 focus:outline-none focus:ring-0 focus-visible:ring-0"
                    />
                  </div>

                  {/* Storage */}
                  <div className="space-y-2">
                    <label className="text-xs sm:text-sm font-medium text-neutral-950 font-['Roboto'] leading-4">
                      Storage
                    </label>
                    <Input
                      value={storage}
                      onChange={(e) => setStorage(e.target.value)}
                      placeholder="10 GB"
                      className="w-full h-9 px-3 py-1 bg-white rounded-[10px] outline outline-[0.52px] outline-offset-[-0.52px] outline-slate-300 border-0 text-sm font-normal font-['Roboto'] text-gray-500 placeholder:text-gray-500 focus:outline-none focus:ring-0 focus-visible:ring-0"
                    />
                  </div>

                  {/* API Calls */}
                  <div className="space-y-2">
                    <label className="text-xs sm:text-sm font-medium text-neutral-950 font-['Roboto'] leading-4">
                      API Calls
                    </label>
                    <Input
                      type="number"
                      value={apiCalls}
                      onChange={(e) => setApiCalls(e.target.value)}
                      placeholder="10000"
                      className="w-full h-9 px-3 py-1 bg-white rounded-[10px] outline outline-[0.52px] outline-offset-[-0.52px] outline-slate-300 border-0 text-sm font-normal font-['Roboto'] leading-5 text-neutral-950 focus:outline-none focus:ring-0 focus-visible:ring-0"
                    />
                  </div>
                </div>
              </div>

              {/* Features */}
              <div className="space-y-3">
                <h3 className="text-sm sm:text-base font-medium text-cyan-950 font-['Roboto'] leading-6">
                  Features
                </h3>
                <div className="space-y-3 max-h-[288px] overflow-y-auto">
                  {features.map((feature) => (
                    <div
                      key={feature.id}
                      className="w-full px-3 py-3 bg-zinc-100 rounded-[10px] flex justify-between items-center gap-4"
                    >
                      <div className="flex-1 min-w-0">
                        <div className="text-sm sm:text-base font-normal text-cyan-950 font-['Roboto'] leading-6">
                          {feature.name}
                        </div>
                        <div className="text-sm sm:text-base font-normal text-stone-500 font-['Roboto'] leading-6">
                          {feature.description}
                        </div>
                      </div>
                      <Switch
                        checked={feature.enabled}
                        onCheckedChange={() => toggleFeature(feature.id)}
                        className="flex-shrink-0 h-4 w-8 data-[state=checked]:bg-[#67909B]/20 data-[state=unchecked]:bg-slate-500/20 [&>span]:h-3 [&>span]:w-3 [&>span]:bg-[#67909B]"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end items-center gap-4 pt-4 border-t">
                <Button
                  onClick={handleCloseModal}
                  variant="outline"
                  className="w-20 h-9 px-4 py-2 bg-white rounded-lg outline outline-[0.52px] outline-offset-[-0.52px] outline-slate-300 border-0 hover:bg-gray-50 text-sm font-medium font-['Roboto'] leading-5 text-neutral-950"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleCreatePlan}
                  className="w-28 h-9 px-4 py-2 bg-[#67909B] hover:bg-[#67909B]/90 rounded-lg text-sm font-medium font-['Roboto'] leading-5 text-white"
                >
                  Create Plan
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Manage Subscription Modal */}
      <Dialog open={manageSubscriptionOpen} onOpenChange={setManageSubscriptionOpen}>
        <DialogContent className="w-[90vw] max-w-[512px] max-h-[90vh] overflow-y-auto bg-white rounded-[10px] shadow-[0px_4px_6px_-4px_rgba(0,0,0,0.10)] shadow-lg outline outline-[0.52px] outline-offset-[-0.52px] outline-black/10 p-0 [&>button]:hidden">
          <div className="relative p-4 sm:p-6">
            {/* Close Button */}
            <button
              onClick={() => setManageSubscriptionOpen(false)}
              className="absolute right-4 top-4 opacity-70 hover:opacity-100 transition-opacity z-10"
            >
              <X className="w-4 h-4 text-neutral-950" />
              <span className="sr-only">Close</span>
            </button>

            {/* Header */}
            <DialogHeader className="text-left mb-6">
              <DialogTitle className="text-base sm:text-lg font-semibold text-cyan-950 font-['Roboto'] leading-4 mb-2">
                Manage Subscription - {selectedCompany?.company || "Company Name"}
              </DialogTitle>
              <DialogDescription className="text-xs sm:text-sm font-normal text-gray-500 font-['Roboto'] leading-5">
                Update subscription details, resolve billing issues, or change plans.
              </DialogDescription>
            </DialogHeader>

            {/* Content */}
            <div className="space-y-6">
              {/* Current Subscription and Billing Information Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                {/* Current Subscription Card */}
                <div className="bg-white rounded-2xl outline outline-[0.52px] outline-offset-[-0.52px] outline-black/10 p-4 sm:p-6 flex flex-col gap-4 min-h-[224px]">
                  <div className="flex items-center gap-2">
                    <Database className="w-4 h-4 text-[#438197]" strokeWidth={2.5} />
                    <h3 className="text-base font-normal text-cyan-950 font-['Roboto'] leading-6">
                      Current Subscription
                    </h3>
                  </div>
                  <div className="flex flex-col gap-3 flex-1">
                    <div className="flex justify-between items-center">
                      <span className="text-base font-normal text-stone-500 font-['Roboto'] leading-6">Plan:</span>
                      <span className="px-2 py-0.5 bg-[#438197] rounded-lg text-xs font-medium text-white font-['Roboto'] leading-4">
                        {selectedCompany?.currentPlan || "Enterprise"}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-base font-normal text-stone-500 font-['Roboto'] leading-6">Status:</span>
                      <span className={`px-2 py-0.5 rounded-lg text-xs font-medium font-['Roboto'] leading-4 ${
                        selectedCompany?.status === "Pending Change"
                          ? "bg-yellow-100 text-yellow-800"
                          : selectedCompany?.status === "Active" || selectedCompany?.status === "Paid"
                          ? "bg-green-100 text-green-800"
                          : selectedCompany?.status === "Past Due"
                          ? "bg-red-100 text-red-800"
                          : selectedCompany?.status === "Trial"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-gray-100 text-gray-800"
                      }`}>
                        {selectedCompany?.status || "Active"}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-base font-normal text-stone-500 font-['Roboto'] leading-6">MRR:</span>
                      <span className="text-base font-normal text-cyan-950 font-['Roboto'] leading-6">
                        ₹{selectedCompany?.mrr || "15,999"}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-base font-normal text-stone-500 font-['Roboto'] leading-6">Started:</span>
                      <span className="text-base font-normal text-cyan-950 font-['Roboto'] leading-6">
                        {selectedCompany?.started || "15/1/2023"}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Billing Information Card */}
                <div className="bg-white rounded-2xl outline outline-[0.52px] outline-offset-[-0.52px] outline-black/10 p-4 sm:p-6 flex flex-col gap-4 min-h-[224px]">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-green-600" strokeWidth={2.5} />
                    <h3 className="text-base font-normal text-cyan-950 font-['Roboto'] leading-6">
                      Billing Information
                    </h3>
                  </div>
                  <div className="flex flex-col gap-3 flex-1">
                    <div className="flex justify-between items-center">
                      <span className="text-base font-normal text-stone-500 font-['Roboto'] leading-6">Next Billing:</span>
                      <span className="text-base font-normal text-cyan-950 font-['Roboto'] leading-6">
                        {selectedCompany?.nextBilling || "15/2/2024"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Change Plan Section */}
              <div className="bg-white rounded-2xl outline outline-[0.52px] outline-offset-[-0.52px] outline-black/10 p-4 sm:p-6 flex flex-col gap-6 sm:gap-10">
                <div className="flex items-center gap-2">
                  <RefreshCw className="w-4 h-4 text-[#438197]" strokeWidth={2.5} />
                  <h3 className="text-base font-normal text-cyan-950 font-['Roboto'] leading-6">
                    Change Plan
                  </h3>
                </div>
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                  <button
                    onClick={() => setSelectedPlan("Free")}
                    className={`flex-1 sm:w-32 h-9 px-4 py-2 rounded-lg outline outline-[0.52px] outline-offset-[-0.52px] text-sm font-medium font-['Roboto'] leading-5 transition-colors ${
                      selectedPlan === "Free"
                        ? "bg-slate-500 text-white outline-slate-500"
                        : "bg-white text-neutral-950 outline-slate-300 hover:bg-gray-50"
                    }`}
                  >
                    Free
                  </button>
                  <button
                    onClick={() => setSelectedPlan("Pro")}
                    className={`flex-1 sm:w-32 h-9 px-4 py-2 rounded-lg outline outline-[0.52px] outline-offset-[-0.52px] text-sm font-medium font-['Roboto'] leading-5 transition-colors ${
                      selectedPlan === "Pro"
                        ? "bg-slate-500 text-white outline-slate-500"
                        : "bg-white text-neutral-950 outline-slate-300 hover:bg-gray-50"
                    }`}
                  >
                    Pro
                  </button>
                  <button
                    onClick={() => setSelectedPlan("Enterprise")}
                    className={`flex-1 sm:w-32 h-9 px-4 py-2 rounded-lg outline outline-[0.52px] outline-offset-[-0.52px] text-sm font-medium font-['Roboto'] leading-5 transition-colors ${
                      selectedPlan === "Enterprise"
                        ? "bg-[#438197] text-white outline-slate-500"
                        : "bg-white text-neutral-950 outline-slate-300 hover:bg-gray-50"
                    }`}
                  >
                    Enterprise
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t-[0.52px] border-slate-300 flex flex-col sm:flex-row justify-between items-center gap-4">
                <Button
                  onClick={() => {
                    console.log("Cancel Subscription")
                    
                  }}
                  variant="outline"
                  className="w-full sm:w-40 h-9 px-4 py-2 bg-white rounded-lg outline outline-[0.52px] outline-offset-[-0.52px] outline-red-200 border-0 text-sm font-medium font-['Roboto'] leading-5 text-red-600 hover:bg-white hover:text-red-600"
                >
                  Cancel Subscription
                </Button>
                <Button
                  onClick={() => {
                    console.log("Done", { selectedPlan, selectedCompany })
                    // TODO: Implement save changes
                    setManageSubscriptionOpen(false)
                  }}
                  className="w-full sm:w-16 h-9 px-4 py-2 bg-[#438197] hover:bg-[#438197] rounded-lg text-sm font-medium font-['Roboto'] leading-5 text-white"
                >
                  Done
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
