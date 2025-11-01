import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import {
  Users,
  UserPlus,
  UserX,
  CheckCircle2,
  AlertTriangle,
  Search,
  MoreHorizontal,
  GripVertical,
  ChevronDown,
  ArrowUpDown,
  X,
  Eye,
  Pencil,
  Trash2,
  Shield,
  List,
  RotateCcw,
  UserMinus,
  Check,
} from "lucide-react"
import { useState, useEffect } from "react"

interface User {
  id: string
  name: string
  company: string
  email: string
  role: "Admin" | "Manager" | "Member" | "Viewer"
  status: "Active" | "Inactive" | "Pending"
  lastActive: string
  avatar?: string
}

const usersData: User[] = [
  {
    id: "1",
    name: "John Doe",
    company: "Tech Solutions",
    email: "john.doe@techsolutions.com",
    role: "Admin",
    status: "Active",
    lastActive: "2 hours ago",
    avatar: undefined,
  },
  {
    id: "2",
    name: "Jane Smith",
    company: "Design Co",
    email: "jane.smith@designco.com",
    role: "Manager",
    status: "Active",
    lastActive: "5 hours ago",
    avatar: undefined,
  },
  {
    id: "3",
    name: "Mike Johnson",
    company: "Tech Solutions",
    email: "mike.johnson@techsolutions.com",
    role: "Member",
    status: "Inactive",
    lastActive: "2 days ago",
    avatar: undefined,
  },
  {
    id: "4",
    name: "Sarah Williams",
    company: "Innovation Labs",
    email: "sarah.williams@innolabs.com",
    role: "Viewer",
    status: "Pending",
    lastActive: "Never",
    avatar: undefined,
  },
  {
    id: "5",
    name: "David Brown",
    company: "Design Co",
    email: "david.brown@designco.com",
    role: "Manager",
    status: "Active",
    lastActive: "1 hour ago",
    avatar: undefined,
  },
  {
    id: "6",
    name: "Emily Davis",
    company: "Tech Solutions",
    email: "emily.davis@techsolutions.com",
    role: "Member",
    status: "Active",
    lastActive: "30 minutes ago",
    avatar: undefined,
  },
]

