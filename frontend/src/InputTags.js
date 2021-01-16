// https://medium.com/@jerrylowm/buila-a-tags-input-react-component-from-scratch-1524f02acb9a

import React from "react";

const InputTag = () => {
    const [tags, setTags]=
React.useState([
    'Tags',
    'Input'
]);

    const removeTag = (i) => {
        const newTags = [ ...tags ];
        newTags.splice(i, 1);

        // Call the defined functionsetTags wjocj will replace the tags
        //  with a new value
        setTags(newTags);

    };

    const inputKeyDown = (e) => {
        if (e.key === 'Enter' && val) {
            if (tags.find(tag => tag.toLowerCase() ===
            val.toLowerCase())) {
                return;
            }
            setTags([...tags, val]);
            tagInput.value = null;
        } else if (e.key === 'Backspace' && !val) {
            removeTag(tags.length - 1);
        }
    };

    return (
        <div className="input-tag">
            <ul ClassName="input-tag__tags">
                { tags.map((tag, i) => (
                    <li key={tag}>
                        {tag}
                        <button type="button"
                        onClick={() => { removeTag(i);}}>+</button>
                    </li>
                ))}
                <li classNanme="input-tag__tags__input"><input type="text" 
                onKeyDown={inputKeyDown} ref={c => {tagInput = c; }}/>
                </li>
            </ul>
        </div>
    );
}

ReactDom.render(
    <InputTag />,
    document.getElementById('content')
);





// const InputTag = () => (
//     // Component Wrapper
//     <div className="input-tag">
//         {/* // List of tags */}
//         <ul className="input-tag__tags">
//             {/* // Each tag */}
//             <li>
//                 Tag
//                 {/* // Remove tag button */}
//                 <button type="button">Remove</button>
//             </li>

//             {/* // Actual Input to Add Tafs - Using <li> to have the input always inline</li> */}
//             <li className="input-tag__tags__input">
//                 <input type="text" />
//             </li>
//         </ul>
//     </div>
// );