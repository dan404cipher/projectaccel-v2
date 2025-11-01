import { useState } from "react"
import { Card, CardTitle, CardDescription } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Settings as SettingsIcon, Palette, Webhook, Mail, Code, Eye, EyeOff, Globe, Check, X, Key } from "lucide-react"

interface FeatureToggle {
  id: string
  name: string
  description: string
  enabled: boolean
  isWarning?: boolean
}

export default function Settings() {
  const [activeTab, setActiveTab] = useState("general")
  const [isCreateTemplateOpen, setIsCreateTemplateOpen] = useState(false)
  const [templateForm, setTemplateForm] = useState({
    name: "",
    subject: "",
    content: "",
  })

  const [featureToggles, setFeatureToggles] = useState<FeatureToggle[]>([
    {
      id: "beta-features",
      name: "Beta Features",
      description: "Enable experimental features for all users",
      enabled: true,
    },
    {
      id: "user-registration",
      name: "User Registration",
      description: "Allow new users to register accounts",
      enabled: false,
    },
    {
      id: "email-notifications",
      name: "Email Notifications",
      description: "Send system email notifications",
      enabled: false,
    },
    {
      id: "maintenance-mode",
      name: "Maintenance Mode",
      description: "Put the platform in maintenance mode",
      enabled: false,
      isWarning: true,
    },
  ])

  const [themeSettings, setThemeSettings] = useState({
    platformName: "Logic Flow",
    logoUrl: "https://example.com/logo.png",
    primaryColor: "#549EDD0",
  })

  const [webhooks, setWebhooks] = useState([
    {
      id: "1",
      eventType: "User Created",
      webhookUrl: "https://api.example.com/webhooks/user-created",
    },
    {
      id: "2",
      eventType: "Company Updated",
      webhookUrl: "https://api.example.com/webhooks/company-updated",
    },
  ])

  const [emailTemplates, setEmailTemplates] = useState([
    {
      id: "welcome",
      title: "Welcome Email",
      description: "Welcome to {COMPANY_NAME}!",
      subject: "Welcome to {COMPANY_NAME}!",
      content: "Hi {USER_NAME},\n\nWelcome to {COMPANY_NAME}! We're excited to have you on board.\n\nYour account has been successfully created and you can now start exploring all the features we have to offer.\n\nIf you have any questions, feel free to reach out to our support team.\n\nBest regards,\nThe {COMPANY_NAME} Team",
    },
    {
      id: "password-reset",
      title: "Password Reset",
      description: "Reset Your Password",
      subject: "Reset Your Password",
      content: "Hi {USER_NAME},\n\nWe received a request to reset your password. Please click the link below to reset it.\n\nIf you didn't request this, please ignore this email.\n\nBest regards,\nThe {COMPANY_NAME} Team",
    },
    {
      id: "billing-reminder",
      title: "Billing Reminder",
      description: "Payment Due - {COMPANY_NAME}",
      subject: "Payment Due - {COMPANY_NAME}",
      content: "Hi {USER_NAME},\n\nThis is a reminder that your payment is due.\n\nPlease complete your payment to continue enjoying our services.\n\nBest regards,\nThe {COMPANY_NAME} Team",
    },
  ])

  const [editingTemplateId, setEditingTemplateId] = useState<string | null>(null)
  const [editTemplateForm, setEditTemplateForm] = useState({
    name: "",
    subject: "",
    content: "",
  })

  const [showAllApiKeys, setShowAllApiKeys] = useState(false)

  const [integrationWebhooks, setIntegrationWebhooks] = useState([
    {
      id: "slack",
      label: "Slack Webhook URL",
      value: "https://hooks.slack.com/services/********************",
      visible: false,
    },
    {
      id: "stripe",
      label: "Stripe Secret Key",
      value: "sk_test_********************",
      visible: false,
    },
    {
      id: "razorpay",
      label: "Razorpay Key",
      value: "rzp_test_********************",
      visible: false,
    },
    {
      id: "google",
      label: "Google Client ID",
      value: "********************",
      visible: false,
    },
  ])

  const [publicApiKey, setPublicApiKey] = useState("KK_API_SANDBOX_*********************")
  const [publicApiKeyVisible, setPublicApiKeyVisible] = useState(false)

  const [webhookEndpoints, setWebhookEndpoints] = useState([
    {
      id: "payment",
      name: "Payment Events",
      enabled: false,
      url: "https://your-app.com/webhooks/payments",
    },
    {
      id: "user",
      name: "User Events",
      enabled: true,
      url: "https://your-app.com/webhooks/userevents",
    },
    {
      id: "system",
      name: "System Events",
      enabled: false,
      url: "https://your-app.com/webhooks/system",
    },
  ])

  const handleToggleChange = (id: string) => {
    setFeatureToggles((prev) =>
      prev.map((toggle) =>
        toggle.id === id ? { ...toggle, enabled: !toggle.enabled } : toggle
      )
    )
  }

  const handleThemeChange = (field: string, value: string) => {
    setThemeSettings((prev) => ({ ...prev, [field]: value }))
  }

  const handleWebhookChange = (id: string, field: string, value: string) => {
    setWebhooks((prev) =>
      prev.map((webhook) =>
        webhook.id === id ? { ...webhook, [field]: value } : webhook
      )
    )
  }

  const handleIntegrationWebhookToggle = (id: string) => {
    setIntegrationWebhooks((prev) =>
      prev.map((webhook) =>
        webhook.id === id ? { ...webhook, visible: !webhook.visible } : webhook
      )
    )
  }

  const handleShowAllApiKeys = () => {
    const newState = !showAllApiKeys
    setShowAllApiKeys(newState)
    setIntegrationWebhooks((prev) =>
      prev.map((webhook) => ({ ...webhook, visible: newState }))
    )
  }

  const handleIntegrationWebhookChange = (id: string, value: string) => {
    setIntegrationWebhooks((prev) =>
      prev.map((webhook) =>
        webhook.id === id ? { ...webhook, value } : webhook
      )
    )
  }

  const handleGenerateNewKey = () => {
    const newKey = `KK_API_SANDBOX_${Math.random().toString(36).substring(2, 15)}${Math.random().toString(36).substring(2, 15)}`
    setPublicApiKey(newKey)
  }

  const handleToggleWebhook = (id: string) => {
    setWebhookEndpoints((prev) =>
      prev.map((webhook) =>
        webhook.id === id ? { ...webhook, enabled: !webhook.enabled } : webhook
      )
    )
  }

  const handleWebhookUrlChange = (id: string, value: string) => {
    setWebhookEndpoints((prev) =>
      prev.map((webhook) =>
        webhook.id === id ? { ...webhook, url: value } : webhook
      )
    )
  }

  const handleEditTemplate = (templateId: string) => {
    const template = emailTemplates.find((t) => t.id === templateId)
    if (template) {
      setEditingTemplateId(templateId)
      setEditTemplateForm({
        name: template.title,
        subject: template.subject || "",
        content: template.content || "",
      })
    }
  }

  const handleCloseEditTemplate = () => {
    setEditingTemplateId(null)
    setEditTemplateForm({ name: "", subject: "", content: "" })
  }

  const handleSaveEditTemplate = () => {
    if (editingTemplateId) {
      setEmailTemplates((prev) =>
        prev.map((template) =>
          template.id === editingTemplateId
            ? {
                ...template,
                title: editTemplateForm.name,
                subject: editTemplateForm.subject,
                content: editTemplateForm.content,
                description: editTemplateForm.subject.substring(0, 50),
              }
            : template
        )
      )
      handleCloseEditTemplate()
    }
  }

  const handleDeleteTemplate = () => {
    if (editingTemplateId && confirm("Are you sure you want to delete this template?")) {
      setEmailTemplates((prev) => prev.filter((t) => t.id !== editingTemplateId))
      handleCloseEditTemplate()
    }
  }

  const handleEditTemplateFormChange = (field: string, value: string) => {
    setEditTemplateForm((prev) => ({ ...prev, [field]: value }))
  }

  const handleCreateTemplate = () => {
    setIsCreateTemplateOpen(true)
  }

  const handleCloseCreateTemplate = () => {
    setIsCreateTemplateOpen(false)
    setTemplateForm({ name: "", subject: "", content: "" })
  }

  const handleSubmitTemplate = () => {
    console.log("Creating template:", templateForm)
    // TODO: Implement template creation
    handleCloseCreateTemplate()
  }

  const handleTemplateFormChange = (field: string, value: string) => {
    setTemplateForm((prev) => ({ ...prev, [field]: value }))
  }

  const handleSaveSettings = () => {
    console.log("Saving settings", {
      featureToggles,
      themeSettings,
      webhooks,
      publicApiKey,
      webhookEndpoints,
      emailTemplates,
    })
    // TODO: Implement save functionality
  }

  return (
    <div className="w-full h-full px-3 sm:px-4 lg:px-6 xl:px-8 pb-3 sm:pb-4 lg:pb-6 xl:pb-8 pt-1 sm:pt-2 lg:pt-3 xl:pt-4 overflow-auto">
      <div className="space-y-4 sm:space-y-6 lg:space-y-8">
      {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 sm:gap-6">
          <div className="flex-1 space-y-1 sm:space-y-2">
            <h1 className="text-lg sm:text-xl lg:text-2xl font-medium text-cyan-950 font-['Roboto'] leading-tight tracking-tight">
              Settings
            </h1>
            <p className="text-xs sm:text-sm lg:text-base text-gray-600 font-normal font-['Roboto'] leading-5 sm:leading-6">
              Configure global, platform-wide settings
            </p>
          </div>
        </div>

      {/* Tabs */}
        <div className="w-full">
          <div className="w-full h-10 sm:h-12 px-2 sm:px-4 py-2 bg-[#67909b] rounded-2xl sm:rounded-3xl flex flex-row justify-start items-center gap-1 sm:gap-2">
            {activeTab === "general" ? (
              <div className="flex-1 px-2 sm:px-3 lg:px-4 py-1 bg-white rounded-2xl inline-flex justify-center items-center gap-1.5">
                <div className="justify-start text-neutral-800 text-xs sm:text-sm lg:text-base font-semibold font-['Roboto'] leading-5 whitespace-nowrap">General</div>
              </div>
              
            ) : (
              <button
                onClick={() => setActiveTab("general")}
                className="flex-1 h-7 sm:h-8 px-2 sm:px-3 lg:px-4 py-1 rounded-2xl inline-flex justify-center items-center gap-1.5"
              >
                <div className="justify-start text-white text-base font-medium font-['Roboto'] leading-5">General</div>
              </button>
            )}
            {activeTab === "integrations" ? (
              <div className="flex-1 px-2 sm:px-3 lg:px-4 py-1 bg-white rounded-2xl  inline-flex justify-center items-center gap-1.5">
                <div className="justify-start text-neutral-800 text-xs sm:text-sm lg:text-base font-semibold font-['Roboto'] leading-5 whitespace-nowrap">Integrations</div>
              </div>
            ) : (
              <button
                onClick={() => setActiveTab("integrations")}
                className="flex-1 h-7 sm:h-8 px-2 sm:px-3 lg:px-4 py-1 rounded-2xl inline-flex justify-center items-center gap-1.5"
              >
                <div className="justify-start text-white text-xs sm:text-sm lg:text-base font-medium font-['Roboto'] leading-5 whitespace-nowrap">Integrations</div>
              </button>
            )}
            {activeTab === "email-templates" ? (
              <div className="flex-1 px-2 sm:px-3 lg:px-4 py-1 bg-white rounded-2xl  inline-flex justify-center items-center gap-1.5">
                <div className="justify-start text-neutral-800 text-xs sm:text-sm lg:text-base font-semibold font-['Roboto'] leading-5 whitespace-nowrap">Email Templates</div>
              </div>
            ) : (
              <button
                onClick={() => setActiveTab("email-templates")}
                className="flex-1 h-7 sm:h-8 px-2 sm:px-3 lg:px-4 py-1 rounded-2xl inline-flex justify-center items-center gap-1.5"
              >
                <div className="justify-start text-white text-xs sm:text-sm lg:text-base font-medium font-['Roboto'] leading-5 whitespace-nowrap">Email Templates</div>
              </button>
            )}
            {activeTab === "api-webhooks" ? (
              <div className="flex-1 px-2 sm:px-3 lg:px-4 py-1 bg-white rounded-2xl  inline-flex justify-center items-center gap-1.5">
                <div className="justify-start text-neutral-800 text-xs sm:text-sm lg:text-base font-semibold font-['Roboto'] leading-5 whitespace-nowrap">API & Webhooks</div>
              </div>
            ) : (
              <button
                onClick={() => setActiveTab("api-webhooks")}
                className="flex-1 h-8 px-2 sm:px-3 lg:px-4 py-1 rounded-2xl inline-flex justify-center items-center gap-1.5"
              >
                <div className="justify-start text-white text-xs sm:text-sm lg:text-base font-medium font-['Roboto'] leading-5 whitespace-nowrap">API & Webhooks</div>
              </button>
            )}
          </div>
        </div>

        {/* General Tab Content */}
        {activeTab === "general" && (
          <div className="space-y-4 sm:space-y-6 lg:space-y-8 mt-4 sm:mt-6 lg:mt-8">
          {/* Feature Toggles Card */}
            <Card className="border border-black/10 rounded-[20px] sm:rounded-[30px] lg:rounded-[40px] shadow-none">
              <div className="p-4 sm:p-6 lg:p-8">
              <div className="flex items-center gap-2 mb-2">
                  <SettingsIcon className="h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6 text-cyan-950" />
                  <CardTitle className="text-sm sm:text-base font-medium text-neutral-950 font-['Roboto']">
                  Feature Toggles
                </CardTitle>
              </div>
                <CardDescription className="text-xs sm:text-sm lg:text-base text-[#717182] font-['Roboto']">
                Enable or disable platform features globally
              </CardDescription>
            </div>
              <div className="px-4 sm:px-6 lg:px-8 pb-4 sm:pb-6 lg:pb-8 pt-0">
                <div className="space-y-4 sm:space-y-6">
                {featureToggles.map((toggle, index) => (
                  <div key={toggle.id}>
                    {index > 0 && (
                        <div className="h-px bg-black/10 mb-8 sm:mb-10 lg:mb-12" />
                      )}
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
                        <div className="flex flex-col gap-1 flex-1 min-w-0">
                          <div className="text-sm sm:text-base font-medium leading-tight font-['Roboto']">
                          <span
                            className={
                              toggle.isWarning
                                ? "text-[#e7000b]"
                                : toggle.name === "Beta Features"
                                ? "text-[#666666]"
                                : "text-neutral-950"
                            }
                          >
                            {toggle.name}
                          </span>
                        </div>
                          <p className="text-xs sm:text-sm text-[#4a5565] leading-4 sm:leading-5 font-['Roboto']">
                          {toggle.description}
                        </p>
                      </div>
                        <div className="flex-shrink-0">
                      <Switch
                        checked={toggle.enabled}
                        onCheckedChange={() => handleToggleChange(toggle.id)}
                            className="h-5 w-10 sm:h-6 sm:w-12 data-[state=checked]:bg-[rgba(103,144,155,0.2)] data-[state=unchecked]:bg-[rgba(103,144,155,0.4)] [&>span]:h-4 [&>span]:w-4 sm:[&>span]:h-3 sm:[&>span]:w-3 [&>span]:bg-[#67909b]"
                      />
                        </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>

        
          <Card className="border border-black/10 rounded-[20px] sm:rounded-[30px] lg:rounded-[40px] shadow-none">
  <div className="p-4 sm:p-6 lg:p-8">
    <div className="flex items-center gap-2 mb-2">
      <Palette className="h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6 text-cyan-950" />
      <CardTitle className="text-sm sm:text-base font-medium text-neutral-950 font-['Roboto']">
        Theme & Branding
      </CardTitle>
    </div>
    <CardDescription className="text-xs sm:text-sm lg:text-base text-[#717182] font-['Roboto']">
      Customize the platform appearance and branding
    </CardDescription>
  </div>

  {/* Form Section */}
  <div className="px-4 sm:px-6 lg:px-8 pb-4 sm:pb-6 lg:pb-8 pt-0">
    <div className="flex flex-col lg:flex-row gap-8">
      {/* LEFT SIDE — Platform Name + Logo */}
      <div className="flex-1 space-y-6">
        {/* Platform Name */}
        <div className="flex flex-col gap-3">
          <label className="text-sm sm:text-base lg:text-lg font-medium text-neutral-950 font-['Roboto']">
            Platform Name
          </label>
          <Input
            value={themeSettings.platformName}
            onChange={(e) => handleThemeChange("platformName", e.target.value)}
            className="bg-gray-50 h-12 sm:h-14 lg:h-16 px-4 sm:px-6 lg:px-8 rounded-[20px] sm:rounded-[30px] lg:rounded-[40px] border-0 text-sm lg:text-base text-[#252525] font-['Roboto'] focus:outline-none focus:ring-0 focus-visible:ring-0"
            placeholder="Enter platform name"
          />
        </div>

        {/* Logo URL */}
        <div className="flex flex-col gap-2 sm:gap-3 w-full lg:w-[200%]">
                  <label className="text-sm sm:text-base lg:text-lg font-medium text-neutral-950 font-['Roboto']">
                  Logo URL
                </label>
                <Input
                  value={themeSettings.logoUrl}
                  onChange={(e) =>
                    handleThemeChange("logoUrl", e.target.value)
                  }
                    className="bg-gray-50 h-12 sm:h-14 lg:h-16 px-4 sm:px-6 lg:px-8 rounded-[20px] sm:rounded-[30px] lg:rounded-[40px] border-0 text-xs sm:text-sm lg:text-base text-[#252525] w-full font-['Roboto'] focus:outline-none focus:ring-0 focus-visible:ring-0"
                  placeholder="https://example.com/logo.png"
                />
              </div>
      </div>

      {/* RIGHT SIDE — Primary Color */}
      <div className="flex-1 flex flex-col justify-start">
        <label className="text-sm sm:text-base lg:text-lg font-medium text-neutral-950 font-['Roboto']">
          Primary Color Code
        </label>
        <div className="flex items-center gap-4 mt-3">
          <div
            className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 rounded-full border border-gray-300 shadow-inner"
            style={{
              backgroundColor: themeSettings.primaryColor.startsWith("#")
                ? themeSettings.primaryColor
                : `#${themeSettings.primaryColor}`,
            }}
          />
          <Input
            value={themeSettings.primaryColor}
            onChange={(e) => handleThemeChange("primaryColor", e.target.value)}
            className="bg-gray-50 h-12 sm:h-14 lg:h-16 px-4 sm:px-6 lg:px-8 rounded-[20px] sm:rounded-[30px] lg:rounded-[40px] border-0 text-sm lg:text-base text-[#252525] font-['Roboto'] flex-1 focus:outline-none focus:ring-0 focus-visible:ring-0"
            placeholder="#549EDD"
          />
        </div>
      </div>
    </div>
  </div>
</Card>


          {/* Save Button */}
            <div className="flex justify-end pt-2 sm:pt-4">
            <Button
              onClick={handleSaveSettings}
                className="bg-[#67909b] hover:bg-[#67909b]/90 text-white h-9 sm:h-10 px-4 sm:px-6 rounded-lg text-xs sm:text-sm font-medium font-['Roboto'] w-full sm:w-auto"
            >
              Save Settings
            </Button>
          </div>
          </div>
        )}

        {/* Integrations Tab */}
        {activeTab === "integrations" && (
          <div className="mt-4 sm:mt-6 lg:mt-8">
            <Card className="border border-black/10 rounded-[20px] sm:rounded-[30px] lg:rounded-[40px] shadow-none">
              <div className="p-4 sm:p-6 lg:p-8">
                <div className="flex items-center gap-2 mb-2">
                  <Globe className="h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6 text-cyan-950" />
                  <CardTitle className="text-sm sm:text-base font-medium text-neutral-950 font-['Roboto']">
                    External Integrations
                  </CardTitle>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-4">
                  <CardDescription className="text-xs sm:text-sm lg:text-base text-[#717182] font-['Roboto']">
                    Configure API keys for external services
                  </CardDescription>
                  <button
                    onClick={handleShowAllApiKeys}
                    className="text-xs sm:text-sm lg:text-base text-[#67909b] hover:text-[#67909b]/80 font-medium font-['Roboto'] cursor-pointer transition-colors text-left sm:text-right"
                  >
                    {showAllApiKeys ? "Hide API Keys" : "Show API Keys"}
                  </button>
                </div>
              </div>
              <div className="px-4 sm:px-6 lg:px-8 pb-4 sm:pb-6 lg:pb-8 pt-0 space-y-4 sm:space-y-6 lg:space-y-8">
                {/* Integration Fields */}
                <div className="space-y-4 sm:space-y-6">
                  {integrationWebhooks.map((webhook, index) => (
                    <div key={webhook.id} className="space-y-2 sm:space-y-3">
                      {index > 0 && (
                        <div className="h-px bg-black/10 -mt-2 sm:-mt-3" />
                      )}
                      <div className="space-y-2 sm:space-y-3">
                        <label className="text-xs sm:text-sm lg:text-base font-medium text-neutral-950 font-['Roboto'] block">
                          {webhook.label}
                        </label>
                        <div className="relative w-full">
                          <Input
                            type={webhook.visible ? "text" : "password"}
                            value={webhook.value}
                            onChange={(e) =>
                              handleIntegrationWebhookChange(webhook.id, e.target.value)
                            }
                            className="bg-gray-50 h-12 sm:h-14 lg:h-16 px-4 sm:px-6 lg:px-8 pr-10 sm:pr-12 lg:pr-14 rounded-[20px] sm:rounded-[30px] lg:rounded-[40px] border-0 text-xs sm:text-sm lg:text-base text-[#252525] font-['Roboto'] font-mono focus:outline-none focus:ring-0 focus-visible:ring-0"
                            placeholder="Enter webhook URL or API key"
                          />
                          <button
                            type="button"
                            onClick={() => handleIntegrationWebhookToggle(webhook.id)}
                            className="absolute right-3 sm:right-4 lg:right-6 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
                            aria-label={webhook.visible ? "Hide" : "Show"}
                          >
                            {webhook.visible ? (
                              <EyeOff className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6" />
                            ) : (
                              <Eye className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6" />
                            )}
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
            </div>
          </Card>

            {/* Save Button */}
            <div className="flex justify-center pt-4 sm:pt-6">
              <Button
                onClick={handleSaveSettings}
                className="bg-[#67909b] hover:bg-[#67909b]/90 text-white h-9 sm:h-10 px-4 sm:px-6 rounded-lg text-xs sm:text-sm font-medium font-['Roboto'] w-full sm:w-auto"
              >
                Save Settings
              </Button>
            </div>
          </div>
        )}

        {/* Email Templates Tab */}
        {activeTab === "email-templates" && (
          <div className="mt-4 sm:mt-6 lg:mt-8 space-y-4 sm:space-y-6">
            {/* Edit Template Form */}
            {editingTemplateId && (
              <Card className="border border-black/10 rounded-[20px] sm:rounded-[30px] lg:rounded-[40px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.08)] bg-white">
                <div className="p-4 sm:p-6 lg:p-8 pb-4 sm:pb-6 lg:pb-8">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 sm:w-6 sm:h-6 relative overflow-hidden flex items-center justify-center">
                        <div className="w-4 h-3 sm:w-5 sm:h-4 relative">
                          <div className="w-3.5 h-1 sm:w-4 sm:h-1.5 left-[2px] top-[5px] sm:top-[7px] absolute outline outline-2 outline-offset-[-1px] outline-slate-500" />
                          <div className="w-3.5 h-3 sm:w-4 sm:h-4 left-[2px] top-[2px] sm:top-[4px] absolute outline outline-2 outline-offset-[-1px] outline-slate-500" />
                        </div>
                      </div>
                      <CardTitle className="text-sm sm:text-base font-medium text-neutral-950 font-['Roboto'] leading-4">
                        Edit Email Templates
                      </CardTitle>
                    </div>
                    <button
                      onClick={handleDeleteTemplate}
                      className="p-2 sm:p-2.5 rounded-lg shadow-[0px_4px_4px_0px_rgba(0,0,0,0.04)] outline outline-1 outline-offset-[-1px] outline-black/30 inline-flex justify-center items-center gap-2.5 hover:bg-gray-50 transition-colors"
                    >
                      <span className="text-center justify-start text-neutral-800 text-xs sm:text-sm font-medium font-['Roboto']">
                        Delete Template
                      </span>
                    </button>
                  </div>
                </div>
                <div className="px-4 sm:px-6 pb-4 sm:pb-6 pt-0">
                  <div className="w-full max-w-full sm:max-w-[1311px] space-y-3 sm:space-y-4">
                    {/* Template Name */}
                    <div className="flex flex-col justify-start items-start gap-2">
                      <div className="h-3.5 sm:h-4 inline-flex justify-start items-center gap-2">
                        <label className="justify-start text-neutral-950 text-xs sm:text-sm font-medium font-['Roboto'] leading-4">
                          Template Name
                        </label>
                      </div>
                      <Input
                        value={editTemplateForm.name}
                        onChange={(e) => handleEditTemplateFormChange("name", e.target.value)}
                        className="w-full h-8 sm:h-9 px-3 py-1 bg-zinc-100 rounded-lg outline outline-[0.52px] outline-offset-[-0.52px] outline-black/0 border-0 text-xs sm:text-sm font-normal font-['Roboto'] leading-5 text-neutral-950 focus:outline-none focus:ring-0 focus-visible:ring-0"
                      />
                    </div>

                    {/* Subject Line */}
                    <div className="flex flex-col justify-start items-start gap-2">
                      <div className="h-3.5 sm:h-4 inline-flex justify-start items-center gap-2">
                        <label className="justify-start text-neutral-950 text-xs sm:text-sm font-medium font-['Roboto'] leading-4">
                          Subject Line
                        </label>
                      </div>
                      <Input
                        value={editTemplateForm.subject}
                        onChange={(e) => handleEditTemplateFormChange("subject", e.target.value)}
                        className="w-full h-8 sm:h-9 px-3 py-1 bg-zinc-100 rounded-lg outline outline-[0.52px] outline-offset-[-0.52px] outline-black/0 border-0 text-xs sm:text-sm font-normal font-['Roboto'] text-gray-500 focus:outline-none focus:ring-0 focus-visible:ring-0"
                      />
                    </div>

                    {/* Email Content */}
                    <div className="flex flex-col justify-start items-start gap-2">
                      <div className="h-3.5 sm:h-4 inline-flex justify-start items-center gap-2">
                        <label className="justify-start text-neutral-950 text-xs sm:text-sm font-medium font-['Roboto'] leading-4">
                          Email Content
                        </label>
                      </div>
                      <Textarea
                        value={editTemplateForm.content}
                        onChange={(e) => handleEditTemplateFormChange("content", e.target.value)}
                        className="w-full min-h-[200px] sm:min-h-[220px] lg:h-56 px-3 py-2 bg-zinc-100 rounded-lg outline outline-[0.52px] outline-offset-[-0.52px] outline-black/0 border-0 text-xs sm:text-sm font-normal font-['Roboto'] leading-5 text-gray-500 resize-none whitespace-pre-wrap focus:outline-none focus:ring-0 focus-visible:ring-0"
                      />
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row sm:justify-end gap-3 sm:gap-4 mt-6 sm:mt-8">
                    <Button
                      onClick={handleSaveEditTemplate}
                      className="w-full sm:w-36 h-8 sm:h-9 lg:h-10 px-4 py-2 bg-[#67909b] hover:bg-[#67909b]/90 rounded-lg flex justify-center items-center gap-2.5 text-xs sm:text-sm font-medium font-['Roboto'] text-white"
                    >
                      Save Template
                    </Button>
                    <Button
                      onClick={handleCloseEditTemplate}
                      variant="outline"
                      className="w-full sm:w-36 h-8 sm:h-9 lg:h-10 px-4 py-2 bg-white rounded-lg outline outline-1 outline-offset-[-1px] outline-black/50 flex justify-center items-center gap-2.5 text-xs sm:text-sm font-medium font-['Roboto'] hover:bg-white hover:text-neutral-800"
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              </Card>
            )}

            {/* Create Template Form */}
            {isCreateTemplateOpen && !editingTemplateId && (
              <Card className="border border-black/10 rounded-[20px] sm:rounded-[30px] lg:rounded-[40px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.08)] bg-white">
                <div className="p-4 sm:p-6 lg:p-8 pb-4 sm:pb-6 lg:pb-8 relative">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center">
                        <Check className="w-4 h-4 sm:w-5 sm:h-5 text-[#67909b]" />
                      </div>
                      <CardTitle className="text-sm sm:text-base font-medium text-neutral-950 font-['Roboto'] leading-4">
                        Create Email Templates
                      </CardTitle>
                    </div>
                    <button
                      onClick={handleCloseCreateTemplate}
                      className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                      aria-label="Close"
                    >
                      <X className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500" />
                    </button>
                  </div>
                </div>
                <div className="px-4 sm:px-6 pb-4 sm:pb-6 lg:pb-8 pt-0">
                  <div className="w-full max-w-full sm:max-w-[1311px] space-y-3 sm:space-y-4">
                    {/* Template Name */}
                    <div className="flex flex-col justify-start items-start gap-2">
                      <div className="h-3.5 sm:h-4 inline-flex justify-start items-center gap-2">
                        <label className="justify-start text-neutral-950 text-xs sm:text-sm font-medium font-['Roboto'] leading-4">
                          Template Name
                        </label>
                      </div>
                      <Input
                        value={templateForm.name}
                        onChange={(e) => handleTemplateFormChange("name", e.target.value)}
                        placeholder="Title"
                        className="w-full h-8 sm:h-9 px-3 py-1 bg-zinc-100 rounded-lg outline outline-[0.52px] outline-offset-[-0.52px] outline-black/0 border-0 text-xs sm:text-sm font-normal font-['Roboto'] leading-5 text-neutral-950 placeholder:text-neutral-400 focus:outline-none focus:ring-0 focus-visible:ring-0"
                      />
                    </div>

                    {/* Subject Line */}
                    <div className="flex flex-col justify-start items-start gap-2">
                      <div className="h-3.5 sm:h-4 inline-flex justify-start items-center gap-2">
                        <label className="justify-start text-neutral-950 text-xs sm:text-sm font-medium font-['Roboto'] leading-4">
                          Subject Line
                        </label>
                      </div>
                      <Input
                        value={templateForm.subject}
                        onChange={(e) => handleTemplateFormChange("subject", e.target.value)}
                        placeholder="Subject"
                        className="w-full h-8 sm:h-9 px-3 py-1 bg-zinc-100 rounded-lg outline outline-[0.52px] outline-offset-[-0.52px] outline-black/0 border-0 text-xs sm:text-sm font-normal font-['Roboto'] text-neutral-950 placeholder:text-neutral-400 focus:outline-none focus:ring-0 focus-visible:ring-0"
                      />
                    </div>

                    {/* Email Content */}
                    <div className="flex flex-col justify-start items-start gap-2">
                      <div className="h-3.5 sm:h-4 inline-flex justify-start items-center gap-2">
                        <label className="justify-start text-neutral-950 text-xs sm:text-sm font-medium font-['Roboto'] leading-4">
                          Email Content
                        </label>
                      </div>
                      <Textarea
                        value={templateForm.content}
                        onChange={(e) => handleTemplateFormChange("content", e.target.value)}
                        placeholder=""
                        className="w-full min-h-[200px] sm:min-h-[240px] lg:h-64 px-3 py-2 bg-zinc-100 rounded-lg outline outline-[0.52px] outline-offset-[-0.52px] outline-black/0 border-0 text-xs sm:text-sm font-normal font-['Roboto'] leading-5 text-neutral-950 placeholder:text-neutral-500 resize-none focus:outline-none focus:ring-0 focus-visible:ring-0"
                      />
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row sm:justify-end gap-3 sm:gap-4 mt-6 sm:mt-8">
                    <Button
                      onClick={handleSubmitTemplate}
                      className="w-full sm:w-36 h-8 sm:h-9 lg:h-10 px-4 py-2 bg-[#67909b] hover:bg-[#67909b]/90 rounded-lg flex justify-center items-center gap-2.5 text-xs sm:text-sm font-medium font-['Roboto'] text-white"
                    >
                      Create Template
                    </Button>
                    <Button
                      onClick={handleCloseCreateTemplate}
                      variant="outline"
                      className="w-full sm:w-36 h-8 sm:h-9 lg:h-10 px-4 py-2 bg-white rounded-lg outline outline-1 outline-offset-[-1px] outline-black/50 flex justify-center items-center gap-2.5 text-xs sm:text-sm font-medium font-['Roboto'] text-neutral-800 hover:bg-white hover:text-neutral-800"
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              </Card>
            )}

            {/* Email Templates List */}
            {!editingTemplateId && (
              <Card className="border border-black/10 rounded-[20px] sm:rounded-[30px] lg:rounded-[40px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.08)] relative">
                <div className="p-4 sm:p-6 lg:p-8 pb-4 sm:pb-6 lg:pb-8 relative">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6 text-cyan-950" />
                      <CardTitle className="text-sm sm:text-base font-medium text-neutral-950 font-['Roboto'] leading-4">
                        Email Templates
                      </CardTitle>
                    </div>
                    {!isCreateTemplateOpen && (
                      <Button
                        onClick={handleCreateTemplate}
                        className="bg-[#67909b] hover:bg-[#67909b]/90 text-white h-8 sm:h-9 lg:h-10 px-3 sm:px-4 lg:px-6 rounded-lg text-xs sm:text-sm font-medium font-['Roboto'] w-full sm:w-auto"
                      >
                        Create Template
                      </Button>
                    )}
                  </div>
                </div>
              <div className="px-3 sm:px-4 lg:px-9 pb-4 sm:pb-6 lg:pb-8 pt-0">
                <div className="w-full inline-flex flex-col justify-start items-start gap-3 sm:gap-4">
                  {emailTemplates.map((template, index) => (
                    <div
                      key={template.id}
                      className="self-stretch min-h-[60px] sm:min-h-[70px] lg:h-16 px-3 sm:px-4 rounded-[10px] outline outline-[0.52px] outline-offset-[-0.52px] outline-black/10 inline-flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 sm:gap-4 py-3 sm:py-4"
                    >
                      <div className="inline-flex flex-col justify-start items-start gap-0 flex-1 min-w-0">
                        <div className="text-cyan-950 text-sm sm:text-base font-medium font-['Roboto'] leading-5 sm:leading-6">
                          {template.title}
                        </div>
                        <div className="text-gray-600 text-xs sm:text-sm font-normal font-['Roboto'] leading-4 sm:leading-5 mt-0.5 sm:mt-1">
                          {template.description}
                        </div>
                      </div>

                      <div className="w-32 h-9 px-4 py-2 bg-white rounded-lg outline outline-[0.52px] outline-offset-[-0.52px] outline-black/10 inline-flex justify-center items-center gap-2">
                        <button
                          onClick={() => handleEditTemplate(template.id)}
                          className="justify-start text-neutral-950 text-sm font-medium font-['Roboto'] leading-5"
                        >
                          Edit Template
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
            </div>
          </Card>
            )}
          </div>
        )}


        {/* API & Webhooks Tab */}
        {activeTab === "api-webhooks" && (
          <div className="mt-4 sm:mt-6 lg:mt-8">
            <Card className="border border-black/10 rounded-[20px] sm:rounded-[30px] lg:rounded-[40px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.08)] bg-white">
              <div className="p-4 sm:p-6 lg:p-8">
                <div className="w-full max-w-full sm:max-w-[1280px] inline-flex flex-col justify-start items-start gap-6 sm:gap-8">
                  {/* API Configuration Header */}
                  <div className="w-full sm:w-80 inline-flex flex-col justify-start items-start gap-2">
                    <div className="inline-flex justify-start items-center gap-2">
                      <div className="w-5 h-5 sm:w-6 sm:h-6 relative overflow-hidden">
                        <div className="w-1.5 h-1.5 left-[12px] sm:left-[15.50px] top-[2px] sm:top-[4px] absolute outline outline-2 outline-offset-[-1px] outline-neutral-950" />
                        <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 left-[8px] sm:left-[11.40px] top-[1px] sm:top-[2px] absolute outline outline-2 outline-offset-[-1px] outline-neutral-950" />
                        <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 left-[1px] sm:left-[2px] top-[6px] sm:top-[10px] absolute outline outline-2 outline-offset-[-1px] outline-neutral-950" />
                      </div>
                      <div className="justify-start text-neutral-950 text-sm sm:text-base font-medium font-['Roboto'] leading-4">
                        API Configuration
                      </div>
                    </div>
                    <div className="self-stretch justify-start text-gray-500 text-sm sm:text-base font-normal font-['Roboto'] leading-5 sm:leading-6 whitespace-nowrap">
                      Manage public API keys and webhook settings
                    </div>
                  </div>

                  <div className="self-stretch inline-flex flex-col justify-end items-start gap-3 sm:gap-4">
                    {/* Public API Key Section */}
                    <div className="self-stretch inline-flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 sm:gap-4">
                      <div className="w-full sm:w-48 inline-flex flex-col justify-start items-start gap-1">
                        <div className="self-stretch justify-center text-stone-500 text-sm sm:text-base font-medium font-['Roboto'] leading-5 sm:leading-6">
                          Public API Key
                        </div>
                        <div className="self-stretch h-5 relative">
                          <div className="left-0 top-[0.50px] absolute justify-start text-gray-600 text-xs sm:text-sm font-normal font-['Roboto'] leading-5 whitespace-nowrap">
                            Used for client-side integrations
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={handleGenerateNewKey}
                        className="w-full sm:w-36 h-9 sm:h-10 py-2 sm:py-4 rounded-lg outline outline-1 outline-offset-[-1px] outline-[#67909b] flex justify-center items-center gap-2.5 hover:bg-gray-50 transition-colors"
                      >
                        <div className="flex justify-start items-center gap-1">
                          <div className="text-center justify-start text-neutral-800 text-xs sm:text-sm font-medium font-['Roboto']">
                            Generate New Key
                          </div>
                        </div>
                      </button>
                    </div>
                    <div className="self-stretch h-12 sm:h-14 lg:h-16 px-4 sm:px-6 lg:px-8 py-2 relative bg-gray-50 rounded-[20px] sm:rounded-[30px] lg:rounded-[40px]  inline-flex justify-start items-center gap-2">
                      <div className="flex-1 text-left justify-start text-neutral-800 text-xs sm:text-sm font-normal font-['Roboto'] leading-5 font-mono">
                        {publicApiKeyVisible ? publicApiKey : "KK_API_SANDBOX_*********************"}
                      </div>
                      <button
                        type="button"
                        onClick={() => setPublicApiKeyVisible(!publicApiKeyVisible)}
                        className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 absolute right-2 sm:right-3 lg:right-4 flex items-center justify-center overflow-hidden"
                        aria-label={publicApiKeyVisible ? "Hide" : "Show"}
                      >
                        {publicApiKeyVisible ? (
                          <EyeOff className="w-4 h-4 sm:w-5 sm:h-5 text-zinc-600" />
                        ) : (
                          <div className="w-5 h-4 sm:w-6 sm:h-5 bg-zinc-600" />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Webhook Endpoints Section */}
                  <div className="self-stretch inline-flex flex-col justify-start items-start gap-6 sm:gap-8">
                    <div className="inline-flex justify-start items-center gap-2">
                      <div className="w-5 h-5 sm:w-6 sm:h-6 relative overflow-hidden">
                        <div className="w-3 h-1 sm:w-4 sm:h-1.5 left-[1px] sm:left-[2px] top-[12px] sm:top-[15px] absolute outline outline-2 outline-offset-[-1px] outline-neutral-950" />
                        <div className="w-2 h-2.5 sm:w-2.5 sm:h-3.5 left-[4px] sm:left-[6px] top-[1px] sm:top-[2px] absolute outline outline-2 outline-offset-[-1px] outline-neutral-950" />
                        <div className="w-2 h-2.5 sm:w-2.5 sm:h-3.5 left-[8px] sm:left-[12px] top-[4px] sm:top-[6px] absolute outline outline-2 outline-offset-[-1px] outline-neutral-950" />
                      </div>
                      <div className="w-36 h-5 sm:h-6 relative">
                        <div className="left-0 top-[-0.50px] absolute justify-start text-neutral-950 text-sm sm:text-base font-medium font-['Roboto'] leading-5 sm:leading-6">
                          Webhook Endpoints
                        </div>
                      </div>
                    </div>

                    <div className="self-stretch flex flex-col justify-start items-start gap-6 sm:gap-8">
                      {webhookEndpoints.map((webhook, index) => (
                        <div key={webhook.id} className="self-stretch flex flex-col gap-3 sm:gap-4">
                          <div className="w-full inline-flex justify-between items-center gap-4">
                            <div className="h-5 sm:h-6 relative">
                              <div className="left-0 top-[-0.50px] absolute justify-start text-neutral-950 text-sm sm:text-base lg:text-lg font-medium font-['Roboto'] leading-5 sm:leading-6 whitespace-nowrap">
                                {webhook.name}
                              </div>
                            </div>
                            <button
                              onClick={() => handleToggleWebhook(webhook.id)}
                              className={`w-10 sm:w-12 h-5 sm:h-6 relative rounded-[37.50px] overflow-hidden transition-colors ${
                                webhook.enabled
                                  ? "bg-[#67909b]/40"
                                  : "bg-[#67909b]/20"
                              }`}
                              aria-label={`Toggle ${webhook.name}`}
                            >
                              <div
                                className={`w-3 h-3 sm:w-4 sm:h-4 absolute top-[3px] rounded-[37.50px] bg-[#67909b] transition-all ${
                                  webhook.enabled
                                    ? "left-[calc(100%-19px)] sm:left-[calc(100%-22px)] lg:left-[27px]"
                                    : "left-[3px]"
                                }`}
                              />
                            </button>
                          </div>
                          <div className="self-stretch h-12 sm:h-14 lg:h-16 px-4 sm:px-6 lg:px-8 py-2 bg-gray-50 rounded-[20px] sm:rounded-[30px] lg:rounded-[40px]  inline-flex justify-start items-center gap-2">
                            <Input
                              value={webhook.url}
                              onChange={(e) =>
                                handleWebhookUrlChange(webhook.id, e.target.value)
                              }
                              className="flex-1 bg-transparent border-0 outline-0 focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 text-left justify-start text-neutral-800 text-xs sm:text-sm font-normal font-['Roboto'] leading-5"
                              placeholder="https://your-app.com/webhooks/..."
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
            </div>
          </Card>

            {/* Save Button */}
            <div className="flex justify-center pt-4 sm:pt-6">
              <Button
                onClick={handleSaveSettings}
                className="bg-[#67909b] hover:bg-[#67909b]/90 text-white h-9 sm:h-10 px-4 sm:px-6 rounded-lg text-xs sm:text-sm font-medium font-['Roboto'] w-full sm:w-auto"
              >
                Save Settings
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}