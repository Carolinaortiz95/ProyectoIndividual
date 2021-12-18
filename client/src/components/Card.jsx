import React from "react";
import { Link } from "react-router-dom";


export default function Card({name, diet, image, id}) {
    return(
        <div>
            <Link to={`recipes/${id}`}></Link>
            <h3>{name}</h3>
            {diet.map((e)=><h5>{e.name}</h5>)}
            <img src={image} alt="img not found"/>
        </div>
    );
}