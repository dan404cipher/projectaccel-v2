import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { 
  Building2, 
  CheckCircle2, 
  Package, 
  IndianRupee, 
  AlertTriangle,
  MoreHorizontal,
  ChevronDown,
  ArrowUpDown,
  X,
  Eye,
  Pencil,
  PauseCircle,
  Trash2,
  Mail,
  User,
  Phone,
  Calendar,
  MapPin,
  FolderKanban,
  Users,
  CreditCard,
  LogIn,
  Edit,
  Ban,
  Clock,
  Check,
  Download
} from "lucide-react"
import { useState, useEffect, useRef } from "react"

interface Company {
  id: string
  name: string
  industry: string
  adminEmail: string
  planType: "Enterprise" | "Pro" | "Basic"
  status: "Active" | "Trial" | "Suspended"
  users: number
  revenue: string
  dateJoined: string
  companyId?: string
  adminName?: string
  phone?: string
  address?: string
  memberSince?: string
  projects?: number
  activeProjects?: number
  mrr?: string
  storageUsed?: string
  storageTotal?: string
}

interface Project {
  id: string
  name: string
  members: number
  dueDate: string
  status: "In Progress" | "Completed" | "Not Started"
}

interface TeamMember {
  id: string
  name: string
  email: string
  role: "Admin" | "Manager" | "Member"
  status: "Active" | "Inactive"
  dateJoined: string
  avatar?: string
}

interface Invoice {
  id: string
  invoiceId: string
  date: string
  amount: string
  status: "Paid" | "Due"
}

const companiesData: Company[] = [
  { id: "1", name: "TechCorp Solutions", industry: "Software", adminEmail: "admin@techcorp.com", planType: "Enterprise", status: "Active", users: 145, revenue: "₹28,855", dateJoined: "24/09/2025", companyId: "CY0001", adminName: "Saranya", phone: "+91 9876 543 321", address: "#88, SM Towers, 6th Floor, Rajiv Gandhi Salai, Perungudi, Chennai, Tamil Nadu 600096", memberSince: "January 15, 2024", projects: 24, activeProjects: 18, mrr: "2900", storageUsed: "145GB", storageTotal: "500GB" },
  { id: "2", name: "Apple Inc", industry: "Software", adminEmail: "example@gmail.com", planType: "Pro", status: "Active", users: 67, revenue: "₹3,282", dateJoined: "24/09/2025", companyId: "CY0002", adminName: "John Doe", phone: "+91 9876 543 322", address: "123 Main St, New York, NY 10001", memberSince: "February 10, 2024", projects: 12, activeProjects: 8, mrr: "1500", storageUsed: "80GB", storageTotal: "250GB" },
  { id: "3", name: "Apple Inc", industry: "Software", adminEmail: "example@gmail.com", planType: "Basic", status: "Active", users: 5, revenue: "₹0", dateJoined: "24/09/2025", companyId: "CY0003", adminName: "Jane Smith", phone: "+91 9876 543 323", address: "456 Oak Ave, Los Angeles, CA 90001", memberSince: "March 5, 2024", projects: 3, activeProjects: 2, mrr: "0", storageUsed: "15GB", storageTotal: "100GB" },
  { id: "4", name: "Apple Inc", industry: "Software", adminEmail: "example@gmail.com", planType: "Enterprise", status: "Trial", users: 12, revenue: "₹0", dateJoined: "24/09/2025", companyId: "CY0004", adminName: "Bob Johnson", phone: "+91 9876 543 324", address: "789 Pine Rd, Chicago, IL 60601", memberSince: "April 1, 2024", projects: 5, activeProjects: 4, mrr: "0", storageUsed: "30GB", storageTotal: "500GB" },
  { id: "5", name: "Apple Inc", industry: "Software", adminEmail: "example@gmail.com", planType: "Enterprise", status: "Active", users: 203, revenue: "₹40,397", dateJoined: "24/09/2025", companyId: "CY0005", adminName: "Alice Brown", phone: "+91 9876 543 325", address: "321 Elm St, Houston, TX 77001", memberSince: "May 20, 2024", projects: 45, activeProjects: 32, mrr: "4500", storageUsed: "320GB", storageTotal: "500GB" },
  { id: "6", name: "Apple Inc", industry: "Software", adminEmail: "example@gmail.com", planType: "Basic", status: "Suspended", users: 8, revenue: "₹0", dateJoined: "24/09/2025", companyId: "CY0006", adminName: "Charlie Wilson", phone: "+91 9876 543 326", address: "654 Maple Dr, Phoenix, AZ 85001", memberSince: "June 10, 2024", projects: 2, activeProjects: 0, mrr: "0", storageUsed: "20GB", storageTotal: "100GB" },
  { id: "7", name: "Apple Inc", industry: "Software", adminEmail: "example@gmail.com", planType: "Pro", status: "Active", users: 34, revenue: "₹2,107", dateJoined: "24/09/2025", companyId: "CY0007", adminName: "Diana Garcia", phone: "+91 9876 543 327", address: "987 Cedar Ln, Philadelphia, PA 19101", memberSince: "July 15, 2024", projects: 8, activeProjects: 6, mrr: "1800", storageUsed: "95GB", storageTotal: "250GB" },
]

// Sample projects data - would come from API in real app
const getProjectsForCompany = (companyId: string): Project[] => {
  // Return different projects based on company
  const allProjects: Project[] = [
    { id: "1", name: "Website Redesign", members: 8, dueDate: "30/11/2024", status: "In Progress" },
    { id: "2", name: "Mobile App Development", members: 12, dueDate: "15/12/2024", status: "In Progress" },
    { id: "3", name: "Marketing Campaign", members: 5, dueDate: "01/10/2024", status: "Completed" },
    { id: "4", name: "API Integration", members: 6, dueDate: "20/11/2024", status: "In Progress" },
    { id: "5", name: "Database Migration", members: 4, dueDate: "15/09/2024", status: "Completed" },
    { id: "6", name: "UI/UX Redesign", members: 7, dueDate: "25/12/2024", status: "In Progress" },
    { id: "7", name: "Security Audit", members: 3, dueDate: "10/12/2024", status: "Not Started" },
    { id: "8", name: "Cloud Infrastructure Setup", members: 10, dueDate: "05/01/2025", status: "In Progress" },
  ]
  return allProjects
}

// Sample team members data - would come from API in real app
const getTeamMembersForCompany = (companyId: string): TeamMember[] => {
  // Return team members based on company
  const allTeamMembers: TeamMember[] = [
    { id: "1", name: "Sarah Johnson", email: "sarah.j@company.com", role: "Admin", status: "Active", dateJoined: "13/10/2024", avatar: "https://placehold.co/40x40" },
    { id: "2", name: "John Smith", email: "john.s@company.com", role: "Manager", status: "Active", dateJoined: "12/10/2024", avatar: "https://placehold.co/40x40" },
    { id: "3", name: "Emma Wilson", email: "emma.w@company.com", role: "Member", status: "Active", dateJoined: "13/10/2024", avatar: "https://placehold.co/40x40" },
    { id: "4", name: "Michael Brown", email: "michael.b@company.com", role: "Member", status: "Inactive", dateJoined: "28/09/2024", avatar: "https://placehold.co/40x40" },
    { id: "5", name: "Lisa Anderson", email: "lisa.a@company.com", role: "Manager", status: "Active", dateJoined: "11/10/2024", avatar: "https://placehold.co/40x40" },
    { id: "6", name: "David Lee", email: "david.l@company.com", role: "Member", status: "Active", dateJoined: "15/10/2024", avatar: "https://placehold.co/40x40" },
    { id: "7", name: "Maria Garcia", email: "maria.g@company.com", role: "Member", status: "Active", dateJoined: "10/10/2024", avatar: "https://placehold.co/40x40" },
    { id: "8", name: "James Taylor", email: "james.t@company.com", role: "Admin", status: "Active", dateJoined: "09/10/2024", avatar: "https://placehold.co/40x40" },
  ]
  return allTeamMembers
}

