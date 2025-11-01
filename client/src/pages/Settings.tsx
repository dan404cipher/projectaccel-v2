import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Settings as SettingsIcon, Palette } from "lucide-react";

interface FeatureToggle {
  id: string;
  name: string;
  description: string;
  enabled: boolean;
  isWarning?: boolean;
}

export default function Settings() {
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
  ]);

  const [themeSettings, setThemeSettings] = useState({
    platformName: "Logic Flow",
    logoUrl: "https://example.com/logo.png",
    primaryColor: "#549EDD0",
  });

  const handleToggleChange = (id: string) => {
    setFeatureToggles((prev) =>
      prev.map((toggle) =>
        toggle.id === id ? { ...toggle, enabled: !toggle.enabled } : toggle
      )
    );
  };

  const handleThemeChange = (field: string, value: string) => {
    setThemeSettings((prev) => ({ ...prev, [field]: value }));
  };

  const handleSaveSettings = () => {
    // TODO: Implement save functionality
    console.log("Saving settings", { featureToggles, themeSettings });
  };

  return (
    <div className="w-full h-full p-6 sm:p-8 space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-2xl font-medium text-[#06263d]">Settings</h1>
        <p className="text-base text-[#4a5565]">
          Configure global, platform-wide settings
        </p>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="general" className="w-full">
        <TabsList className="bg-[#67909b] h-12 px-4 w-full max-w-[1364px] rounded-3xl">
          <TabsTrigger
            value="general"
            className="data-[state=active]:bg-white data-[state=active]:text-[#252525] data-[state=inactive]:text-white rounded-2xl px-2 py-1 text-base font-medium"
          >
            General
          </TabsTrigger>
          <TabsTrigger
            value="integrations"
            className="data-[state=active]:bg-white data-[state=active]:text-[#252525] data-[state=inactive]:text-white rounded-2xl px-2 py-1 text-base font-medium"
          >
            Integrations
          </TabsTrigger>
          <TabsTrigger
            value="email-templates"
            className="data-[state=active]:bg-white data-[state=active]:text-[#252525] data-[state=inactive]:text-white rounded-2xl px-2 py-1 text-base font-medium"
          >
            Email Templates
          </TabsTrigger>
          <TabsTrigger
            value="api-webhooks"
            className="data-[state=active]:bg-white data-[state=active]:text-[#252525] data-[state=inactive]:text-white rounded-2xl px-2 py-1 text-base font-medium"
          >
            API & Webhooks
          </TabsTrigger>
        </TabsList>

        {/* General Tab Content */}
        <TabsContent value="general" className="space-y-8 mt-8">
          {/* Feature Toggles Card */}
          <Card className="border border-black/10 rounded-[40px] shadow-none">
            <CardHeader className="p-8">
              <div className="flex items-center gap-2 mb-2">
                <SettingsIcon className="h-6 w-6" />
                <CardTitle className="text-base font-medium text-neutral-950">
                  Feature Toggles
                </CardTitle>
              </div>
              <CardDescription className="text-base text-[#717182]">
                Enable or disable platform features globally
              </CardDescription>
            </CardHeader>
            <CardContent className="px-8 pb-8">
              <div className="space-y-6">
                {featureToggles.map((toggle, index) => (
                  <div key={toggle.id}>
                    {index > 0 && (
                      <div className="h-px bg-black/10 mb-6 -mt-6" />
                    )}
                    <div className="flex items-center justify-between">
                      <div className="flex flex-col gap-1 w-[195px]">
                        <div className="text-base font-medium leading-tight">
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
                        <p className="text-sm text-[#4a5565] leading-5">
                          {toggle.description}
                        </p>
                      </div>
                      <Switch
                        checked={toggle.enabled}
                        onCheckedChange={() => handleToggleChange(toggle.id)}
                        className="h-6 w-12 data-[state=checked]:bg-[rgba(103,144,155,0.2)] data-[state=unchecked]:bg-[rgba(103,144,155,0.4)] [&>span]:h-3 [&>span]:w-3 [&>span]:bg-[#67909b]"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Theme & Branding Card */}
          <Card className="border border-black/10 rounded-[40px] shadow-none">
            <CardHeader className="p-8">
              <div className="flex items-center gap-2 mb-2">
                <Palette className="h-6 w-6" />
                <CardTitle className="text-base font-medium text-neutral-950">
                  Theme & Branding
                </CardTitle>
              </div>
              <CardDescription className="text-base text-[#717182]">
                Customize the platform appearance and branding
              </CardDescription>
            </CardHeader>
            <CardContent className="px-8 pb-8 space-y-6">
              {/* Platform Name */}
              <div className="flex flex-col gap-3">
                <label className="text-lg font-medium text-neutral-950">
                  Platform Name
                </label>
                <Input
                  value={themeSettings.platformName}
                  onChange={(e) =>
                    handleThemeChange("platformName", e.target.value)
                  }
                  className="bg-gray-50 h-16 px-8 rounded-[40px] border-0 text-base text-[#252525] w-full max-w-[528px]"
                  placeholder="Enter platform name"
                />
              </div>

              {/* Logo URL */}
              <div className="flex flex-col gap-3">
                <label className="text-lg font-medium text-neutral-950">
                  Logo URL
                </label>
                <Input
                  value={themeSettings.logoUrl}
                  onChange={(e) =>
                    handleThemeChange("logoUrl", e.target.value)
                  }
                  className="bg-gray-50 h-16 px-8 rounded-[40px] border-0 text-base text-[#252525] w-full"
                  placeholder="https://example.com/logo.png"
                />
              </div>

              {/* Primary Color */}
              <div className="flex flex-col gap-3">
                <label className="text-lg font-medium text-neutral-950">
                  Primary Color code
                </label>
                <div className="flex items-center gap-4">
                  <div
                    className="w-16 h-16 rounded-[40px] flex-shrink-0"
                    style={{
                      backgroundColor: themeSettings.primaryColor.startsWith("#")
                        ? themeSettings.primaryColor
                        : `#${themeSettings.primaryColor}`,
                    }}
                  />
                  <Input
                    value={themeSettings.primaryColor}
                    onChange={(e) =>
                      handleThemeChange("primaryColor", e.target.value)
                    }
                    className="bg-gray-50 h-16 px-8 rounded-[40px] border-0 text-base text-[#252525] w-full max-w-[528px]"
                    placeholder="#549EDD0"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Save Button */}
          <div className="flex justify-center">
            <Button
              onClick={handleSaveSettings}
              className="bg-[#67909b] hover:bg-[#67909b]/90 text-white h-10 px-6 rounded-lg text-sm font-medium"
            >
              Save Settings
            </Button>
          </div>
        </TabsContent>

        {/* Integrations Tab */}
        <TabsContent value="integrations" className="mt-8">
          <Card className="border border-black/10 rounded-[40px] shadow-none">
            <CardContent className="p-8">
              <p className="text-base text-[#4a5565]">
                Integrations settings coming soon...
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Email Templates Tab */}
        <TabsContent value="email-templates" className="mt-8">
          <Card className="border border-black/10 rounded-[40px] shadow-none">
            <CardContent className="p-8">
              <p className="text-base text-[#4a5565]">
                Email templates settings coming soon...
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        {/* API & Webhooks Tab */}
        <TabsContent value="api-webhooks" className="mt-8">
          <Card className="border border-black/10 rounded-[40px] shadow-none">
            <CardContent className="p-8">
              <p className="text-base text-[#4a5565]">
                API & Webhooks settings coming soon...
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

