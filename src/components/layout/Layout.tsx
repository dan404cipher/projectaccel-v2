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
        <div className="max-w-[100vw] max-h-[100vh] min-h-[100vh]  min-w-[100vw] flex flex-col overflow-hidden bg-[#F6F6F6] p-[1.5rem]">
          <Header/>
          <div className="flex h-full gap-10">
            <AppSidebar/>
            <main className="flex-1 bg-slate-200">
sdfas
            </main>
          </div>
        </div>
        {/* <div className="h-screen overflow-hidden w-full">
          {/* Fixed Header */}
          {/* <Header /> */}
          
          {/* Content area */}
          {/* <div className="max-h-[100vh] overflow-y-auto pt-5">
            <div className="flex h-full w-full bg-lime-400">
              <AppSidebar />
              <main className="flex-1 pt-16 overflow-y-auto">
                <div className="min-h-full">
                  {children}
                </div>
              </main>
            </div>
          </div> */}
        {/* </div> */}
      </SidebarProvider>
    </ThemeProvider>
  )
}