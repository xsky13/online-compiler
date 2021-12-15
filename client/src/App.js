import React, { useState, Fragment } from 'react';
import axios from 'axios';
import Editor from "@monaco-editor/react";
import { Menu, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/solid';

const App = () => {
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState('cpp');
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    const payload = {
      language,
      code
    };

    try {
      const { data } = await axios.post('http://localhost:5000/run', payload);
      setOutput(data.output);
      setLoading(false);
    } catch ({ response }) {
      if (response) {
        setLoading(false);
        setOutput(response.data.err.stderr);

        // console.log(err);
      } else {
        setOutput("Sorry, there was a server error");
      }
    }
  };

  return (
    <div className="block m-auto w-10/12">
      <div className="flex w-full justify-center">
        <Editor
          width="50%"
          height="90vh"
          theme="vs-dark"
          language={language === "py" ? "python" : "cpp"}
          value={code}
          onChange={value => setCode(value)}
        />
        <div className="w-1/2 bg-black text-white font-mono">{loading ? 'Loading...' : output}</div>
      </div>
      <div className="flex">
        <button onClick={handleSubmit} className="mt-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Submit</button>
        <div className="ml-5 text-right relative z-50">
          <Menu as="div" className="relative inline-block text-left">
            <div>
              <Menu.Button className="mt-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                {language === 'cpp' ? 'C++' : 'Python'}
                <ChevronDownIcon
                  className="w-5 h-5 ml-2 -mr-1 text-violet-200 hover:text-violet-100"
                  aria-hidden="true"
                />
              </Menu.Button>
            </div>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="absolute bottom-12 right-0 w-56 mt-2 origin-bottom-left bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div className="px-1 py-1 ">
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        className={`${active ? 'bg-indigo-500 text-white' : 'transition text-gray-900'
                          } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                        onClick={() => setLanguage('cpp')}
                      >
                        C++
                      </button>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        className={`${active ? 'bg-indigo-500 text-white' : 'transition text-gray-900'
                          } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                        onClick={() => setLanguage('py')}
                      >
                        Python
                      </button>
                    )}
                  </Menu.Item>
                </div>
              </Menu.Items>
            </Transition>
          </Menu>
        </div>
      </div>
    </div>
  )
}

export default App;
