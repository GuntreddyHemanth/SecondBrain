import axios from "axios";
import { useEffect, useState } from "react";
import { BACKEND_URL } from "../config";


export function useContent(){
    const [contents, setContents] = useState([])

    interface ContentResponse {
        content: any
    }

    function refresh(){
        axios.get<ContentResponse>(`${BACKEND_URL}/api/v1/content`, {
            headers: {
                "Authorization": localStorage.getItem("token")
            }
        })
        .then((response) => {
            setContents(response.data.content)
        })
    }

    useEffect(() => {
        refresh()
        // // const intervel = setInterval(() => {
        // //     refresh()
        // // }, 10 * 1000)

        // return () => {
        //     clearInterval(intervel)
        // }
    }, [])
    
    return {contents, refresh}
}