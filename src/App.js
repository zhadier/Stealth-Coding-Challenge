/* eslint-disable jsx-a11y/anchor-is-valid */
import {
  useEffect, useReducer, useState, Fragment,
} from 'react';
import { Dialog, Transition } from '@headlessui/react';
import {
  MenuAlt2Icon,
  XIcon,

} from '@heroicons/react/outline';
import {
  SearchIcon,
  UsersIcon,
  HomeIcon,
  InboxIcon,
  LightningBoltIcon,
  MailIcon,
  CogIcon,
} from '@heroicons/react/solid';
import axios from 'axios';
import FilterContext from './Store/filterContext';
import CurrentView from './components/CurrentView/CurrentView';

// Pre Built Tailwind configuration for Main Dashboard Layout with Sidebar
const navigation = [
  {
    name: 'Headquarters', href: '#', icon: HomeIcon, current: false,
  },
  {
    name: 'Accounts', href: '#', icon: UsersIcon, current: true,
  },
  {
    name: 'Tasks', href: '#', icon: InboxIcon, current: false,
  },
  {
    name: 'Signals', href: '#', icon: LightningBoltIcon, current: false,
  },
  {
    name: 'Settings', href: '#', icon: CogIcon, current: false,
  },
];

const classNames = (...classes) => classes.filter(Boolean).join(' ');

// Reducer Setup to get Data from API and pass it down depending on Status
const initialState = {
  viewList: [{ viewName: 'Users', filters: [] }],
  currentView: { viewName: 'Users', filters: [] },
  hidden: [],
};

const reducer = (state, action) => {
  console.log(action);
  switch (action.type) {
    case 'ADD VIEW': {
      return ({
        viewList: [
          ...state.viewList,
        ],
        ...state,
      });
    }
    case 'SET VIEW': {
      return ({
        ...state,
        currentView: state.viewList.filter((views) => views.viewName === action.payLoad)[0],
      });
    }
    case 'UPDATE VIEW': {
      const newState = {
        ...state,
        viewList: state.viewList.map((views) => {
          if (views.viewName === action.payLoad.viewName) {
            return action.payLoad;
          }
          return views;
        }),
        currentView: action.payLoad,
      };

      return newState;
    }

    case 'UPDATE HIDDEN': {
      const check = state.hidden.filter((item) => item !== action.payLoad);
      if (check.length < state.hidden.length) {
        return ({ ...state, hidden: check });
      }
      return ({
        ...state,
        hidden: [...state.hidden, action.payLoad],
      });
    }

    default: {
      return state;
    }
  }
};

