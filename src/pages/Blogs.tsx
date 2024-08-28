import { useAuth } from '@/context/AuthProvider'

const Blogs = () => {
    const {user} = useAuth()
  return (
    <div>
      Hi {user?.name}
    </div>
  )
}

export default Blogs
