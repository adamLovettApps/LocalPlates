import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getCurrentSelection } from "../../store/search"
import "./SearchFilter.css"


const SearchFilter = () => {
    const [loaded, setLoaded] = useState(false);
    const [tags, setTags] = useState();
    const [selectedTags, setSelectedTags] = useState([])
    const dispatch = useDispatch();

    useEffect(() => {
        (async() => {
            let res = await fetch('/api/search/getTags');
            let tagRes = await res.json();
            console.log(tagRes[1].id)
            setTags(tagRes);
            setLoaded(true);
            console.log("tags", tags)
        })();
    }, []);

    const changeTags = (tag) => {
        console.log(tag)
        if (selectedTags.includes(tag)) {
            let currentTags = selectedTags;
            const index = currentTags.indexOf(tag);
            if (index > -1) {
            currentTags.splice(index, 1);
            }
            setSelectedTags(currentTags);
        } else {
            let currentTags = selectedTags;
            currentTags.push(tag);
            setSelectedTags(currentTags);
        }

        dispatch(getCurrentSelection(selectedTags));
    }

    if (!loaded) {
        return null;
    }

    return (
        <div>
            <h3 className="filter-header">Filter By</h3>
            {Object.keys(tags).map((key) =>
                <div >
                    <input className="filer-checkbox" type="checkbox" onClick={() => changeTags(tags[key].type)} id={tags[key].type} name={tags[key].type}></input><  label for={tags[key].type} className="filer-checkbox" >{tags[key].type}</label>
                </div>
            )}
        </div>
    )
}

export default SearchFilter;
