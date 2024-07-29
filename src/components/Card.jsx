import React from 'react'

const Card = ({weather}) => {
  return (
    <div>
        <h2>{weather.forcast.forecastday.}</h2>
    </div>
  )
}

export default Card