const App = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  // State for getting ApiData
  const [companyAccounts, setCompanyAccounts] = useState([]);
  // State for Managing Loading and Errors
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  // Filter List state to keep Track of different Filterable Views
  const [viewState, dispatch] = useReducer(reducer, initialState);
  useEffect(() => async () => {
    try {
      const response = await axios.get('https://fastapi-stealth.herokuapp.com/company-accounts');
      setLoading(false);
      setError('');
      setCompanyAccounts(response.data);
    } catch (err) {
      setLoading(false);
      setError('Unexpected error, try reloading the page.');
    }
  }, []);

  if (loading) {
    return (<h1>Loading</h1>);
  }

  if (error !== '') {
    return (<span>{companyAccounts.error}</span>);
  }

  return (
    <div className="App">
      <Transition.Root show={sidebarOpen} as={Fragment}>
        <Dialog as="div" className="relative z-40 md:hidden" onClose={setSidebarOpen}>
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-600 bg-opacity-75" />
          </Transition.Child>

          <div className="fixed inset-0 flex z-40">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <Dialog.Panel className="relative flex-1 flex flex-col max-w-xs w-full pt-5 pb-4 bg-white">
                <Transition.Child
                  as={Fragment}
                  enter="ease-in-out duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in-out duration-300"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <div className="absolute top-0 right-0 -mr-12 pt-2">
                    <button
                      type="button"
                      className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                      onClick={() => setSidebarOpen(false)}
                    >
                      <span className="sr-only">Close sidebar</span>
                      <XIcon className="h-6 w-6 text-white" aria-hidden="true" />
                    </button>
                  </div>
                </Transition.Child>
                <div className="flex-shrink-0 flex items-center px-4">
                  <img
                    className="h-8 w-auto"
                    src="https://tailwindui.com/img/logos/workflow-mark.svg?color=indigo&shade=600"
                    alt="Workflow"
                  />
                </div>
                <div className="mt-5 flex-1 h-0 overflow-y-auto">
                  <nav className="px-2 space-y-1">
                    {navigation.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className={classNames(
                          item.current
                            ? 'bg-gray-100 text-gray-900'
                            : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900',
                          'group flex items-center px-2 py-2 text-base font-medium rounded-md',
                        )}
                      >
                        <item.icon
                          className={classNames(
                            item.current ? 'text-gray-500' : 'text-gray-400 group-hover:text-gray-500',
                            'mr-4 flex-shrink-0 h-6 w-6',
                          )}
                          aria-hidden="true"
                        />
                        {item.name}
                      </a>
                    ))}
                  </nav>
                </div>
              </Dialog.Panel>
            </Transition.Child>
            <div className="flex-shrink-0 w-14" aria-hidden="true">
              {/* Dummy element to force sidebar to shrink to fit close icon */}
            </div>
          </div>
        </Dialog>
      </Transition.Root>

      {/* Static sidebar for desktop */}
      <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0">
        {/* Sidebar component, swap this element with another sidebar if you like */}
        <div className="flex flex-col flex-grow border-r border-gray-200 pt-5 bg-white overflow-y-auto">
          <div className="mt-5 flex-grow flex flex-col">
            <nav className="flex-1 pb-4 space-y-1">
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className={classNames(
                    item.current ? 'bg-purple-100 text-purple-900' : 'text-gray-500 hover:bg-purple-50 hover:text-purple-900',
                    'group flex items-center px-4 py-2 text-sm font-medium rounded-md',
                  )}
                >
                  <item.icon
                    className={classNames(
                      item.current ? 'text-purple-500' : 'text-gray-400 group-hover:text-purple-500',
                      'mr-3 flex-shrink-0 h-6 w-6',
                    )}
                    aria-hidden="true"
                  />
                  {item.name}
                </a>
              ))}
            </nav>
          </div>
          <div className="flex-shrink-0 flex border-t p-4 pb-8">
            <div className="flex-shrink-0 w-full group block">
              <div className="flex items-center">
                <div>
                  <img
                    className="inline-block h-9 w-9 rounded-full"
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    alt=""
                  />
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900">Tom Cook</p>
                  <a href="#" className="text-xs font-medium text-gray-500 hover:bg-purple-50 hover:text-purple-900">tomcook@gmail.com</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="md:pl-64 flex flex-col flex-1">
        <div className="sticky top-0 z-10 flex-shrink-0 flex h-16 bg-white shadow">
          <button
            type="button"
            className="px-4 border-r border-gray-200 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 md:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <span className="sr-only">Open sidebar</span>
            <MenuAlt2Icon className="h-6 w-6" aria-hidden="true" />
          </button>
          <div className="flex-1 px-4 flex justify-between">
            <div className="flex-1 flex">
              <form className="w-full flex md:ml-0" action="#" method="GET">
                <p htmlFor="search-field" className="sr-only">
                  Search
                </p>
                <div className="relative w-full text-gray-400 focus-within:text-gray-600">
                  <div className="absolute inset-y-0 left-0 flex items-center pointer-events-none">
                    <SearchIcon className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <input
                    id="search-field"
                    className="block w-full h-full pl-8 pr-3 py-2 border-transparent text-gray-900 placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-0 focus:border-transparent sm:text-sm"
                    placeholder="Search"
                    type="search"
                    name="search"
                  />
                </div>
              </form>
            </div>
            <div className="ml-4 flex items-center md:ml-6">
              <button
                type="button"
                className="ml-3 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-purple-500 bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <MailIcon
                  className="mr-3 flex-shrink-0 h-6 w-6 text-gray-900 group-hover:text-purple-500"
                />
                Create
              </button>
              <a
                href="#"
                className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Help
              </a>
            </div>
          </div>
        </div>
        <FilterContext.Provider value={{
          state: viewState,
          dispatchView: dispatch,
        }}
        >
          <CurrentView
            data={companyAccounts}
            view={viewState.currentView}
          />
        </FilterContext.Provider>
      </div>
    </div>
  );
};

export default App;
