import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {getPeople} from './components/api/index'
import Craw from './components/Sections/Craw/craw';
import Main from './components/Sections/Main/main';
import TableSection from './components/Sections/Table/table';
import {filterbyGender, setCalcHeight, sortCharactersDescend, sortCharactersAscend, ToggleSortCha } from './state/actions/movies';
import { GetMovies, GetCharacters } from './state/actionsCreator/actionCreator';

function App() {
  const dispatch = useDispatch();
  const { movies, craw, sortTitle, Characters, defaultCharactersSort, checkboxValue } = useSelector(state => state.movies); 
  const [dropdownValue, setDropdownValue] = useState('');
  const [characters, setCharacters] = useState([]);
  const [height, setHeight] = useState([]);


  // console.log(height.map((x) => x.x))


  function toFeet(n) {
    var realFeet = ((n*0.393700) / 12);
    var feet = Math.floor(realFeet);
    var inches = (realFeet - feet) * 12;
    var newInches = inches?.toFixed(2)
    return feet + "ft/" + newInches + 'in'
  }

  useEffect(() => {
    setHeight([])
    for(let i = 0; i < Characters?.length; i++){       
      if(Characters[i].height){
        const num  = toFeet(Characters[i].height)
        console.log(num)
        setHeight(height => [...height, num])
      }
    }
  }, [])

  const handleFilter = () => {
    console.log(checkboxValue)
    const newArray = Characters.filter((x) => x.gender === checkboxValue)
    console.log(newArray)
  }

  // console.log(characters.filter((x) => x.gender === checkboxValue ))
  useEffect(() => {
    dispatch(GetMovies())
  }, [dispatch])


  useEffect(() => {
    setCharacters([])
    for(let i = 0; i < craw?.characters?.length; i++){
      const id = craw?.characters[i].slice(-3, -1).replace('/', '') 
      dispatch(GetCharacters(id))
      getPeople(`https://swapi.dev/api/people`, id).then(res => {
        setCharacters(oldArray => [...oldArray,res])
        
      })
    }
    
  }, [craw, dispatch, height])

  const handleTableSort = () => {
    if(defaultCharactersSort === 'Ascending') {
      dispatch(sortCharactersAscend())
    } else {
      dispatch(sortCharactersDescend())
      
    }
  }

  const ToggleCharacterSort = () => {
    dispatch(ToggleSortCha())
  }


  return (
    <main>
      <Main setDropdownValue={setDropdownValue}/>
      <Craw  dropdownValue={dropdownValue}/>
      <TableSection height={height} handleFilter={handleFilter} ToggleCharacterSort={ToggleCharacterSort} handleTableSort={handleTableSort} dropdownValue={dropdownValue} />  
    </main>
  );
}

export default App;
