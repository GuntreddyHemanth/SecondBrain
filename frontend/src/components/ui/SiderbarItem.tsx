import { ReactElement } from "react";

interface IconsType {
    text: string;
    icon:ReactElement
    onClick: () => void
}

export function SidebarItem({text, icon, onClick}: IconsType){
    return <div className="flex gap-2 items-center text-gray-500
     pb-2 cursor-pointer hover:bg-gray-200 rounded max-w-48 pl-4 transition-all duration-500" onClick={onClick}>
        {icon} {text}
    </div>
}