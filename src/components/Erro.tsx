const Erro = ({ userName }: { userName: string }) => {
    return (
      <div>
        <p>Usuário "{userName}" não encontrado!</p>
      </div>
    )
  }
  
  export default Erro;