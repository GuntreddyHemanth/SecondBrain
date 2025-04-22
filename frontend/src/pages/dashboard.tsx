import { useEffect, useState } from 'react'
import { Button } from '../components/ui/Button'
import { Card } from '../components/ui/Card'
import { CreateContentModal } from '../components/ui/CreateContentModel'
import { PlusIcon } from '../icons/PlusIcon'
import { ShareIcon } from '../icons/ShareIcon'
import { Sidebar } from '../components/ui/Sidebar'
import { useContent } from '../hooks/useContent'
import { BACKEND_URL } from '../config'
import axios from 'axios'
import { deleteContent } from '../hooks/deleteContent'

function Dashboard() {
  const [modalOpen, setModalOpen] = useState(false)
  const [shareModalOpen, setShareModalOpen] = useState(false)
  const [shareURL, setShareURL] = useState("")
  const {contents, refresh} = useContent() as { contents: Content[], refresh: () => void };
  const [filterType, setFilterType] = useState<"Twitter" | "Youtube" | "All">("All")
  const [isMobileView, setIsMobileView] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  
  interface ShareResponse {
    response: any
    hash: string
  }
  
  interface Content {
    title: string;
    link: string;
    type: "Twitter" | "Youtube";
    _id: string;
  }
 
  useEffect(() => {
    refresh()
  }, [modalOpen])
  
  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth < 768)
    }
    
    handleResize() // Set initial state
    window.addEventListener('resize', handleResize)
    
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])
  
  const filterContent = filterType === "All" ?
     contents
     : contents.filter(content => content.type === filterType)
     
  const handleShareContent = async () => {
    try {
      const response = await axios.post<ShareResponse>(`${BACKEND_URL}/api/v1/brian/share`, {
        share: true
      },{
        headers: {
          "Authorization": localStorage.getItem("token")
        }
      })
      const url = `https://secondbrain-delta.vercel.app/share/${response.data.hash}`
      setShareURL(url)
      setShareModalOpen(true)
    } catch (error) {
      console.error("Error sharing content:", error)
      alert("Failed to share content. Please try again.")
    }
  }
  
  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareURL)
      .then(() => {
        alert("Link copied to clipboard!")
      })
      .catch(err => {
        console.error("Failed to copy link:", err)
        alert("Failed to copy link. Please try again.")
      })
  }
  
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen)
  }
  
  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">
      {/* Sidebar for desktop */}
      <div className={`${isMobileView ? 'hidden' : 'block'} md:w-72 flex-shrink-0`}>
        <Sidebar onfilterChange={setFilterType} />
      </div>
      
      {/* Mobile hamburger menu */}
      {isMobileView && (
        <div className="bg-white p-4 flex items-center justify-between ">
          <button 
            onClick={toggleSidebar} 
            className="p-2 rounded hover:bg-gray-100 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <h1 className="text-xl font-semibold">Dashboard</h1>
          <div className="w-6"></div> {/* Empty div for balanced spacing */}
        </div>
      )}
      
      {/* Mobile sidebar (hidden by default) */}
      {isMobileView && sidebarOpen && (
        <div className="fixed inset-0 z-50 flex">
          <div className="fixed inset-0 bg-black bg-opacity-50 transition-opacity" onClick={() => setSidebarOpen(false)}></div>
          <div className="relative flex-1 flex flex-col max-w-xs w-full bg-white transform transition-all">
            <div className="p-4 flex justify-end">
              <button onClick={() => setSidebarOpen(false)} className="p-2 rounded-full hover:bg-gray-100 transition-colors z-20">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <Sidebar onfilterChange={(type) => {
              setFilterType(type)
              setSidebarOpen(false)
            }} />
          </div>
        </div>
      )}
      
      {/* Main content */}
      <div className={`flex-1 p-4 md:p-6 ${isMobileView ? '' : 'ml-0 md:ml-4'}`}>
        <CreateContentModal open={modalOpen} onClose={() => setModalOpen(false)} />
        
        {/* Share modal */}
        {shareModalOpen && (
          <div className="fixed inset-0 z-50 overflow-auto bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4 shadow-xl">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium">Share Content</h3>
                <button onClick={() => setShareModalOpen(false)} className="text-gray-400 hover:text-gray-500 p-1 rounded-full hover:bg-gray-100 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Share URL</label>
                <div className="flex">
                  <input 
                    type="text" 
                    value={shareURL} 
                    readOnly 
                    className="flex-grow px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm"
                  />
                  <button 
                    onClick={copyToClipboard} 
                    className="bg-[#7164c0] text-white px-4 py-2 rounded-r-md hover:bg-[#7164c0]-600 transition-colors"
                  >
                    Copy
                  </button>
                </div>
              </div>
              <div className="flex justify-end">
                <button 
                  onClick={() => setShareModalOpen(false)} 
                  className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
        
        <div className="flex justify-end gap-4 flex-wrap mb-6">
          <Button 
            startIcon={<ShareIcon/>} 
            variant="secondary" 
            text="Share" 
            size="md" 
            onClick={handleShareContent}
          />
          <Button 
            startIcon={<PlusIcon/>} 
            variant="primary" 
            text="Add Content" 
            size="md" 
            onClick={() => setModalOpen(true)}
          />
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 pt-4">
          {filterContent.length === 0 ? (
            <div className="col-span-full text-center py-12 text-gray-500">
              No content found. Add some content to get started.
            </div>
          ) : (
            filterContent.map(({title, link, type, _id}) =>(
              <Card
                key={_id}
                type={type}
                link={link}
                title={title}
                contentId={_id}
                onDelete={() => deleteContent(_id, refresh)}
              />
            ))
          )}
        </div>
      </div>
    </div>
  )
}

export default Dashboard