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
        <div className="h-screen bg-background overflow-hidden w-full">
          {/* Fixed Header */}
          <Header />
          
          {/* Content area */}
          <div className="h-[100%] pt-5">
            <div className="flex h-full w-full">
              <AppSidebar />
              <main className="flex-1 pt-16 overflow-y-auto">
                <div className="min-h-full">
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