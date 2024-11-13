import { useState } from 'react';
import { useData } from '../providers';
import styled from 'styled-components';

const STATUSES = ['Alive', 'Dead', 'Unknown'];
const GENDERS = ['Female', 'Male', 'Genderless', 'Unknown'];

export function Filter() {
  const { filter, setFilter, setActivePage } = useData();

  const [name, setName] = useState(filter.name || '');
  const [status, setStatus] = useState(filter.status || '');
  const [species, setSpecies] = useState(filter.species || '');
  const [type, setType] = useState(filter.type || '');
  const [gender, setGender] = useState(filter.gender || '');

  return (
    <FilterContainer>
      <FilterField>
        <FilterFieldLabel htmlFor="name">Name</FilterFieldLabel>
        <input
          id="name"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </FilterField>
      <FilterField>
        <FilterFieldLabel htmlFor="status">Status</FilterFieldLabel>
        <select
          id="status"
          name="status"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="">All</option>
          {STATUSES.map((el, index) => (
            <option key={index} value={el.toLowerCase()}>
              {el}
            </option>
          ))}
        </select>
      </FilterField>
      <FilterField>
        <FilterFieldLabel htmlFor="species">Species</FilterFieldLabel>
        <input
          id="species"
          name="species"
          value={species}
          onChange={(e) => setSpecies(e.target.value)}
        />
      </FilterField>
      <FilterField>
        <FilterFieldLabel htmlFor="type">Type</FilterFieldLabel>
        <input
          id="type"
          name="type"
          value={type}
          onChange={(e) => setType(e.target.value)}
        />
      </FilterField>
      <FilterField>
        <FilterFieldLabel htmlFor="gender">Gender</FilterFieldLabel>
        <select
          id="gender"
          name="gender"
          value={gender}
          onChange={(e) => setGender(e.target.value)}
        >
          <option value="">All</option>
          {GENDERS.map((el, index) => (
            <option key={index} value={el.toLowerCase()}>
              {el}
            </option>
          ))}
        </select>
      </FilterField>
      <FilterButtonWrapper>
        <button
          onClick={() => {
            const URLWithPage = new URL(window.location.href);

            URLWithPage.searchParams.set('page', 1);

            URLWithPage.searchParams.set('name', name);
            URLWithPage.searchParams.set('status', status);
            URLWithPage.searchParams.set('species', species);
            URLWithPage.searchParams.set('type', type);
            URLWithPage.searchParams.set('gender', gender);

            window.history.pushState(null, '', URLWithPage.href);
            setActivePage(0);
            setFilter({
              name: name || null,
              status: status || null,
              species: species || null,
              type: type || null,
              gender: gender || null
            });
          }}
        >
          Show
        </button>
      </FilterButtonWrapper>
      <FilterButtonWrapper>
        <button
          onClick={() => {
            const URLWithPage = new URL(window.location.href);

            URLWithPage.searchParams.delete('page');

            URLWithPage.searchParams.delete('name');
            URLWithPage.searchParams.delete('status');
            URLWithPage.searchParams.delete('species');
            URLWithPage.searchParams.delete('type');
            URLWithPage.searchParams.delete('gender');

            window.history.pushState(null, '', URLWithPage.href);
            setActivePage(0);
            setFilter({
              name: null,
              status: null,
              species: null,
              type: null,
              gender: null
            });

            setName('');
            setStatus('');
            setSpecies('');
            setType('');
            setGender('');
          }}
        >
          Clear
        </button>
      </FilterButtonWrapper>
    </FilterContainer>
  );
}

const FilterContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 16px;
`;

const FilterField = styled.div`
  display: flex;
  flex-direction: column;
`;

const FilterFieldLabel = styled.label`
  color: #fff;
  margin-bottom: 4px;
`;

const FilterButtonWrapper = styled(FilterField)`
  justify-content: flex-end;

  & button {
    background: rgb(21, 160, 187);
    padding: 0 4px;
    color: #fff;
    border: 2px solid rgb(21, 160, 187);
    cursor: pointer;
  }
`;
