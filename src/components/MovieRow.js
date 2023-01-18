import React, {useState} from "react";
import './MovieRow.css';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

export default ({title, items}) => {
    const [scrollX, setScrollX] = useState(0)

    const handleLeftarrow = () => {

    }

    const handleRightarrow = () => {
        
    }
    return(
    <div className="movieRow">
        <h2>{title}</h2>
             
        <div className="movieRow--left" onClick={handleLeftarrow}>
            <NavigateBeforeIcon style={{fontSize: 50}}/>
        </div>

        <div className="movieRow--right" onClick={handleRightarrow}>
            <NavigateNextIcon style={{fontSize: 50}}/>
        </div>
        <div className="movieRow--listarea">
            <div className="movieRow--list" style={{
            marginLeft: scrollX,
            width: items.results.length * 150
        }}>
                {items.results.length > 0 && items.results.map((item, key)=> (
                    <div key ={key} className="movieRow--item">
                        <img src={`https://image.tmdb.org/t/p/w300${item.poster_path}`} alt={item.original_title}/>
                    </div>
                ))}
            </div>
        </div>
    </div>
    )
};