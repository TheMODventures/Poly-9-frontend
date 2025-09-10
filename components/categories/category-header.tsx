import { BsFileEarmarkCheckFill } from "react-icons/bs";
import { MdRefresh } from "react-icons/md";
import { PiDownloadSimple } from "react-icons/pi";
import { RiDeleteBinLine } from "react-icons/ri";
import { TfiShare } from "react-icons/tfi";

export default function CollectionsHeader() {
  return (
    <div className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h1 className="text-4xl font-inter text-gray-900" style={{fontWeight:"700"}}>Living Room</h1>
        </div>
        
        <div className="flex items-center gap-2">
          <button className="p-1 cursor-pointer border border-gray-400 rounded-lg hover:bg-gray-100 transition">
            <MdRefresh className="h-5 w-5 text-gray-600" />
          </button>
          <button className="p-1 cursor-pointer border border-gray-400 rounded-lg hover:bg-gray-100 transition">
            <BsFileEarmarkCheckFill className="w-5 h-5 text-gray-600" />
          </button>
          <button className="p-1 cursor-pointer border border-gray-400 rounded-lg hover:bg-gray-100 transition">
            <RiDeleteBinLine className="w-5 h-5 text-gray-600" />
          </button>
          <div className="w-px h-6 bg-gray-300 mx-1" />
          <button className="p-1 cursor-pointer border border-gray-400 rounded-lg hover:bg-gray-100 transition">
            <PiDownloadSimple className="w-6 h-6 text-gray-600" />
          </button>
          <button className="p-1 cursor-pointer border border-gray-400 rounded-lg hover:bg-gray-100 transition">
            <TfiShare className="w-5 h-5 text-gray-700" />
          </button>
        </div>
      </div>
    </div>
  )
}