import { Button } from "@/components/ui/button"
import { Paperclip, ImageIcon, Send } from "lucide-react"
import CreateProduct from "@/components/forms/create-product/create.form"

export default function ChatInput() {
    return (
        <div className="p-4">
            <div className="mb-3 flex gap-1">
                <CreateProduct trigger={
                    <Button className="bg-blue-500 hover:bg-blue-600 text-white text-xs px-1 py-2 h-8">
                        ✓ Create product
                    </Button>}/>
                <CreateProduct trigger={ 
                    <Button variant="secondary" className="bg-gray-500 hover:bg-blue-500 text-white text-xs px-1 py-2 h-8">
                        ✓ Create Collection
                    </Button>}/>
                    <Button variant="secondary" className="bg-gray-500 hover:bg-blue-500 text-white text-xs px-2 py-2 h-8">
                        ✓ Create price quota
                    </Button>
            </div>
            <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-4">
                <textarea placeholder="How can I help you?"
                    className="w-full border-none focus:ring-0 resize-none text-gray-700 placeholder-gray-400 text-base min-h-[80px] outline-none"/>
                <hr className="my-3 border-gray-200" />

                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <button className="text-gray-500 hover:text-gray-700">
                            <Paperclip className="w-5 h-5" />
                        </button>
                        <button className="text-gray-500 hover:text-gray-700">
                            <ImageIcon className="w-5 h-5" />
                        </button>
                    </div>
                    <Button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg">
                        <Send className="w-4 h-4 mr-2" />
                        Send message
                    </Button>
                </div>
            </div>
        </div>
    )
}