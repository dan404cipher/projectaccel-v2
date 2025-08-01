import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { 
  Rocket, 
  BarChart3, 
  Users, 
  Network, 
  Settings,
  ChevronDown,
  ChevronUp,
  Search,
  Headphones,
  Bot
} from "lucide-react"
import { useState } from "react"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"

const HelpSupport = () => {
  const [searchQuery, setSearchQuery] = useState("")
  const [openFaq, setOpenFaq] = useState<number | null>(0)

  const helpCategories = [
    {
      icon: Rocket,
      title: "Getting Started",
      description: "Learn the basics"
    },
    {
      icon: BarChart3,
      title: "Project Management", 
      description: "Organize your work"
    },
    {
      icon: Users,
      title: "Team Collaboration",
      description: "Work together"
    },
    {
      icon: Network,
      title: "Integrations",
      description: "Connect your tools"
    },
    {
      icon: Settings,
      title: "Account Settings",
      description: "Manage your account"
    }
  ]

  const faqs = [
    {
      question: "How do I reset my password?",
      answer: "consectetur adipiscing elit, sed do eiusmod tempor incididunt utabore et dolore magna aliqua et do eiusmodeiusmodconsectetur adipiscing elit, sed do eiusmod tempor incididunt utabore et dolore magna eiusmod et do eiusmod"
    },
    {
      question: "How do I reset my password?",
      answer: "consectetur adipiscing elit, sed do eiusmod tempor incididunt utabore et dolore magna aliqua et do eiusmodeiusmodconsectetur adipiscing elit, sed do eiusmod tempor incididunt utabore et dolore magna eiusmod et do eiusmod"
    },
    {
      question: "Can I duplicate a task or project?",
      answer: "consectetur adipiscing elit, sed do eiusmod tempor incididunt utabore et dolore magna aliqua et do eiusmodeiusmodconsectetur adipiscing elit, sed do eiusmod tempor incididunt utabore et dolore magna eiusmod et do eiusmod"
    }
  ]

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="flex justify-center">
          <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center">
            <Bot className="h-8 w-8 text-primary-foreground" />
          </div>
        </div>
        <h1 className="text-3xl font-bold text-foreground">Help & Support</h1>
      </div>

      {/* Search */}
      <Card className="shadow-[var(--shadow-card)]">
        <CardContent className="p-6">
          <h2 className="text-xl font-semibold text-center mb-6 text-foreground">
            How Can We Help You?
          </h2>
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Search for help articles, FAQs, and more..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 h-12 text-base"
            />
          </div>
        </CardContent>
      </Card>

      {/* Help Categories */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {helpCategories.map((category, index) => {
          const Icon = category.icon
          return (
            <Card 
              key={index} 
              className="shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-elevated)] transition-all cursor-pointer group"
            >
              <CardContent className="p-6 text-center space-y-4">
                <div className="mx-auto w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <Icon className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">{category.title}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{category.description}</p>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Contact Section */}
      <Card className="shadow-[var(--shadow-card)]">
        <CardHeader>
          <CardTitle className="text-xl font-semibold">Contact us</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <h3 className="font-medium text-foreground">Support Email</h3>
              <p className="text-muted-foreground">example@v-accel.ai</p>
            </div>
            <div className="space-y-2">
              <h3 className="font-medium text-foreground">Helpline</h3>
              <p className="text-muted-foreground">91-8976542435</p>
            </div>
            <div className="space-y-2">
              <h3 className="font-medium text-foreground">Toll-free number</h3>
              <p className="text-muted-foreground">1800 7654 3345</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* FAQs */}
      <Card className="shadow-[var(--shadow-card)]">
        <CardHeader>
          <CardTitle className="text-xl font-semibold">FAQs</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <Collapsible 
                key={index}
                open={openFaq === index}
                onOpenChange={() => setOpenFaq(openFaq === index ? null : index)}
              >
                <CollapsibleTrigger asChild>
                  <Button 
                    variant="ghost" 
                    className="w-full justify-between p-4 h-auto text-left font-medium hover:bg-muted/50"
                  >
                    <span className="text-foreground">{faq.question}</span>
                    {openFaq === index ? (
                      <ChevronUp className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <ChevronDown className="h-4 w-4 text-muted-foreground" />
                    )}
                  </Button>
                </CollapsibleTrigger>
                <CollapsibleContent className="px-4 pb-4">
                  <p className="text-muted-foreground leading-relaxed">
                    {faq.answer}
                  </p>
                </CollapsibleContent>
              </Collapsible>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default HelpSupport