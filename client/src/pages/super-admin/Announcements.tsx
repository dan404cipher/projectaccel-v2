import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { 
  Megaphone, 
  Users,
  Mail,
  Bell,
  Plus,
  Calendar,
  Send
} from "lucide-react"
import { useState } from "react"

interface Announcement {
  id: string
  title: string
  description: string
  status: "Published" | "Scheduled" | "Draft"
  targetAudience: string
  publishedDate?: string
  scheduledDate?: string
  createdDate?: string
}

const announcementsData: Announcement[] = [
  {
    id: "1",
    title: "New Advanced Analytics Feature Released",
    description: "We're excited to announce the release of our new Advanced Analytics feature, providing deeper insights into your project performance and team productivity.",
    status: "Published",
    targetAudience: "All Users",
    publishedDate: "Jan 15, 2024, 5:30 AM"
  },
  {
    id: "2",
    title: " ",
    description: "We will be performing scheduled maintenance on January 20th from 2:00 AM to 4:00 AM EST. During this time, the service may be temporarily unavailable.",
    status: "Scheduled",
    targetAudience: "All Users",
    scheduledDate: "Jan 18, 2024, 5:30 AM"
  },
  {
    id: "3",
    title: "Enterprise Plan Price Update",
    description: "Starting February 1st, we'll be updating our Enterprise plan pricing to better reflect the value we provide. Existing customers will maintain their current pricing for 6 months.",
    status: "Draft",
    targetAudience: "Enterprise Plan Users",
    createdDate: "Jan 18, 2024, 5:30 AM"
  }
]

