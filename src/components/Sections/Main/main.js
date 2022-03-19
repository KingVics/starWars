import "../../../styles/main.css"
import { useDispatch, useSelector } from 'react-redux';
import {sortMovies, sortMoviesNewest } from '../../../state/actions/movies';
import { GetCraws } from '../../../state/actionsCreator/actionCreator';



const Main = ({setDropdownValue}) => {
    const dispatch = useDispatch();
    const { movies, status, sortTitle } = useSelector(state => state.movies); 

    const handleGetFirm = (e) => {
        const index = e.target.selectedIndex
        const el = e.target.childNodes[index]
        const id =  el.getAttribute('id');
        setDropdownValue(e.target.value)
        if(id > 0) {
          dispatch(GetCraws(id))
        }
      }
    
      const handleSort = (e) => { 
        if(sortTitle === 'earliest to newest') {
          dispatch(sortMovies())
        } else {
          dispatch(sortMoviesNewest())
        }
      }
    return (
        <section className="MainHeader">
            <div className="MainSelectContainer">
                <select onChange={handleGetFirm} >
                    <option>Select a movie</option>
                    {movies?.map((movie, i) => (
                        <option key={i}  id={i + 1}>{movie.title}</option>
                    ))}
                </select>
                <div>
                    <button  disabled={status === 'loading'} onClick={handleSort}>{status === 'loading' ? 'Loading movies' : `Sort by: ${sortTitle}`}</button>
                </div>            
            </div>
        </section>
    )
}

export default Main;