// Sample invoices data - would come from API in real app
const getInvoicesForCompany = (companyId: string): Invoice[] => {
  const allInvoices: Invoice[] = [
    { id: "1", invoiceId: "INV-2025-10-001", date: "October 1, 2025", amount: "₹9,99,999", status: "Due" },
    { id: "2", invoiceId: "INV-2025-09-001", date: "September 1, 2025", amount: "₹9,99,999", status: "Paid" },
    { id: "3", invoiceId: "INV-2025-08-001", date: "August 1, 2025", amount: "₹9,99,999", status: "Paid" },
    { id: "4", invoiceId: "INV-2025-07-001", date: "July 1, 2025", amount: "₹9,99,999", status: "Paid" },
    { id: "5", invoiceId: "INV-2025-06-001", date: "June 1, 2025", amount: "₹9,99,999", status: "Paid" },
    { id: "6", invoiceId: "INV-2025-05-001", date: "May 1, 2025", amount: "₹9,99,999", status: "Paid" },
    { id: "7", invoiceId: "INV-2025-04-001", date: "April 1, 2025", amount: "₹9,99,999", status: "Paid" },
  ]
  return allInvoices
}

export default function Companies() {
  const [companies] = useState<Company[]>(companiesData)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [openDropdownId, setOpenDropdownId] = useState<string | null>(null)
  const [isViewDetailsOpen, setIsViewDetailsOpen] = useState(false)
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null)
  const [activeTab, setActiveTab] = useState<"Overview" | "Projects" | "Users" | "Billing">("Overview")
  const [companyProjects, setCompanyProjects] = useState<Project[]>([])
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([])
  const [invoices, setInvoices] = useState<Invoice[]>([])

  // Load projects when company is selected or tab changes to Projects
  useEffect(() => {
    if (selectedCompany && activeTab === "Projects") {
      const projects = getProjectsForCompany(selectedCompany.id)
      setCompanyProjects(projects)
    }
  }, [selectedCompany, activeTab])

  // Load team members when company is selected or tab changes to Users
  useEffect(() => {
    if (selectedCompany && activeTab === "Users") {
      const members = getTeamMembersForCompany(selectedCompany.id)
      setTeamMembers(members)
    }
  }, [selectedCompany, activeTab])

  // Load invoices when company is selected or tab changes to Billing
  useEffect(() => {
    if (selectedCompany && activeTab === "Billing") {
      const invoiceList = getInvoicesForCompany(selectedCompany.id)
      setInvoices(invoiceList)
    }
  }, [selectedCompany, activeTab])
  
  const [formData, setFormData] = useState({
    companyName: "",
    adminEmail: "",
    initialPlan: "Free",
    initialStatus: "Trial",
    initialUserCount: "1"
  })

  const toggleDropdown = (companyId: string, e: React.MouseEvent) => {
    e.stopPropagation()
    setOpenDropdownId(openDropdownId === companyId ? null : companyId)
  }

  const handleActionClick = (action: string, companyId: string) => {
    console.log(`${action} clicked for company ${companyId}`)
    setOpenDropdownId(null)
    
    if (action === "View Details") {
      const company = companies.find(c => c.id === companyId)
      if (company) {
        setSelectedCompany(company)
        setActiveTab("Overview") // Reset to Overview tab when opening
        setIsViewDetailsOpen(true)
      }
    }
    // Handle other action logic here
  }

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node
      const dropdowns = document.querySelectorAll('[data-dropdown]')
      let clickedOutside = true
      
      dropdowns.forEach(dropdown => {
        if (dropdown.contains(target)) {
          clickedOutside = false
        }
      })
      
      if (clickedOutside) {
        setOpenDropdownId(null)
      }
    }

    if (openDropdownId) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [openDropdownId])

  const totalCompanies = companies.length
  const activeCompanies = companies.filter(c => c.status === "Active").length
  const trialCompanies = companies.filter(c => c.status === "Trial").length
  const totalRevenue = "₹72,534"
  const issues = companies.filter(c => c.status === "Suspended").length
  const activePercentage = Math.round((activeCompanies / totalCompanies) * 100)

  const renderPlanTypeBadge = (planType: Company["planType"]) => {
    switch (planType) {
      case "Enterprise":
  return (
          <div className="w-20 h-6 relative bg-purple-100 rounded-[40px]">
            <div className="left-[11.19px] top-[4px] absolute justify-start text-purple-800 text-xs font-normal font-['Roboto'] leading-4">
              Enterprise
        </div>
      </div>
        )
      case "Pro":
        return (
          <div className="w-20 h-6 relative bg-blue-100 rounded-full">
            <div className="left-[30.19px] top-[4px] absolute justify-start text-blue-800 text-xs font-normal font-['Roboto'] leading-4">
              Pro
      </div>
          </div>
        )
      case "Basic":
        return (
          <div className="w-20 h-6 relative bg-gray-100 rounded-full">
            <div className="left-[24.19px] top-[4px] absolute justify-start text-gray-800 text-xs font-normal font-['Roboto'] leading-4">
              Basic
            </div>
          </div>
        )
      default:
        return (
          <div className="w-20 h-6 relative bg-gray-100 rounded-full">
            <div className="left-[24.19px] top-[4px] absolute justify-start text-gray-800 text-xs font-normal font-['Roboto'] leading-4">
              {planType}
      </div>
    </div>
  )
}
  }

  const renderStatusBadge = (status: Company["status"]) => {
    switch (status) {
      case "Active":
        return (
          <div className="w-20 h-6 relative bg-green-100 rounded-full">
            <div className="left-[22px] top-[4px] absolute justify-start text-green-800 text-xs font-normal font-['Roboto'] leading-4">
              Active
            </div>
          </div>
        )
      case "Trial":
        return (
          <div className="w-20 h-6 relative bg-yellow-100 rounded-full">
            <div className="left-[28px] top-[3.98px] absolute justify-start text-yellow-800 text-xs font-normal font-['Roboto'] leading-4">
              Trial
            </div>
          </div>
        )
      case "Suspended":
        return (
          <div className="w-20 h-6 relative bg-red-100 rounded-full">
            <div className="left-[8px] top-[4.46px] absolute justify-start text-red-800 text-xs font-normal font-['Roboto'] leading-4">
              Suspended
            </div>
          </div>
        )
      default:
  return (
          <div className="w-20 h-6 relative bg-gray-100 rounded-full">
            <div className="left-[22px] top-[4px] absolute justify-start text-gray-800 text-xs font-normal font-['Roboto'] leading-4">
              {status}
            </div>
    </div>
  )
}
  }

  const renderProjectStatusBadge = (status: Project["status"]) => {
    switch (status) {
      case "In Progress":
        return (
          <div className="w-20 h-6 relative bg-purple-100 rounded-[40px] flex items-center justify-center">
            <span className="text-purple-800 text-xs font-normal font-['Roboto'] leading-4">
              In Progress
            </span>
          </div>
        )
      case "Completed":
        return (
          <div className="w-20 h-6 relative bg-green-100 rounded-full flex items-center justify-center">
            <span className="text-green-800 text-xs font-normal font-['Roboto'] leading-4">
              Completed
            </span>
          </div>
        )
      case "Not Started":
        return (
          <div className="w-20 h-6 relative bg-gray-100 rounded-full flex items-center justify-center">
            <span className="text-gray-800 text-xs font-normal font-['Roboto'] leading-4">
              Not Started
            </span>
          </div>
        )
      default:
        return (
          <div className="w-20 h-6 relative bg-gray-100 rounded-full flex items-center justify-center">
            <span className="text-gray-800 text-xs font-normal font-['Roboto'] leading-4">
              {status}
            </span>
          </div>
        )
    }
  }

  const renderUserStatusBadge = (status: TeamMember["status"]) => {
    switch (status) {
      case "Active":
        return (
          <div className="w-20 h-6 relative bg-green-100 rounded-full flex items-center justify-center">
            <span className="text-green-800 text-xs font-normal font-['Roboto'] leading-4">
              Active
            </span>
          </div>
        )
      case "Inactive":
        return (
          <div className="w-20 h-6 relative bg-gray-100 rounded-full flex items-center justify-center">
            <span className="text-slate-800 text-xs font-normal font-['Roboto'] leading-4">
              Inactive
            </span>
          </div>
        )
      default:
        return (
          <div className="w-20 h-6 relative bg-gray-100 rounded-full flex items-center justify-center">
            <span className="text-slate-800 text-xs font-normal font-['Roboto'] leading-4">
              {status}
            </span>
          </div>
        )
    }
  }

  const renderBillingStatusBadge = (status: Invoice["status"]) => {
    switch (status) {
      case "Paid":
        return (
          <div className="w-20 h-6 relative bg-green-100 rounded-full flex items-center justify-center">
            <span className="text-green-800 text-xs font-normal font-['Roboto'] leading-4">
              Paid
            </span>
          </div>
        )
      case "Due":
        return (
          <div className="w-20 h-6 relative bg-yellow-100 rounded-[40px] flex items-center justify-center">
            <span className="text-yellow-800 text-xs font-normal font-['Roboto'] leading-4">
              Due
            </span>
          </div>
        )
      default:
        return (
          <div className="w-20 h-6 relative bg-gray-100 rounded-full flex items-center justify-center">
            <span className="text-slate-800 text-xs font-normal font-['Roboto'] leading-4">
              {status}
            </span>
    </div>
  )
}
  }
  
  return (
    <div className="w-full h-full p-4 sm:p-6 lg:p-8 overflow-auto">
      <div className="space-y-6 sm:space-y-8 lg:space-y-10">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 sm:gap-6">
          <div className="flex-1 space-y-1 sm:space-y-2">
            <h1 className="text-lg sm:text-xl lg:text-2xl font-medium text-cyan-950 font-['Roboto'] leading-tight tracking-tight">
              Companies Management
            </h1>
            <p className="text-xs sm:text-sm lg:text-base text-gray-600 font-normal font-['Roboto'] leading-5 sm:leading-6">
              Manage all companies registered on the platform
            </p>
          </div>
          <Button 
            onClick={() => {
              console.log("Create button clicked, isModalOpen will be set to:", true)
              setIsModalOpen(true)
              console.log("isModalOpen state updated")
            }}
            className="bg-[#67909B] hover:bg-slate-600 text-white h-9 sm:h-10 px-4 sm:px-6 rounded-lg text-xs sm:text-sm font-medium font-['Roboto'] w-full sm:w-auto"
          >
            Create
          </Button>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 sm:gap-5 lg:gap-6">
          {/* Total Companies */}
          <div className="bg-white rounded-[20px] sm:rounded-[30px] lg:rounded-[40px] outline outline-1 outline-offset-[-1px] outline-black/10 p-4 sm:p-5 lg:p-6 flex flex-col gap-4 sm:gap-6 lg:gap-8 min-h-[180px] sm:min-h-[200px] lg:min-h-[208px]">
            <div className="flex justify-between items-center">
              <h3 className="text-sm sm:text-base text-cyan-950 font-semibold font-['Roboto'] leading-6">
                Total Companies
              </h3>
              <div className="w-4 h-4 sm:w-5 sm:h-5 relative">
                <Building2 className="w-full h-full text-slate-500" strokeWidth={2.5} />
              </div>
            </div>
            <div className="flex-1 flex items-start">
              <p className="text-2xl sm:text-3xl lg:text-4xl text-cyan-950 font-bold font-['Roboto'] leading-tight tracking-tight">
                {totalCompanies}
              </p>
            </div>
            <p className="text-xs sm:text-sm text-gray-600 font-normal font-['Roboto'] leading-5">
              Across all regions
            </p>
          </div>

          {/* Active Companies */}
          <div className="bg-white rounded-[20px] sm:rounded-[30px] lg:rounded-[40px] outline outline-1 outline-offset-[-1px] outline-black/10 p-4 sm:p-5 lg:p-6 flex flex-col gap-4 sm:gap-6 lg:gap-8 min-h-[180px] sm:min-h-[200px] lg:min-h-[208px]">
            <div className="flex justify-between items-center">
              <h3 className="text-sm sm:text-base text-cyan-950 font-semibold font-['Roboto'] leading-6">
                Active Companies
              </h3>
              <div className="w-4 h-4 sm:w-5 sm:h-5 relative">
                <CheckCircle2 className="w-full h-full text-green-500" strokeWidth={2.5} />
              </div>
            </div>
            <div className="flex-1 flex items-start">
              <p className="text-2xl sm:text-3xl lg:text-4xl text-cyan-950 font-bold font-['Roboto'] leading-tight tracking-tight">
                {activeCompanies}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-3 h-3 sm:w-4 sm:h-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
              <p className="text-xs sm:text-sm text-green-600 font-normal font-['Roboto'] leading-5">
                {activePercentage}% of total
              </p>
                </div>
                </div>

                <div className="bg-white rounded-[20px] sm:rounded-[30px] lg:rounded-[40px] outline outline-1 outline-offset-[-1px] outline-black/10 p-4 sm:p-5 lg:p-6 flex flex-col gap-4 sm:gap-6 lg:gap-8 min-h-[180px] sm:min-h-[200px] lg:min-h-[208px]">
            <div className="flex justify-between items-center">
              <h3 className="text-sm sm:text-base text-cyan-950 font-semibold font-['Roboto'] leading-6">
                Trial Companies
              </h3>
              <div className="w-4 h-4 sm:w-5 sm:h-5 relative">
                <Package className="w-full h-full text-slate-500" strokeWidth={2.5} />
              </div>
            </div>
            <div className="flex-1 flex items-start">
              <p className="text-2xl sm:text-3xl lg:text-4xl text-cyan-950 font-bold font-['Roboto'] leading-tight tracking-tight">
                {trialCompanies}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-3 h-3 sm:w-4 sm:h-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
              <p className="text-xs sm:text-sm text-green-600 font-normal font-['Roboto'] leading-5">
                +18% from last month
              </p>
            </div>
                      </div>

          {/* Total Revenue */}
          <div className="bg-white rounded-[20px] sm:rounded-[30px] lg:rounded-[40px] outline outline-1 outline-offset-[-1px] outline-black/10 p-4 sm:p-5 lg:p-6 flex flex-col gap-4 sm:gap-6 lg:gap-8 min-h-[180px] sm:min-h-[200px] lg:min-h-[208px]">
            <div className="flex justify-between items-center">
              <h3 className="text-sm sm:text-base text-cyan-950 font-semibold font-['Roboto'] leading-6">
                Total Revenue
              </h3>
              <div className="w-4 h-4 sm:w-5 sm:h-5 relative flex items-center justify-center">
                <IndianRupee className="w-full h-full text-green-500" strokeWidth={2.5} />
                </div>
                </div>
            <div className="flex-1 flex items-start">
              <p className="text-lg sm:text-2xl lg:text-3xl text-cyan-950 font-bold font-['Roboto'] leading-tight tracking-tight">
                {totalRevenue}
              </p>
                </div>
            <p className="text-xs sm:text-sm text-gray-600 font-normal font-['Roboto'] leading-5">
              Monthly recurring
            </p>
                </div>

          {/* Issues */}
          <div className="bg-white rounded-[20px] sm:rounded-[30px] lg:rounded-[40px] outline outline-1 outline-offset-[-1px] outline-black/10 p-4 sm:p-5 lg:p-6 flex flex-col gap-4 sm:gap-6 lg:gap-8 min-h-[180px] sm:min-h-[200px] lg:min-h-[208px]">
            <div className="flex justify-between items-center">
              <h3 className="text-sm sm:text-base text-cyan-950 font-semibold font-['Roboto'] leading-6">
                Issues
              </h3>
              <div className="w-4 h-4 sm:w-5 sm:h-5 relative">
                <AlertTriangle className="w-full h-full text-yellow-500" strokeWidth={2.5} />
                </div>
                </div>
            <div className="flex-1 flex items-start">
              <p className="text-2xl sm:text-3xl lg:text-4xl text-cyan-950 font-bold font-['Roboto'] leading-tight tracking-tight">
                {issues}
              </p>
                </div>
            <p className="text-xs sm:text-sm text-red-600 font-normal font-['Roboto'] leading-5">
              Suspended tenants
            </p>
                </div>

    
        
                    </div>

        {/* Companies Table */}
        <div className="w-full">
  <div className="w-full h-auto sm:h-[600px] lg:h-[831px] bg-white rounded-[20px] sm:rounded-[30px] lg:rounded-[40px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.08)] border border-black/10 p-4 sm:p-6 lg:p-8">
    {/* Scrollable Container */}
    <div className="w-full overflow-x-auto overflow-y-hidden [&::-webkit-scrollbar]:h-2 [&::-webkit-scrollbar-thumb]:bg-gray-300 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-transparent">
      <div className="min-w-[900px] lg:min-w-[1100px]"> {/* Added min-width for consistency */}

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
            { label: "Industry" },
            { label: "Admin Email" },
            { label: "Plan Type" },
            { label: "Status" },
            { label: "Users" },
            { label: "Revenue" },
            { label: "Date joined" },
            { label: "Action" },
          ].map((col, i) => (
            <div
              key={i}
              className={`px-2 py-2 sm:py-3 text-center flex-1 flex-shrink-0 ${
                col.label === "Company name" ? "flex items-center gap-1.5 text-left" : "flex items-center justify-center gap-1.5"
              } ${
                col.label === "Plan Type" ? "ml-4 sm:ml-6 lg:ml-8" : ""
              }`}
            >
              <span className="text-xs sm:text-sm font-semibold text-neutral-800 font-['Roboto'] whitespace-nowrap">
                {col.label}
              </span>
              {col.label !== "Action" && col.label !== "Date joined" && (
                <ArrowUpDown className="w-3 h-3 text-neutral-400 flex-shrink-0" />
              )}
            </div>
          ))}
        </div>

        {/* Body */}
        {companies.map((company, index) => (
          <div
            key={company.id}
            className={`flex items-center px-1 sm:px-2 lg:px-4 py-4 sm:py-5 lg:py-6 hover:bg-gray-50 transition border-b border-gray-200 ${
              index === companies.length - 1 ? "border-b-0" : ""
            }`}
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
            <div className="flex items-center gap-2 sm:gap-3 flex-1 flex-shrink-0">
              <input
                type="checkbox"
                className="w-3 h-3 sm:w-3.5 sm:h-3.5 lg:w-4 lg:h-4 flex-shrink-0"
              />
              <span className="text-xs sm:text-sm font-medium text-zinc-700 font-['Roboto'] truncate">
                {company.name}
              </span>
            </div>
            <div className="flex-1 text-center text-xs sm:text-sm font-medium text-zinc-700 flex-shrink-0">
              {company.industry}
            </div>
            <div className="w-40 h-6 flex items-center justify-center text-zinc-700 text-sm font-normal font-['Roboto'] leading-5 flex-shrink-0">
              {company.adminEmail}
            </div>
            <div className="flex-1 text-center flex-shrink-0 ml-4 sm:ml-6 lg:ml-8">
              {renderPlanTypeBadge(company.planType)}
            </div>
            <div className="flex-1 text-center flex-shrink-0">
              {renderStatusBadge(company.status)}
            </div>
            <div className="flex-1 text-center text-xs sm:text-sm font-medium text-zinc-700 flex-shrink-0">
              {company.users}
            </div>
            <div className="flex-1 text-center text-xs sm:text-sm font-medium text-zinc-700 flex-shrink-0">
              {company.revenue}
            </div>
            <div className="flex-1 text-center text-xs sm:text-sm font-medium text-zinc-700 flex-shrink-0">
              {company.dateJoined}
            </div>
            <div className="flex-1 flex justify-center flex-shrink-0 relative">
              <button
                onClick={(e) => toggleDropdown(company.id, e)}
                className="w-6 h-6 flex items-center justify-center"
              >
                <MoreHorizontal className="w-6 h-6 text-gray-950 cursor-pointer" />
              </button>
              {openDropdownId === company.id && (
                <div className="absolute right-0 top-full mt-1 w-48 bg-white rounded-lg shadow-md outline outline-[0.5px] outline-black/10 z-50" data-dropdown>
                  {/* Dropdown items */}
                  {["View Details", "Edit Details", "Suspend", "Deactivate"].map(
                    (action, idx) => (
                      <div
                        key={idx}
                        onClick={() => handleActionClick(action, company.id)}
                        className={`px-4 py-2 text-sm cursor-pointer ${
                          action === "Deactivate"
                            ? "text-red-600 hover:bg-red-50"
                            : "text-neutral-800 hover:bg-gray-100"
                        }`}
                      >
                        {action}
                      </div>
                    )
                  )}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
</div>

      </div>

      {/* Add Organization Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="!fixed !left-1/2 !top-1/2 !-translate-x-1/2 !-translate-y-1/2 !w-[512px] h-[28rem] bg-white rounded-[10px] shadow-[0px_4px_6px_-4px_rgba(0,0,0,0.10)] shadow-lg outline outline-1 outline-offset-[-1px] outline-black/10 p-0 overflow-hidden !z-[100] [&>button]:hidden !max-w-[512px] !grid-rows-none !block">
          {/* Custom Close Button */}
          <button
            onClick={() => setIsModalOpen(false)}
            type="button"
            className="absolute left-[479px] top-[17px] w-4 h-4 opacity-70 hover:opacity-100 transition-opacity rounded-sm z-[110] bg-transparent border-0 cursor-pointer"
          >
            <div className="w-4 h-4 left-0 top-0 absolute overflow-hidden">
              <div className="w-2 h-2 left-[4px] top-[4px] absolute outline outline-[1.33px] outline-offset-[-0.67px] outline-neutral-950 rotate-45"></div>
              <div className="w-2 h-2 left-[4px] top-[4px] absolute outline outline-[1.33px] outline-offset-[-0.67px] outline-neutral-950 -rotate-45"></div>
            </div>
          </button>

          {/* Header */}
          <div className="w-[462px] h-11 left-[25px] top-[25px] absolute inline-flex flex-col justify-start items-start gap-2">
            <div className="w-[462px] h-4 relative">
              <div className="left-0 top-0 absolute justify-start text-neutral-950 text-lg font-semibold font-['Roboto'] leading-4">
                Add Organization
              </div>
            </div>
            <div className="w-[462px] flex-1 relative">
              <div className="left-0 top-[0.50px] absolute justify-start text-gray-500 text-sm font-normal font-['Roboto'] leading-5">
                Create a new admin account with basic information.
              </div>
            </div>
          </div>

          {/* Form Fields */}
          <div className="w-[462px] h-72 left-[25px] top-[87px] absolute inline-flex flex-col justify-start items-start gap-4">
            {/* Company Name */}
            <div className="self-stretch h-14 flex flex-col justify-start items-start gap-2">
              <div className="self-stretch h-3.5 inline-flex justify-start items-center gap-2">
                <div className="justify-start text-neutral-950 text-sm font-medium font-['Roboto'] leading-4">
                  Company Name *
                </div>
              </div>
              <Input
                type="text"
                placeholder="Enter company name"
                value={formData.companyName}
                onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                className="self-stretch h-9 px-3 py-1 bg-zinc-100 rounded-lg outline outline-1 outline-offset-[-1px] outline-black/0 text-gray-500 text-sm font-normal font-['Roboto'] border-0 focus-visible:ring-0 placeholder:text-gray-500"
              />
            </div>

            {/* Admin Email */}
            <div className="self-stretch h-14 flex flex-col justify-start items-start gap-2">
              <div className="self-stretch h-3.5 inline-flex justify-start items-center gap-2">
                <div className="justify-start text-neutral-950 text-sm font-medium font-['Roboto'] leading-4">
                  Admin Email *
                </div>
              </div>
              <Input
                type="email"
                placeholder="admin@company.co.in"
                value={formData.adminEmail}
                onChange={(e) => setFormData({ ...formData, adminEmail: e.target.value })}
                className="self-stretch h-9 px-3 py-1 bg-zinc-100 rounded-lg outline outline-1 outline-offset-[-1px] outline-black/0 text-gray-500 text-sm font-normal font-['Roboto'] border-0 focus-visible:ring-0 placeholder:text-gray-500"
              />
            </div>

            {/* Initial Plan and Initial Status - Side by Side */}
            <div className="self-stretch h-14 inline-flex flex-row justify-between items-start gap-4">
              {/* Initial Plan */}
              <div className="flex-1 inline-flex flex-col justify-start items-start gap-2">
                <div className="self-stretch h-3.5 inline-flex justify-start items-center gap-2">
                  <div className="justify-start text-neutral-950 text-sm font-medium font-['Roboto'] leading-4">
                    Initial Plan
                  </div>
                </div>
                <Select value={formData.initialPlan} onValueChange={(value) => setFormData({ ...formData, initialPlan: value })}>
                  <SelectTrigger className="self-stretch h-9 px-3 bg-zinc-100 rounded-lg outline outline-1 outline-offset-[-1px] outline-black/0 border-0 focus:ring-0 justify-between [&>svg]:hidden">
                    <div className="w-7 h-5 flex justify-start items-center gap-2 overflow-hidden">
                      <div className="justify-start text-neutral-950 text-sm font-normal font-['Roboto'] leading-5">
                        {formData.initialPlan}
                      </div>
                    </div>
                    <div className="w-4 h-4 relative opacity-50 overflow-hidden">
                      <div className="w-2 h-1 left-[4px] top-[6px] absolute outline outline-[1.33px] outline-offset-[-0.67px] outline-gray-500"></div>
                    </div>
                  </SelectTrigger>
                  <SelectContent className="!z-[110]">
                    <SelectItem value="Free">Free</SelectItem>
                    <SelectItem value="Basic">Basic</SelectItem>
                    <SelectItem value="Pro">Pro</SelectItem>
                    <SelectItem value="Enterprise">Enterprise</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              {/* Initial Status */}
              <div className="flex-1 inline-flex flex-col justify-start items-start gap-2">
                <div className="self-stretch h-3.5 inline-flex justify-start items-center gap-2">
                  <div className="justify-start text-neutral-950 text-sm font-medium font-['Roboto'] leading-4">
                    Initial Status
                  </div>
                </div>
                    <Select value={formData.initialStatus} onValueChange={(value) => setFormData({ ...formData, initialStatus: value })}>
                      <SelectTrigger className="self-stretch h-9 px-3 bg-zinc-100 rounded-lg outline outline-1 outline-offset-[-1px] outline-black/0 border-0 focus:ring-0 justify-between [&>svg]:hidden">
                        <div className="w-7 h-5 flex justify-start items-center gap-2 overflow-hidden">
                          <div className="justify-start text-neutral-950 text-sm font-normal font-['Roboto'] leading-5">
                            {formData.initialStatus}
                          </div>
                        </div>
                        <div className="w-4 h-4 relative opacity-50 overflow-hidden">
                          <div className="w-2 h-1 left-[4px] top-[6px] absolute outline outline-[1.33px] outline-offset-[-0.67px] outline-gray-500"></div>
                        </div>
                      </SelectTrigger>
                      <SelectContent className="!z-[110]">
                        <SelectItem value="Trial">Trial</SelectItem>
                        <SelectItem value="Active">Active</SelectItem>
                        <SelectItem value="Suspended">Suspended</SelectItem>
                      </SelectContent>
                    </Select>
              </div>
            </div>

            {/* Initial User Count */}
            <div className="self-stretch h-14 flex flex-col justify-start items-start gap-2">
              <div className="self-stretch h-3.5 inline-flex justify-start items-center gap-2">
                <div className="justify-start text-neutral-950 text-sm font-medium font-['Roboto'] leading-4">
                  Initial User Count
                </div>
              </div>
              <Input
                type="number"
                value={formData.initialUserCount}
                onChange={(e) => setFormData({ ...formData, initialUserCount: e.target.value })}
                className="self-stretch h-9 px-3 py-1 bg-zinc-100 rounded-lg outline outline-1 outline-offset-[-1px] outline-black/0 text-neutral-950 text-sm font-normal font-['Roboto'] leading-5 border-0 focus-visible:ring-0"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="w-[462px] h-9 left-[25px] top-[383px] absolute inline-flex justify-end items-start gap-2">
            <button
              onClick={() => setIsModalOpen(false)}
              className="w-20 h-9 px-4 py-2 bg-white rounded-lg outline outline-1 outline-offset-[-1px] outline-black/10 flex justify-center items-center gap-2 hover:bg-gray-50 transition-colors"
            >
              <div className="justify-start text-neutral-950 text-sm font-medium font-['Roboto'] leading-5">
                Cancel
              </div>
            </button>
            <button
              onClick={() => {
                // Handle create organization logic here
                console.log("Creating organization:", formData)
                setIsModalOpen(false)
                // Reset form
                setFormData({
                  companyName: "",
                  adminEmail: "",
                  initialPlan: "Free",
                  initialStatus: "Trial",
                  initialUserCount: "1"
                })
              }}
              className="w-40 h-9 px-4 py-2 rounded-lg flex justify-center items-center gap-2 transition-colors"
              style={{ backgroundColor: '#4A8E9B' }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#3d7a85'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#4A8E9B'}
            >
              <div className="justify-start text-white text-sm font-medium font-['Roboto'] leading-5">
                Create Organization
              </div>
            </button>
          </div>
        </DialogContent>
      </Dialog>

      {/* View Details Dialog */}
      <Dialog open={isViewDetailsOpen} onOpenChange={setIsViewDetailsOpen}>
        <DialogContent className="!fixed !left-1/2 !top-1/2 !-translate-x-1/2 !-translate-y-1/2 !w-[90vw] !max-w-[604px] !h-[90vh] !max-h-[777px] bg-white rounded-[10px] shadow-[0px_4px_6px_-4px_rgba(0,0,0,0.10)] shadow-lg outline outline-1 outline-offset-[-1px] outline-black/10 overflow-hidden !z-[100] [&>button]:hidden !grid-rows-none !block p-0">
          {selectedCompany && (
            <>
              {/* Close Button */}
              <button
                onClick={() => setIsViewDetailsOpen(false)}
                type="button"
                className="absolute right-4 top-4 w-6 h-6 opacity-70 hover:opacity-100 transition-opacity rounded-[3px] z-[110] bg-transparent border-0 cursor-pointer"
              >
                <div className="w-6 h-6 left-0 top-0 absolute overflow-hidden">
                  <div className="w-3 h-3 left-[6px] top-[6px] absolute outline outline-2 outline-offset-[-1px] outline-neutral-950 rotate-45"></div>
                  <div className="w-3 h-3 left-[6px] top-[6px] absolute outline outline-2 outline-offset-[-1px] outline-neutral-950 -rotate-45"></div>
                </div>
              </button>

              {/* Scrollable Content */}
              <div className="w-full h-full overflow-y-auto px-4 sm:px-6 py-4 sm:py-6">
                {/* Header Section */}
                <div className="flex flex-col sm:flex-row items-start gap-3 sm:gap-4 mb-4 sm:mb-6">
                  {/* Company Logo/Icon */}
                  <div className="w-12 h-12 sm:w-14 sm:h-14 bg-white rounded-2xl outline outline-1 outline-offset-[-1px] outline-black/10 flex justify-center items-center flex-shrink-0">
                    <Building2 className="w-6 h-6 sm:w-7 sm:h-7 text-stone-500" strokeWidth={2} />
                  </div>
                  
                  {/* Company Info */}
                  <div className="flex flex-col gap-1 flex-1 min-w-0">
                    <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-neutral-950 font-['Roboto'] leading-8 truncate">
                      {selectedCompany.name}
                    </h2>
                    <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-xs sm:text-sm">
                      <span className="text-gray-500 font-normal font-['Roboto'] leading-5 whitespace-nowrap">
                        Company ID: {selectedCompany.companyId || `CY${String(selectedCompany.id).padStart(4, '0')}`}
                      </span>
                      <span className="text-gray-500 font-normal font-['Roboto'] leading-5 whitespace-nowrap">
                        Joined {selectedCompany.dateJoined}
                      </span>
                      {renderStatusBadge(selectedCompany.status)}
                      {renderPlanTypeBadge(selectedCompany.planType)}
                    </div>
                  </div>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6">
                  {/* Projects Card */}
                  <div className="w-full h-28 sm:h-32 px-3 sm:px-4 pt-3 sm:pt-4 bg-white/10 rounded-2xl outline outline-1 outline-offset-[-1px] outline-stone-500/20 flex flex-col justify-start items-start gap-2 relative">
                    <div className="w-3 h-3 absolute left-[32px] top-[24px] sm:left-[40px] sm:top-[28px]">
                      <FolderKanban className="w-full h-full text-zinc-800" strokeWidth={1.5} />
                    </div>
                    <div className="text-xs sm:text-sm text-zinc-800 font-normal font-['Roboto'] leading-5 text-center w-full mt-6 sm:mt-8">
                      Project
                    </div>
                    <div className="text-xl sm:text-2xl text-zinc-800 font-medium font-['Roboto'] leading-8 tracking-tight text-center w-full">
                      {selectedCompany.projects || 0}
                    </div>
                    <div className="text-xs text-stone-500 font-normal font-['Roboto'] leading-4 text-center w-full">
                      {selectedCompany.activeProjects || 0} active
                    </div>
                  </div>

                  {/* Total Users Card */}
                  <div className="w-full h-28 sm:h-32 px-3 sm:px-4 pt-3 sm:pt-4 bg-white/10 rounded-2xl outline outline-1 outline-offset-[-1px] outline-stone-500/20 flex flex-col justify-start items-start gap-2 relative">
                    <div className="w-3 h-3 absolute left-[19px] top-[24px] sm:left-[24px] sm:top-[28px]">
                      <Users className="w-full h-full text-zinc-800" strokeWidth={1.5} />
                    </div>
                    <div className="text-xs sm:text-sm text-zinc-800 font-normal font-['Roboto'] leading-5 text-center w-full mt-6 sm:mt-8">
                      Total Users
                    </div>
                    <div className="text-xl sm:text-2xl text-zinc-800 font-medium font-['Roboto'] leading-8 tracking-tight text-center w-full">
                      {selectedCompany.users}
                    </div>
                  </div>

                  {/* MRR Card */}
                  <div className="w-full h-28 sm:h-32 px-3 sm:px-4 pt-3 sm:pt-4 bg-white/10 rounded-2xl outline outline-1 outline-offset-[-1px] outline-stone-500/20 flex flex-col justify-start items-start gap-2 relative">
                    <div className="w-3 h-3 absolute left-[41px] top-[24px] sm:left-[48px] sm:top-[28px] flex items-center justify-center">
                      <span className="text-xs text-zinc-800 font-normal font-['Roboto'] leading-4">₹</span>
                    </div>
                    <div className="text-xs sm:text-sm text-zinc-800 font-normal font-['Roboto'] leading-5 text-center w-full mt-6 sm:mt-8">
                      MRR
                    </div>
                    <div className="text-xl sm:text-2xl text-zinc-800 font-medium font-['Roboto'] leading-8 tracking-tight text-center w-full">
                      <span className="font-semibold">₹</span>
                      <span>{selectedCompany.mrr || selectedCompany.revenue.replace('₹', '').replace(',', '')}</span>
                    </div>
                  </div>

                  {/* Storage Used Card */}
                  <div className="w-full h-28 sm:h-32 px-3 sm:px-4 pt-3 sm:pt-4 bg-white/10 rounded-2xl outline outline-1 outline-offset-[-1px] outline-stone-500/20 flex flex-col justify-start items-start gap-2 relative">
                    <div className="w-3 h-3 absolute left-[13px] top-[24px] sm:left-[16px] sm:top-[28px]">
                      <Package className="w-full h-full text-zinc-800" strokeWidth={1.5} />
                    </div>
                    <div className="text-xs sm:text-sm text-zinc-800 font-normal font-['Roboto'] leading-5 text-center w-full mt-6 sm:mt-8">
                      Storage Used
                    </div>
                    <div className="text-xl sm:text-2xl text-zinc-800 font-medium font-['Roboto'] leading-8 tracking-tight text-center w-full">
                      {selectedCompany.storageUsed || "0GB"}
                    </div>
                    <div className="text-xs text-stone-500 font-normal font-['Roboto'] leading-4 text-center w-full">
                      of {selectedCompany.storageTotal || "500GB"}
                    </div>
                  </div>
                </div>

                {/* Tabs */}
                <div className="w-full h-9 bg-slate-500 rounded-2xl p-[3px] mb-6 flex flex-wrap sm:flex-nowrap gap-1 sm:gap-0">
                  {(["Overview", "Projects", "Users", "Billing"] as const).map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`flex-1 h-7 px-2 py-1 rounded-2xl outline outline-[0.52px] outline-offset-[-0.52px] outline-black/0 inline-flex justify-center items-center gap-1.5 transition-all ${
                        activeTab === tab
                          ? "bg-white outline-black/0"
                          : "bg-transparent"
                      }`}
                    >
                      <span className={`text-sm font-medium font-['Roboto'] leading-5 ${
                        activeTab === tab ? "text-neutral-800" : "text-white"
                      }`}>
                        {tab}
                      </span>
                    </button>
                  ))}
                </div>

                {/* Tab Content */}
                <div className="w-full">
                  {activeTab === "Overview" && (
                    <>
                      {/* Company Information Section */}
                      <div className="w-full mb-6">
                        <h3 className="text-base sm:text-lg text-neutral-950 font-normal font-['Roboto'] leading-7 mb-4">
                          Company Information
                        </h3>
                        <div className="px-4 sm:px-6 pt-4 sm:pt-6 bg-white rounded-2xl outline outline-[0.52px] outline-offset-[-0.52px] outline-gray-200">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 pb-6">
                            {/* Left Column */}
                            <div className="flex flex-col gap-4">
                              {/* Admin Email */}
                              <div className="flex items-start gap-3">
                                <div className="w-5 h-5 mt-0.5 flex-shrink-0">
                                  <Mail className="w-full h-full text-gray-400" strokeWidth={2} />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <div className="text-sm text-gray-500 font-normal font-['Roboto'] leading-5 mb-1">
                                    Admin Email
                                  </div>
                                  <div className="text-base text-gray-900 font-normal font-['Roboto'] leading-6 break-words">
                                    {selectedCompany.adminEmail}
                                  </div>
                                </div>
                              </div>

                              {/* Admin Name */}
                              <div className="flex items-start gap-3">
                                <div className="w-5 h-5 mt-0.5 flex-shrink-0">
                                  <User className="w-full h-full text-gray-400" strokeWidth={2} />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <div className="text-sm text-gray-500 font-normal font-['Roboto'] leading-5 mb-1">
                                    Admin Name
                                  </div>
                                  <div className="text-base text-gray-900 font-normal font-['Roboto'] leading-6 break-words">
                                    {selectedCompany.adminName || "N/A"}
                                  </div>
                                </div>
                              </div>

                              {/* Phone */}
                              <div className="flex items-start gap-3">
                                <div className="w-5 h-5 mt-0.5 flex-shrink-0">
                                  <Phone className="w-full h-full text-gray-400" strokeWidth={2} />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <div className="text-sm text-gray-500 font-normal font-['Roboto'] leading-5 mb-1">
                                    Phone
                                  </div>
                                  <div className="text-base text-gray-900 font-normal font-['Roboto'] leading-6 break-words">
                                    {selectedCompany.phone || "N/A"}
                                  </div>
                                </div>
                              </div>
                            </div>

                            {/* Right Column */}
                            <div className="flex flex-col gap-4">
                              {/* Member Since */}
                              <div className="flex items-start gap-3">
                                <div className="w-5 h-5 mt-0.5 flex-shrink-0">
                                  <Calendar className="w-full h-full text-gray-400" strokeWidth={2} />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <div className="text-sm text-gray-500 font-normal font-['Roboto'] leading-5 mb-1">
                                    Member Since
                                  </div>
                                  <div className="text-base text-gray-900 font-normal font-['Roboto'] leading-6 break-words">
                                    {selectedCompany.memberSince || selectedCompany.dateJoined}
                                  </div>
                                </div>
                              </div>

                              {/* Plan Type */}
                              <div className="flex items-start gap-3">
                                <div className="w-5 h-5 mt-0.5 flex-shrink-0">
                                  <Package className="w-full h-full text-gray-400" strokeWidth={2} />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <div className="text-sm text-gray-500 font-normal font-['Roboto'] leading-5 mb-1">
                                    Plan Type
                                  </div>
                                  <div className="text-base text-gray-900 font-normal font-['Roboto'] leading-6 break-words">
                                    {selectedCompany.planType}
                                  </div>
                                </div>
                              </div>

                              {/* Address */}
                              <div className="flex items-start gap-3">
                                <div className="w-5 h-5 mt-0.5 flex-shrink-0">
                                  <MapPin className="w-full h-full text-gray-400" strokeWidth={2} />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <div className="text-sm text-gray-500 font-normal font-['Roboto'] leading-5 mb-1">
                                    Address
                                  </div>
                                  <div className="text-base text-gray-900 font-normal font-['Roboto'] leading-6 break-words">
                                    {selectedCompany.address || "N/A"}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Quick Actions */}
                      <div className="w-full">
                        <h3 className="text-base sm:text-lg text-neutral-950 font-normal font-['Roboto'] leading-7 mb-4">
                          Quick Actions
                        </h3>
                        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                          <button className="flex-1 h-9 relative bg-slate-500 rounded-lg flex items-center justify-center gap-2 hover:bg-slate-600 transition-colors">
                            <LogIn className="w-4 h-4 text-white" strokeWidth={2} />
                            <span className="text-white text-sm font-medium font-['Roboto'] leading-5">
                              Impersonate Admin
                            </span>
                          </button>
                          <button className="w-full sm:w-36 h-9 relative bg-white rounded-lg outline outline-1 outline-offset-[-1px] outline-black/10 flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors">
                            <Edit className="w-4 h-4 text-neutral-950" strokeWidth={2} />
                            <span className="text-neutral-950 text-sm font-medium font-['Roboto'] leading-5">
                              Edit Account
                            </span>
                          </button>
                          <button className="w-full sm:w-44 h-9 relative bg-rose-600 rounded-lg flex items-center justify-center gap-2 hover:bg-rose-700 transition-colors">
                            <Ban className="w-4 h-4 text-white" strokeWidth={2} />
                            <span className="text-white text-sm font-medium font-['Roboto'] leading-5">
                              Suspend Account
                            </span>
                          </button>
                        </div>
                      </div>
                    </>
                  )}

                  {activeTab === "Projects" && (
                    <div className="w-full">
                      {/* Projects Section Header */}
                      <div className="w-full mb-4">
                        <h3 className="text-base sm:text-lg text-neutral-800 font-normal font-['Roboto'] leading-7 mb-1">
                          Projects
                        </h3>
                        <p className="text-sm text-stone-500 font-normal font-['Roboto'] leading-5">
                          {companyProjects.filter(p => p.status === "In Progress").length} active, {companyProjects.filter(p => p.status === "Completed").length} completed
                        </p>
                      </div>

                      {/* Projects List */}
                      <div className="w-full max-h-[400px] sm:max-h-[500px] overflow-y-auto">
                        {companyProjects.length > 0 ? (
                          <div className="space-y-0">
                            {companyProjects.map((project, index) => (
                              <div
                                key={project.id}
                                className={`w-full px-3 sm:px-4 pt-3 sm:pt-4 pb-3 sm:pb-4 border-b border-gray-200 hover:bg-gray-50 transition-colors ${
                                  index === companyProjects.length - 1 ? "border-b-0" : ""
                                }`}
                              >
                                <div className="w-full flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 sm:gap-4">
                                  {/* Left Section: Icon and Project Info */}
                                  <div className="flex-1 flex items-start sm:items-center gap-3 min-w-0">
                                    {/* Project Icon */}
                                    <div className="w-10 h-10 bg-slate-500 rounded-[10px] flex justify-center items-center flex-shrink-0">
                                      <FolderKanban className="w-5 h-5 text-white" strokeWidth={2} />
                                    </div>

                                    {/* Project Details */}
                                    <div className="flex-1 min-w-0">
                                      <div className="text-sm sm:text-base text-gray-900 font-normal font-['Roboto'] leading-6 mb-2 sm:mb-1 truncate">
                                        {project.name}
                                      </div>
                                      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4">
                                        {/* Members */}
                                        <div className="flex items-center gap-2">
                                          <Users className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-gray-500 flex-shrink-0" strokeWidth={2} />
                                          <span className="text-xs sm:text-sm text-gray-500 font-normal font-['Roboto'] leading-5 whitespace-nowrap">
                                            {project.members} {project.members === 1 ? 'member' : 'members'}
                                          </span>
                                        </div>
                                        {/* Due Date */}
                                        <div className="flex items-center gap-2">
                                          <Calendar className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-gray-500 flex-shrink-0" strokeWidth={2} />
                                          <span className="text-xs sm:text-sm text-gray-500 font-normal font-['Roboto'] leading-5 whitespace-nowrap">
                                            Due {project.dueDate}
                                          </span>
                                        </div>
                                      </div>
                                    </div>
                                  </div>

                                  {/* Right Section: Status Badge */}
                                  <div className="flex-shrink-0 flex justify-start sm:justify-end">
                                    {renderProjectStatusBadge(project.status)}
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="w-full px-4 sm:px-6 py-8 sm:py-12 text-center">
                            <FolderKanban className="w-12 h-12 sm:w-16 sm:h-16 text-gray-300 mx-auto mb-4" strokeWidth={1.5} />
                            <p className="text-sm sm:text-base text-gray-500 font-normal font-['Roboto'] leading-5">
                              No projects found for this company.
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {activeTab === "Users" && (
                    <div className="w-full">
                      {/* Team Members Header */}
                      <div className="w-full mb-4 sm:mb-6 pb-4 border-b border-gray-200">
                        <h3 className="text-base sm:text-lg text-neutral-950 font-normal font-['Roboto'] leading-7 mb-3 sm:mb-4">
                          Team Members
                        </h3>
                        <div className="flex flex-wrap items-center gap-4 sm:gap-10">
                          <div className="text-sm text-gray-500 font-normal font-['Roboto'] leading-5">
                            {teamMembers.length} Total Users
                          </div>
                          <div className="text-sm text-gray-500 font-normal font-['Roboto'] leading-5">
                            {teamMembers.filter(m => m.status === "Active").length} Active User{teamMembers.filter(m => m.status === "Active").length !== 1 ? 's' : ''}
                          </div>
                          <div className="text-sm text-gray-500 font-normal font-['Roboto'] leading-5">
                            {teamMembers.filter(m => m.status === "Inactive").length} Inactive User{teamMembers.filter(m => m.status === "Inactive").length !== 1 ? 's' : ''}
                          </div>
                        </div>
                      </div>

                      {/* Team Members List */}
                      <div className="w-full max-h-[400px] sm:max-h-[500px] overflow-y-auto">
                        {teamMembers.length > 0 ? (
                          <div className="space-y-0">
                            {teamMembers.map((member, index) => (
                              <div
                                key={member.id}
                                className={`w-full px-3 sm:px-4 pt-3 sm:pt-4 pb-3 sm:pb-4 border-b border-gray-200 hover:bg-gray-50 transition-colors ${
                                  index === teamMembers.length - 1 ? "border-b-0" : ""
                                }`}
                              >
                                <div className="w-full flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6 lg:gap-10">
                                  {/* Left Section: Avatar and User Info */}
                                  <div className="flex items-start sm:items-center gap-3 sm:gap-4 min-w-0 flex-1">
                                    {/* Avatar */}
                                    <div className="w-10 h-10 flex-shrink-0">
                                      <img 
                                        className="w-10 h-10 rounded-full object-cover" 
                                        src={member.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&background=random`} 
                                        alt={member.name}
                                        onError={(e) => {
                                          const target = e.target as HTMLImageElement
                                          target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&background=random`
                                        }}
                                      />
                                    </div>
                                    
                                    {/* User Details */}
                                    <div className="flex-1 min-w-0">
                                      <div className="text-base text-gray-900 font-normal font-['Roboto'] leading-6 mb-1 truncate">
                                        {member.name}
                                      </div>
                                      <div className="text-sm text-gray-500 font-normal font-['Roboto'] leading-5 truncate">
                                        {member.email}
                                      </div>
                                    </div>
                                  </div>

                                  {/* Right Section: Role, Status, Date */}
                                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3 flex-shrink-0">
                                    {/* Role */}
                                    <div className="text-sm text-gray-600 font-normal font-['Roboto'] leading-5 whitespace-nowrap">
                                      {member.role}
                                    </div>
                                    
                                    {/* Status Badge */}
                                    <div className="flex-shrink-0">
                                      {renderUserStatusBadge(member.status)}
                                    </div>
                                    
                                    {/* Date Joined with Clock Icon */}
                                    <div className="flex items-center gap-2">
                                      <Clock className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-gray-500 flex-shrink-0" strokeWidth={2} />
                                      <span className="text-sm text-gray-500 font-normal font-['Roboto'] leading-5 whitespace-nowrap">
                                        {member.dateJoined}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="w-full px-4 sm:px-6 py-8 sm:py-12 text-center">
                            <Users className="w-12 h-12 sm:w-16 sm:h-16 text-gray-300 mx-auto mb-4" strokeWidth={1.5} />
                            <p className="text-sm sm:text-base text-gray-500 font-normal font-['Roboto'] leading-5">
                              No team members found for this company.
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {activeTab === "Billing" && (
                    <div className="w-full space-y-6">
                      {/* Current Plan Card */}
                      <div className="w-full px-4 sm:px-6 pt-4 sm:pt-6 pb-4 bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl outline outline-1 outline-offset-[-1px] outline-blue-200">
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4 mb-4">
                          <div className="flex-1">
                            <h3 className="text-base sm:text-lg text-neutral-950 font-normal font-['Roboto'] leading-7 mb-1">
                              Current Plan
                            </h3>
                            <p className="text-sm text-gray-600 font-normal font-['Roboto'] leading-5">
                              Billing information and history
                            </p>
                          </div>
                          <div className="flex-shrink-0">
                            {renderPlanTypeBadge(selectedCompany.planType)}
                          </div>
                        </div>

                        {/* Billing Details Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
                          {/* Monthly Revenue */}
                          <div className="flex flex-col gap-0.5">
                            <div className="text-sm text-gray-600 font-normal font-['Roboto'] leading-5">
                              Monthly Revenue
                            </div>
                            <div className="text-xl sm:text-2xl text-zinc-800 font-medium font-['Roboto'] leading-8 tracking-tight">
                              <span className="font-semibold">₹</span>
                              <span>{selectedCompany.mrr || selectedCompany.revenue.replace('₹', '').replace(/,/g, '') || "0"}</span>
                            </div>
                          </div>

                          {/* Next Billing Date */}
                          <div className="flex flex-col gap-0.5">
                            <div className="text-sm text-gray-600 font-normal font-['Roboto'] leading-5">
                              Next Billing Date
                            </div>
                            <div className="text-base sm:text-lg text-gray-900 font-normal font-['Roboto'] leading-7">
                              November 1, 2025
                            </div>
                          </div>

                          {/* Payment Method */}
                          <div className="flex flex-col gap-0.5">
                            <div className="text-sm text-gray-600 font-normal font-['Roboto'] leading-5">
                              Payment Method
                            </div>
                            <div className="text-base sm:text-lg text-gray-900 font-normal font-['Roboto'] leading-7">
                              •••• 4342
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Billing History Section */}
                      <div className="w-full">
                        <div className="w-full mb-4 pb-4 border-b border-gray-200">
                          <h3 className="text-base sm:text-lg text-neutral-950 font-medium font-['Roboto'] leading-7">
                            Billing History
                          </h3>
                        </div>

                        {/* Invoices List */}
                        <div className="w-full max-h-[400px] sm:max-h-[500px] overflow-y-auto">
                          {invoices.length > 0 ? (
                            <div className="space-y-0">
                              {invoices.map((invoice, index) => (
                                <div
                                  key={invoice.id}
                                  className={`w-full px-3 sm:px-4 pt-3 sm:pt-4 pb-3 sm:pb-4 border-b border-gray-200 hover:bg-gray-50 transition-colors ${
                                    index === invoices.length - 1 ? "border-b-0" : ""
                                  }`}
                                >
                                  <div className="w-full flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 lg:gap-10">
                                    {/* Left Section: Check Icon and Invoice Info */}
                                    <div className="flex items-start sm:items-center gap-3 sm:gap-4 min-w-0 flex-1">
                                      {/* Check Icon */}
                                      <div className="w-10 h-10 bg-green-100 rounded-[10px] flex justify-center items-center flex-shrink-0">
                                        <Check className="w-5 h-5 text-green-600" strokeWidth={2} />
                                      </div>

                                      {/* Invoice Details */}
                                      <div className="flex-1 min-w-0">
                                        <div className="text-base text-gray-900 font-normal font-['Roboto'] leading-6 mb-1 truncate">
                                          {invoice.invoiceId}
                                        </div>
                                        <div className="text-sm text-gray-500 font-normal font-['Roboto'] leading-5 truncate">
                                          {invoice.date}
                                        </div>
                                      </div>
                                    </div>

                                    {/* Right Section: Amount, Status, Action Button */}
                                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3 flex-shrink-0">
                                      {/* Amount */}
                                      <div className="text-sm text-gray-600 font-medium font-['Roboto'] leading-5 whitespace-nowrap">
                                        {invoice.amount}
                                      </div>

                                      {/* Status Badge */}
                                      <div className="flex-shrink-0">
                                        {renderBillingStatusBadge(invoice.status)}
                                      </div>

                                      {/* Action Button */}
                                      {invoice.status === "Paid" ? (
                                        <button className="w-20 sm:w-24 h-8 px-3 bg-slate-500 rounded-lg outline outline-1 outline-offset-[-1px] outline-black/10 flex items-center justify-center gap-1.5 hover:bg-slate-600 transition-colors">
                                          <Download className="w-3 h-3 sm:w-4 sm:h-4 text-white" strokeWidth={2} />
                                          <span className="text-white text-sm font-medium font-['Roboto'] leading-5">
                                            Download
                                          </span>
                                        </button>
                                      ) : (
                                        <div className="w-20 sm:w-24 h-8 px-3 rounded-lg outline outline-1 outline-offset-[-1px] outline-black/10 flex items-center justify-center">
                                          <span className="text-neutral-800 text-sm font-medium font-['Roboto'] leading-5">
                                            -
                                          </span>
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          ) : (
                            <div className="w-full px-4 sm:px-6 py-8 sm:py-12 text-center">
                              <CreditCard className="w-12 h-12 sm:w-16 sm:h-16 text-gray-300 mx-auto mb-4" strokeWidth={1.5} />
                              <p className="text-sm sm:text-base text-gray-500 font-normal font-['Roboto'] leading-5">
                                No billing history found for this company.
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

    </div>
  )
}
