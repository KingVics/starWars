import "../../../styles/tableSection.css"
import { setCheckboxValue } from '../../../state/actions/movies';
import { useDispatch, useSelector } from 'react-redux';




const TableSection = ({ToggleCharacterSort, dropdownValue, handleTableSort, handleFilter, height}) => {
    const dispatch = useDispatch();
    const { gettingcraw, craw, Characters, defaultCharactersSort, checkboxValue } = useSelector(state => state.movies); 

    console.log(height)
    return (
        <section className='TabelSectionMain'>
            {craw && dropdownValue !== "Select a movie" ? (
                <>
                    <div>
                    {height.map((x) => (
                        <p>{x}</p>        
                    ))}
                    </div>
                    
                        
                    <div className="TableFilter">
                        <p>Filter by Gender: </p>
                        <div>
                            
                            <label htmlFor='male'  onClick={handleFilter}>Male
                                {/* <button onClick={handleFilter}>Male</button> */}
                                <input  id="male" type="checkbox" name="male" value="male"  checked={checkboxValue === 'male'} onChange={(e) => dispatch(setCheckboxValue(e.target.value))}/>
                            </label>
                            <label htmlFor='female' onClick={handleFilter}>
                                Female
                                <input id="female" type="checkbox" name="female" value="female"  checked={checkboxValue === 'female'} onChange={(e) => dispatch(setCheckboxValue(e.target.value))} />
                            </label>
                            <label htmlFor='others' onClick={handleFilter}>
                                Others
                                <input  style={{display: 'none'}} id="others" type="checkbox" name="others" value="others"  checked={checkboxValue === 'others'} onChange={(e) => dispatch(setCheckboxValue(e.target.value))} />
                            </label>
                        </div>
                        <p> Sort by: {defaultCharactersSort} (Double Click header to sort by {defaultCharactersSort === 'Ascending' ? 'descending' : 'ascending'})</p>
                    </div>
                    <div style={{display: 'flex'}}>
                        <table>
                            <thead onDoubleClick={ToggleCharacterSort} onClick={handleTableSort}>
                            <tr>
                                <th>Name</th>
                                <th>Height</th>
                                <th>Gender</th>
                                <th> {Characters?.length} Characters</th>
                            </tr>
                            </thead>
                            <tbody>
                                {Characters?.map((data, i) => (
                                    <tr key={i}>
                                    <td>{data?.name}</td>
                                    <td>{ Math.floor((data?.height *0.393700) / 12)}ft/{((((data?.height *0.393700) / 12) - Math.floor(((data?.height *0.393700) / 12))) * 12)?.toFixed(2)}in</td>
                                    <td>{data?.gender}</td>
                                    </tr>
                                ))}
                                 {height.map((x) => (
                                         
                                        <tr>
                                            <td>{x}</td>  
                                        </tr>     
                                ))}
                            </tbody>
                        </table>
                    </div>

                </>
            ) : ('')}
        </section>
    )
}

export default TableSection;