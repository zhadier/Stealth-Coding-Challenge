import { useEffect, useReducer } from 'react';
import axios from 'axios';
import DataTable from './components/DataTable/DataTable';
import './App.css';

const initialState = {
  loading: true,
  error: '',
  data: [],
  filters: {},
  hidden: {},
};

const reducer = (state, action) => {
  switch (action.type) {
    case ('SUCCESS'):
      return {
        ...state,
        loading: false,
        data: action.payload,
      };

    case ('ERROR'):
      return {
        ...state,
        loading: false,
        error: 'Failed to connect to the API!',
        data: {},
      };
    default:
      return state;
  }
};

const App = () => {
  const [companyAccounts, dispatch] = useReducer(reducer, initialState);

  useEffect(() => async () => {
    try {
      const response = await axios.get('http://127.0.0.1:3000/company-accounts');
      dispatch({ type: 'SUCCESS', payload: response.data });
    } catch (err) {
      dispatch({ type: 'ERROR' });
    }
  }, []);

  if (companyAccounts.loading) {
    return (<h1>Loading</h1>);
  }

  if (companyAccounts.error !== '') {
    return (<span>{companyAccounts.error}</span>);
  }

  return (
    <div className="App">
      <DataTable dataList={companyAccounts.data} />
    </div>
  );
};

export default App;
