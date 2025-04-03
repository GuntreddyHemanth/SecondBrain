import { ReactElement } from "react";

interface IconsType {
    text: string;
    icon:ReactElement
}

export function SidebarItem({text, icon}: IconsType){
    return <div className="flex gap-2 items-center text-gray-500
     pb-2 cursor-pointer hover:bg-gray-200 rounded max-w-48 pl-4 transition-all duration-500">
        {icon} {text}
    </div>
}