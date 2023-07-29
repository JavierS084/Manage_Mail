

export const NotFound = () => {
  return (
    <div className="container-fluid">
  
    <div className="text-center">
        <div className="error mx-auto" data-text="404">404</div>
        <p className="lead text-gray-800 mb-5">Página no encontrada</p>
        <p className="text-gray-500 mb-0">Parece que encontraste una falla en la matriz...</p>
        <a href="/home">&larr;  Volver al inicio</a>
    </div>

</div>
  )
}

export default NotFound;