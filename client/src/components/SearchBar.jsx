import PropTypes from "prop-types";
import styled from "styled-components";

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  width: 300px;
  margin: 0 auto;
`;

const SearchInput = styled.input`
  flex: 1;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
  outline: none;
`;

const SearchButton = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

const SearchBar = ({ placeholder, onSearch }) => {
  const handleSearch = (e) => {
    e.preventDefault();
    const query = e.target.elements.query.value;
    onSearch(query);
  };

  return (
    <form onSubmit={handleSearch}>
      <SearchContainer>
        <SearchInput type="text" name="query" placeholder={placeholder} />
        <SearchButton type="submit">Search</SearchButton>
      </SearchContainer>
    </form>
  );
};

SearchBar.propTypes = {
  placeholder: PropTypes.string.isRequired,
  onSearch: PropTypes.func.isRequired,
};

export default SearchBar;
