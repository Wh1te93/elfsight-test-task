import axios from 'axios';
import { createContext, useContext, useEffect, useMemo, useState } from 'react';

const urlParams = new URLSearchParams(window.location.search);

const page = urlParams.get('page');

const filterFromUrl = {
  name: urlParams.get('name'),
  status: urlParams.get('status'),
  species: urlParams.get('species'),
  type: urlParams.get('type'),
  gender: urlParams.get('gender')
};

const API_URL = 'https://rickandmortyapi.com/api/character';

export function DataProvider({ children }) {
  const [activePage, setActivePage] = useState(page ? page - 1 : 0);
  const [filter, setFilter] = useState(filterFromUrl);
  const [characters, setCharacters] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [isError, setIsError] = useState(false);
  const [info, setInfo] = useState({});
  const [apiURL, setApiURL] = useState(API_URL);

  const fetchData = async (url) => {
    setIsFetching(true);
    setIsError(false);

    axios
      .get(url, { params: { ...filter, page: activePage + 1 || null } })
      .then(({ data }) => {
        setIsFetching(false);
        setCharacters(data.results);
        setInfo(data.info);
      })
      .catch((e) => {
        setIsFetching(false);
        setIsError(true);
        console.error(e);
      });
  };

  useEffect(() => {
    fetchData(apiURL);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    apiURL,
    filter.gender,
    filter.name,
    filter.species,
    filter.type,
    filter.status,
    activePage
  ]);

  const dataValue = useMemo(
    () => ({
      activePage,
      setActivePage,
      apiURL,
      setApiURL,
      characters,
      isFetching,
      isError,
      info,
      filter,
      setFilter
    }),
    [
      activePage,
      apiURL,
      characters,
      isFetching,
      isError,
      info,
      filter,
      setFilter
    ]
  );

  return (
    <DataContext.Provider value={dataValue}>{children}</DataContext.Provider>
  );
}

const DataContext = createContext({});

export const useData = () => useContext(DataContext);
