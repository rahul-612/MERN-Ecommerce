import React,{useState} from 'react'
import { useHistory } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';

const Search = () => {

    const [keyword,setKeyword]=useState("");
    const history=useHistory();

    const searchSubmitHandler = (e) => {
        e.preventDefault();
        if (keyword.trim()) {
          history.push(`/products/${keyword}`);
        //   setKeyword("");
        } else {
          history.push("/products");
        }
      };


  return (
    <form className="search_box flex" onSubmit={searchSubmitHandler}>
    <input
          type="text"
          className='search_text'
          placeholder="Type to search..."
          onChange={(e) => setKeyword(e.target.value)} />
    <button type="submit" className='search_btn'><SearchIcon /></button>
    
  </form>
  )
}

export default Search