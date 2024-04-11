import React from 'react'


function MainLoader() {
  return (
    <div
    style={{   
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <div
        className='spinner-border text-warning'
        style={{
            width: "4rem",
            height: "4rem"
        }}>
        </div>
    </div>
  )
}

export default MainLoader
