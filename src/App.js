import { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';


function App() {
  const API_KEY = '6bedce92f708cdeb65b084ee01b825c0';

  const [location, setLocation] = useState('');
  const [result, setResult] = useState({});
  const [loading, setLoading] = useState(false);

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${API_KEY}`;

  const searchWeather = async (e) => { // 비동기 방식
    if (e.key === 'Enter') {
      try {
        setLoading(true);
        const data = await axios({
          method: 'get', // 정보 조회
          url,
        });
        setResult(data.data);
      } catch (e) {
        alert(e);
      }
      setLoading(false);
    }
  }

  if (loading) {
    <div>Loading...</div>
  }
  return (
    <AppWrap>
      <div className='appContentWrap'>
        <input
          placeholder='도시를 입력하세요'
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          type='text'
          onKeyDown={searchWeather} // 어떤 버튼을 눌렀을 때 검색
        />
        {
          // result 값이 있을 경우에 화면에 띄움
          Object.keys(result).length !== 0 &&
          <ResultWrap>
            <div className='city'>
              {result.name}
            </div>
            <div className='temperature'>
              {Math.round(((result.main.temp - 273.15) * 10) / 10)}°C
            </div>
            <div className='sky'>
              {result.weather[0].main}
            </div>
          </ResultWrap>
        }
      </div>
    </AppWrap>
  );
}

export default App;

const AppWrap = styled.div`
  width: 100vw;
  height: 100vh; 

  .appContentWrap {
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    position: absolute; 
    padding: 20px;
  }
  input {
    padding: 16px;
    border: 2px black solid;
    border-radius: 16px;
  }
`;

const ResultWrap = styled.div`
  margin-top: 60px;
  padding: 10px;
  border: 1px black solid;
  border-radius: 8px;
  .city{
    font-size: 24px;
  }
  .temperature{
    font-size: 60px;
    margin-top: 8px;
  }
  .sky{
    font-size: 20px;
    margin-top: 8px;
    text-align: right;
  }
`;