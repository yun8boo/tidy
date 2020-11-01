const EmptyState = () => {
  return (
    <div className='container'>
      <div className='emptystate-wrapper'>
        <img src={'/add.svg'} alt=""/>
        <h3>読みたい記事を管理しよう</h3>
      </div>
      <style jsx>
        {`
          .container {
            display: flex;
            flex-direction: column;
            align-items: center;
            width: 100%;
          },
          .emptystate-wrapper {
            display: flex;
            flex-direction: column;
            align-items: center;
            width: 250px;
          }
          img {
            width: 100%;
            height: 100%;
          }
        `}
      </style>
    </div>
  )
}

export default EmptyState