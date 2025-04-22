import { ReactElement } from "react";

interface IconsType {
    text: string;
    icon: ReactElement;
    onClick: () => void;
}

export function SidebarItem({text, icon, onClick}: IconsType) {
    return (
        <div 
            className="flex gap-2 items-center text-gray-500 py-2 px-4 cursor-pointer hover:bg-gray-200 rounded-md max-w-48 transition-all duration-300"
            onClick={onClick}
        >
            <span className="text-lg">{icon}</span> 
            <span>{text}</span>
        </div>
    )
}