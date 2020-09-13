import React from 'react';
import './tile.css';

function Tile(props) {
   // console.log(props)
  return (
    <div className="card">
        <div className="box">
        <p>{props.Text1} {props.TodayOrderCount}</p>
        <p>{props.Text2} {props.WeekOrderCount}</p>
       </div>
    </div>
  );
}

export default Tile;
