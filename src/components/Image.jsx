import React from 'react';
import {origin} from '../DAL/http_Service';

export default function Image({urls}) {

    return (
        <img src={urls? `${origin}/recipes/images/${urls}`: null} alt="" />
            
    )
}
