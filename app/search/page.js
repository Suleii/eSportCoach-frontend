"use client"
import SearchPage from '../../components/SearchPage';


function Search() {
    const urlParams = new URLSearchParams(window.location.search); // window.location is use because useRouter not mount correctly
    const searchQuery = urlParams.get('search'); // Extract the value of search query input into Home.js

    return <SearchPage searchQuery={searchQuery} />; // searchQuery is a prop of SearchPage
}

export default Search;
