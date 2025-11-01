import { NavLink, useLocation, useNavigate } from "react-router-dom"
import { logoutUser } from "@/store/auth/authSlice"
import { useDispatch } from "react-redux"
import type { AppDispatch } from "@/store/store"

const manageItems = [
  { title: "Dash Board", url: "/super-admin/dashboard" },
  { title: "Companies", url: "/super-admin/companies" },
  { title: "Plan & Billing", url: "/super-admin/plan-billing" },
  { title: "User control", url: "/super-admin/user-control" },
  { title: "Analytics", url: "/super-admin/analytics" },
  { title: "Audit Logs", url: "/super-admin/audit-logs" },
]

const administrationItems = [
  { title: "Settings", url: "/super-admin/settings" },
  { title: "Announcement", url: "/super-admin/announcements" },
]

export function SuperAdminSidebar() {
  const location = useLocation()
  const navigate = useNavigate()
  const dispatch = useDispatch<AppDispatch>()

  const isActive = (path: string) => {
    if (path === "/super-admin/dashboard") {
      return location.pathname === "/super-admin" || location.pathname === path
    }
    return location.pathname === path
  }

  const handleLogout = async () => {
    await dispatch(logoutUser())
    navigate("/login")
  }

  const getNavClass = (isActiveLink: boolean) =>
    isActiveLink 
      ? "bg-white text-cyan-950 shadow-lg rounded-l-full rounded-r-[32px] border border-white/30"
      : "hover:bg-white/20 text-neutral-800 rounded-xl transition-all duration-300 hover:shadow-md"

  const renderDashboardIcon = (active: boolean) => {
    if (active) {
      return (
        <div className="h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6 overflow-hidden flex-shrink-0 bg-white/10 rounded-lg flex items-center justify-center backdrop-blur-sm">
          <div className="h-full w-full flex items-center justify-center relative">
            <div className="w-3.5 h-3.5 bg-cyan-950 rounded-[0.60px] outline outline-2 outline-offset-[-0.90px] outline-cyan-950" />
          </div>
        </div>
      )
    }
    return (
      <div className="h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6 overflow-hidden flex-shrink-0 bg-white/10 rounded-lg flex items-center justify-center backdrop-blur-sm relative">
        <div className="w-5 h-4 bg-neutral-800" />
      </div>
    )
  }

  const renderFolderIcon = () => {
    return (
      <div className="h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6 overflow-hidden flex-shrink-0 bg-white/10 rounded-lg flex items-center justify-center backdrop-blur-sm relative">
        <div className="w-5 h-4 bg-neutral-800" />
      </div>
    )
  }

  return (
    <div className="w-60 sm:w-60 flex-shrink-0 h-full transition-all duration-300 ease-in-out">
      <div 
        className="h-full rounded-xl sm:rounded-2xl lg:rounded-[32px] pl-2 relative flex flex-col shadow-2xl border border-white/20"
        style={{ 
          background: 'linear-gradient(135deg, #C0CED2 0%, #B0BEC2 50%, #A0AEB2 100%)',
          backdropFilter: 'blur(50px)'
        }}
      >
        {/* Navigation */}
        <div className="flex flex-col h-full pt-4 sm:pt-6 lg:pt-8">
          {/* MANAGE Section */}
          <div className="flex-shrink-0">
            <div className="text-xs sm:text-[12px] text-zinc-600 uppercase tracking-wider font-semibold mb-2 sm:mb-3 lg:mb-4 sm:px-3 flex items-center gap-2">
              MANAGE
            </div>
            <div className="space-y-1 sm:space-y-1.5">
              {manageItems.map((item) => {
                const active = isActive(item.url)
                const isDashboard = item.title === "Dash Board"
                
                return (
                  <NavLink 
                    key={item.title}
                    to={item.url} 
                    className={`flex items-center gap-2 sm:gap-3 lg:gap-4 px-2 sm:px-3 lg:px-4 py-1.5 sm:py-2 lg:py-2.5 text-xs sm:text-sm lg:text-[14px] font-semibold transition-all duration-200 ${getNavClass(active)}`}
                  >
                    {isDashboard ? renderDashboardIcon(active) : renderFolderIcon()}
                    <span className="truncate">{item.title}</span>
                  </NavLink>
                )
              })}
            </div>
          </div>

          {/* ADMINISTRATION Section */}
          <div className="flex-shrink-0 mt-3 sm:mt-4 lg:mt-5">
            <div className="text-xs sm:text-[12px] text-zinc-600 uppercase tracking-wider font-semibold mb-2 sm:mb-3 lg:mb-4 px-2 sm:px-3 flex items-center gap-2">
              ADMINISTRATION
            </div>
            <div className="space-y-0.5 sm:space-y-1">
              {administrationItems.map((item) => {
                const active = isActive(item.url)
                
                return (
                  <NavLink 
                    key={item.title}
                    to={item.url} 
                    className={`flex items-center gap-2 sm:gap-3 lg:gap-4 px-2 sm:px-3 lg:px-4 py-1.5 sm:py-2 lg:py-2.5 text-xs sm:text-sm lg:text-[14px] font-medium transition-all duration-200 ${getNavClass(active)}`}
                  >
                    {renderFolderIcon()}
                    <span className="truncate">{item.title}</span>
                  </NavLink>
                )
              })}
            </div>
          </div>

          {/* Divider */}
          <div className="flex-shrink-0 mt-auto mb-2 sm:mb-3 lg:mb-4">
            <div className="w-full h-px outline outline-1 outline-offset-[-0.50px] outline-slate-300 mx-2 sm:mx-3"></div>
          </div>

          {/* Logout */}
          <div className="flex-shrink-0 px-2 sm:px-3">
            <button
              type="button"
              onClick={handleLogout}
              className="w-full flex items-center gap-2 sm:gap-3 lg:gap-4 px-2 sm:px-3 lg:px-4 py-1.5 sm:py-2 lg:py-2.5 rounded-xl text-xs sm:text-sm lg:text-[14px] font-semibold text-cyan-950 hover:bg-white/20 transition-all duration-300 hover:shadow-md"
            >
              <div className="h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6 overflow-hidden flex-shrink-0 bg-white/10 rounded-lg flex items-center justify-center backdrop-blur-sm relative">
                <div className="w-4 h-4 outline outline-[2.67px] outline-offset-[-1.33px] outline-cyan-950" />
              </div>
              <span className="truncate">Logout</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
