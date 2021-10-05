import React from 'react';
import {origin} from '../DAL/http_Service';

export default function Image({urls}) {

    return (
        <img src={urls? `${origin}/recipes/images/${urls}`: '/no-image-icon.jpg'} alt="" />
            
    )
}
