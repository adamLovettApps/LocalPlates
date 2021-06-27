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

            setTags(tagRes);
            setLoaded(true);

        })();
    }, []);

    const changeTags = (tag) => {

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
            <h3>Filter By</h3>
            {Object.keys(tags).map((key) => 
                <div>
                    <input type="checkbox" onClick={() => changeTags(tags[key].type)} id={tags[key].type} name={tags[key].type}></input><label for={tags[key].type}>{tags[key].type}</label>
                </div>
            )}
        </div>
    )
}

export default SearchFilter;