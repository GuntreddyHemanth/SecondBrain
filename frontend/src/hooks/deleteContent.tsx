import axios from "axios";
import { BACKEND_URL } from "../config";

export const deleteContent = async (contentId: string, refrece: ()=> void) => {
    try {
        await axios.delete(`${BACKEND_URL}/api/v1/content/${contentId}`, {
            headers: {
                Authorization: localStorage.getItem("token"),
            },
        })
        refrece()
        // setContents((prev:any[]) => prev.filter((content) =>content.contentId !== contentId))
    } catch (error) {
        console.error("Error deleting content:", error);
    }
};
