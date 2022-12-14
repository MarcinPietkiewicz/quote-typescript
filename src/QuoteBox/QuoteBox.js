import React from "react";
import "./QuoteBox.css";
import loadingIcon from "../assets/circle-loading.svg";
import twitterLogo from "../assets/twitter.svg";
import nextLogo from "../assets/feather.svg";

class QuoteBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = { rnd: 0, quotes: [] };
    this.fetchQuotes = this.fetchQuotes.bind(this);
    this.rndQuoteNum = this.rndQuoteNum.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.setTwitterAttributes = this.setTwitterAttributes.bind(this);
  }

  componentDidMount() {
    this.fetchQuotes();
  }

  fetchQuotes() {
    // fetch("http://localhost:8000/db") //development local server //json-server --watch quotes.json --port 8000
      fetch("https://farmerolaf.com/jsons/quotes.json") // swap to this in production
      .then((response) => response.json())
      .then((result) => {
        let num = this.rndQuoteNum(result.quotes?.length ?? 0);
        this.setState({ rnd: num, quotes: result.quotes });
      })
      .then(() => {setTimeout(() => {
        console.log(this.state.quotes[this.state.rnd]);
        this.setTwitterAttributes(this.state.quotes[this.state.rnd].quote,this.state.quotes[this.state.rnd].author);
      },200)
      })
      .catch((err) => console.log("Fetch error: " + err));
  }

  rndQuoteNum(len) {
    if (this.state.quotes !== undefined) {
      return Math.floor(Math.random() * (len + 1));
    } else {
      return 0;
    }
  }

  setTwitterAttributes(quote, author) {
    document
      .getElementById("tweet-quote")
      .setAttribute(
        "href",
        "https://twitter.com/intent/tweet?hashtags=quotes&text=" + encodeURIComponent('"' + quote + '" \n' + author)
      );
  }

  handleClick() {
    const r = this.rndQuoteNum(this.state.quotes.length);
    this.setState({ rnd: r });
    setTimeout(() => {
      this.setTwitterAttributes(this.state.quotes[this.state.rnd].quote,this.state.quotes[this.state.rnd].author);
      console.log(this.state.quotes[this.state.rnd]);
    },200)
  }


  render() {
    return (
      <div id="quote-box">
        <div id="text">
          {this.state.quotes !== undefined
            ? this.state.quotes[this.state.rnd]?.quote ?? <img src={loadingIcon} alt="loading..." />
            : "Error fetching quotes"}
        </div>
        <div id="author">{this.state.quotes !== undefined ? this.state.quotes[this.state.rnd]?.author ?? "" : ""}</div>

        <div id="buttons">
          <a id="tweet-quote" target="_blank">
            <img
              className="icon-button"
              id="twitter-quote"
              src={twitterLogo}
              alt="twitter logo"
            />
          </a>
          <button id="new-quote" onClick={this.handleClick}>
            <img className="icon-button" src={nextLogo} alt="new quote logo" id="logo" />
            new quote
          </button>
        </div>
      </div>
    );
  }
}



export default QuoteBox;
