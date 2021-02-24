import React  from 'react'
import {useHistory} from "react-router";
import {NavLink} from "react-router-dom";

export const Card = (props) => {

    const history = useHistory()


    console.log(props)
    const pressHandler = () => {
        history.push(`/detail/${props.item.nickname}`)
    }



    return(
        <div className="col s6 l6">
            <div className="card ">
                <div className={`card-image ${props.className}`}>
                    {props.item.image.length !== 0 && <img  className={`${props.className}__image`} src={props.item.image[0].path} />}
                </div>
                <div className="card-content">
                    <p>{props.item.nickname}</p>
                </div>
                <div className="card-action">
                    <NavLink
                        to={`/detail/${props.item.nickname}`}
                        className="card-action"
                    >
                        Do you want to know more?
                    </NavLink>
                </div>
            </div>
        </div>
    )
}