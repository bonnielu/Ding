// https://medium.com/@jerrylowm/buila-a-tags-input-react-component-from-scratch-1524f02acb9a

import React from "react";

const Input_tag = () => (
    // Component Wrapper
    <div className="input-tag">
        {/* // List of tags */}
        <ul className="input-tag__tags">
            {/* // Each tag */}
            <li>
                Tag
                {/* // Remove tag button */}
                <button type="button">Remove</button>
            </li>

            {/* // Actual Input to Add Tafs - Using <li> to have the input always inline</li> */}
            <li className="input-tag__tags__input">
                <input type="text" />
            </li>
        </ul>
    </div>
);