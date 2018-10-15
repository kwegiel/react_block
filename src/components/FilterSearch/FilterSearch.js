import React from 'react';

import './FilterSearch.css';

const filtersearch = (props) => {
    return (
        <div className="search-bar">
            <input type="text" value={props.search} onChange={props.change} className="search-filter" placeholder="Search title and tag" />
            <button onClick={props.clear}>Clear</button>
        </div>
    );
}

export default filtersearch;