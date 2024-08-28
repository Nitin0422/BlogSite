import { Button } from '@/components/ui/button'
import { useNavigate } from 'react-router-dom'

const PageNotFound = () => {
  const navigate = useNavigate()
  return (
    <div className='w-screen h-screen bg-red-90 flex flex-col items-center justify-center gap-6'>
      <h1 className='text-6xl font-bold'>404</h1>
      <h1 className='text-3xl font-medium text-center'>Page not found</h1>

      <p className='text-md text-center md:text-lg text-neutral-500'>Sorry, we couldn't find the page you're looking for.</p>
      <Button onClick={() => navigate("/")}>Go back home</Button>
    </div>
  )
}

export default PageNotFound
