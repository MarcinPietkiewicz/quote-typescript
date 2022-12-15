import React from "react";
import "./QuoteBox.css";

type MyProps = {}
type MyState = {
  backgroundColor: string,
  rnd: number, 
  quotes: Quote[]
}

type Quote = {
  quote: string, author: string
}

type Link = HTMLElement | false;

class QuoteBox extends React.Component<MyProps, MyState> {
  constructor(props: MyProps) {
    super(props);
    this.state = { backgroundColor: '#000000', rnd: 0, quotes: [] };
    this.fetchQuotes = this.fetchQuotes.bind(this);
    this.rndQuoteNum = this.rndQuoteNum.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.setTwitterAttributes = this.setTwitterAttributes.bind(this);
  }

  componentDidMount() {
    this.fetchQuotes();
  }


 

  fetchQuotes() {
      fetch("https://farmerolaf.com/jsons/quotes.json") 
      .then((response) => response.json())
      .then((result) => {
        let num = this.rndQuoteNum(result.quotes?.length ?? 0);
        this.setState({ rnd: num, quotes: result.quotes });
      })
      .then(() => {setTimeout(() => {
        this.setTwitterAttributes(this.state.quotes[this.state.rnd].quote,this.state.quotes[this.state.rnd].author);
      },200)
      })
      .catch((err) => console.log("Fetch error: " + err));
  }

  rndQuoteNum(len: number) {
    if (this.state.quotes !== undefined) {
      return Math.floor(Math.random() * (len + 1));
    } else {
      return 0;
    }
  }

  setTwitterAttributes(quote: string, author: string) {
    const link : Link = document.getElementById('tweet-quote') || false

    if (link) {
      link.setAttribute(
        "href",
        "https://twitter.com/intent/tweet?hashtags=quotes&text=" + encodeURIComponent('"' + quote + '" \n' + author)
      );}
    }

  handleClick() {
    const r = this.rndQuoteNum(this.state.quotes.length);
    this.setState({ rnd: r });
    setTimeout(() => {
      this.setTwitterAttributes(this.state.quotes[this.state.rnd].quote,this.state.quotes[this.state.rnd].author);
    },200)
  }

  render() {
    return (
      <div id="quote-box">
        <div id="text">
          {this.state.quotes !== undefined
            ? this.state.quotes[this.state.rnd]?.quote ?? <img src='assets/circle-loading.svg' alt="loading..." />
            : "Error fetching quotes"}
        </div>
        <div id="author">{this.state.quotes !== undefined ? this.state.quotes[this.state.rnd]?.author ?? "" : ""}</div>

        <div id="buttons">
          <a id="tweet-quote" target="_blank">
            <img
              className="icon-button"
              id="twitter-quote"
              src='assets/twitter.svg'
              alt="twitter logo"
            />
          </a>
          <button id="new-quote" onClick={this.handleClick}>
            <img className="icon-button" src='assets/feather.svg' alt="new quote logo" id="logo" />
            new quote
          </button>
        </div>
      </div>
    );
  }
}

export default QuoteBox;
