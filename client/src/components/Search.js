import React, { useContext } from 'react';
import { FormControl } from 'react-bootstrap';
import { AppContext } from '../context/AppContext';

const Search = () => {
  const { setSearch } = useContext(AppContext);

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };
  return (
    <div>
      <FormControl
        onChange={handleSearch}
        type="text"
        placeholder="Search for a task..."
        className="mb-4"
      />
    </div>
  );
};

export default Search;
