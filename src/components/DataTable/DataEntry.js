import React from 'react';

export const DataEntry = (props) => (
  <tr>
    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6">
      <div className="flex items-center">
        <div className="h-10 w-10 flex-shrink-0">
          <img className="h-10 w-10 rounded-full" src={props.image} alt="" />
        </div>
        <div className="ml-4">
          <div className="font-medium text-gray-900">{props.name}</div>
          <div className="text-gray-500">{props.email}</div>
        </div>
      </div>
    </td>
    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
      <div className="text-gray-900">{props.title}</div>
      <div className="text-gray-500">{props.department}</div>
    </td>
    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
      <span className="inline-flex rounded-full bg-green-100 px-2 text-xs font-semibold leading-5 text-green-800">
        Active
      </span>
    </td>
    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{props.role}</td>
    <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
      <a href="#" className="text-indigo-600 hover:text-indigo-900">
        Edit
        <span className="sr-only">
          ,
          {props.name}
        </span>
      </a>
    </td>
  </tr>
);
