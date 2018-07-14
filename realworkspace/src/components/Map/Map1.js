import React from 'react';
import './Map.css';

const Map = () => {
    return (
        <div id="map">
            <iframe 
                id="map-inner"
                width="100%"
                height="100%"
                frameBorder="0" 
                src="https://wesleynsc.carto.com/builder/7065d609-4e40-42c4-9839-329a94c5dcd4/embed" 
                allowFullScreen 
                webkitallowfullscreen="true" 
                mozallowfullscreen="true"
                oallowfullscreen="true"
                msallowfullscreen="true">
                </iframe>
        </div>
    )
};

export default Map;