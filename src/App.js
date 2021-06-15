import { request } from './api/request.js'
import React, { useEffect, useState } from 'react'

function App() {
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('popularity');
  const [sortOrder, setSortOrder] = useState('desc')
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true)

  //default load top 6 most popular english language movies
  useEffect(() => {
    async function myFunc() {
      setIsLoading(true)
      const payload = {
        count: 6,
        params: [
          '&language=en-US',
          '&sort_by=popularity.desc'
        ]
      }
      try {
        const thing = await request(payload);
        //hardcoded to only 6 results, should be parameter/changeable
        setMovies(thing.results.slice(0, 6))
        setIsLoading(false)
      } catch (err) {
        console.log('uh oh', err)
      }
    }
    myFunc()
  }, []);


  return (
    <div className="h-screen bg-gray-400">
      {isLoading &&
        <div>loading...</div>
      }
      {!isLoading &&
        <div className='text-white'>
          {/* text search */}
          <label className="block">
            <input className="block mt-1 text-black form-input" placeholder="Search movie titles..." value={search} onChange={(e) => setSearch(e.target.value)} />
          </label>


          {/* sort order */}
          <div>current sort order: {sortOrder}</div>
          <div className="mt-2">
            <label className="inline-flex items-center">
              {/*shoulda curried */}
              <input checked={sortOrder === 'asc'} onChange={() => setFilter('asc')} type="radio" />
              <span className="ml-2">asc</span>
            </label>
            <label className="inline-flex items-center ml-6">
              <input checked={sortOrder === 'desc'} onChange={() => setFilter('desc')} type="radio" />
              <span className="ml-2">desc</span>
            </label>
          </div>

          {/* filter */}
          <div>current filter: {filter}</div>
          <div className="mt-2">
            <label className="inline-flex items-center">
            {/*shoulda curried */}
            <input checked={filter === 'popularity'} onChange={() => setFilter('popularity')} type="radio" />
              <span className="ml-2">popuplarity</span>
            </label>
            <label className="inline-flex items-center ml-6">
            <input checked={filter === 'rating'} onChange={() => setFilter('rating')} type="radio" />
              <span className="ml-2">rating</span>
            </label>
          </div>


          {movies.map((movie, i) =>
            <div key={i} className='text-white'>{movie.title}{console.log(movie)}</div>
          )}
        </div>

      }
    </div>
  );
}

export default App;