export default function Announcements() {
  const [announcements] = useState<Announcement[]>(announcementsData)
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    category: "General",
    priority: "Medium",
    targetAudience: [] as string[],
    deliveryMethods: [] as string[],
    scheduleDate: ""
  })

  const renderStatusBadge = (status: Announcement["status"]) => {
    switch (status) {
      case "Published":
        return (
          <div className="w-20 h-6 relative bg-green-100 rounded-full">
            <div className="left-[12px] top-[4px] absolute justify-start text-green-800 text-xs font-normal font-['Roboto'] leading-4">
              Published
            </div>
          </div>
        )
      case "Scheduled":
        return (
          <div className="w-20 h-6 relative bg-blue-100 rounded-full">
            <div className="left-[10px] top-[4px] absolute justify-start text-blue-800 text-xs font-normal font-['Roboto'] leading-4">
              Scheduled
            </div>
          </div>
        )
      case "Draft":
        return (
          <div className="w-16 h-6 relative bg-gray-100 rounded-full">
            <div className="left-[16px] top-[4px] absolute justify-start text-gray-800 text-xs font-normal font-['Roboto'] leading-4">
              Draft
            </div>
          </div>
        )
      default:
        return null
    }
  }

  const handleAction = (action: string, announcementId: string) => {
    console.log(`${action} clicked for announcement ${announcementId}`)
    // Handle action logic here
  }

  const handleTargetAudienceChange = (audience: string, checked: boolean) => {
    if (checked) {
      setFormData(prev => ({
        ...prev,
        targetAudience: [...prev.targetAudience, audience]
      }))
    } else {
      setFormData(prev => ({
        ...prev,
        targetAudience: prev.targetAudience.filter(a => a !== audience)
      }))
    }
  }

  const handleDeliveryMethodChange = (method: string, checked: boolean) => {
    if (checked) {
      setFormData(prev => ({
        ...prev,
        deliveryMethods: [...prev.deliveryMethods, method]
      }))
    } else {
      setFormData(prev => ({
        ...prev,
        deliveryMethods: prev.deliveryMethods.filter(m => m !== method)
      }))
    }
  }

  const handleFormAction = (action: string) => {
    console.log(`${action} clicked with data:`, formData)
    if (action === "Cancel") {
      setIsCreateModalOpen(false)
      // Reset form
      setFormData({
        title: "",
        content: "",
        category: "General",
        priority: "Medium",
        targetAudience: [],
        deliveryMethods: [],
        scheduleDate: ""
      })
    } else {
      // Handle Save Draft, Schedule, or Publish Now
      setIsCreateModalOpen(false)
    }
  }

  return (
    <div className="w-full h-full p-4 sm:p-6 lg:p-8 overflow-auto">
      <div className="space-y-6 sm:space-y-8 lg:space-y-10">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 sm:gap-6">
          <div className="flex-1 space-y-1 sm:space-y-2">
            <h1 className="text-lg sm:text-xl lg:text-2xl font-medium text-cyan-950 font-['Roboto'] leading-tight tracking-tight">
              Announcements
            </h1>
            <p className="text-xs sm:text-sm lg:text-base text-gray-600 font-normal font-['Roboto'] leading-5 sm:leading-6">
              Manage platform-wide announcements and notifications
            </p>
          </div>
          <Button 
            onClick={() => setIsCreateModalOpen(true)}
            className="bg-[#67909B] hover:bg-slate-600 text-white h-9 sm:h-10 px-4 sm:px-6 rounded-lg text-xs sm:text-sm font-medium font-['Roboto'] w-full sm:w-auto"
          >
            Create Announcement
          </Button>
        </div>

        {/* Announcements Cards */}
        <div className="space-y-4 sm:space-y-6">
          {announcements.map((announcement) => {
            // Special card for "New Advanced Analytics Feature Released"
            if (announcement.id === "1") {
              return (
                <div
                  key={announcement.id}
                  className="self-stretch min-h-[176px] h-auto sm:h-44 relative bg-white rounded-2xl sm:rounded-3xl outline outline-1 outline-offset-[-1px] outline-black/10 overflow-hidden pb-6 sm:pb-0"
                >
                  {/* Title */}
                  <div className="left-[24px] top-[24px] absolute justify-start text-cyan-950 text-base sm:text-lg font-semibold font-['Roboto'] leading-6 sm:leading-7 pr-24 sm:pr-0">
                    {announcement.title}
                  </div>

                  {/* Description */}
                  <div className="w-[calc(100%-48px)] sm:w-[1100px] left-[24px] top-[56px] sm:top-[68px] absolute justify-start text-gray-600 text-sm sm:text-base font-normal font-['Roboto'] leading-6">
                    {announcement.description}
                  </div>

                  {/* Footer Metadata */}
                  <div className="w-[calc(100%-48px)] sm:w-[1318px] h-5 left-[24px] top-[120px] sm:top-[138px] absolute inline-flex flex-wrap justify-start items-center gap-3 sm:gap-4 lg:gap-6">
                    {/* Users Icon and Text */}
                    <div className="w-auto sm:w-20 h-5 flex justify-start items-center gap-2">
                      <div className="w-4 h-4 relative overflow-hidden flex-shrink-0">
                        <div className="w-2.5 h-1 left-[1.33px] top-[10px] absolute outline outline-[1.33px] outline-offset-[-0.67px] outline-gray-500"></div>
                        <div className="w-0.5 h-[5.16px] left-[10.67px] top-[2.08px] absolute outline outline-[1.33px] outline-offset-[-0.67px] outline-gray-500"></div>
                        <div className="w-0.5 h-1 left-[12.67px] top-[10.09px] absolute outline outline-[1.33px] outline-offset-[-0.67px] outline-gray-500"></div>
                        <div className="w-1.5 h-1.5 left-[3.33px] top-[2px] absolute outline outline-[1.33px] outline-offset-[-0.67px] outline-gray-500"></div>
                      </div>
                      <div className="flex-1 h-5 relative">
                        <div className="left-0 top-[0.50px] absolute justify-start text-gray-500 text-xs sm:text-sm font-normal font-['Roboto'] leading-5">
                          {announcement.targetAudience}
                        </div>
                      </div>
                    </div>

                    {/* Mail Icon */}
                    <div className="w-4 h-4 flex justify-start items-center gap-2 flex-shrink-0">
                      <div className="w-4 h-4 relative overflow-hidden">
                        <div className="w-0.5 h-[0.67px] left-[6.85px] top-[14px] absolute outline outline-[1.33px] outline-offset-[-0.67px] outline-gray-500"></div>
                        <div className="w-3 h-2.5 left-[2px] top-[1.33px] absolute outline outline-[1.33px] outline-offset-[-0.67px] outline-gray-500"></div>
                      </div>
                    </div>

                    {/* Bell Icon */}
                    <div className="w-4 h-4 relative overflow-hidden flex-shrink-0">
                      <div className="w-3.5 h-1 left-[1.33px] top-[4.67px] absolute outline outline-[1.33px] outline-offset-[-0.67px] outline-gray-500"></div>
                      <div className="w-3.5 h-2.5 left-[1.33px] top-[2.67px] absolute outline outline-[1.33px] outline-offset-[-0.67px] outline-gray-500"></div>
                    </div>

                    {/* Date */}
                    <div className="w-auto sm:w-56 h-5 relative">
                      <div className="left-0 top-[0.50px] absolute justify-start text-gray-500 text-xs sm:text-sm font-normal font-['Roboto'] leading-5 whitespace-nowrap">
                        {announcement.publishedDate && `Published: ${announcement.publishedDate}`}
                      </div>
                    </div>
                  </div>

                  {/* Status Badge */}
                  <div className="w-20 h-6 px-2 py-0.5 left-[24px] sm:left-[280px] md:left-[420px] top-[26px] absolute bg-green-100 rounded-lg outline outline-1 outline-offset-[-1px] outline-black/0 inline-flex justify-center items-center gap-1 overflow-hidden">
                    <div className="justify-start text-green-800 text-sm font-medium font-['Roboto'] leading-4">
                      Published
                    </div>
                  </div>
                </div>
              )
            }

            // Special card for "Scheduled Maintenance - January 20th"
            if (announcement.id === "2") {
              return (
                <div
                  key={announcement.id}
                  className="self-stretch min-h-[176px] h-auto sm:h-44 relative bg-white rounded-2xl sm:rounded-3xl outline outline-1 outline-offset-[-1px] outline-black/10 overflow-hidden pb-6 sm:pb-0"
                >
                  {/* Title */}
                  <div className="left-[24px] top-[24px] absolute justify-start text-cyan-950 text-base sm:text-lg font-semibold font-['Roboto'] leading-6 sm:leading-7 pr-40 sm:pr-0">
                    {announcement.title}
                  </div>

                  {/* Description */}
                  <div className="w-[calc(100%-48px)] sm:w-[1100px] left-[24px] top-[56px] sm:top-[68px] absolute justify-start text-gray-600 text-sm sm:text-base font-normal font-['Roboto'] leading-6">
                    {announcement.description}
                  </div>

                  {/* Footer Metadata */}
                  <div className="w-[calc(100%-48px)] sm:w-[1318px] h-5 left-[24px] top-[120px] sm:top-[138px] absolute inline-flex flex-wrap justify-start items-center gap-4 sm:gap-6">
                    {/* Users Icon and Text */}
                    <div className="w-auto sm:w-20 h-5 flex justify-start items-center gap-2">
                      <div className="w-4 h-4 relative overflow-hidden flex-shrink-0">
                        <div className="w-2.5 h-1 left-[1.33px] top-[10px] absolute outline outline-[1.33px] outline-offset-[-0.67px] outline-gray-500"></div>
                        <div className="w-0.5 h-[5.16px] left-[10.67px] top-[2.08px] absolute outline outline-[1.33px] outline-offset-[-0.67px] outline-gray-500"></div>
                        <div className="w-0.5 h-1 left-[12.67px] top-[10.09px] absolute outline outline-[1.33px] outline-offset-[-0.67px] outline-gray-500"></div>
                        <div className="w-1.5 h-1.5 left-[3.33px] top-[2px] absolute outline outline-[1.33px] outline-offset-[-0.67px] outline-gray-500"></div>
                      </div>
                      <div className="flex-1 h-5 relative">
                        <div className="left-0 top-[0.50px] absolute justify-start text-gray-500 text-xs sm:text-sm font-normal font-['Roboto'] leading-5">
                          {announcement.targetAudience}
                        </div>
                      </div>
                    </div>

                    {/* Mail, Bell, and Calendar Icons Container */}
                    <div className="w-16 h-4 flex justify-start items-center gap-2 flex-shrink-0">
                      {/* Mail Icon */}
                      <div className="w-4 h-4 relative overflow-hidden">
                        <div className="w-0.5 h-[0.67px] left-[6.85px] top-[14px] absolute outline outline-[1.33px] outline-offset-[-0.67px] outline-gray-500"></div>
                        <div className="w-3 h-2.5 left-[2px] top-[1.33px] absolute outline outline-[1.33px] outline-offset-[-0.67px] outline-gray-500"></div>
                      </div>
                      {/* Bell Icon */}
                      <div className="w-4 h-4 relative overflow-hidden">
                        <div className="w-3.5 h-1 left-[1.33px] top-[4.67px] absolute outline outline-[1.33px] outline-offset-[-0.67px] outline-gray-500"></div>
                        <div className="w-3.5 h-2.5 left-[1.33px] top-[2.67px] absolute outline outline-[1.33px] outline-offset-[-0.67px] outline-gray-500"></div>
                      </div>
                      {/* Calendar Icon */}
                      <div className="flex-1 h-4 relative overflow-hidden">
                        <div className="w-3 h-2.5 left-[2px] top-[2px] absolute outline outline-[1.33px] outline-offset-[-0.67px] outline-gray-500"></div>
                        <div className="w-1 h-1.5 left-[4px] top-[9.33px] absolute outline outline-[1.33px] outline-offset-[-0.67px] outline-gray-500"></div>
                        <div className="w-0 h-1.5 left-[5.33px] top-[4px] absolute outline outline-[1.33px] outline-offset-[-0.67px] outline-gray-500"></div>
                      </div>
                    </div>

                    {/* Date */}
                    <div className="w-auto sm:w-56 h-5 relative">
                      <div className="w-auto sm:w-56 left-0 top-[0.50px] absolute justify-start text-gray-500 text-xs sm:text-sm font-normal font-['Roboto'] leading-5 whitespace-nowrap">
                        {announcement.scheduledDate && `Scheduled: ${announcement.scheduledDate}`}
                      </div>
                    </div>
                  </div>

                  {/* Status Badge */}
                  <div className="w-20 h-6 px-2 py-0.5 left-[24px] sm:left-[280px] md:left-[377px] top-[26px] absolute bg-blue-100 rounded-lg outline outline-1 outline-offset-[-1px] outline-black/0 inline-flex justify-center items-center gap-1 overflow-hidden">
                    <div className="w-16 justify-start text-blue-800 text-sm font-medium font-['Roboto'] leading-4">
                      Scheduled
                    </div>
                  </div>

                  {/* Edit Schedule Button */}
                  <button
                    onClick={() => handleAction("Edit Schedule", announcement.id)}
                    className="w-20 sm:w-28 h-8 py-4 left-auto right-[24px] sm:left-[1192px] top-[22px] absolute rounded-lg outline outline-1 outline-offset-[-1px] outline-black/10 inline-flex justify-center items-center gap-2.5 bg-white hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex justify-start items-center gap-1">
                      <div className="text-center justify-start text-neutral-800 text-xs sm:text-sm font-medium font-['Roboto']">
                        Edit Schedule
                      </div>
                    </div>
                  </button>
                </div>
              )
            }

            // Special card for "Enterprise Plan Price Update"
            if (announcement.id === "3") {
              return (
                <div
                  key={announcement.id}
                  className="self-stretch min-h-[176px] h-auto sm:h-44 relative bg-white rounded-2xl sm:rounded-3xl outline outline-1 outline-offset-[-1px] outline-black/10 overflow-hidden pb-6 sm:pb-0"
                >
                  {/* Title */}
                  <div className="left-[24px] top-[24px] absolute justify-start text-cyan-950 text-base sm:text-lg font-semibold font-['Roboto'] leading-6 sm:leading-7 pr-40 sm:pr-0">
                    {announcement.title}
                  </div>

                  {/* Description */}
                  <div className="w-[calc(100%-48px)] sm:w-[1100px] left-[24px] top-[56px] sm:top-[68px] absolute justify-start text-gray-600 text-sm sm:text-base font-normal font-['Roboto'] leading-6">
                    {announcement.description}
                  </div>

                  {/* Footer Metadata */}
                  <div className="w-[calc(100%-48px)] sm:w-[1318px] h-5 left-[24px] top-[120px] sm:top-[138px] absolute inline-flex flex-wrap justify-start items-center gap-4 sm:gap-6">
                    {/* Users Icon and Text */}
                    <div className="w-auto sm:w-40 h-5 flex justify-start items-center gap-2">
                      <div className="w-4 h-4 relative overflow-hidden flex-shrink-0">
                        <div className="w-2.5 h-1 left-[1.33px] top-[10px] absolute outline outline-[1.33px] outline-offset-[-0.67px] outline-gray-500"></div>
                        <div className="w-0.5 h-[5.16px] left-[10.67px] top-[2.08px] absolute outline outline-[1.33px] outline-offset-[-0.67px] outline-gray-500"></div>
                        <div className="w-0.5 h-1 left-[12.67px] top-[10.09px] absolute outline outline-[1.33px] outline-offset-[-0.67px] outline-gray-500"></div>
                        <div className="w-1.5 h-1.5 left-[3.33px] top-[2px] absolute outline outline-[1.33px] outline-offset-[-0.67px] outline-gray-500"></div>
                      </div>
                      <div className="flex-1 h-5 relative">
                        <div className="left-0 top-[0.50px] absolute justify-start text-gray-500 text-xs sm:text-sm font-normal font-['Roboto'] leading-5">
                          {announcement.targetAudience}
                        </div>
                      </div>
                    </div>

                    {/* Mail, Bell, and Calendar Icons Container */}
                    <div className="w-16 h-4 flex justify-start items-center gap-2 flex-shrink-0">
                      {/* Mail Icon */}
                      <div className="w-4 h-4 relative overflow-hidden">
                        <div className="w-0.5 h-[0.67px] left-[6.85px] top-[14px] absolute outline outline-[1.33px] outline-offset-[-0.67px] outline-gray-500"></div>
                        <div className="w-3 h-2.5 left-[2px] top-[1.33px] absolute outline outline-[1.33px] outline-offset-[-0.67px] outline-gray-500"></div>
                      </div>
                      {/* Bell Icon */}
                      <div className="w-4 h-4 relative overflow-hidden">
                        <div className="w-3.5 h-1 left-[1.33px] top-[4.67px] absolute outline outline-[1.33px] outline-offset-[-0.67px] outline-gray-500"></div>
                        <div className="w-3.5 h-2.5 left-[1.33px] top-[2.67px] absolute outline outline-[1.33px] outline-offset-[-0.67px] outline-gray-500"></div>
                      </div>
                      {/* Calendar Icon */}
                      <div className="flex-1 h-4 relative overflow-hidden">
                        <div className="w-3 h-2.5 left-[2px] top-[2px] absolute outline outline-[1.33px] outline-offset-[-0.67px] outline-gray-500"></div>
                        <div className="w-1 h-1.5 left-[4px] top-[9.33px] absolute outline outline-[1.33px] outline-offset-[-0.67px] outline-gray-500"></div>
                        <div className="w-0 h-1.5 left-[5.33px] top-[4px] absolute outline outline-[1.33px] outline-offset-[-0.67px] outline-gray-500"></div>
                      </div>
                    </div>

                    {/* Date */}
                    <div className="w-auto sm:w-56 h-5 relative">
                      <div className="w-auto sm:w-56 left-0 top-[0.50px] absolute justify-start text-gray-500 text-xs sm:text-sm font-normal font-['Roboto'] leading-5 whitespace-nowrap">
                        {announcement.createdDate && `Scheduled: ${announcement.createdDate}`}
                      </div>
                    </div>
                  </div>

                  {/* Status Badge */}
                  <div className="w-16 h-6 px-2 py-0.5 left-[24px] sm:left-[200px] md:left-[286px] top-[26px] absolute bg-gray-100 rounded-lg outline outline-1 outline-offset-[-1px] outline-black/0 inline-flex justify-center items-center gap-1 overflow-hidden">
                    <div className="justify-start text-gray-800 text-sm font-medium font-['Roboto'] leading-4">
                      Draft
                    </div>
                  </div>

                  {/* Edit Button */}
                  <button
                    onClick={() => handleAction("Edit", announcement.id)}
                    className="w-20 sm:w-28 h-8 py-4 left-auto right-[100px] sm:right-[152px] md:left-[1056px] top-[22px] absolute rounded-lg outline outline-1 outline-offset-[-1px] outline-black/10 inline-flex justify-center items-center gap-2.5 bg-white hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex justify-start items-center gap-1">
                      <div className="text-center justify-start text-neutral-800 text-xs sm:text-sm font-medium font-['Roboto']">
                        Edit
                      </div>
                    </div>
                  </button>

                  {/* Publish Button */}
                  <button
                    onClick={() => handleAction("Publish", announcement.id)}
                    className="w-20 sm:w-28 h-8 py-4 left-auto right-[24px] sm:right-[24px] md:left-[1192px] top-[22px] absolute bg-slate-500 rounded-lg inline-flex justify-center items-center gap-2.5 hover:bg-slate-600 transition-colors"
                  >
                    <div className="flex justify-start items-center gap-1">
                      <div className="text-center justify-start text-white text-xs sm:text-sm font-medium font-['Roboto']">
                        Publish
                      </div>
                    </div>
                  </button>
                </div>
              )
            }

            // Regular cards for other announcements (if any)
            return (
              <div
                key={announcement.id}
                className="w-full bg-white rounded-lg sm:rounded-xl shadow-[0px_2px_4px_0px_rgba(0,0,0,0.08)] border border-black/10 overflow-hidden"
              >
                <div className="p-4 sm:p-6 lg:p-8">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 sm:gap-6">
                    {/* Left Content */}
                    <div className="flex-1 space-y-3 sm:space-y-4">
                      {/* Title and Status */}
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
                        <h2 className="text-base sm:text-lg lg:text-xl font-semibold text-neutral-950 font-['Roboto'] leading-tight">
                          {announcement.title}
                        </h2>
                        {renderStatusBadge(announcement.status)}
                      </div>

                      {/* Description */}
                      <p className="text-sm sm:text-base text-neutral-700 font-normal font-['Roboto'] leading-6">
                        {announcement.description}
                      </p>

                      {/* Footer Metadata */}
                      <div className="flex flex-wrap items-center gap-3 sm:gap-4 lg:gap-6 text-xs sm:text-sm text-gray-600 font-normal font-['Roboto']">
                        <div className="flex items-center gap-1.5 sm:gap-2">
                          <Users className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
                          <span>{announcement.targetAudience}</span>
                        </div>
                        <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
                        <Bell className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
                        <div className="flex items-center gap-1.5 sm:gap-2">
                          <span>
                            {announcement.status === "Published" && announcement.publishedDate && `Published: ${announcement.publishedDate}`}
                            {announcement.status === "Scheduled" && announcement.scheduledDate && `Scheduled: ${announcement.scheduledDate}`}
                            {announcement.status === "Draft" && announcement.createdDate && `Scheduled: ${announcement.createdDate}`}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Right Action Buttons */}
                    {announcement.status === "Scheduled" && (
                      <div className="flex-shrink-0">
                        <Button
                          onClick={() => handleAction("Edit Schedule", announcement.id)}
                          variant="outline"
                          className="w-full sm:w-auto bg-white hover:bg-gray-50 text-neutral-950 text-sm font-medium font-['Roboto'] rounded-lg px-4 sm:px-6 h-9 sm:h-10 border border-black/10"
                        >
                          Edit Schedule
                        </Button>
                      </div>
                    )}

                    {announcement.status === "Draft" && (
                      <div className="flex-shrink-0 flex gap-2">
                        <Button
                          onClick={() => handleAction("Edit", announcement.id)}
                          variant="outline"
                          className="bg-white hover:bg-gray-50 text-neutral-950 text-sm font-medium font-['Roboto'] rounded-lg px-4 sm:px-6 h-9 sm:h-10 border border-black/10"
                        >
                          Edit
                        </Button>
                        <Button
                          onClick={() => handleAction("Publish", announcement.id)}
                          className="bg-[#67909B] hover:bg-slate-600 text-white text-sm font-medium font-['Roboto'] rounded-lg px-4 sm:px-6 h-9 sm:h-10"
                        >
                          Publish
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Create New Announcement Modal */}
      <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
        <DialogContent className="w-full max-w-[534px] h-auto max-h-[95vh] min-h-[650px] bg-white rounded-[10px] shadow-[0px_4px_6px_-4px_rgba(0,0,0,0.10)] shadow-lg outline outline-1 outline-offset-[-1px] outline-black/10 p-0 overflow-hidden relative [&>button]:hidden !fixed !left-1/2 !top-1/2 !-translate-x-1/2 !-translate-y-1/2 flex flex-col">
          {/* Close Button */}
          <button
            onClick={() => setIsCreateModalOpen(false)}
            className="absolute right-6 top-6 w-4 h-4 opacity-70 hover:opacity-100 transition-opacity z-10"
          >
            <div className="w-4 h-4 left-0 top-0 absolute overflow-hidden">
              <div className="w-2 h-2 left-[4px] top-[4px] absolute outline outline-[1.33px] outline-offset-[-0.67px] outline-neutral-950 rotate-45"></div>
              <div className="w-2 h-2 left-[4px] top-[4px] absolute outline outline-[1.33px] outline-offset-[-0.67px] outline-neutral-950 -rotate-45"></div>
            </div>
          </button>

          {/* Modal Content Container */}
          <div className="w-full h-auto flex-1 overflow-y-auto p-6">
            {/* Header */}
            <div className="w-full sm:w-[462px] h-16 mb-4">
            <div className="w-[462px] h-5 relative">
    <div className="w-5 h-5 left-0 top-0 absolute overflow-hidden">
        <div className="w-3 h-0 left-[4.17px] top-[10px] absolute outline outline-[1.67px] outline-offset-[-0.83px] outline-slate-500" />
        <div className="w-0 h-3 left-[10px] top-[4.17px] absolute outline outline-[1.67px] outline-offset-[-0.83px] outline-slate-500" />
    </div>
    <div className="left-[28px] top-[1px] absolute justify-start text-cyan-950 text-lg font-semibold font-['Roboto'] leading-4">Create New Announcement</div>
</div>
              <div className="w-full sm:w-[462px] flex-1 relative mt-2">
              <div className="w-96 justify-start text-gray-500 text-sm font-normal font-['Roboto'] leading-5">Create and schedule announcements to communicate with your users across different channels.</div>
              </div>
            </div>

            {/* Form Content */}
            <div className="w-full sm:w-[462px] h-auto overflow-hidden">
              <div className="w-full sm:w-[462px] h-auto inline-flex flex-col justify-start items-start gap-4 sm:gap-6">
                {/* Basic Information Section */}
                <div className="self-stretch h-[22rem] pl-6 py-6 bg-white rounded-2xl outline outline-1 outline-offset-[-1px] outline-black/10 inline-flex flex-col justify-start items-start gap-10">
                  <div className="w-96 h-6 relative">
                    {/* Document Icon */}
                    <div className="w-4 h-4 left-0 top-[4px] absolute overflow-hidden">
                      <div className="w-2.5 h-3.5 left-[2.67px] top-[1.33px] absolute outline outline-[1.33px] outline-offset-[-0.67px] outline-slate-500"></div>
                      <div className="w-1 h-1 left-[9.33px] top-[1.33px] absolute outline outline-[1.33px] outline-offset-[-0.67px] outline-slate-500"></div>
                      <div className="w-[1.33px] h-0 left-[5.33px] top-[6px] absolute outline outline-[1.33px] outline-offset-[-0.67px] outline-slate-500"></div>
                      <div className="w-1.5 h-0 left-[5.33px] top-[8.67px] absolute outline outline-[1.33px] outline-offset-[-0.67px] outline-slate-500"></div>
                      <div className="w-1.5 h-0 left-[5.33px] top-[11.33px] absolute outline outline-[1.33px] outline-offset-[-0.67px] outline-slate-500"></div>
                    </div>
                    <div className="left-[24px] top-[-0.50px] absolute justify-start text-cyan-950 text-base font-normal font-['Roboto'] leading-6">
                      Basic Information
                    </div>
                  </div>
                  
                  <div className="w-96 flex-1 flex flex-col justify-start items-start gap-8">
                    {/* Title */}
                    <div className="self-stretch h-14 flex flex-col justify-start items-start gap-2">
                      <div className="self-stretch h-3.5 inline-flex justify-start items-center gap-2">
                        <div className="justify-start text-cyan-950 text-sm font-medium font-['Roboto'] leading-4">Title *</div>
                      </div>
                      <Input
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        placeholder="Enter announcement title"
                        className="self-stretch h-9 px-3 py-1 bg-white rounded-[10px] outline outline-1 outline-offset-[-1px] outline-slate-300 text-sm font-normal font-['Roboto'] border-0 focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-gray-500"
                      />
                    </div>

                    {/* Content */}
                    <div className="self-stretch h-20 flex flex-col justify-start items-start gap-2">
                      <div className="self-stretch h-3.5 inline-flex justify-start items-center gap-2">
                        <div className="justify-start text-cyan-950 text-sm font-medium font-['Roboto'] leading-4">Content *</div>
                      </div>
                      <Textarea
                        value={formData.content}
                        onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                        placeholder="Enter announcement content"
                        className="self-stretch h-16 px-3 py-2 bg-white rounded-[10px] outline outline-1 outline-offset-[-1px] outline-slate-300 text-sm font-normal font-['Roboto'] border-0 focus-visible:ring-0 resize-none placeholder:text-gray-500"
                      />
                    </div>

                    {/* Category and Priority */}
                    <div className="self-stretch h-14 inline-flex flex-row justify-start items-start gap-4">
                      {/* Category */}
                      <div className="flex-1 inline-flex flex-col justify-start items-start gap-2">
                        <div className="self-stretch h-3.5 inline-flex justify-start items-center gap-2">
                          <div className="justify-start text-cyan-950 text-sm font-medium font-['Roboto'] leading-4">Category</div>
                        </div>
                        <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
                          <SelectTrigger className="self-stretch h-9 px-3 bg-white rounded-[10px] outline outline-1 outline-offset-[-1px] outline-slate-300 border-0 focus:ring-0 justify-between [&>svg]:hidden">
                            <div className="w-12 h-5 flex justify-start items-center gap-2 overflow-hidden">
                              <div className="justify-start text-neutral-950 text-sm font-normal font-['Roboto'] leading-5">{formData.category}</div>
                            </div>
                            <div className="w-4 h-4 relative opacity-50 overflow-hidden">
                              <div className="w-2 h-1 left-[4px] top-[6px] absolute outline outline-[1.33px] outline-offset-[-0.67px] outline-gray-500"></div>
                            </div>
                          </SelectTrigger>
                          <SelectContent className="!z-[110]">
                            <SelectItem value="Product Update">Product Update</SelectItem>
                            <SelectItem value="Maintenance">Maintenance</SelectItem>
                            <SelectItem value="Security Alert">Security Alert</SelectItem>
                            <SelectItem value="Pricing Change">Pricing Change</SelectItem>
                            <SelectItem value="Feature Release">Feature Release</SelectItem>
                            <SelectItem value="System Status">System Status</SelectItem>
                            <SelectItem value="General">General</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      {/* Priority */}
                      <div className="flex-1 inline-flex flex-col justify-start items-start gap-2">
                        <div className="self-stretch h-3.5 inline-flex justify-start items-center gap-2">
                          <div className="justify-start text-cyan-950 text-sm font-medium font-['Roboto'] leading-4">Priority</div>
                        </div>
                        <Select value={formData.priority} onValueChange={(value) => setFormData({ ...formData, priority: value })}>
                          <SelectTrigger className="self-stretch h-9 px-3 bg-white rounded-[10px] outline outline-1 outline-offset-[-1px] outline-slate-300 border-0 focus:ring-0 justify-between [&>svg]:hidden">
                            <div className="w-12 h-5 flex justify-start items-center gap-2 overflow-hidden">
                              <div className="justify-start text-neutral-950 text-sm font-normal font-['Roboto'] leading-5">{formData.priority}</div>
                            </div>
                            <div className="w-4 h-4 relative opacity-50 overflow-hidden">
                              <div className="w-2 h-1 left-[4px] top-[6px] absolute outline outline-[1.33px] outline-offset-[-0.67px] outline-gray-500"></div>
                            </div>
                          </SelectTrigger>
                          <SelectContent className="!z-[110]">
                            <SelectItem value="Low">Low</SelectItem>
                            <SelectItem value="Medium">Medium</SelectItem>
                            <SelectItem value="High">High</SelectItem>
                            <SelectItem value="Critical">Critical</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Target Audience Section */}
                <div className="self-stretch h-72 pl-6 py-6 bg-white rounded-2xl outline outline-1 outline-offset-[-1px] outline-black/10 inline-flex flex-col justify-start items-start gap-10">
                  <div className="w-96 h-6 relative">
                    {/* Target Icon */}
                    <div className="w-4 h-4 left-0 top-[4px] absolute overflow-hidden">
                      <div className="w-3.5 h-3.5 left-[1.33px] top-[1.33px] absolute outline outline-[1.33px] outline-offset-[-0.67px] outline-slate-500"></div>
                      <div className="w-2 h-2 left-[4px] top-[4px] absolute outline outline-[1.33px] outline-offset-[-0.67px] outline-slate-500"></div>
                      <div className="w-[2.67px] h-[2.67px] left-[6.67px] top-[6.67px] absolute outline outline-[1.33px] outline-offset-[-0.67px] outline-slate-500"></div>
                    </div>
                    <div className="left-[24px] top-[-0.50px] absolute justify-start text-cyan-950 text-base font-normal font-['Roboto'] leading-6">Target Audience *</div>
                  </div>

                  <div className="w-96 self-stretch inline-flex flex-col justify-start items-start gap-4">
                    {/* Row 1: All Users and Admins Only */}
                    <div className="self-stretch inline-flex justify-start items-start gap-4">
                      {/* All Users */}
                      <div 
                        onClick={() => handleTargetAudienceChange("All Users", !formData.targetAudience.includes("All Users"))}
                        className="flex-1 self-stretch px-3 bg-white rounded-[10px] outline outline-1 outline-offset-[-1px] outline-slate-300 inline-flex justify-start items-center gap-3 cursor-pointer hover:bg-gray-50 transition-colors"
                      >
                        <div className="w-4 h-4 relative">
                          <div className="w-4 h-4 left-0 top-0 absolute border border-slate-500"></div>
                        </div>
                        <div className="flex-1 h-4 flex justify-start items-center gap-2">
                          <div className="w-4 h-4 relative overflow-hidden">
                            <div className={`w-2.5 h-1 left-[1.33px] top-[10px] absolute ${formData.targetAudience.includes("All Users") ? "bg-cyan-950" : "outline outline-[1.33px] outline-offset-[-0.67px] outline-slate-500"}`}></div>
                            <div className={`w-0.5 h-[5.16px] left-[10.67px] top-[2.08px] absolute ${formData.targetAudience.includes("All Users") ? "bg-cyan-950" : "outline outline-[1.33px] outline-offset-[-0.67px] outline-slate-500"}`}></div>
                            <div className={`w-0.5 h-1 left-[12.67px] top-[10.09px] absolute ${formData.targetAudience.includes("All Users") ? "bg-cyan-950" : "outline outline-[1.33px] outline-offset-[-0.67px] outline-slate-500"}`}></div>
                            <div className={`w-1.5 h-1.5 left-[3.33px] top-[2px] absolute ${formData.targetAudience.includes("All Users") ? "bg-cyan-950" : "outline outline-[1.33px] outline-offset-[-0.67px] outline-slate-500"}`}></div>
                          </div>
                          <div className="w-14 h-3.5 relative">
                            <div className="left-0 top-[0.50px] absolute justify-start text-cyan-950 text-sm font-medium font-['Roboto'] leading-4">All Users</div>
                          </div>
                        </div>
                      </div>

                      {/* Admins Only */}
                      <div 
                        onClick={() => handleTargetAudienceChange("Admins Only", !formData.targetAudience.includes("Admins Only"))}
                        className="flex-1 self-stretch h-[2.5rem] w-[14px] px-3 bg-white rounded-[10px] outline outline-1 outline-offset-[-1px] outline-slate-300 inline-flex justify-start items-center gap-3 cursor-pointer hover:bg-gray-50 transition-colors"
                      >
                        <div className="w-4 h-4 relative">
                          <div className="w-4 h-4 left-0 top-0 absolute border border-slate-500"></div>
                        </div>
                        <div className="flex-1 h-4 flex justify-start items-center gap-2">
                          <div className="w-4 h-4 relative overflow-hidden">
                            <div className={`w-3.5 h-3.5 left-[1.33px] top-[1.33px] absolute ${formData.targetAudience.includes("Admins Only") ? "bg-cyan-950" : "outline outline-[1.33px] outline-offset-[-0.67px] outline-slate-500"}`}></div>
                            <div className={`w-2 h-2 left-[4px] top-[4px] absolute ${formData.targetAudience.includes("Admins Only") ? "bg-cyan-950" : "outline outline-[1.33px] outline-offset-[-0.67px] outline-slate-500"}`}></div>
                            <div className={`w-[2.67px] h-[2.67px] left-[6.67px] top-[6.67px] absolute ${formData.targetAudience.includes("Admins Only") ? "bg-cyan-950" : "outline outline-[1.33px] outline-offset-[-0.67px] outline-slate-500"}`}></div>
                          </div>
                          <div className="w-20 h-3.5 relative">
                            <div className="left-0 top-[0.50px] absolute justify-start text-cyan-950 text-sm font-medium font-['Roboto'] leading-4">Admins Only</div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Row 2: Enterprise Plan Users and Pro Plan Users */}
                    <div className="self-stretch inline-flex justify-start items-start gap-4">
                      {/* Enterprise Plan Users */}
                      <div 
                        onClick={() => handleTargetAudienceChange("Enterprise Plan Users", !formData.targetAudience.includes("Enterprise Plan Users"))}
                        className="flex-1 self-stretch h-[3.2rem] w-[14px] px-3 bg-white rounded-[10px] outline outline-1 outline-offset-[-1px] outline-slate-300 inline-flex justify-start items-center gap-3 cursor-pointer hover:bg-gray-50 transition-colors"
                      >
                        <div className="w-4 h-4 relative">
                          <div className="w-4 h-4 left-0 top-0 absolute border border-slate-500"></div>
                        </div>
                        <div className="flex-1 h-7 flex justify-start items-center gap-2">
                          <div className="w-3.5 h-3.5 relative overflow-hidden">
                            <div className={`w-2.5 h-3 left-[1.72px] top-[1.14px] absolute ${formData.targetAudience.includes("Enterprise Plan Users") ? "bg-cyan-950" : "outline outline-1 outline-offset-[-0.57px] outline-slate-500"}`}></div>
                          </div>
                          <div className="flex-1 h-7 relative">
                            <div className="w-24 left-0 top-[0.50px] absolute justify-start text-cyan-950 text-sm font-medium font-['Roboto'] leading-4">Enterprise Plan Users</div>
                          </div>
                        </div>
                      </div>

                      {/* Pro Plan Users */}
                      <div 
                        onClick={() => handleTargetAudienceChange("Pro Plan Users", !formData.targetAudience.includes("Pro Plan Users"))}
                        className="flex-1 self-stretch px-3 bg-white rounded-[10px] outline outline-1 outline-offset-[-1px] outline-slate-300 inline-flex justify-start items-center gap-3 cursor-pointer hover:bg-gray-50 transition-colors"
                      >
                        <div className="w-4 h-4 relative">
                          <div className="w-4 h-4 left-0 top-0 absolute border border-slate-500"></div>
                        </div>
                        <div className="flex-1 h-4 flex justify-start items-center gap-2">
                          <div className="w-4 h-4 relative overflow-hidden">
                            <div className={`w-1 h-1 left-[10.67px] top-[4.67px] absolute ${formData.targetAudience.includes("Pro Plan Users") ? "bg-cyan-950" : "outline outline-[1.33px] outline-offset-[-0.67px] outline-slate-500"}`}></div>
                            <div className={`w-3.5 h-1.5 left-[1.33px] top-[4.67px] absolute ${formData.targetAudience.includes("Pro Plan Users") ? "bg-cyan-950" : "outline outline-[1.33px] outline-offset-[-0.67px] outline-slate-500"}`}></div>
                          </div>
                          <div className="w-24 h-3.5 relative">
                            <div className="left-0 top-[0.50px] absolute justify-start text-cyan-950 text-sm font-medium font-['Roboto'] leading-4">Pro Plan Users</div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Row 3: Trial Users and Free Plan Users */}
                    <div className="self-stretch inline-flex justify-start items-start gap-4">
                      {/* Trial Users */}
                      <div 
                        onClick={() => handleTargetAudienceChange("Trial Users", !formData.targetAudience.includes("Trial Users"))}
                        className="flex-1 self-stretch h-[2.5rem] w-[14px] px-3 bg-white rounded-[10px] outline outline-1 outline-offset-[-1px] outline-slate-300 inline-flex justify-start items-center gap-3 cursor-pointer hover:bg-gray-50 transition-colors"
                      >
                        <div className="w-4 h-4 relative">
                          <div className="w-4 h-4 left-0 top-0 absolute border border-slate-500"></div>
                        </div>
                        <div className="flex-1 h-4 flex justify-start items-center gap-2">
                          <div className="w-4 h-4 relative overflow-hidden">
                            <div className={`w-[2.67px] h-1.5 left-[8px] top-[4px] absolute ${formData.targetAudience.includes("Trial Users") ? "bg-cyan-950" : "outline outline-[1.33px] outline-offset-[-0.67px] outline-slate-500"}`}></div>
                            <div className={`w-3.5 h-3.5 left-[1.33px] top-[1.33px] absolute ${formData.targetAudience.includes("Trial Users") ? "bg-cyan-950" : "outline outline-[1.33px] outline-offset-[-0.67px] outline-slate-500"}`}></div>
                          </div>
                          <div className="w-16 h-3.5 relative">
                            <div className="justify-start text-cyan-950 text-sm font-medium font-['Roboto'] leading-4 whitespace-nowrap">Trial Users</div>
                          </div>
                        </div>
                      </div>

                      {/* Free Plan Users */}
                      <div 
                        onClick={() => handleTargetAudienceChange("Free Plan Users", !formData.targetAudience.includes("Free Plan Users"))}
                        className="flex-1 self-stretch px-3 bg-white rounded-[10px] outline outline-1 outline-offset-[-1px] outline-slate-300 inline-flex justify-start items-center gap-3 cursor-pointer hover:bg-gray-50 transition-colors"
                      >
                        <div className="w-4 h-4 relative">
                          <div className="w-4 h-4 left-0 top-0 absolute border border-slate-500"></div>
                        </div>
                        <div className="flex-1 h-4 flex justify-start items-center gap-2">
                          <div className="w-4 h-4 relative overflow-hidden">
                            <div className={`w-2.5 h-1 left-[1.33px] top-[10px] absolute ${formData.targetAudience.includes("Free Plan Users") ? "bg-cyan-950" : "outline outline-[1.33px] outline-offset-[-0.67px] outline-slate-500"}`}></div>
                            <div className={`w-0.5 h-[5.16px] left-[10.67px] top-[2.08px] absolute ${formData.targetAudience.includes("Free Plan Users") ? "bg-cyan-950" : "outline outline-[1.33px] outline-offset-[-0.67px] outline-slate-500"}`}></div>
                            <div className={`w-0.5 h-1 left-[12.67px] top-[10.09px] absolute ${formData.targetAudience.includes("Free Plan Users") ? "bg-cyan-950" : "outline outline-[1.33px] outline-offset-[-0.67px] outline-slate-500"}`}></div>
                            <div className={`w-1.5 h-1.5 left-[3.33px] top-[2px] absolute ${formData.targetAudience.includes("Free Plan Users") ? "bg-cyan-950" : "outline outline-[1.33px] outline-offset-[-0.67px] outline-slate-500"}`}></div>
                          </div>
                          <div className="w-24 h-3.5 relative">
                            <div className="justify-start text-cyan-950 text-sm font-medium font-['Roboto'] leading-4 whitespace-nowrap">Free Plan Users</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Delivery Methods Section */}
                <div className="self-stretch min-h-80 pl-4 sm:pl-6 py-4 sm:py-6 bg-white rounded-xl sm:rounded-2xl outline outline-1 outline-offset-[-1px] outline-black/10 flex flex-col justify-start items-start gap-6 sm:gap-10">
                  <div className="w-full sm:w-96 h-6 relative">
                    {/* Megaphone Icon */}
                    <div className="w-4 h-4 left-0 top-[4px] absolute overflow-hidden">
                      <div className="w-3.5 h-3.5 left-[1.33px] top-[1.33px] absolute outline outline-[1.33px] outline-offset-[-0.67px] outline-slate-500"></div>
                      <div className="w-2 h-2 left-[7.28px] top-[1.43px] absolute outline outline-[1.33px] outline-offset-[-0.67px] outline-slate-500"></div>
                    </div>
                    <div className="left-[24px] top-[-0.50px] absolute justify-start text-cyan-950 text-base font-normal font-['Roboto'] leading-6">Delivery Methods *</div>
                  </div>

                    <div className="w-full sm:w-96 flex-1 inline-flex flex-col justify-start items-start gap-2">
                      {/* In-app Banner */}
                      <div 
                        onClick={() => handleDeliveryMethodChange("In-app Banner", !formData.deliveryMethods.includes("In-app Banner"))}
                        className="self-stretch h-[3rem] px-4 bg-white rounded-[10px] outline outline-1 outline-offset-[-1px] outline-slate-300 inline-flex justify-start items-center gap-3 cursor-pointer hover:bg-gray-50 transition-colors"
                      >
                      <Checkbox
                        checked={formData.deliveryMethods.includes("In-app Banner")}
                        onCheckedChange={(checked) => handleDeliveryMethodChange("In-app Banner", checked as boolean)}
                        className="w-4 h-4 border-slate-500 data-[state=checked]:bg-slate-500"
                      />
                      <div className="flex-1 h-5 flex justify-start items-center gap-2">
                        <div className="w-5 h-5 relative overflow-hidden">
                          <div className="w-[2.89px] h-[0.83px] left-[8.56px] top-[17.50px] absolute outline outline-[1.67px] outline-offset-[-0.83px] outline-slate-500"></div>
                          <div className="w-3.5 h-3 left-[2.50px] top-[1.67px] absolute outline outline-[1.67px] outline-offset-[-0.83px] outline-slate-500"></div>
                        </div>
                        <div className="w-24 h-3.5 relative">
                          <div className="left-0 top-[0.50px] absolute justify-start text-cyan-950 text-sm font-medium font-['Roboto'] leading-4">In-app Banner</div>
                        </div>
                      </div>
                    </div>

                      {/* Email */}
                      <div 
                        onClick={() => handleDeliveryMethodChange("Email", !formData.deliveryMethods.includes("Email"))}
                        className="self-stretch h-[3rem] px-4 bg-white rounded-[10px] outline outline-1 outline-offset-[-1px] outline-slate-300 inline-flex justify-start items-center gap-3 cursor-pointer hover:bg-gray-50 transition-colors"
                      >
                      <Checkbox
                        checked={formData.deliveryMethods.includes("Email")}
                        onCheckedChange={(checked) => handleDeliveryMethodChange("Email", checked as boolean)}
                        className="w-4 h-4 border-slate-500 data-[state=checked]:bg-slate-500"
                      />
                      <div className="flex-1 h-5 flex justify-start items-center gap-2">
                        <div className="w-5 h-5 relative overflow-hidden">
                          <div className="w-4 h-[5px] left-[1.67px] top-[5.83px] absolute outline outline-[1.67px] outline-offset-[-0.83px] outline-slate-500"></div>
                          <div className="w-4 h-3.5 left-[1.67px] top-[3.33px] absolute outline outline-[1.67px] outline-offset-[-0.83px] outline-slate-500"></div>
                        </div>
                        <div className="w-9 h-3.5 relative">
                          <div className="left-0 top-[0.50px] absolute justify-start text-cyan-950 text-sm font-medium font-['Roboto'] leading-4">Email</div>
                        </div>
                      </div>
                    </div>

                      {/* Push Notification */}
                      <div 
                        onClick={() => handleDeliveryMethodChange("Push Notification", !formData.deliveryMethods.includes("Push Notification"))}
                        className="self-stretch h-[3rem] px-4 bg-white rounded-[10px] outline outline-1 outline-offset-[-1px] outline-slate-300 inline-flex justify-start items-center gap-3 cursor-pointer hover:bg-gray-50 transition-colors"
                      >
                      <Checkbox
                        checked={formData.deliveryMethods.includes("Push Notification")}
                        onCheckedChange={(checked) => handleDeliveryMethodChange("Push Notification", checked as boolean)}
                        className="w-4 h-4 border-slate-500 data-[state=checked]:bg-slate-500"
                      />
                      <div className="flex-1 h-5 flex justify-start items-center gap-2">
                        <div className="w-5 h-5 relative overflow-hidden">
                          <div className="w-3.5 h-3 left-[2.50px] top-[2.50px] absolute outline outline-[1.67px] outline-offset-[-0.83px] outline-slate-500"></div>
                          <div className="w-[5px] h-1.5 left-[5px] top-[11.67px] absolute outline outline-[1.67px] outline-offset-[-0.83px] outline-slate-500"></div>
                          <div className="w-0 h-1.5 left-[6.67px] top-[5px] absolute outline outline-[1.67px] outline-offset-[-0.67px] outline-slate-500"></div>
                        </div>
                        <div className="w-28 h-3.5 relative">
                          <div className="left-0 top-[0.50px] absolute justify-start text-cyan-950 text-sm font-medium font-['Roboto'] leading-4">Push Notification</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Schedule Section */}
                <div className="self-stretch min-h-36 pl-4 sm:pl-6 py-4 sm:py-6 bg-white rounded-xl sm:rounded-2xl outline outline-1 outline-offset-[-1px] outline-black/10 flex flex-col justify-start items-start gap-6 sm:gap-10">
                  <div className="w-full sm:w-96 h-6 relative">
                    {/* Calendar Icon */}
                    <div className="w-4 h-4 left-0 top-[4px] absolute overflow-hidden">
                      <div className="w-[2.67px] h-1.5 left-[8px] top-[4px] absolute outline outline-[1.33px] outline-offset-[-0.67px] outline-slate-500"></div>
                      <div className="w-3.5 h-3.5 left-[1.33px] top-[1.33px] absolute outline outline-[1.33px] outline-offset-[-0.67px] outline-slate-500"></div>
                    </div>
                    <div className="left-[24px] top-[-0.50px] absolute justify-start text-cyan-950 text-base font-normal font-['Roboto'] leading-6">Schedule (Optional)</div>
                  </div>

                  <div className="w-full sm:w-96 flex-1 pl-3 bg-white rounded-lg outline outline-1 outline-offset-[-1px] outline-slate-300 inline-flex justify-start items-center gap-4 cursor-pointer">
                    {/* Calendar Icon */}
                    <div className="w-4 h-4 relative overflow-hidden flex-shrink-0">
                      <div className="w-0 h-[2.67px] left-[5.33px] top-[1.33px] absolute outline outline-[1.33px] outline-offset-[-0.67px] outline-slate-500"></div>
                      <div className="w-0 h-[2.67px] left-[10.67px] top-[1.33px] absolute outline outline-[1.33px] outline-offset-[-0.67px] outline-slate-500"></div>
                      <div className="w-3 h-3 left-[2px] top-[2.67px] absolute outline outline-[1.33px] outline-offset-[-0.67px] outline-slate-500"></div>
                      <div className="w-3 h-0 left-[2px] top-[6.67px] absolute outline outline-[1.33px] outline-offset-[-0.67px] outline-slate-500"></div>
                    </div>
                    <input
                      type="datetime-local"
                      value={formData.scheduleDate}
                      onChange={(e) => setFormData({ ...formData, scheduleDate: e.target.value })}
                      placeholder="Select date and time to schedule"
                      className="w-full sm:w-56 h-5 relative bg-transparent border-0 outline-none text-cyan-950 text-sm font-medium font-['Roboto'] leading-5 placeholder:text-gray-500"
                    />
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Footer Actions */}
          <div className="h-14 border-t border-slate-300 flex justify-end items-center gap-4 p-4 sm:p-6 mt-auto">
            <div className="h-9 flex justify-end items-center gap-4">
                <button
                  onClick={() => handleFormAction("Cancel")}
                  className="h-9 px-4 py-2 bg-white rounded-lg outline outline-1 outline-offset-[-1px] outline-black/10 flex justify-center items-center hover:bg-gray-50 transition-colors"
                >
                  <div className="text-neutral-950 text-sm font-medium font-['Roboto'] leading-5">Cancel</div>
                </button>
                <button
                  onClick={() => handleFormAction("Save Draft")}
                  className="h-9 px-4 py-2 bg-white rounded-lg outline outline-1 outline-offset-[-1px] outline-black/10 flex justify-center items-center hover:bg-gray-50 transition-colors"
                >
                  <div className="text-neutral-950 text-sm font-medium font-['Roboto'] leading-5">Save Draft</div>
                </button>
                <button
                  onClick={() => handleFormAction("Schedule")}
                  className="h-9 px-4 py-2 bg-white rounded-lg outline outline-1 outline-offset-[-1px] outline-black/10 flex justify-center items-center gap-2 hover:bg-gray-50 transition-colors"
                >
                  <Calendar className="w-4 h-4 text-neutral-950" />
                  <div className="text-neutral-950 text-sm font-medium font-['Roboto'] leading-5">Schedule</div>
                </button>
                <button
                  onClick={() => handleFormAction("Publish Now")}
                  className="h-9 px-4 py-2 bg-[#67909B] rounded-lg flex justify-center items-center gap-2 hover:bg-teal-700 transition-colors"
                >
                  <Send className="w-4 h-4  text-white" />
                  <div className="text-white text-sm font-medium font-['Roboto'] leading-5">Publish Now</div>
                </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
