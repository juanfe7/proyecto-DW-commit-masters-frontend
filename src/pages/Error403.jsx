const Error403 = () => {
    return (
      <div className="h-screen flex items-center justify-center bg-red-500 text-white">
        <h1 className="text-4xl font-bold">Error 403</h1>
        <p className="mt-4">Acceso denegado. No tienes permiso para acceder a esta página.</p>
      </div>
    )
  }
  
  export default Error403