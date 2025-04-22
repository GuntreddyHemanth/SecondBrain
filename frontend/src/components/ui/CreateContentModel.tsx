import { useRef, useState } from "react";
import { CrossIcon } from "../../icons/CrossIcon";
import { Button } from "./Button";
import { Input } from "./Input";
import axios from "axios";
import { BACKEND_URL } from "../../config";

interface ModalProps {
    open: boolean;
    onClose: () => void;
}

enum ContentType {
    Youtube = "Youtube",
    Twitter = "Twitter"
}

export function CreateContentModal({open, onClose}: ModalProps) {
    const titleRef = useRef<HTMLInputElement>(null);
    const linkRef = useRef<HTMLInputElement>(null);
    const [type, setType] = useState(ContentType.Youtube);
    
    async function addContent() {
        const title = titleRef.current?.value;
        const link = linkRef.current?.value;
        
        await axios.post(`${BACKEND_URL}/api/v1/content`, {
            title,
            link,
            type
        }, {
            headers: {
                "Authorization": localStorage.getItem("token")
            }
        });
        
        onClose();
    }
    
    if (!open) return null;
    
    return (
        <div className="fixed inset-0 z-50 overflow-auto">
            <div className="fixed inset-0 bg-slate-500 opacity-60"></div>
            <div className="flex items-center justify-center min-h-screen px-4">
                <div className="bg-white rounded-lg shadow-xl w-full max-w-md z-10 relative">
                    <div className="p-4 border-b">
                        <div className="flex justify-between items-center">
                            <h3 className="text-lg font-medium">Add New Content</h3>
                            <button 
                                className="p-1 rounded-full hover:bg-gray-100 transition-colors"
                                onClick={onClose}
                            >
                                <CrossIcon />
                            </button>
                        </div>
                    </div>
                    
                    <div className="p-6 space-y-4">
                        <div className="space-y-4">
                            <div>
                                <Input ref={titleRef} placeholder="Title" />
                            </div>
                            <div>
                                <Input ref={linkRef} placeholder="Link" />
                            </div>
                        </div>
                        
                        <div>
                            <h3 className="text-sm font-medium text-gray-700 mb-2">Content Type</h3>
                            <div className="flex gap-3">
                                <Button 
                                    text="Youtube" 
                                    variant={type === ContentType.Youtube ? "primary" : "secondary"} 
                                    onClick={() => setType(ContentType.Youtube)}
                                />
                                <Button 
                                    text="Twitter" 
                                    variant={type === ContentType.Twitter ? "primary" : "secondary"} 
                                    onClick={() => setType(ContentType.Twitter)}
                                />
                            </div>
                        </div>
                    </div>
                    
                    <div className="px-6 py-4 border-t flex justify-end">
                        <div className="flex gap-3">
                            <Button 
                                text="Cancel" 
                                variant="secondary" 
                                onClick={onClose} 
                            />
                            <Button 
                                text="Save" 
                                variant="primary" 
                                onClick={addContent} 
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}