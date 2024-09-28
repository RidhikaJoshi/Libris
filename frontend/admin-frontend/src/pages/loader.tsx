
export default function Loader() {

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="relative w-24 h-24">
        <div className="absolute top-0 left-0 right-0 bottom-0 rounded-full border-4 border-t-transparent border-b-transparent border-gray-700 animate-spin"></div>
        <div className="absolute top-0 left-0 right-0 bottom-0 rounded-full border-4 border-l-transparent border-r-transparent border-indigo-500 animate-spin-slow"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-gray-900 rounded-full flex items-center justify-center">
          <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center">
            <div className="w-12 h-12 bg-gray-700 rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  )
}