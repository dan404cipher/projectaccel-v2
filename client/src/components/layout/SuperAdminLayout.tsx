import { ThemeProvider } from "next-themes"
import { SuperAdminSidebar } from "./SuperAdminSidebar"
import { Header } from "./Header"
import { CreateWorkspaceModal } from "@/components/WorkspaceSwitchDropdown"
import { useState } from "react"

interface SuperAdminLayoutProps {
  children: React.ReactNode
}

export function SuperAdminLayout({ children }: SuperAdminLayoutProps) {
  const [isCreateWorkspaceOpen, setIsCreateWorkspaceOpen] = useState(false);

  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      <div className="max-w-[100vw] max-h-[100vh] min-h-[100vh] min-w-[100vw] flex flex-col overflow-hidden bg-[#F6F6F6] p-[1.5rem]">
        <Header onCreateWorkspace={() => setIsCreateWorkspaceOpen(true)}/>
        <div className="flex h-[calc(100vh-130px)] gap-4">
          <SuperAdminSidebar />
          <main className="flex-1 min-h-full max-h-full h-full overflow-hidden">
            {children}
          </main>
        </div>
        
        {/* Create Workspace Modal - Rendered at root level */}
        <CreateWorkspaceModal 
          isOpen={isCreateWorkspaceOpen}
          onClose={() => setIsCreateWorkspaceOpen(false)}
        />
      </div>
    </ThemeProvider>
  )
}

