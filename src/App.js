import './App.css';
import React, { useState, useEffect } from 'react';

let randomNum;
let randomColour;
const colours = [
  "#FFDF00",
  "#FF1493",
  "#89CFF0",
  '#16a085',
  '#27ae60',
  '#2c3e50',
  '#f39c12',
  '#e74c3c',
  '#9b59b6',
  '#FB6964',
  '#342224',
  '#472E32',
  '#BDBB99',
  '#77B1A9',
  '#73A857'  
]

function App() {
  const [quoteMachine, setQuoteMachine] = useState({
    quotes: [],
    DataisLoaded: false,
    change: false
  });

  //fetch data from api
  useEffect(() => {
    fetch("https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json") 
    .then((response) => response.json())
    .then((json) => {
      setQuoteMachine({
        quotes: json.quotes,
        change: true,
        DataisLoaded: true
      })
    })
  }, [quoteMachine.change])
  
  //initiate random number and colour on page load
  useEffect(() => {
    randomNum = Math.floor(Math.random() * 120);
    randomColour = Math.floor(Math.random() * 15)
  })
        
  //method to call new quote when "New Quote" button is pressed
 const newQuote = () => {
   setQuoteMachine((prev) => {
     return {
       ...prev,
       change: !setQuoteMachine.change
     }
   })
   randomColour = Math.floor(Math.random() * 15);
   randomNum = Math.floor(Math.random() * 102);
   return randomNum
 }
  
  const quotesArray = quoteMachine.quotes.map(quote => {
    return quote.quote;
  })
  
  const authorsArray = quoteMachine.quotes.map(author => {
    return author.author
  })
 
  const quote = quotesArray[randomNum]
  const author = authorsArray[randomNum]
  const styles = {
    color: colours[randomColour]
  } ;
  
  const borderStyle = {
    borderBottomWidth: "2px",
    borderBottomStyle: "solid",
    borderBottomColor: colours[randomColour]
  }
  
  const borderTwo = {
    color: colours[randomColour],
    borderBottomWidth: "1px",
    borderBottomStyle: "solid",
    borderColor: colours[randomColour]
  }
  return(
    <div className="app--container">
      <div id="quote-box">
        <span><i className="fa-solid fa-quote-left quote-mark" style={styles}/></span>
        <p id="text">{quote}
        </p>
        <span className="line" 
           style={borderStyle}
         >""</span>
        <p id="author">{author}
        </p>
        <div className="btns--container">
          <span id="quote-logo">
            <a  id='tweet-quote'
                      className='icon' 
                      rel='noreferrer'
                      target="_blank"
                      href={`https://twitter.com/intent/tweet?text=${quote}-${author}`}
                      style={styles}
              >
              <i class='fa-brands  fa-twitter'/>
             </a>     
           </span>
          <button id="new-quote" 
            onClick={newQuote} 
            style={borderTwo}
            className="btn glow-btn"
            >
          New Quote
          </button> 
        </div>
      </div>
    </div>
  )
}

export default App;
