import React from 'react'

const Input = React.forwardRef((props, ref) => {
  return (
    <div>
      <input ref={ref} {...props} className={`border border-gray-300 p-2 rounded-md w-full ${props.className}`} />
      {
        props.error && (
          <p className="text-red-700 text-sm">
            {props.error}
          </p>
        )
      }
    </div>
  )
})

export default Input
