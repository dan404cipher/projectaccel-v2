import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "./AppSidebar"
import { Header } from "./Header"
import { ThemeProvider } from "next-themes"

interface LayoutProps {
  children: React.ReactNode
}

export function Layout({ children }: LayoutProps) {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      <SidebarProvider>
        <div className="min-h-screen bg-background">
          {/* Fixed Header */}
          <Header />
          
          {/* Content area with proper top spacing for floating header */}
          <div className="pt-[97px]">
            <div className="flex h-[calc(100vh-97px)]">
              <AppSidebar />
              <main className="flex-1 overflow-auto">
                <div className="p-6">
                  {children}
                </div>
              </main>
            </div>
          </div>
        </div>
      </SidebarProvider>
    </ThemeProvider>
  )
}