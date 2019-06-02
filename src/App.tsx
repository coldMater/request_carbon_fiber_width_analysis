import React, { useCallback, useState } from 'react';
import logo from './logo.svg';
import { useDropzone } from 'react-dropzone';
import './App.css';
import J_Controller from './controller';
import G_Controller from './controller';
import Chart from './chart';

const App: React.FC = () => {
  const [jigwanData, setJigwandata] = useState<number[]>([]);
  const [gaesumData, setGaesumdata] = useState<number[]>([]);
  const [jigwanLimit, setJigwanLimit] = useState<number>(2);
  const [jigwanGap, setJigwanGap] = useState<number>(1);
  const [gaesumLimit, setGaesumLimit] = useState<number>(2);
  const [gaesumGap, setGaesumGap] = useState<number>(1);

  const setJigwanData = (data: any) => {
    setJigwandata(data);
  }

  const setGaesumData = (data: any) => {
    setGaesumdata(data)
  }

  const inputFormContainer = (name: string, limit:number, gap: number, setLimit: any, setGap: any) => (
      <div className="input-form">
        <div className="input-row">
			<label className="form-label">하한값&nbsp;</label>
			<input value={limit} onChange={(e)=>setLimit(e.target.value)}></input>
		</div>
		<div className="input-row">
			<label className="form-label">gap값&nbsp;</label>
			<input value={gap} onChange={(e)=>setGap(e.target.value)}></input>
		</div>
		<div className="input-row">
			<button>{name} filter</button>
		</div>
		</div>
  )

  return (
    <div className="App">
		<header className="App-header">
			<h1>
			변위 센서 사폭 분석
			</h1>
		</header>
		<div className="controller-container">
			<J_Controller title={"지관 row 데이터 업로드"} setData = {setJigwanData}/>
			<G_Controller title={"개섬 row 데이터 업로드"} setData = {setGaesumData}/>
		</div>
		<div className="input-form-container">
			{inputFormContainer("지관", jigwanLimit, jigwanGap, setJigwanLimit, setJigwanGap)}
			{inputFormContainer("개섬", gaesumLimit, gaesumGap, setGaesumLimit, setGaesumGap)}
		</div>

		<hr></hr>
		<section className="result-container">
			<div className="result">
				<Chart data={jigwanData}/>
			</div>
			<div className="result">
				<Chart data={gaesumData}/>
			</div>
		</section>
    </div>
  );
}

export default App;
