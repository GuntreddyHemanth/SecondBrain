import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { Card } from "../components/ui/Card";

interface Content{
    title: string;
    link:string;
    type:"Twitter"| "Youtube";
    _id:string;
}

interface SharedType{
    username:string;
    content: Content[]
}

export function SharedView(){
    const {hash} = useParams()
    const [content, setContent] = useState<Content[]>([])
    const [username, setUsername] = useState("")

    useEffect(() => {
        const fetchDate = async () => {
            try {
                const res = await axios.get<SharedType>(`${BACKEND_URL}/api/v1/brain/${hash}`)
                setContent(res.data.content)
                setUsername(res.data.username)
            } catch (err) {
                console.error("Failed to fetch shared content", err)
            }
        }  
        if (hash) fetchDate()
    }, [hash])

    return (
        <div className='p-4 min-h-screen bg-gray-100'>
          <h1 className='text-2xl font-bold mb-4'>{username}'s Shared Content</h1>
          <div className='flex gap-4 flex-wrap'>
            {content.map(({ title, link, type, _id }) => (
              <Card key={_id} type={type} link={link} title={title} />
            ))}
          </div>
        </div>
      )
    
}


