import react from 'react'

const FilterForm = ({filterTextValue, filterTextOnChange}) => {
    return(
      <div>
        filter shown with: <input value={filterTextValue} onChange={filterTextOnChange}/>
      </div>
    )
  }

export default FilterForm