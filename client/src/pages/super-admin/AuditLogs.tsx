import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  FileText,
  CheckCircle2,
  AlertTriangle,
  Layers,
  IndianRupee,
  Filter,
  Search,
  Download,
  ArrowUpDown
} from "lucide-react"
import { useState, useEffect, useRef } from "react"

interface AuditLog {
  id: string
  timestamp: string
  user: string
  action: string
  resource: string
  details: string
  ipAddress: string
  status: "Success" | "Failed" | "Warning"
}

const auditLogsData: AuditLog[] = [
  { id: "1", timestamp: "2024-12-06 14:30:22", user: "admin@company.com", action: "User Created", resource: "User Management", details: "Created user: john.doe@company.com", ipAddress: "192.168.1.100", status: "Success" },
  { id: "2", timestamp: "2024-12-06 14:25:15", user: "admin@company.com", action: "Login Failed", resource: "Authentication", details: "Failed login attempt - invalid password", ipAddress: "192.168.1.100", status: "Success" },
  { id: "3", timestamp: "2024-12-06 14:20:08", user: "admin@company.com", action: "Security Settings Updated", resource: "Security", details: "Updated MFA requirement settings", ipAddress: "192.168.1.100", status: "Success" },
  { id: "4", timestamp: "2024-12-06 14:15:45", user: "admin@company.com", action: "API Key Accessed", resource: "API Settings", details: "Accessed production API key", ipAddress: "192.168.1.100", status: "Success" },
  { id: "5", timestamp: "2024-12-06 14:10:30", user: "admin@company.com", action: "User Suspended", resource: "User Management", details: "Suspended user: user@company.com", ipAddress: "192.168.1.100", status: "Success" },
  { id: "6", timestamp: "2024-12-06 14:05:12", user: "admin@company.com", action: "User Created", resource: "User Management", details: "Created user: john.doe@company.com", ipAddress: "192.168.1.100", status: "Success" },
]

