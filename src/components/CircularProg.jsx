
import React from 'react';
// import './CircularProgressBar.css';

const CircularProgressBar = (props) => {
    const radius = 60; // Radius of the circle
    const strokeWidth = 5; // Width of the stroke
    const normalizedRadius = radius - strokeWidth / 2;
    const circumference = normalizedRadius * 2 * Math.PI;
    const strokeDashoffset = circumference - (props.progress / 100) * circumference;

    return (
        <svg style={{ marginTop: "1rem", position: 'relative', left: "10%" }} height={radius * 2} width={radius * 2}>
            <circle
                stroke="#e6e6e6"
                fill="transparent"
                strokeWidth={strokeWidth}
                r={normalizedRadius}
                cx={radius}
                cy={radius}
            />
            <circle
                stroke={props.stroke}
                fill="transparent"
                strokeWidth={strokeWidth}
                r={normalizedRadius}
                cx={radius}
                cy={radius}
                strokeDasharray={circumference + " " + circumference}
                style={{ strokeDashoffset }}
            />

            <text
                x="50%"
                y="50%"
                textAnchor="middle"
                alignmentBaseline="central"
                fontSize="1.1rem"
                fill="#4db8ff"
            >
                {props.progress}%
            </text>
            {/* <p>of total</p> */}
        </svg>
    );
};

export default CircularProgressBar;