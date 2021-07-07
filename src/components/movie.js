import React, { Component } from 'react'

export default class movie extends Component {
    render() {
        return (
            <div>
                 {this.props.movieData.map((value, index) => (
          <ul key={index}>
            <li>
              Movie Title : {value.title}
            </li>
            <li>
              Movie overview :{value.overview}
            </li>
            <li>
              Averge Votes :{value.average_votes}
            </li><li>
              Total Votes :{value.total_votes}
            </li><li>
              Image : <img src={value.image_url} alt=''></img>
            </li><li>
              Popularity : {value.popularity}
            </li><li>
              Released Date :{value.released_on}
            </li>
          </ul>
        ))}

            </div>
        )
    }
}
