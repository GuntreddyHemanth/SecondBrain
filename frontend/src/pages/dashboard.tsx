import { useEffect, useState } from 'react'
import { Button } from '../components/ui/Button'
import { Card } from '../components/ui/Card'
import { CreateContentModel } from '../components/ui/CreateContentModel'
import { PlusIcon } from '../icons/PlusIcon'
import { ShareIcon } from '../icons/ShareIcon'
import { Sidebar } from '../components/ui/Sidebar'
import { useContent } from '../hooks/useContent'
import { BACKEND_URL } from '../config'
import axios from 'axios'
import { deleteContent } from '../hooks/deleteContent'

function Dashboard() {
  const [modalOpen, setModalOpen] = useState(false)
  const {contents, refresh} = useContent()

  interface ShareResponse {
    response: any
    hash: string
}

  useEffect(() => {
    refresh()
  }, [modalOpen])

  return <div>
    <Sidebar/>
   <div className='p-4 ml-72 min-h-screen bg-gray-100 border-2'>
    <CreateContentModel open={modalOpen} onClose={() => {
      setModalOpen(false)
    }}/>
    <div className='flex justify-end gap-4'>
      <Button startIcon={<ShareIcon/>} variant='secondary' text='Share' size='md' onClick={async()=> {
        const response = await axios.post<ShareResponse>(`${BACKEND_URL}/api/v1/brian/share`, {
          share: true
        },{
          headers: {
            "Authorization":localStorage.getItem("token")
          }
        })
        const shareURL = `http://localhost:5173/share/${response.data.hash}`
        alert(shareURL)
      }}/>
      <Button startIcon={<PlusIcon/>} variant='primary' text='Add Content' size='md' onClick={()=>{
        setModalOpen(true)
      }}/>
    </div>
    <div className='flex pt-9 gap-4 flex-wrap'>
      {/* {JSON.stringify(contents)} */}
      {contents.map(({title, link, type, _id}) =><Card 
          key = {_id}
          type={type} 
          link={link}
          title={title}
          contentId = {_id}
          onDelete = {() =>  deleteContent(_id, refresh)}
      />
      )}
    </div>
   </div>
  </div>
}

export default Dashboard
