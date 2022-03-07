import React, { useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import { myRequest } from "./api/demoapi";

interface Req {
  apiKey: string;
  city?: string;
  areaID?: string;
}
interface Res {
  area: string;
  areaCode: string;
  areaid: string;
  dayList: any[];
}

function App() {
  useEffect(() => {
    const getData = async (data: Req) => {
      return await myRequest<Req, Res>({
        url: "api/air/getCityPM25Detail",
        method: "GET",
        data,
        interceptors: {
          requestInterceptors: (res) => {
            console.log("接口请求拦截");
            return res;
          },
          responseInterceptors: (result) => {
            console.log("接口响应拦截");
            return result;
          },
        },
      });
    };
    getData({
      apiKey: "evrlhHN3bec06d9cd28c0f11c1bc4ca46b6826e6411f34e",
      city: "北京市",
    });
  }, []);
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
