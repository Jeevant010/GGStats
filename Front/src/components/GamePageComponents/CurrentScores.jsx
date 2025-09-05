import React from 'react'

const CurrentScores = () => {
  return (
    <div className='bg-blue-200 w-full min-h-screen'>
    <div className='heading text-3xl font-bold text-white  p-4 bg-yellow-300'>
      Live Scores
    </div>

    <div className='games-category bg-white flex p-2 overflow-x-auto whitespace-nowrap'>
      <button className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 m-4'>
        All Games
      </button>
      <button className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 m-4'>
        Valorant
      </button>
      <button className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 m-4'>
        CS:GO
      </button>
      <button className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 m-4'>
        League of Legends
      </button>
      <button className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 m-4'>
        Dota 2
      </button>
      <button className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 m-4'>
        Overwatch
      </button>
      <button className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 m-4'>
        Fortnite
      </button>
      <button className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 m-4'>
        Apex Legends
      </button>
      <button className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 m-4'>
        Rainbow Six Siege
      </button>
      <button className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 m-4'>
        Call of Duty
      </button>
      <button className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 m-4'>
        Rocket League
      </button>
      <button className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 m-4'>
        PUBG
      </button>
      <button className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 m-4'>
        Hearthstone
      </button>
      <button className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 m-4'>
        StarCraft II
      </button>
    </div>

    <div className='flex flex-col md:flex-row bg-blue-800'>
      <div className='score-cards bg-green-300 rounded-lg shadow-lg p-6 m-4  h-full md:w-1/2'>

      <div className='tournaments flex p-1 overflow-x-auto whitespace-nowrap bg-white'>


       <button className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 m-4'>
        Ongoing Tournaments
       </button>
       <button className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 m-4'>
        Upcoming Tournaments
       </button>
       <button className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 m-4'>
        Past Tournaments
       </button>    
       <button className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 m-4'>
        Local Tournaments
       </button>
        <button className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 m-4'>
        International Tournaments
       </button>
       <button className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 m-4'>  
        Online Tournaments
        </button>


      </div>
      

      <div className='card-1 mb-12'>
        <h2 className='text-2xl font-semibold mb-4'>Game 1</h2>
        <p className='text-xl'>Score</p></div>


        <div className='card-2 mb-12'>
          <h2 className='text-2xl font-semibold mb-4'>Game 2</h2>
          <p className='text-xl'>Score</p></div>



        <div className='card-3 mb-12'>
          <h2 className='text-2xl font-semibold mb-4'>Game 3</h2>
           <p className='text-xl'>Score</p></div>


        <div className='card-4 mb-12'>
          <h2 className='text-2xl font-semibold mb-4'>Game 4</h2>
         <p className='text-xl'>Score</p></div>
    </div>

    <div className='score-cards bg-zinc-600 rounded-lg shadow-lg p-6 m-4 h-full md:w-1/2 '>
    <p>Display selected match details </p>
    </div>
    </div>

    

    </div>
  )
}


export default CurrentScores