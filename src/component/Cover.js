const Cover = ({title, image}) => {
  return (
    <div className="space-y-3 flex flex-col items-center">
      <div
        className="rounded-lg h-48 w-36"
        style={{
            backgroundImage:`url("${image}")`,
            backgroundPosition:'center',
            backgroundSize:'cover'
        }}
      />
      <p className="text-sm w-36" >{title}</p>
    </div>
  )
}

export default Cover