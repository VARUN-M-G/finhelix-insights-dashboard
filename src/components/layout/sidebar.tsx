import { useState } from "react"
import { NavLink, useLocation } from "react-router-dom"
import { 
  BarChart3, 
  TrendingUp, 
  DollarSign, 
  Banknote, 
  Heart,
  Database,
  Settings,
  Home
} from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"

const navigationItems = [
  { title: "Dashboard", url: "/", icon: Home },
  { title: "Revenue Analytics", url: "/revenue", icon: TrendingUp },
  { title: "Profitability", url: "/profitability", icon: DollarSign },
  { title: "Cash Flow", url: "/cashflow", icon: Banknote },
  { title: "Financial Health", url: "/health", icon: Heart },
  { title: "Data Management", url: "/data", icon: Database },
  { title: "Settings", url: "/settings", icon: Settings },
]

export function AppSidebar() {
  const { state } = useSidebar()
  const location = useLocation()
  const currentPath = location.pathname

  const isActive = (path: string) => {
    if (path === "/") return currentPath === path
    return currentPath.startsWith(path)
  }

  const getNavClassName = (path: string) => {
    return isActive(path) 
      ? "bg-primary text-primary-foreground font-medium shadow-md" 
      : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
  }

  return (
    <Sidebar className="border-r border-sidebar-border">
      <SidebarContent className="gap-0">
        <SidebarGroup>
          <SidebarGroupLabel className="text-sidebar-foreground/70 text-xs font-medium uppercase tracking-wide">
            Navigation
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    asChild 
                    className={`rounded-lg transition-all duration-200 ${getNavClassName(item.url)}`}
                  >
                    <NavLink to={item.url} className="flex items-center space-x-3 p-3">
                      <item.icon className="h-5 w-5 shrink-0" />
                      {state !== "collapsed" && (
                        <span className="text-sm font-medium">{item.title}</span>
                      )}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Footer */}
        <div className="mt-auto p-4 border-t border-sidebar-border">
          <div className="text-xs text-sidebar-foreground/60 text-center">
            <p>© 2025 AppHelix.ai</p>
            <p className="mt-1">FinHelix v1.0</p>
          </div>
        </div>
      </SidebarContent>
    </Sidebar>
  )
}