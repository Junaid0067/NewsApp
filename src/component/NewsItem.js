import React, { Component } from 'react'


export class NewsItem extends Component {
    constructor() {
        super();
        this.state = {
            shadow: "0 0 0 0"
        }
    }
    handleMouseEnter = ()=>{
        this.setState({
            shadow: "0 10px 50px 0 rgb(94, 109, 7)"
        })
    }
    handleMouseLeave = ()=>{
        this.setState({
            shadow: "0 0 0 0"
        })
    }
    
    render() {
        


        let { title, description, imgUrl, newsUrl, publishedAt, author, source } = this.props;

        return (
            <div className='my-3'>
                <div onMouseEnter={this.handleMouseEnter} onMouseLeave={this.handleMouseLeave} className="card mb-3" style={{border: "none", boxShadow: this.state.shadow}}>
                    
                    <span class="position-absolute top-0 translate-middle badge rounded-pill bg-danger" style={{ left: "90%", zIndex: '1' }}>
                        {source} </span>
                    <img style={{ border: "none"}} src={imgUrl ? imgUrl : "news.jpg"} className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title">{title}</h5>
                        <p className="card-text">{description}...</p>
                        <p className="card-text"><b>Author:</b> {author}</p>
                        <p className="card-text"><b>Published at:</b> {new Date(publishedAt).toGMTString()}</p>
                        <div className="align-self-end">
                            <a style={{boxShadow: this.state.shadow}} rel="noreferrer" href={newsUrl} target="_blank" className="btn btn-sm btn-dark">Read More at {source}</a>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default NewsItem
