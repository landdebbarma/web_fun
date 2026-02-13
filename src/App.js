import React from 'react';

function App() {
  return React.createElement('div', {
    className: "bg-gradient-to-br from-blue-50 to-indigo-100 min-h-screen"
  }, 
    React.createElement('div', {
      className: "container mx-auto px-4 py-8"
    }, [
      React.createElement('header', {
        key: 'header',
        className: "text-center mb-12"
      }, [
        React.createElement('h1', {
          key: 'h1',
          className: "text-5xl font-bold text-blue-600 mb-4 animate-pulse"
        }, "Welcome to React with Tailwind"),
        React.createElement('p', {
          key: 'p',
          className: "text-xl text-gray-700 max-w-2xl mx-auto"
        }, "This is a React application with Tailwind CSS styling.")
      ]),
      
      React.createElement('main', {
        key: 'main',
        className: "grid md:grid-cols-2 gap-8 max-w-6xl mx-auto"
      }, [
        React.createElement('section', {
          key: 'section1',
          className: "bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300"
        }, [
          React.createElement('h2', {
            key: 'h2-1',
            className: "text-2xl font-semibold text-gray-800 mb-4"
          }, "React Features"),
          React.createElement('ul', {
            key: 'ul-1',
            className: "space-y-2 text-gray-600"
          }, [
            React.createElement('li', {
              key: 'li-1',
              className: "flex items-center"
            }, [
              React.createElement('span', {
                key: 'span-1',
                className: "text-green-500 mr-2"
              }, "✓"),
              "Component-Based"
            ]),
            React.createElement('li', {
              key: 'li-2',
              className: "flex items-center"
            }, [
              React.createElement('span', {
                key: 'span-2',
                className: "text-green-500 mr-2"
              }, "✓"),
              "Virtual DOM"
            ]),
            React.createElement('li', {
              key: 'li-3',
              className: "flex items-center"
            }, [
              React.createElement('span', {
                key: 'span-3',
                className: "text-green-500 mr-2"
              }, "✓"),
              "Hooks & State"
            ])
          ])
        ]),
        
        React.createElement('section', {
          key: 'section2',
          className: "bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300"
        }, [
          React.createElement('h2', {
            key: 'h2-2',
            className: "text-2xl font-semibold text-gray-800 mb-4"
          }, "Technologies"),
          React.createElement('div', {
            key: 'div-tech',
            className: "flex flex-wrap gap-2"
          }, [
            React.createElement('span', {
              key: 'tech-1',
              className: "px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
            }, "React"),
            React.createElement('span', {
              key: 'tech-2',
              className: "px-3 py-1 bg-cyan-100 text-cyan-800 rounded-full text-sm"
            }, "JSX"),
            React.createElement('span', {
              key: 'tech-3',
              className: "px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm"
            }, "Tailwind"),
            React.createElement('span', {
              key: 'tech-4',
              className: "px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-sm"
            }, "Bun")
          ])
        ])
      ]),
      
      React.createElement('footer', {
        key: 'footer',
        className: "text-center mt-12 text-gray-600"
      }, 
        React.createElement('button', {
          className: "bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg transition-colors duration-200"
        }, "Get Started with React")
      )
    ])
  );
}

export default App;
