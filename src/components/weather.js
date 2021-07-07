import React, { Component } from 'react'

export default class weather extends Component {
    render() {
        return (
            <div>
                {this.props.weatherData.map((value, index) => (
          <ul key={index}>
            <li>
              {value.date}
            </li>
            <li>
              {value.description}
            </li>
          </ul>
        ))}
            </div>
        )
    }
}
