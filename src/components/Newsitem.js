import React, { Component } from 'react'

export class Newsitem extends Component {
  render() {
      let {title,desc,imageUrl,newsUrl}= this.props;
    return (
    <div className='my-4'>
      <div className="card" style={{width: "18rem"}}>
        <img src={!imageUrl?"https://img.huffingtonpost.com/asset/62855afd1e0000abe71b4fb5.jpeg?cache=qRkk5tFrpD&ops=1778_1000":imageUrl} className="card-img-top" alt="..."/>
        <div className="card-body">
          <h6 className="card-title">{title}</h6>
          <p className="card-text">{desc}</p>
          <a    rel="noreferrer" href={newsUrl} target="_blank" className="btn btn-primary">Read More</a>
        </div>
      </div>
      </div>
    )
  }
}

export default Newsitem