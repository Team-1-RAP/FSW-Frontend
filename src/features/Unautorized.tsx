import { useNavigate } from "react-router-dom"

const Unauthorized = () => {
  const navigate = useNavigate()

  const goBack = () => navigate(-1)

  return (
    <div className="min-h-screen flex flex-grow items-center justify-center bg-gray-50">
      <div className="rounded-lg bg-white p-8 text-center shadow-xl">
        <h1 className="mb-4 text-4xl font-bold">Unauthorized</h1>
        <p className="text-gray-600">You do not have access to the requested page.</p>
        <button onClick={goBack} className="mt-4 inline-block rounded bg-blue-500 px-4 py-2 font-semibold text-white hover:bg-blue-600">
          Go back
        </button>
      </div>
    </div>
  )
}

export default Unauthorized
