import { useState } from 'react';
import { useNavigate  } from 'react-router-dom';
import styled from 'styled-components';

const SearchBar = () => {
  const navigate = useNavigate();

  const [search, setSearch] = useState('');
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    navigate(`/${search.toLowerCase().trim()}`);
  };
  return (
    <Search onSubmit={handleSubmit}>
      <div className="input">
        {/* <FontAwesomeIcon icon={faMagnifyingGlass} /> */}
        <input
          type="text"
          placeholder="Search by name or #"
          onChange={(event) => setSearch(event.currentTarget.value)}
        ></input>
      </div>
    </Search>
  );
};
const Search = styled.form`
  display: flex;
  flex-direction: column;
  align-items: left;
  justify-content: center;
  color: #000000;

  .input {
    display: flex;
    justify-content: left;
    width: 60vh;

    > input {
      cursor: text;
      text-align: left;
      width: 60vh;
      height: 45px;
      color: #24292e;
      border-radius: 5px;
      border: 1px solid #bababa;

      @media (max-width: 768px) {
        width: 60vh;
      }
    }
  }
`;

export default SearchBar;

