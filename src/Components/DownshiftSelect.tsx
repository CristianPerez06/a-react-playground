import React, { ChangeEvent, useState } from 'react';
import Downshift from 'downshift';
import axios from 'axios';

const Select: React.FC = () => {
  // State
  const [movies, setMovies] = useState([]);

  const inputOnChange = (e: ChangeEvent<HTMLSelectElement>) => {
    if (!e.target.value) {
      return
    }
    fetchMovies(e.target.value)
  }

  // input field for the <Downshift /> component
  const downshiftOnChange = (selectedMovie: any) => {
    alert(`your favourite movie is ${selectedMovie.title}`);
  }

  // method to fetch the movies from the movies API
  const fetchMovies = (movieTitle: string) => {
    const moviesURL = `https://api.themoviedb.org/3/search/movie?api_key=1b5adf76a72a13bad99b8fc0c68cb085&query=${movieTitle}`;
    axios.get(moviesURL)
      .then(response => {
        console.log({...response.data})
        setMovies(response.data.results)
      })
  }

  return (
    <Downshift
      onChange={downshiftOnChange}
      itemToString={item => (item ? item.title : '')}
    >
      {/* pass the downshift props into a callback */}
      {({ selectedItem, getInputProps, getItemProps, highlightedIndex, isOpen, inputValue, getLabelProps }) => (
        <div>
          {/* add a label tag and pass our label text to the getLabelProps function */}
          <label style={{ marginTop: '1rem', display: 'block' }} {...getLabelProps()}>Choose your favourite movie</label> <br />
          {/* add a input tag and pass our placeholder text to the getInputProps function. We also have an onChange eventlistener on the input field */}
          <input
            {...getInputProps({
              placeholder: "Search movies",
              onChange: inputOnChange
            })}
          />
          {/* if the input element is open, render the div else render nothing */}
          {isOpen
            ? (
              <div className="downshift-dropdown">
                {
                  // filter the movies in the state
                  movies
                    .filter((item: any) => (!inputValue || item.title).toLowerCase().includes((inputValue || '').toLowerCase()))
                    .slice(0, 10) // return just the first ten. Helps improve performance
                    // map the filtered movies and display their title
                    .map((item: any, index) => (
                      <div
                        className="dropdown-item"
                        {...getItemProps({ key: index, index, item })}
                        style={{
                          backgroundColor: highlightedIndex === index ? 'lightgray' : 'white',
                          fontWeight: selectedItem === item ? 'bold' : 'normal',
                        }}
                      >
                        {item.title}
                      </div>
                    ))
                }
              </div>)
            : null}
        </div>
      )}
    </Downshift>
  )
}

const DownshiftSelect: React.FC = () => {
  return (
    <div className='h-50 w-50' style={{ backgroundColor: 'white', padding: 20 + 'px' }}>
      <Select />
    </div>
  )
}

export default DownshiftSelect;
