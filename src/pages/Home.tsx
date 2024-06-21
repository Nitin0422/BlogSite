import { Button } from "antd";

const HomePage = () => {
    return (
        <div className="h-screen w-screen bg-[url('src/assets/banner3.jpg')] bg-cover">
            <div className="bg-black h-screen bg-opacity-50">
                <div className=" bg-neutral-900 h-14 bg-opacity-70 flex justify-between items-center px-3">
                    <h1 className="text-white text-2xl font-bold"> VERTEX </h1>
                    <div>
                        <Button type="ghost"></Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HomePage;