/* eslint-disable react/forbid-prop-types */
import { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon, SelectorIcon } from '@heroicons/react/solid';

const classNames = (...classes) => classes.filter(Boolean).join(' ');

const SelectBox = (props) => {
  const {
    minWidth, options, onSelect, selected, placeHolder, multiple,
  } = props;
  let display;
  if (multiple) {
    const done = selected.map((val) => val?.name);
    display = selected.length ? done.join(', ') : placeHolder;
  } else {
    display = selected ? selected.name : placeHolder;
  }

  const isSelected = (id) => {
    if (multiple) {
      const currentlyActive = selected?.map((val) => val?.id);
      return currentlyActive.includes(id);
    }
    return selected?.id === id;
  };

  return (
    <Listbox
      value={selected}
      multiple={multiple}
      onChange={(val) => {
        onSelect(val);
      }}
    >
      {({ open }) => (
        <>
          <div className={`mt-1 relative min-w-[${minWidth}] max-w-[18rem]`}>
            <Listbox.Button className={`${!selected ? 'text-gray-300' : 'text-gray-900 font-normal'} bg-white relative w-full border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}>
              <span className="block truncate">{display}</span>
              <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                <SelectorIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
              </span>
            </Listbox.Button>

            <Transition
              show={open}
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                {options.map((option) => (
                  <Listbox.Option
                    key={option.id}
                    className={({ active }) => classNames(
                      active ? 'text-white bg-indigo-600' : 'text-gray-900',
                      'cursor-default select-none relative py-2 pl-3 pr-9',
                    )}
                    value={option}
                  >
                    {({ active }) => (
                      <>
                        <span className={classNames(isSelected(option.id) ? 'font-semibold' : 'font-normal', 'block truncate')}>
                          {option.name}
                        </span>

                        {isSelected(option.id) ? (
                          <span
                            className={classNames(
                              active ? 'text-white' : 'text-indigo-600',
                              'absolute inset-y-0 right-0 flex items-center pr-4',
                            )}
                          >
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </>
      )}
    </Listbox>
  );
};

SelectBox.defaultProps = {
  onSelect: () => {},
  selected: null,
  multiple: false,
  minWidth: '14rem',
};

SelectBox.propTypes = {
  minWidth: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.shape).isRequired,
  onSelect: PropTypes.func,
  selected: PropTypes.any,
  placeHolder: PropTypes.string.isRequired,
  multiple: PropTypes.bool,
};

export default SelectBox;
