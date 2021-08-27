import React from "react";


function rank(props:any) {

return(
  <li className="nav-item dropdown">
    <a className="nav-link active" data-bs-toggle="collapse" href={props.target} role="button" aria-expanded="false" aria-controls="collapseExample">
      {props.text}</a>
  </li>);
}

export default rank;