import { useState, useEffect } from "react";
import axios from "axios";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'


export default function Game() {
  
const MySwal = withReactContent(Swal)

//MySwal.fire({
//  title: <p>Game Over!</p>,
//  showConfirmButton: false,
//  backdrop: false,
//})
    const [id, setId] = useState("")
    useEffect(() => {
      async function startGame() {
        try {
          const response = await axios.post("http://localhost:5000/api/v1/game/start");
          setId(response.data.id);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }
      
      startGame();


    }, []);
    function Form() {
        const [guess, setGuess] = useState("");
      
        const handleSubmit = (event) => {
          event.preventDefault();
          async function sendGuess() {
            try {
              const response = await axios.patch(`http://localhost:5000/api/v1/game/guess/${id}?guess=${guess}`);
              if(response.data.win == true) {
                const MySwal = withReactContent(Swal)

                  MySwal.fire({
                    title: `Game over! You have won in ${response.data.guessesC} guesses, congrats!<br />Station: ${response.data.station}<br /><br />
                    <a href="https://nrdepartures.deveroonie.uk/departures/${response.data.station}?utm_source=external_crsdle&utm_medium=link&utm_campaign=view_departures" target="_blank" rel="noopener">View Live Departures</a>`,
                    confirmButtonText: "Play Again",

                  }).then((result) => {
                    if (result.isConfirmed) {
                      window.location.reload(false);
                    } 
                  });
              } else if(response.data.guessesC >= 6) {
                MySwal.fire({
                  title: `Game over! You have run out of guesses.<br />
                  Station: ${response.data.station} (${response.data.crs.toUpperCase()})
                  <br /><br />
                  <a href="https://nrdepartures.deveroonie.uk/departures/${response.data.station}?utm_source=external_crsdle&utm_medium=link&utm_campaign=view_departures" target="_blank" rel="noopener">View Live Departures</a>`,
                  confirmButtonText: "Play Again",

                }).then((result) => {
                  if (result.isConfirmed) {
                    window.location.reload(false);
                  } 
                });
              }
              if(response.data.failed == true) {
                  console.log("H")
                  const MySwal = withReactContent(Swal)

                  MySwal.fire({
                    title: response.data.error,
                    toast: true,
                    icon: 'error',
                    position: 'top-right',
                  })
              }

              
              const mappedData = response.data.result.map(item => {
                const colorMap = {
                  red: '#f54040',
                  yellow: '#ffa600',
                  green: '#55b533'
                };
              
                // Assuming item.color is one of 'red', 'yellow', or 'green'
                const dynamicColor = colorMap[item.color];
              
                return `
                  <div className="place-items-center" style="border-style: solid; border-width: 2px; border-color: rgb(255 255 255); background-color: ${dynamicColor};">
                    ${item.letter.toUpperCase()}<br /><br />
                  </div>
                `;
              });
              
              document.getElementById(`guess-${response.data.guessesC}`).innerHTML = mappedData.join('');
            } catch (error) {
             // const MySwal = withReactContent(Swal)
             //     MySwal.fire({
             //       title: "An error occoured - is the CRS code valid?",
             //     })
            }
          }
          sendGuess()
        }
      
        return (
          <form onSubmit={handleSubmit} className='flex flex-col justify-center items-center'>
              <input 
                type="text" 
                value={guess}
                placeholder="The station name"
                onChange={(e) => setGuess(e.target.value)}
                required
                className="p-4 rounded-lg"
                minLength={3}
                maxLength={3}
              /><br /><br />
          </form>
        )
      }
    return (
      <><div>
        <div className="grid grid-cols-1 grid-rows-6 gap-2 w-96">
          <div>
            <div className="grid grid-cols-3 grid-rows-1 gap-1 text-white text-center font-bold" id="guess-1">

              <div className="border-solid border-white border-2 bg-gray-700">
                <br /> <br />
              </div>
              <div className="border-solid border-white border-2 bg-gray-700">
                <br /> <br />
              </div>
              <div className="border-solid border-white border-2 bg-gray-700">
                <br /> <br />
              </div>

          </div>
        </div>
        <div>
          <div className="grid grid-cols-3 grid-rows-1 gap-1 text-white text-center font-bold" id="guess-2">
          <div className="border-solid border-white border-2 bg-gray-700">
                <br /> <br />
              </div>
              <div className="border-solid border-white border-2 bg-gray-700">
                <br /> <br />
              </div>
              <div className="border-solid border-white border-2 bg-gray-700">
                <br /> <br />
              </div>
          </div>
        </div>
        <div>
          <div className="grid grid-cols-3 grid-rows-1 gap-1 text-white text-center font-bold" id="guess-3">
          <div className="border-solid border-white border-2 bg-gray-700">
                <br /> <br />
              </div>
              <div className="border-solid border-white border-2 bg-gray-700">
                <br /> <br />
              </div>
              <div className="border-solid border-white border-2 bg-gray-700">
                <br /> <br />
              </div>
          </div>
        </div>
        <div>
          <div className="grid grid-cols-3 grid-rows-1 gap-1 text-white text-center font-bold" id="guess-4">
          <div className="border-solid border-white border-2 bg-gray-700">
                <br /> <br />
              </div>
              <div className="border-solid border-white border-2 bg-gray-700">
                <br /> <br />
              </div>
              <div className="border-solid border-white border-2 bg-gray-700">
                <br /> <br />
              </div>
          </div>
        </div>
        <div>
          <div className="grid grid-cols-3 grid-rows-1 gap-1 text-white text-center font-bold" id="guess-5">
          <div className="border-solid border-white border-2 bg-gray-700">
                <br /> <br />
              </div>
              <div className="border-solid border-white border-2 bg-gray-700">
                <br /> <br />
              </div>
              <div className="border-solid border-white border-2 bg-gray-700">
                <br /> <br />
              </div>
          </div>
        </div>
        <div>
        <div className="grid grid-cols-3 grid-rows-1 gap-1 text-white text-center font-bold" id="guess-6">
          <div className="border-solid border-white border-2 bg-gray-700">
                <br /> <br />
              </div>
              <div className="border-solid border-white border-2 bg-gray-700">
                <br /> <br />
              </div>
              <div className="border-solid border-white border-2 bg-gray-700">
                <br /> <br />
              </div>
          </div>
        </div>
      </div></div><br /><br /><br /><br /><Form /></>
    
    )
}