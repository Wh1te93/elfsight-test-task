import axios from 'axios';
import { createContext, useContext, useEffect, useMemo, useState } from 'react';

const URL_PARAMS = new URLSearchParams(window.location.search);

const PAGE_FROM_URL = URL_PARAMS.get('page');

const FILTER_FROM_URL = {
  name: URL_PARAMS.get('name'),
  status: URL_PARAMS.get('status'),
  species: URL_PARAMS.get('species'),
  type: URL_PARAMS.get('type'),
  gender: URL_PARAMS.get('gender')
};

const API_URL = 'https://rickandmortyapi.com/api/character';

export function DataProvider({ children }) {
  const [activePage, setActivePage] = useState(
    PAGE_FROM_URL ? PAGE_FROM_URL - 1 : 0
  );
  const [filter, setFilter] = useState(FILTER_FROM_URL);
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
