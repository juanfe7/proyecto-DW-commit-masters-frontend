const Error403 = () => {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-white text-center">
        <h1 className="text-6xl font-bold text-red-600 mb-4">403</h1>
        <p className="text-2xl text-gray-800 mb-2">Acceso denegado</p>
        <p className="text-md text-gray-600">No tienes permiso para ver esta página.</p>
      </div>
    )
  }
  
  export default Error403
  