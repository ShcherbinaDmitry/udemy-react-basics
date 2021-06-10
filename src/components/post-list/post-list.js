import React from 'react';
import PostListItem from '../post-list-item';
import './post-list.css';

const PostList = ({posts, onDelete, onToggle}) => {

    const elements = posts.map((item, index) => {
        if (typeof(item) === "object" && isEmpty(item)) {
            return (
                <li key={item.id} className='list-group-item'>
                    <PostListItem 
                    {...item}
                    onDelete={() => onDelete(item.id)}
                    onToggleImportant={onToggle}
                    onToggle={onToggle}/>
                </li>
            )
        } else {
            return console.log(`Post data containts wrong information at index of ${index}`);
        }

        function isEmpty(obj) {
            // eslint-disable-next-line no-unused-vars
            for (let key in obj) {
                return (obj.hasOwnProperty('label') && obj.hasOwnProperty('id')) 
                ? obj.label !== '' : false;
            }
        }
    })

    return (
        <ul className='app-list list-group'>
            {elements}
        </ul>
    )
}


export default PostList;