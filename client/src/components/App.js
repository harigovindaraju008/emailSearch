import React, { useState } from "react";
import axios from "axios";

function App() {
  const [email, setEmail] = useState("");
  const [results, setResults] = useState([]);
  const [fetching, setfetching] = useState(false);
  const [viewresult, setViewResult] = useState(false);
  const [message, setmessage] = useState("");

  const search = (event) => {
    event.preventDefault();
    setResults("");
    setmessage("Fetching information please wait");
    setfetching(true);
    const data = {
      email,
    };
    axios
      .post("/search", data)
      .then(async (res) => {
        console.log(res.data);
        if (res.data.items) {
          await setResults(res.data.items);
          setViewResult(true);
          setmessage(
            `search result in ${res.data.searchInformation.formattedSearchTime}s `
          );
        } else {
          setmessage(`no result found please enter valid college email id`);
        }
      })
      .catch((err) => {
        setmessage(err.response.data);
        console.log(err.response.data);
      });
  };

  const ResultCard = ({ data }) => {
    // console.log(data.pagemap.cse_image[0].src);
    return (
      <div className="blog-slider">
        <div className="blog-slider__wrp swiper-wrapper">
          <div className="blog-slider__item swiper-slide">
            <div className="blog-slider__img">
              {<Image pagemap={data.pagemap} />}
            </div>
            <div className="blog-slider__content">
              <span className="blog-slider__code">{data.displayLink}</span>
              <div className="blog-slider__title">{data.title}</div>
              <div className="blog-slider__text">{data.snippet}</div>
              <a href={data.link} className="blog-slider__button">
                View website
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const Image = ({ pagemap }) => {
    let source = "";
    console.log(pagemap);
    if (pagemap && pagemap.cse_image) {
      if (pagemap.cse_image[0].src.match(/\.(jpeg|jpg|gif|png)$/)) {
        source = pagemap.cse_image[0].src;
      } else {
        source = "default.svg";
      }
    } else {
      // if (pagemap.cse_image[0].src.match(/\.(jpeg|jpg|gif|png)$/)) {
      //   source = pagemap.cse_image[0].src;
      // } else {
      source = "default.svg";
      // }
    }
    return (
      <img
        src={
          // data.pagemap.cse_image[0].src.match(/\.(jpeg|jpg|gif|png)$/)
          // (console.log(data.pagemap.cse_image),
          // (data.pagemap.cse_image === undefined
          //   ? "default.svg"
          //   : console.log(data.pagemap.cse_image[0].src),
          // data.pagemap.cse_image[0].src)
          source
        }
        alt=" error"
        // src="default.svg"
        // alt=""
      />
    );
  };

  return (
    <div className="App">
      <div className="search">
        <h1>Email details</h1>
        <form onSubmit={search}>
          <div className="input-box">
            <input
              type="email"
              placeholder="email"
              name="email"
              id="Email"
              className="search-input"
              onChange={({ target }) => setEmail(target.value)}
              required
            />

            <input className="blog-slider__button btn submit" type="submit" />
          </div>
        </form>
      </div>

      <div className="results">
        {fetching ? <div className="results-time"> {message}</div> : ""}
        {viewresult
          ? results.map((res, index) => <ResultCard data={res} key={index} />)
          : ""}
      </div>
    </div>
  );
}

export default App;
