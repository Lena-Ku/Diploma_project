import React from 'react';


function SearchForm({setSearch, search, handleSearchSubmit}) {

    function handleSearchChange(e) {
        setSearch(e.target.value)
    }

    return (
        <>
           <form className="searchForm">
               <input className="searchForm__input" type="text" name="search" placeholder="Введите тему новости" 
               onChange={handleSearchChange} value={search} required></input>
               <button className="searchForm__button" type="submit" onClick={handleSearchSubmit}>Искать</button>
           </form>
        </>
    )
}

export default SearchForm;