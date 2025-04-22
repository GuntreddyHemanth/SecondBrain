import { LogoIcon } from "../../icons/LogoIcon";
import { TwitterIcon } from "../../icons/TwitterIcon";
import { YoutubeIcon } from "../../icons/YoutubeIcon";
import { SidebarItem } from "./SiderbarItem";

// You can create this icon in your icons folder
const LogoutIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
  </svg>
);

interface SidebarProps {
    onfilterChange: (type: "Youtube" | "Twitter" | "All") => void
}

export function Sidebar({onfilterChange}: SidebarProps) {
    const handleLogout = () => {
        // Clear token from localStorage
        localStorage.removeItem("token");
        
        // Redirect to login page
        window.location.href = "/signup";
    };
    
    return (
        <div className="h-screen bg-white  w-72 fixed left-0 top-0 pl-6 shadow-sm flex flex-col">
            <div className="flex text-2xl pt-8 items-center font-medium">
                <div className="pr-2 text-purple-600">
                    <LogoIcon/>
                </div>
                Brainly
            </div>
            
            <div className="pt-8 pl-4 space-y-2 flex-grow">
                <SidebarItem text="Twitter" onClick={() => onfilterChange("Twitter")} icon={<TwitterIcon/>}/>
                <SidebarItem text="Youtube" onClick={() => onfilterChange("Youtube")} icon={<YoutubeIcon/>}/>
                <SidebarItem text="All" onClick={() => onfilterChange("All")} icon={<LogoIcon/>}/>
            </div>
            
            {/* Logout at the bottom of sidebar */}
            <div className="pl-4 pb-8">
                <SidebarItem 
                    text="Logout" 
                    onClick={handleLogout} 
                    icon={<LogoutIcon/>}
                />
            </div>
        </div>
    )
}