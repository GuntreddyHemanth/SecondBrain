import { useEffect } from "react";
import { DeleteIcon } from "../../icons/DeleteIcon";
import { ShareIcon } from "../../icons/ShareIcon";

interface CardProps {
    title: string,
    link: string,
    type: "Twitter" | "Youtube",
    contentId?: string,
    onDelete?: () => void
}

export function Card({title, link, type, onDelete}: CardProps){

    useEffect(() => {
        if (type === "Twitter" && (window as any).twttr?.widgets){
            (window as any).twttr.widgets.load();
        }
    }, [type, link])

    return <div>
        <div className="p-4 bg-white rounded-md border-gray-200 max-w-72 border min-w-48 min-h-48">
            <div className="flex justify-between">
                <div className="flex items-center text-sm">
                    <div className="text-gray-500 pr-2">
                        <ShareIcon/>
                    </div>
                    {title}
                </div>
                <div className="flex">
                    <div className="pr-2 text-gray-500">
                        <a href={link} target="_blank">
                           <ShareIcon/>
                        </a>
                    </div>
                    <div className="text-gray-500">
                        <button className="pointer" onClick={onDelete}>
                         <DeleteIcon/>
                        </button>
                    </div>
                </div>
            </div>
            <div className="pt-4">
                {type === "Youtube" && <iframe className="w-full" src={link.replace("watch", "embed").replace("?v=", "/")} 
                    title="YouTube video player" frameBorder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                    referrerPolicy="strict-origin-when-cross-origin" allowFullScreen>
                </iframe>}
                {type === "Twitter" &&  <blockquote className="twitter-tweet">
                    <a href={link.replace("x.com", "twitter.com")}></a> 
                </blockquote>}
            </div>
       </div>
    </div>
}