export default function AuditLogs() {
  const [auditLogs] = useState<AuditLog[]>(auditLogsData)
  const [searchQuery, setSearchQuery] = useState("")
  const [isFilterDropdownOpen, setIsFilterDropdownOpen] = useState(false)
  const [selectedSortOption, setSelectedSortOption] = useState<string | null>(null)
  const filterDropdownRef = useRef<HTMLDivElement>(null)

  const totalEvents = auditLogs.length
  const successEvents = auditLogs.filter(log => log.status === "Success").length
  const failedEvents = auditLogs.filter(log => log.status === "Failed").length
  const warnings = auditLogs.filter(log => log.status === "Warning").length
  const totalRevenue = "₹72,534"

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node
      if (filterDropdownRef.current && !filterDropdownRef.current.contains(target)) {
        setIsFilterDropdownOpen(false)
      }
    }

    if (isFilterDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isFilterDropdownOpen])

  const handleSortOptionClick = (option: string) => {
    setSelectedSortOption(option)
    setIsFilterDropdownOpen(false)
    // TODO: Implement sorting logic
    console.log(`Sorting by: ${option}`)
  }

  const renderStatusBadge = (status: AuditLog["status"]) => {
    switch (status) {
      case "Success":
        return (
          <div className="w-20 h-6 relative bg-green-100 rounded-full">
            <div className="left-[16px] top-[4px] absolute justify-start text-green-800 text-xs font-normal font-['Roboto'] leading-4">
              Success
            </div>
          </div>
        )
      case "Failed":
        return (
          <div className="w-20 h-6 relative bg-red-100 rounded-full">
            <div className="left-[22px] top-[4px] absolute justify-start text-red-800 text-xs font-normal font-['Roboto'] leading-4">
              Failed
            </div>
          </div>
        )
      case "Warning":
        return (
          <div className="w-20 h-6 relative bg-yellow-100 rounded-full">
            <div className="left-[14px] top-[4px] absolute justify-start text-yellow-800 text-xs font-normal font-['Roboto'] leading-4">
              Warning
            </div>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div className="w-full h-full px-3 sm:px-4 lg:px-6 xl:px-8 pb-3 sm:pb-4 lg:pb-6 xl:pb-8 pt-1 sm:pt-2 lg:pt-3 xl:pt-4 overflow-auto">
      <div className="space-y-4 sm:space-y-6 lg:space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 sm:gap-6">
          <div className="flex-1 space-y-1 sm:space-y-2">
            <h1 className="text-lg sm:text-xl lg:text-2xl font-medium text-cyan-950 font-['Roboto'] leading-tight tracking-tight">
              Audit Logs
            </h1>
            <p className="text-xs sm:text-sm lg:text-base text-gray-600 font-normal font-['Roboto'] leading-5 sm:leading-6">
              View system audit logs and activity
            </p>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 sm:gap-5 lg:gap-6">
          {/* Total Events */}
          <div className="bg-white rounded-[20px] sm:rounded-[30px] lg:rounded-[40px] outline outline-1 outline-offset-[-1px] outline-black/10 p-4 sm:p-5 lg:p-6 flex flex-col justify-between gap-4 sm:gap-6 lg:gap-10 min-h-[160px] sm:min-h-[180px]">
            <div className="flex justify-between items-center">
              <h3 className="text-sm sm:text-base text-cyan-950 font-semibold font-['Roboto'] leading-6">
                Total Events
              </h3>
              <div className="w-4 h-4 sm:w-5 sm:h-5 relative">
                <FileText className="w-full h-full text-slate-500" strokeWidth={2.5} />
              </div>
            </div>
            <div className="flex-1 flex items-start">
              <p className="text-2xl sm:text-3xl lg:text-4xl text-cyan-950 font-bold font-['Roboto'] leading-9 tracking-tight">
                {totalEvents}
              </p>
            </div>
          </div>

          {/* Success Rate */}
          <div className="bg-white rounded-[20px] sm:rounded-[30px] lg:rounded-[40px] outline outline-1 outline-offset-[-1px] outline-black/10 p-4 sm:p-5 lg:p-6 flex flex-col justify-between gap-4 sm:gap-6 lg:gap-10 min-h-[160px] sm:min-h-[180px]">
            <div className="flex justify-between items-center">
              <h3 className="text-sm sm:text-base text-cyan-950 font-semibold font-['Roboto'] leading-6">
                Success Rate
              </h3>
              <div className="w-4 h-4 sm:w-5 sm:h-5 relative">
                <CheckCircle2 className="w-full h-full text-green-500" strokeWidth={2.5} />
              </div>
            </div>
            <div className="flex-1 flex items-start">
              <p className="text-2xl sm:text-3xl lg:text-4xl text-cyan-950 font-bold font-['Roboto'] leading-9 tracking-tight">
                {successEvents}
              </p>
            </div>
          </div>

          {/* Failed Events */}
          <div className="bg-white rounded-[20px] sm:rounded-[30px] lg:rounded-[40px] outline outline-1 outline-offset-[-1px] outline-black/10 p-4 sm:p-5 lg:p-6 flex flex-col justify-between gap-4 sm:gap-6 lg:gap-10 min-h-[160px] sm:min-h-[180px]">
            <div className="flex justify-between items-center">
              <h3 className="text-sm sm:text-base text-cyan-950 font-semibold font-['Roboto'] leading-6">
                Failed Events
              </h3>
              <div className="w-4 h-4 sm:w-5 sm:h-5 relative">
                <AlertTriangle className="w-full h-full text-yellow-500" strokeWidth={2.5} />
              </div>
            </div>
            <div className="flex-1 flex items-start">
              <p className="text-2xl sm:text-3xl lg:text-4xl text-cyan-950 font-bold font-['Roboto'] leading-9 tracking-tight">
                {failedEvents}
              </p>
            </div>
          </div>

          {/* Warnings */}
          <div className="bg-white rounded-[20px] sm:rounded-[30px] lg:rounded-[40px] outline outline-1 outline-offset-[-1px] outline-black/10 p-4 sm:p-5 lg:p-6 flex flex-col justify-between gap-4 sm:gap-6 lg:gap-10 min-h-[160px] sm:min-h-[180px]">
            <div className="flex justify-between items-center">
              <h3 className="text-sm sm:text-base text-cyan-950 font-semibold font-['Roboto'] leading-6">
                Warnings
              </h3>
              <div className="w-4 h-4 sm:w-5 sm:h-5 relative">
                <Layers className="w-full h-full text-slate-500" strokeWidth={2.5} />
              </div>
            </div>
            <div className="flex-1 flex items-start">
              <p className="text-2xl sm:text-3xl lg:text-4xl text-cyan-950 font-bold font-['Roboto'] leading-9 tracking-tight">
                {warnings}
              </p>
            </div>
          </div>

          {/* Total Revenue */}
          <div className="bg-white rounded-[20px] sm:rounded-[30px] lg:rounded-[40px] outline outline-1 outline-offset-[-1px] outline-black/10 p-4 sm:p-5 lg:p-6 flex flex-col justify-between gap-4 sm:gap-6 lg:gap-10 min-h-[160px] sm:min-h-[180px]">
            <div className="flex justify-between items-center">
              <h3 className="text-sm sm:text-base text-cyan-950 font-semibold font-['Roboto'] leading-6">
                Total Revenue
              </h3>
              <div className="w-4 h-4 sm:w-5 sm:h-5 relative flex items-center justify-center">
                <IndianRupee className="w-full h-full text-green-500" strokeWidth={2.5} />
              </div>
            </div>
            <div className="flex-1 flex items-start">
              <p className="text-2xl sm:text-3xl lg:text-4xl text-cyan-950 font-bold font-['Roboto'] leading-9 tracking-tight">
                {totalRevenue}
              </p>
            </div>
          </div>
        </div>

        {/* Audit Log Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 sm:gap-6">
          <div className="flex-1 space-y-1 sm:space-y-2">
            <h2 className="text-xl sm:text-2xl text-cyan-950 font-medium font-['Roboto'] leading-8 tracking-tight">
              Audit Log
            </h2>
            <p className="text-sm sm:text-base text-gray-600 font-normal font-['Roboto'] leading-6">
              Track and analyze all user and system activities.
            </p>
          </div>
          <div className="flex items-center gap-2 sm:gap-3 relative">
            {/* Filter Button with Dropdown */}
            <div className="relative" ref={filterDropdownRef}>
              <Button
                onClick={() => setIsFilterDropdownOpen(!isFilterDropdownOpen)}
                variant="outline"
                className="w-10 h-10 p-0 bg-white rounded-lg outline outline-1 outline-offset-[-1px] outline-black/10 hover:bg-gray-50 flex items-center justify-center"
              >
                <Filter className="w-4 h-4 text-neutral-950" strokeWidth={2} />
              </Button>
              
              {/* Sort Dropdown */}
              {isFilterDropdownOpen && (
                <div className="absolute right-0 top-full mt-2 w-44 h-48 bg-white rounded-lg shadow-lg outline outline-1 outline-offset-[-1px] outline-black/10 z-50 overflow-hidden">
                  {/* Header */}
                  <div className="w-full px-3 sm:px-4 pt-3 sm:pt-4 pb-2 flex items-center gap-2">
                    <div className="w-4 h-4 relative overflow-hidden flex-shrink-0">
                      <ArrowUpDown className="w-full h-full text-cyan-950" strokeWidth={2} />
                    </div>
                    <span className="text-center justify-start text-cyan-950 text-sm font-medium font-['Roboto']">
                      Sort By
                    </span>
                  </div>
                  
                  {/* Separator */}
                  <div className="w-[calc(100%-16px)] h-0 outline outline-1 outline-offset-[-0.50px] outline-gray-200 mx-2"></div>
                  
                  {/* Options */}
                  <div className="w-full px-3 sm:px-4 pt-4 pb-3 sm:pb-4">
                    <div className="w-full flex flex-col justify-start items-start gap-4">
                      {["Newest", "Action", "User", "Status"].map((option) => (
                        <div
                          key={option}
                          onClick={() => handleSortOptionClick(option)}
                          className={`w-full cursor-pointer justify-center ${
                            selectedSortOption === option
                              ? "text-cyan-950 font-medium"
                              : "text-neutral-600 font-normal"
                          } text-sm font-['Roboto'] hover:text-cyan-950 transition-colors`}
                        >
                          {option}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            {/* Search Button */}
            <Button
              variant="outline"
              className="w-10 h-10 p-0 bg-white rounded-lg outline outline-1 outline-offset-[-1px] outline-black/10 hover:bg-gray-50 flex items-center justify-center"
            >
              <Search className="w-4 h-4 text-neutral-950" strokeWidth={2} />
            </Button>
            {/* Export Log Button */}
            <Button
              className="bg-slate-500 hover:bg-slate-600 text-white h-9 sm:h-10 px-4 sm:px-6 rounded-lg text-xs sm:text-sm font-medium font-['Roboto'] w-auto"
            >
              <Download className="w-4 h-4 mr-2" strokeWidth={2} />
              Export Log
            </Button>
          </div>
        </div>

        {/* Audit Log Table */}
        <div className="w-full h-auto sm:h-[600px] lg:h-[687px] bg-white rounded-[20px] sm:rounded-[30px] lg:rounded-[40px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.08)] border border-black/10 p-4 sm:p-6 lg:p-8 overflow-hidden">
          {/* Scrollable Container */}
          <div className="w-full overflow-x-auto overflow-y-hidden [&::-webkit-scrollbar]:h-2 [&::-webkit-scrollbar-thumb]:bg-gray-300 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-transparent">
            <div className="min-w-[900px] lg:min-w-[1200px]">
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
                  { label: "Timestamp" },
                  { label: "User" },
                  { label: "Action" },
                  { label: "Resource" },
                  { label: "Details" },
                  { label: "IP Address" },
                  { label: "Status" },
                ].map((col, i) => (
                  <div
                    key={i}
                    className={`px-2 py-2 sm:py-3 text-center flex-1 flex-shrink-0 ${
                      col.label === "Timestamp" ? "flex items-center gap-1.5 text-left" : "flex items-center justify-center gap-1.5"
                    }`}
                  >
                    <span className="text-xs sm:text-sm font-semibold text-neutral-800 font-['Roboto'] whitespace-nowrap">
                      {col.label}
                    </span>
                    {col.label !== "Action" && col.label !== "Details" && col.label !== "Status" && (
                      <ArrowUpDown className="w-3 h-3 text-neutral-400 flex-shrink-0" />
                    )}
                  </div>
                ))}
              </div>

              {/* Body */}
              <div className="max-h-[500px] sm:max-h-[550px] lg:max-h-[600px] overflow-y-auto">
                {auditLogs.map((log, index) => (
                  <div
                    key={log.id}
                    className={`flex items-center px-1 sm:px-2 lg:px-4 py-4 sm:py-5 lg:py-6 hover:bg-gray-50 transition border-b border-gray-200 ${
                      index === auditLogs.length - 1 ? "border-b-0" : ""
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
                    <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
                      <input
                        type="checkbox"
                        className="w-3 h-3 sm:w-3.5 sm:h-3.5 lg:w-4 lg:h-4 flex-shrink-0"
                      />
                    </div>
                    {/* Timestamp */}
                    <div className="flex-1 text-left text-xs sm:text-sm font-medium text-zinc-700 font-['Roboto'] flex-shrink-0">
                      {log.timestamp}
                    </div>
                    {/* User */}
                    <div className="flex-1 text-center text-xs sm:text-sm font-medium text-zinc-700 font-['Roboto'] flex-shrink-0">
                      {log.user}
                    </div>
                    {/* Action */}
                    <div className="flex-1 text-center text-xs sm:text-sm font-medium text-zinc-700 font-['Roboto'] flex-shrink-0">
                      {log.action}
                    </div>
                    {/* Resource */}
                    <div className="flex-1 text-center text-xs sm:text-sm font-medium text-zinc-700 font-['Roboto'] flex-shrink-0">
                      {log.resource}
                    </div>
                    {/* Details */}
                    <div className="flex-1 text-center text-xs sm:text-sm font-medium text-zinc-700 font-['Roboto'] flex-shrink-0 truncate">
                      {log.details}
                    </div>
                    {/* IP Address */}
                    <div className="flex-1 text-center flex-shrink-0 flex justify-center">
                      <div className="w-28 h-5 relative bg-gray-200 rounded">
                        <div className="left-[18px] top-[3px] absolute justify-start text-neutral-950 text-xs font-normal font-['Roboto'] leading-4">
                          {log.ipAddress}
                        </div>
                      </div>
                    </div>
                    {/* Status */}
                    <div className="flex-1 text-center flex-shrink-0 flex justify-center">
                      {renderStatusBadge(log.status)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
