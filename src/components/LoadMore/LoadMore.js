import React from 'react';

const loadmore = (props) => {
    return (
        <div className="block content-1170 center-relative center-text top-50 bottom-50">
            <a target="_self" className="more-posts-portfolio" onClick={props.click} >
                <img src={props.url} alt="Load more" />
            </a>
        </div>
    );
}

export default loadmore;