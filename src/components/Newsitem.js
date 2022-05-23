import React, { Component } from 'react'

export class Newsitem extends Component {
  render() {
      let {title,desc,imageUrl,newsUrl,author,publish,source}= this.props;
    return (
    <div className='my-3'>
      <div className="card" >
        <div  style={{display:"flex",justifyContent:"flex-end",position:'absolute',right:'0'}}>
        <span className="badge rounded-pill bg-danger">{source}</span>
        </div>
        <img src={!imageUrl?"https://img.huffingtonpost.com/asset/62855afd1e0000abe71b4fb5.jpeg?cache=qRkk5tFrpD&ops=1778_1000":imageUrl} className="card-img-top" alt="..."/>
        <div className="card-body">
          <h6 className="card-title">{title}</h6>
          <p className="card-text">{desc}</p>
          <p className="card-text"><small className="text-muted">By {!author ? "Unknown" : author} on  {new Date(publish).toGMTString()}</small></p>
          <a rel="noreferrer" href={newsUrl} target="_blank" className="btn btn-primary">Read More</a>
        </div>
      </div>
      </div>
    )
  }
}

export default Newsitem