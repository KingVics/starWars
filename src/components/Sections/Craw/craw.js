import "../../../styles/craw.css"
import { useSelector } from 'react-redux';


const Craw = ({dropdownValue}) => {
    const {craw } = useSelector(state => state.movies); 

    return (
        <>
        {craw && dropdownValue !== "Select a movie" ? (
            <div  className="crawMain">
                <div className="crawContent">
                    <div style={{height: '100%', overflow: 'hidden'}}>
                        <p>{craw && dropdownValue !== "Select a movie" ? craw?.opening_crawl : ''}</p>
                    </div>
                </div>
            </div>
        ) : ''}
        </>
    )
}

export default Craw;