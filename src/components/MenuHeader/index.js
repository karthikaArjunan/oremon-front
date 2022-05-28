import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { getAllCategory } from '../../actions';
import './style.css';
/**
* @author
* @function MenuHeader
**/

export const MenuHeader = (props) => {
    const category = useSelector(state => state.category);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getAllCategory());
    }, []);
     const onLinkClick=((e) =>{
        e.preventDefault();
        // further processing happens here
     });
    const renderCategories = (categories) => {
        let _categories = [];
        for (let category of categories) {
            _categories.push(
                <li key={category.name}>
                    {
                        category.parentId ? 
                        <a href={`/${category.slug}?cid=${category._id}&type=${category.type}`} >{category.name}</a> :
                            <span>{category.name}</span>
                    }
                    {category.children.length > 0 ? (<ul>{renderCategories(category.children)}</ul>) : null}
                </li>
            );
        }
        return _categories;
    }
    return (
        <div className='menuHeader'>
            <ul>
                {category.categories.length > 0 ? renderCategories(category.categories) : null}
            </ul>
        </div>
    )

}