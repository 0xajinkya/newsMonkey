import React, { Component } from 'react';

const Newsitem = (props) => {

        // const {title, description, imageUrl, newsUrl, date, author, source } = props;
        let a = new Date(props.author);
        let c = a.getDate();
        let d = a.getMonth();
        return (
            <div className="my-3 text-center">
                <div className="card" style={{ width: '18rem', borderRadius: '10px 10px' }}>

                    <span class="position-absolute top-0 translate-middle badge rounded-pill bg-dark" style={{ zIndex: 1, left:'90%'}}>
                        {props.source}
                    </span>
                    <img src={!props.imageUrl ? "https://i.guim.co.uk/img/media/6c988c300fb7c572ac7de984ebfd7ac9c325211a/0_56_3000_1800/master/3000.jpg?width=1200&height=630&quality=85&auto=format&fit=crop&overlay-align=bottom%2Cleft&overlay-width=100p&overlay-base64=L2ltZy9zdGF0aWMvb3ZlcmxheXMvdGctb3BpbmlvbnMucG5n&enable=upscale&s=fa133a0e852c5cb3b11b3efcb0e3a2bf" : props.imageUrl} className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title">{props.title}...</h5>

                        <p className="card-text">{props.description}...</p>
                        <div className="d-flex justify-content-start card-text">
                            <p className="text-muted">By : {!props.author ? "Unknown" : props.author} on Date : {new Date(props.date).toGMTString().slice(0, 11)} </p>
                        </div>
                        <a href={props.newsUrl} target="_blank" className="btn btn-sm btn-primary">Read More...</a>
                    </div>
                </div>

            </div>
        )
}

export default Newsitem


