import { LogoIcon } from "../../icons/LogoIcon";
import { TwitterIcon } from "../../icons/TwitterIcon";
import { YoutubeIcon } from "../../icons/YoutubeIcon";
import { SidebarItem } from "./SiderbarItem";

interface sidebarProps {
    onfilterChange: (type: "Youtube" | "Twitter" | "All") => void
}

export function Sidebar({onfilterChange}: sidebarProps){


    return <div className="h-screen bg-white border-r w-72
    fixed left-0 top-0 pl-6">
        <div className="flex text-2xl pt-8 items-center">
            <div  className="pr-2 text-purple-600">
              <LogoIcon/>
            </div>
            Brainly
        </div>
        <div className="pt-8 pl-4">
            <SidebarItem text="Twitter" onClick={() => onfilterChange("Twitter")} icon={<TwitterIcon/>}/>
            <SidebarItem text="Youtube" onClick={() => onfilterChange("Youtube")} icon={<YoutubeIcon/>}/>
            <SidebarItem text="All" onClick={() => onfilterChange("All")} icon={<LogoIcon/>}/>
        </div>
    </div>
}