import React from 'react';
import PostListItem from '../post-list-item';
import './post-list.css';

const PostList = ({posts, onDelete, onToggleImportant, onToggleLiked}) => {

    const elements = posts.map((item, index) => {
        if (typeof(item) === "object" && isEmpty(item)) {
            const {id, ...itemProps} = item
            return (
                <li key={id} className='list-group-item'>
                    <PostListItem 
                    {...itemProps}
                    onDelete={() => onDelete(id)}
                    onToggleImportant={() => onToggleImportant(id)}
                    onToggleLiked={() => onToggleLiked(id)}/>
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