export default function UserControl() {
  const [users] = useState<User[]>(usersData)
  const [searchQuery, setSearchQuery] = useState("")
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [openDropdownId, setOpenDropdownId] = useState<string | null>(null)
  const [isSortDropdownOpen, setIsSortDropdownOpen] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(8)
  const [selectedSortField, setSelectedSortField] = useState<string | null>(null)

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    role: "Member",
    status: "Pending",
  })

  const toggleDropdown = (userId: string, e: React.MouseEvent) => {
    e.stopPropagation()
    setOpenDropdownId(openDropdownId === userId ? null : userId)
  }

  const toggleSortDropdown = (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsSortDropdownOpen(!isSortDropdownOpen)
  }

  const handleSortFieldSelect = (field: string) => {
    setSelectedSortField(field)
    setIsSortDropdownOpen(false)
    // Handle sort logic here
    console.log(`Sorting by: ${field}`)
  }

  const handleActionClick = (action: string, userId: string) => {
    console.log(`${action} clicked for user ${userId}`)
    setOpenDropdownId(null)
    // Handle action logic here
  }

  // Reset to page 1 when search query changes
  useEffect(() => {
    setCurrentPage(1)
  }, [searchQuery])

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node
      const dropdowns = document.querySelectorAll("[data-dropdown]")
      const sortButton = document.querySelector("[data-sort-button]")
      const sortDropdown = document.querySelector("[data-sort-dropdown]")
      
      let clickedOutside = true

      dropdowns.forEach((dropdown) => {
        if (dropdown.contains(target)) {
          clickedOutside = false
        }
      })

      if (sortButton && sortButton.contains(target)) {
        clickedOutside = false
      }

      if (sortDropdown && sortDropdown.contains(target)) {
        clickedOutside = false
      }

      if (clickedOutside) {
        setOpenDropdownId(null)
        setIsSortDropdownOpen(false)
      }
    }

    if (openDropdownId || isSortDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside)
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [openDropdownId, isSortDropdownOpen])

  // Calculate statistics
  const totalUsers = users.length
  const activeUsers = users.filter((u) => u.status === "Active").length
  const inactiveUsers = users.filter((u) => u.status === "Inactive").length
  const pendingUsers = users.filter((u) => u.status === "Pending").length
  const admins = users.filter((u) => u.role === "Admin").length

  // Filter users based on search
  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.company.toLowerCase().includes(searchQuery.toLowerCase())
  )

  // Pagination calculations
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const paginatedUsers = filteredUsers.slice(startIndex, endIndex)
  const startRecord = filteredUsers.length > 0 ? startIndex + 1 : 0
  const endRecord = Math.min(endIndex, filteredUsers.length)

  // Pagination handlers
  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
    }
  }

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1)
    }
  }

  const handleItemsPerPageChange = (value: string) => {
    setItemsPerPage(Number(value))
    setCurrentPage(1) // Reset to first page when changing items per page
  }

  const renderRoleBadge = (role: User["role"]) => {
    switch (role) {
      case "Admin":
        return (
          <div className="w-auto h-5 sm:h-6 px-1.5 sm:px-2 relative bg-purple-100 rounded-full flex items-center justify-center">
            <div className="text-purple-800 text-[10px] sm:text-xs font-normal font-['Roboto'] leading-4 sm:leading-5 whitespace-nowrap">
              {role}
            </div>
          </div>
        )
      case "Manager":
        return (
          <div className="w-auto h-5 sm:h-6 px-1.5 sm:px-2 relative bg-blue-100 rounded-full flex items-center justify-center">
            <div className="text-blue-800 text-[10px] sm:text-xs font-normal font-['Roboto'] leading-4 sm:leading-5 whitespace-nowrap">
              {role}
            </div>
          </div>
        )
      case "Member":
        return (
          <div className="w-auto h-5 sm:h-6 px-1.5 sm:px-2 relative bg-gray-100 rounded-full flex items-center justify-center">
            <div className="text-gray-800 text-[10px] sm:text-xs font-normal font-['Roboto'] leading-4 sm:leading-5 whitespace-nowrap">
              {role}
            </div>
          </div>
        )
      case "Viewer":
        return (
          <div className="w-auto h-5 sm:h-6 px-1.5 sm:px-2 relative bg-green-100 rounded-full flex items-center justify-center">
            <div className="text-green-800 text-[10px] sm:text-xs font-normal font-['Roboto'] leading-4 sm:leading-5 whitespace-nowrap">
              {role}
            </div>
          </div>
        )
      default:
        return null
    }
  }

  const renderStatusBadge = (status: User["status"]) => {
    switch (status) {
      case "Active":
        return (
          <div className="w-auto h-5 sm:h-6 px-1.5 sm:px-2 relative bg-green-100 rounded-full flex items-center justify-center">
            <div className="text-green-800 text-[10px] sm:text-xs font-normal font-['Roboto'] leading-4 sm:leading-5 whitespace-nowrap">
              {status}
            </div>
          </div>
        )
      case "Inactive":
        return (
          <div className="w-auto h-5 sm:h-6 px-1.5 sm:px-2 relative bg-red-100 rounded-full flex items-center justify-center">
            <div className="text-red-800 text-[10px] sm:text-xs font-normal font-['Roboto'] leading-4 sm:leading-5 whitespace-nowrap">
              {status}
            </div>
          </div>
        )
      case "Pending":
        return (
          <div className="w-auto h-5 sm:h-6 px-1.5 sm:px-2 relative bg-yellow-100 rounded-full flex items-center justify-center">
            <div className="text-yellow-800 text-[10px] sm:text-xs font-normal font-['Roboto'] leading-4 sm:leading-5 whitespace-nowrap">
              {status}
            </div>
          </div>
        )
      default:
        return null
    }
  }

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2)
  }

  return (
    <div className="w-full h-full p-3 sm:p-4 lg:p-6 xl:p-8 overflow-auto">
      <div className="space-y-4 sm:space-y-6 lg:space-y-8 xl:space-y-10">
     
        

        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3 sm:gap-4 lg:gap-5 xl:gap-6">
          {/* Total Users */}
          <div className="bg-white rounded-[15px] sm:rounded-[20px] lg:rounded-[30px] xl:rounded-[40px] outline outline-1 outline-offset-[-1px] outline-black/10 p-3 sm:p-4 lg:p-5 xl:p-6 flex flex-col gap-3 sm:gap-4 lg:gap-6 xl:gap-8 min-h-[140px] sm:min-h-[160px] lg:min-h-[180px] xl:min-h-[208px]">
            <div className="flex justify-between items-center">
              <h3 className="text-xs sm:text-sm lg:text-base text-cyan-950 font-semibold font-['Roboto'] leading-5 sm:leading-6">
                Total Users
              </h3>
              <div className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 relative">
                <Users className="w-full h-full text-slate-500" strokeWidth={2.5} />
              </div>
            </div>
            <div className="flex-1 flex items-start">
              <p className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl text-cyan-950 font-bold font-['Roboto'] leading-tight tracking-tight">
                {totalUsers}
              </p>
            </div>
            <p className="text-xs sm:text-sm text-gray-600 font-normal font-['Roboto'] leading-4 sm:leading-5">
              Across all regions
            </p>
          </div>

          {/* Active Users */}
          <div className="bg-white rounded-[15px] sm:rounded-[20px] lg:rounded-[30px] xl:rounded-[40px] outline outline-1 outline-offset-[-1px] outline-black/10 p-3 sm:p-4 lg:p-5 xl:p-6 flex flex-col gap-3 sm:gap-4 lg:gap-6 xl:gap-8 min-h-[140px] sm:min-h-[160px] lg:min-h-[180px] xl:min-h-[208px]">
            <div className="flex justify-between items-center">
              <h3 className="text-xs sm:text-sm lg:text-base text-cyan-950 font-semibold font-['Roboto'] leading-5 sm:leading-6">
                Active Users
              </h3>
              <div className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 relative">
                <CheckCircle2 className="w-full h-full text-green-500" strokeWidth={2.5} />
              </div>
            </div>
            <div className="flex-1 flex items-start">
              <p className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl text-cyan-950 font-bold font-['Roboto'] leading-tight tracking-tight">
                {activeUsers}
              </p>
            </div>
            <div className="flex items-center gap-1 sm:gap-2">
              <svg
                className="w-2.5 h-2.5 sm:w-3 sm:h-3 lg:w-4 lg:h-4 text-green-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
              <p className="text-xs sm:text-sm text-green-600 font-normal font-['Roboto'] leading-4 sm:leading-5">
                {Math.round((activeUsers / totalUsers) * 100)}% of total
              </p>
            </div>
          </div>

          {/* Inactive Users */}
          <div className="bg-white rounded-[15px] sm:rounded-[20px] lg:rounded-[30px] xl:rounded-[40px] outline outline-1 outline-offset-[-1px] outline-black/10 p-3 sm:p-4 lg:p-5 xl:p-6 flex flex-col gap-3 sm:gap-4 lg:gap-6 xl:gap-8 min-h-[140px] sm:min-h-[160px] lg:min-h-[180px] xl:min-h-[208px]">
            <div className="flex justify-between items-center">
              <h3 className="text-xs sm:text-sm lg:text-base text-cyan-950 font-semibold font-['Roboto'] leading-5 sm:leading-6">
                Inactive Users
              </h3>
              <div className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 relative">
                <UserX className="w-full h-full text-slate-500" strokeWidth={2.5} />
              </div>
            </div>
            <div className="flex-1 flex items-start">
              <p className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl text-cyan-950 font-bold font-['Roboto'] leading-tight tracking-tight">
                {inactiveUsers}
              </p>
            </div>
            <p className="text-xs sm:text-sm text-gray-600 font-normal font-['Roboto'] leading-4 sm:leading-5">
              Deactivated accounts
            </p>
          </div>

          {/* Pending Users */}
          <div className="bg-white rounded-[15px] sm:rounded-[20px] lg:rounded-[30px] xl:rounded-[40px] outline outline-1 outline-offset-[-1px] outline-black/10 p-3 sm:p-4 lg:p-5 xl:p-6 flex flex-col gap-3 sm:gap-4 lg:gap-6 xl:gap-8 min-h-[140px] sm:min-h-[160px] lg:min-h-[180px] xl:min-h-[208px]">
            <div className="flex justify-between items-center">
              <h3 className="text-xs sm:text-sm lg:text-base text-cyan-950 font-semibold font-['Roboto'] leading-5 sm:leading-6">
                Pending Users
              </h3>
              <div className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 relative">
                <AlertTriangle className="w-full h-full text-yellow-500" strokeWidth={2.5} />
              </div>
            </div>
            <div className="flex-1 flex items-start">
              <p className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl text-cyan-950 font-bold font-['Roboto'] leading-tight tracking-tight">
                {pendingUsers}
              </p>
            </div>
            <p className="text-xs sm:text-sm text-yellow-600 font-normal font-['Roboto'] leading-4 sm:leading-5">
              Awaiting activation
            </p>
          </div>

          {/* Admins */}
          <div className="bg-white rounded-[15px] sm:rounded-[20px] lg:rounded-[30px] xl:rounded-[40px] outline outline-1 outline-offset-[-1px] outline-black/10 p-3 sm:p-4 lg:p-5 xl:p-6 flex flex-col gap-3 sm:gap-4 lg:gap-6 xl:gap-8 min-h-[140px] sm:min-h-[160px] lg:min-h-[180px] xl:min-h-[208px]">
            <div className="flex justify-between items-center">
              <h3 className="text-xs sm:text-sm lg:text-base text-cyan-950 font-semibold font-['Roboto'] leading-5 sm:leading-6">
                Admins
              </h3>
              <div className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 relative">
                <Shield className="w-full h-full text-purple-500" strokeWidth={2.5} />
              </div>
            </div>
            <div className="flex-1 flex items-start">
              <p className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl text-cyan-950 font-bold font-['Roboto'] leading-tight tracking-tight">
                {admins}
              </p>
            </div>
            <p className="text-xs sm:text-sm text-gray-600 font-normal font-['Roboto'] leading-4 sm:leading-5">
              Administrator accounts
            </p>
          </div>
        </div>

        {/* Header Section before Table */}
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 sm:gap-6">
          <div className="flex-1 space-y-1 sm:space-y-2">
            <h1 className="text-lg sm:text-xl lg:text-2xl font-medium text-cyan-950 font-['Roboto'] leading-tight tracking-tight">
              Users Management
            </h1>
            <p className="text-xs sm:text-sm lg:text-base text-gray-600 font-normal font-['Roboto'] leading-5 sm:leading-6">
              View and manage every individual user account across all companies
            </p>
          </div>
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Filter/Sort Button */}
            <div className="relative" data-sort-button>
              <button
                onClick={toggleSortDropdown}
                className="w-8 h-8 sm:w-9 sm:h-9 lg:w-10 lg:h-10 flex items-center justify-center bg-[#E2E8F0] hover:bg-[#CBD5E1] rounded-lg transition-colors"
                aria-label="Filter and Sort"
              >
                <List className="w-4 h-4 sm:w-4 sm:h-4 lg:w-5 lg:h-5 text-slate-700" />
              </button>

              {/* Sort Dropdown */}
              {isSortDropdownOpen && (
                <div
                  data-sort-dropdown
                  className="absolute right-0 top-full mt-1 w-56 bg-white rounded-lg shadow-[0px_2px_4px_-2px_rgba(0,0,0,0.10)] shadow-md outline outline-[0.52px] outline-offset-[-0.52px] outline-black/10 overflow-hidden z-50"
                  style={{ top: "100%" }}
                >
                  {/* Header */}
                  <div className="w-full h-10 px-4 py-2 flex items-center gap-2 border-b border-black/10">
                    <div className="w-4 h-4 relative overflow-hidden">
                      <ArrowUpDown className="w-4 h-4 text-neutral-950" />
                    </div>
                    <span className="text-neutral-950 text-sm font-semibold font-['Roboto'] leading-5">
                      Sort By
                    </span>
                  </div>

                  {/* Company Name */}
                  <div
                    className="w-full h-10 px-4 py-2 cursor-pointer hover:bg-gray-50 transition-colors flex items-center"
                    onClick={() => handleSortFieldSelect("Company Name")}
                  >
                    <span className="text-neutral-950 text-sm font-normal font-['Roboto'] leading-5">
                      Company Name
                    </span>
                  </div>

                  {/* Role */}
                  <div
                    className="w-full h-10 px-4 py-2 cursor-pointer hover:bg-gray-50 transition-colors flex items-center"
                    onClick={() => handleSortFieldSelect("Role")}
                  >
                    <span className="text-neutral-950 text-sm font-normal font-['Roboto'] leading-5">
                      Role
                    </span>
                  </div>

                  {/* Status */}
                  <div
                    className="w-full h-10 px-4 py-2 cursor-pointer hover:bg-gray-50 transition-colors flex items-center"
                    onClick={() => handleSortFieldSelect("Status")}
                  >
                    <span className="text-neutral-950 text-sm font-normal font-['Roboto'] leading-5">
                      Status
                    </span>
                  </div>

                  {/* Recent Active */}
                  <div
                    className="w-full h-10 px-4 py-2 cursor-pointer hover:bg-gray-50 transition-colors flex items-center"
                    onClick={() => handleSortFieldSelect("Recent Active")}
                  >
                    <span className="text-neutral-950 text-sm font-normal font-['Roboto'] leading-5">
                      Recent Active
                    </span>
                  </div>

                  {/* Joined Date */}
                  <div
                    className="w-full h-10 px-4 py-2 cursor-pointer hover:bg-gray-50 transition-colors flex items-center"
                    onClick={() => handleSortFieldSelect("Joined Date")}
                  >
                    <span className="text-neutral-950 text-sm font-normal font-['Roboto'] leading-5">
                      Joined Date
                    </span>
                  </div>
                </div>
              )}
            </div>
            
            {/* Search Button */}
            <button
              onClick={() => {
                // Handle search logic - could open search modal or focus search input
                const searchInput = document.querySelector('input[type="text"]') as HTMLInputElement
                searchInput?.focus()
              }}
              className="w-8 h-8 sm:w-9 sm:h-9 lg:w-10 lg:h-10 flex items-center justify-center bg-[#E2E8F0] hover:bg-[#CBD5E1] rounded-lg transition-colors"
              aria-label="Search"
            >
              <Search className="w-4 h-4 sm:w-4 sm:h-4 lg:w-5 lg:h-5 text-slate-700" />
            </button>
            
            {/* Create Button */}
            <Button
              onClick={() => setIsModalOpen(true)}
              className="bg-[#67909B] hover:bg-[#5a7a85] text-white text-xs sm:text-sm lg:text-base font-medium font-['Roboto'] rounded-lg px-3 sm:px-4 lg:px-6 h-8 sm:h-9 lg:h-10"
            >
              Create
            </Button>
          </div>
        </div>

        {/* Users Table */}
        <div className="w-full">
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
                  { label: "User Name" },
                  { label: "Company" },
                  { label: "Email" },
                  { label: "Role" },
                  { label: "Status" },
                  { label: "Last Active" },
                  { label: "Action" },
                ].map((col, i) => (
                  <div
                    key={i}
                    className={`px-2 py-2 sm:py-3 text-center flex-1 flex-shrink-0 ${
                      col.label === "User Name" ? "flex items-center gap-1.5 text-left" : "flex items-center justify-center gap-1.5"
                    }`}
                  >
                    <span className="text-xs sm:text-sm font-semibold text-neutral-800 font-['Roboto'] whitespace-nowrap">
                      {col.label}
                          </span>
                    {col.label !== "Action" && col.label !== "Last Active" && (
                      <ArrowUpDown className="w-3 h-3 text-neutral-400 flex-shrink-0" />
                    )}
                        </div>
                ))}
                        </div>
              {/* Body */}
              {paginatedUsers.map((user, index) => (
                <div
                        key={user.id}
                  className={`flex items-center px-1 sm:px-2 lg:px-4 py-4 sm:py-5 lg:py-6 hover:bg-gray-50 transition border-b border-gray-200 ${
                    index === paginatedUsers.length - 1 ? "border-b-0" : ""
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
                  {/* Checkbox */}
                  <div className="flex items-center justify-center flex-shrink-0">
                            <input
                              type="checkbox"
                      className="w-3 h-3 sm:w-3.5 sm:h-3.5 lg:w-4 lg:h-4 flex-shrink-0"
                            />
                          </div>
                  {/* User Name */}
                  <div className="flex items-center gap-1.5 text-left flex-1 flex-shrink-0">
                            <Avatar className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 flex-shrink-0">
                              {user.avatar ? (
                                <AvatarImage src={user.avatar} alt={user.name} />
                              ) : null}
                              <AvatarFallback className="text-[10px] sm:text-xs bg-cyan-950 text-white">
                                {getInitials(user.name)}
                              </AvatarFallback>
                            </Avatar>
                    <span className="text-xs sm:text-sm font-medium text-zinc-700 font-['Roboto'] truncate">
                              {user.name}
                            </span>
                          </div>
                  {/* Company */}
                  <div className="text-center flex-1 flex-shrink-0 flex items-center justify-center">
                    <span className="text-xs sm:text-sm font-normal text-zinc-700 font-['Roboto'] truncate">
                            {user.company}
                          </span>
                  </div>
                  {/* Email */}
                  <div className="text-center flex-1 flex-shrink-0 flex items-center justify-center">
                    <span className="text-xs sm:text-sm font-normal text-zinc-700 font-['Roboto'] truncate">
                            {user.email}
                          </span>
                  </div>
                  {/* Role */}
                  <div className="text-center flex-1 flex-shrink-0 flex items-center justify-center">
                          {renderRoleBadge(user.role)}
                  </div>
                  {/* Status */}
                  <div className="text-center flex-1 flex-shrink-0 flex items-center justify-center">
                          {renderStatusBadge(user.status)}
                  </div>
                  {/* Last Active */}
                  <div className="text-center flex-1 flex-shrink-0 flex items-center justify-center">
                    <span className="text-xs sm:text-sm font-medium text-zinc-700 font-['Roboto'] whitespace-nowrap">
                            {user.lastActive}
                          </span>
                  </div>
                  {/* Action */}
                  <div className="text-center flex-1 flex-shrink-0 flex items-center justify-center relative">
                          <div className="relative" data-dropdown>
                            <button
                              onClick={(e) => toggleDropdown(user.id, e)}
                        className="w-6 h-6 flex items-center justify-center"
                            >
                        <MoreHorizontal className="w-6 h-6 text-gray-950 cursor-pointer" />
                            </button>

                            {/* Action Dropdown */}
                            {openDropdownId === user.id && (
                              <div
                                className="absolute right-0 top-full mt-1 w-48 h-36 bg-white rounded-lg shadow-[0px_2px_4px_-2px_rgba(0,0,0,0.10)] shadow-md outline outline-[0.52px] outline-offset-[-0.52px] outline-black/10 overflow-hidden z-50"
                                style={{ top: "100%", right: "0" }}
                              >
                                {/* View Details */}
                                <div
                                  className="w-44 h-8 left-[4.52px] top-[4.52px] absolute rounded-md cursor-pointer hover:bg-gray-50 transition-colors"
                                  onClick={() => handleActionClick("View Details", user.id)}
                                >
                                  <div className="w-4 h-4 left-[8px] top-[7.99px] absolute overflow-hidden">
                                    <div className="w-3.5 h-2.5 left-[1.33px] top-[3.33px] absolute outline outline-[1.33px] outline-offset-[-0.67px] outline-gray-500 rounded-tl-full rounded-tr-full" />
                                    <div className="w-1 h-1 left-[6px] top-[6px] absolute outline outline-[1.33px] outline-offset-[-0.67px] outline-gray-500 rounded-full" />
                                  </div>
                                  <div className="left-[39.99px] top-[6.56px] absolute justify-start text-neutral-950 text-sm font-normal font-['Roboto'] leading-5">
                                    View Details
                                  </div>
                                </div>

                                {/* Edit User */}
                                <div
                                  className="w-44 h-8 left-[4.52px] top-[36.50px] absolute rounded-md cursor-pointer hover:bg-gray-50 transition-colors"
                                  onClick={() => handleActionClick("Edit User", user.id)}
                                >
                                  <div className="w-4 h-4 left-[8px] top-[7.99px] absolute overflow-hidden">
                                    <div className="w-3 h-3 left-[2px] top-[2px] absolute outline outline-[1.33px] outline-offset-[-0.67px] outline-gray-500 transform rotate-45" />
                                    <div className="w-2.5 h-2.5 left-[5.33px] top-[1.34px] absolute outline outline-[1.33px] outline-offset-[-0.67px] outline-gray-500" />
                                  </div>
                                  <div className="left-[39.99px] top-[6.56px] absolute justify-start text-neutral-950 text-sm font-normal font-['Roboto'] leading-5">
                                    Edit User
                                  </div>
                                </div>

                                {/* Separator Line */}
                                <div className="w-48 h-px left-0 top-[73px] absolute bg-black/10" />

                                {/* Reset Password */}
                                <div
                                  className="w-44 h-8 left-[4.52px] top-[78.48px] absolute rounded-md cursor-pointer hover:bg-gray-50 transition-colors"
                                  onClick={() => handleActionClick("Reset Password", user.id)}
                                >
                                  <div className="w-4 h-4 left-[8px] top-[7.99px] absolute overflow-hidden">
                                    <div className="w-3 h-3 left-[1.67px] top-[1.67px] absolute outline outline-1 outline-offset-[-0.50px] outline-gray-500" />
                                    <div className="w-1 h-1.5 left-[5.67px] top-[5px] absolute outline outline-1 outline-offset-[-0.50px] outline-gray-500" />
                                  </div>
                                  <div className="left-[39.99px] top-[6.56px] absolute justify-start text-neutral-950 text-sm font-normal font-['Roboto'] leading-5">
                                    Reset Password
                                  </div>
                                </div>

                                {/* Deactivate */}
                                <div
                                  className="w-44 h-8 left-[4.52px] top-[110.45px] absolute rounded-md cursor-pointer hover:bg-gray-50 transition-colors"
                                  onClick={() => handleActionClick("Deactivate", user.id)}
                                >
                                  <div className="w-4 h-4 left-[8px] top-[7.99px] absolute overflow-hidden">
                                    <div className="w-3.5 h-3.5 left-[2px] top-[2px] absolute bg-red-600" />
                                  </div>
                                  <div className="left-[39.99px] top-[6.56px] absolute justify-start text-red-600 text-sm font-normal font-['Roboto'] leading-5">
                                    Deactivate
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                  </div>
                </div>
                    ))}
            </div>
            </div>
          </div>
        </div>


        {/* Pagination */}
        <div className="flex justify-end items-center gap-4 sm:gap-8 pt-4">
          <div className="flex justify-start items-center gap-2.5">
            <div className="justify-start text-neutral-800 text-xs sm:text-sm font-semibold font-['Roboto'] whitespace-nowrap">
              Records per page
            </div>
            <div className="w-16 inline-flex flex-col justify-start items-start gap-2">
              <Select value={itemsPerPage.toString()} onValueChange={handleItemsPerPageChange}>
                <SelectTrigger className="self-stretch h-7 px-3.5 py-2 rounded-lg outline outline-1 outline-offset-[-1px] outline-neutral-800 inline-flex justify-start items-center gap-2 border-0 focus:ring-0 [&>svg]:hidden">
                  <SelectValue />
                  <div className="w-4 h-4 relative overflow-hidden ml-auto">
                    <div className="w-2.5 h-1.5 left-[3px] top-[5px] absolute bg-neutral-800" />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1</SelectItem>
                  <SelectItem value="5">5</SelectItem>
                  <SelectItem value="10">10</SelectItem>
                  <SelectItem value="20">20</SelectItem>
                  <SelectItem value="50">50</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="flex justify-start items-center gap-2">
            {/* Previous Button */}
            <button
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
              className="p-2 flex justify-start items-center gap-0.5 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 rounded transition-colors"
              aria-label="Previous page"
            >
              <div className="w-6 h-6 relative overflow-hidden">
                <div className="w-2 h-1 left-[10px] top-[15.25px] absolute origin-top-left -rotate-90 outline outline-[1.50px] outline-offset-[-0.75px] outline-neutral-800" />
              </div>
            </button>
            
            {/* Current Range Indicator */}
            <div className="text-center justify-start text-neutral-800 text-xs sm:text-sm font-medium font-['Roboto'] leading-5 whitespace-nowrap">
              {startRecord} to {endRecord}
            </div>
            
            {/* Next Button */}
            <button
              onClick={handleNextPage}
              disabled={currentPage >= totalPages}
              className="p-2 flex justify-start items-center gap-0.5 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 rounded transition-colors"
              aria-label="Next page"
            >
              <div className="w-6 h-6 relative overflow-hidden">
                <div className="w-2 h-1 left-[14px] top-[8px] absolute origin-top-left rotate-90 outline outline-[1.50px] outline-offset-[-0.75px] outline-neutral-800" />
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Create User Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="!fixed !left-1/2 !top-1/2 !-translate-x-1/2 !-translate-y-1/2 !w-[90vw] sm:!w-[512px] h-auto max-h-[90vh] bg-white rounded-[10px] shadow-[0px_4px_6px_-4px_rgba(0,0,0,0.10)] shadow-lg outline outline-1 outline-offset-[-1px] outline-black/10 p-0 overflow-hidden !z-[100] [&>button]:hidden !max-w-[512px] flex flex-col">
          {/* Custom Close Button */}
          <button
            onClick={() => setIsModalOpen(false)}
            type="button"
            className="absolute right-3 sm:right-4 top-3 sm:top-4 w-4 h-4 opacity-70 hover:opacity-100 transition-opacity rounded-sm z-[110] bg-transparent border-0 cursor-pointer"
          >
            <X className="w-4 h-4 text-neutral-950" />
          </button>

          {/* Header */}
          <div className="w-full px-4 sm:px-6 pt-6 sm:pt-8 pb-4">
            <DialogTitle className="text-lg sm:text-xl font-semibold font-['Roboto'] leading-6 sm:leading-7 text-neutral-950 mb-2">
              Add User
            </DialogTitle>
            <DialogDescription className="text-sm font-normal font-['Roboto'] leading-5 text-gray-500">
              Create a new user account with basic information.
            </DialogDescription>
          </div>

          {/* Form Fields */}
          <div className="w-full px-4 sm:px-6 pb-6 flex-1 overflow-y-auto">
            <div className="space-y-4">
              {/* Name */}
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-neutral-950 font-['Roboto'] leading-4">
                  Name *
                </label>
                <Input
                  type="text"
                  placeholder="Enter user name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="h-9 px-3 py-1 bg-zinc-100 rounded-lg outline outline-1 outline-offset-[-1px] outline-black/0 text-gray-500 text-sm font-normal font-['Roboto'] border-0 focus-visible:ring-0 placeholder:text-gray-500"
                />
              </div>

              {/* Email */}
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-neutral-950 font-['Roboto'] leading-4">
                  Email *
                </label>
                <Input
                  type="email"
                  placeholder="user@company.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="h-9 px-3 py-1 bg-zinc-100 rounded-lg outline outline-1 outline-offset-[-1px] outline-black/0 text-gray-500 text-sm font-normal font-['Roboto'] border-0 focus-visible:ring-0 placeholder:text-gray-500"
                />
              </div>

              {/* Company */}
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-neutral-950 font-['Roboto'] leading-4">
                  Company *
                </label>
                <Input
                  type="text"
                  placeholder="Enter company name"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  className="h-9 px-3 py-1 bg-zinc-100 rounded-lg outline outline-1 outline-offset-[-1px] outline-black/0 text-gray-500 text-sm font-normal font-['Roboto'] border-0 focus-visible:ring-0 placeholder:text-gray-500"
                />
              </div>

              {/* Role and Status */}
              <div className="grid grid-cols-2 gap-4">
                {/* Role */}
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-neutral-950 font-['Roboto'] leading-4">
                    Role
                  </label>
                  <Select
                    value={formData.role}
                    onValueChange={(value) => setFormData({ ...formData, role: value })}
                  >
                    <SelectTrigger className="h-9 px-3 bg-zinc-100 rounded-lg outline outline-1 outline-offset-[-1px] outline-black/0 border-0 focus:ring-0 justify-between [&>svg]:hidden">
                      <SelectValue />
                      <div className="w-4 h-4 relative opacity-50 overflow-hidden">
                        <ChevronDown className="w-2 h-1 text-gray-500" />
                      </div>
                    </SelectTrigger>
                    <SelectContent className="!z-[110]">
                      <SelectItem value="Admin">Admin</SelectItem>
                      <SelectItem value="Manager">Manager</SelectItem>
                      <SelectItem value="Member">Member</SelectItem>
                      <SelectItem value="Viewer">Viewer</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Status */}
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-neutral-950 font-['Roboto'] leading-4">
                    Status
                  </label>
                  <Select
                    value={formData.status}
                    onValueChange={(value) => setFormData({ ...formData, status: value })}
                  >
                    <SelectTrigger className="h-9 px-3 bg-zinc-100 rounded-lg outline outline-1 outline-offset-[-1px] outline-black/0 border-0 focus:ring-0 justify-between [&>svg]:hidden">
                      <SelectValue />
                      <div className="w-4 h-4 relative opacity-50 overflow-hidden">
                        <ChevronDown className="w-2 h-1 text-gray-500" />
                      </div>
                    </SelectTrigger>
                    <SelectContent className="!z-[110]">
                      <SelectItem value="Active">Active</SelectItem>
                      <SelectItem value="Inactive">Inactive</SelectItem>
                      <SelectItem value="Pending">Pending</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="w-full px-4 sm:px-6 pb-4 sm:pb-6 border-t border-slate-300 flex justify-end items-center gap-2 pt-4 mt-auto">
            <button
              onClick={() => setIsModalOpen(false)}
              className="h-9 px-4 py-2 bg-white rounded-lg outline outline-1 outline-offset-[-1px] outline-black/10 flex justify-center items-center hover:bg-gray-50 transition-colors"
            >
              <span className="text-neutral-950 text-sm font-medium font-['Roboto'] leading-5">
                Cancel
              </span>
            </button>
            <button
              onClick={() => {
                console.log("Creating user:", formData)
                setIsModalOpen(false)
                setFormData({
                  name: "",
                  email: "",
                  company: "",
                  role: "Member",
                  status: "Pending",
                })
              }}
              className="h-9 px-4 py-2 rounded-lg flex justify-center items-center gap-2 transition-colors"
              style={{ backgroundColor: "#4A8E9B" }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#3d7a85")}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#4A8E9B")}
            >
              <span className="text-white text-sm font-medium font-['Roboto'] leading-5">
                Create User
              </span>
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}



