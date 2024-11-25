"use client"

import { Button } from "@/components/ui/button"
import { useState } from 'react';
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/hooks/use-toast"
import { Toaster } from "./components/ui/toaster";


function App() {
    const [url, setUrl] = useState('');
    const [path, setPath] = useState('');
    const { toast } = useToast()

    function getImageFromUrl() {
        if (url == '') {
            return (
                toast({
                    variant: "destructive",
                    title: "Empty Input",
                    description: "Fill the input box to make QR-image",
                })
            )
        } else {
            fetch("https://qr-server-x8sq.onrender.com/qr-code",
                {
                    method: "POST",
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ url: url })
                })
                .then(async (response) => {
                    const imageBlob = await response.blob();
                    const imageObjectUrl = URL.createObjectURL(imageBlob);
                    return setPath(imageObjectUrl);
                })
                .catch((err) => console.log(err))
        }
    }

    return (
        <div className="flex items-center flex-col gap-5">
            <div className='text-xl p-2 sm:p-4 sm:text-3xl font-semibold'>
                <p className='text-lime-600'>WELCOME TO MY NEW PROJECT</p>
            </div>
            <div className='shadow-lg shadow-blue-500/50 p-4 min-w-80 sm:w-[400px] bg-lime-600 flex flex-col gap-4 text-white font-semibold rounded-lg'>
                <p className="text-sm sm:text-base">Make QR-Image of your Project and Website</p>
                <div >
                    <Label htmlFor="enter">Enter Your URL : </Label>
                    <Input
                        type="text" id='enter'
                        className= ' bg-white text-gray-700'
                        placeholder='https://example.com'
                        value={url} onChange={(e) => setUrl(e.target.value)}
                    />
                </div>
                <Button
                    variant="outline"
                    onClick={() => getImageFromUrl()} 
                    className="bg-lime-700 hover:bg-lime-900 hover:text-white"
                >Click Me</Button>
                <Toaster />
                <div >
                    <p className="text-sm sm:text-base">Here Your QR-IMAGE </p>
                    <img src={path} alt="" className='size-full' />
                </div>
            </div>
        </div >
    )
}

export default App;
