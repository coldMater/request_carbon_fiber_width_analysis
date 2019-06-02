import React, { useCallback, useState } from 'react';
import logo from './logo.svg';
import { useDropzone } from 'react-dropzone';
import './App.css';
import J_Controller from './controller';
import G_Controller from './controller';
import Chart from './chart';
import Statistics from './statistics';

const App: React.FC = () => {
	const [jigwanData, setJigwandata] = useState<number[]>([]);
	const [gaesumData, setGaesumdata] = useState<number[]>([]);

	const [jigwanLimit, setJigwanLimit] = useState<number>(2);
	const [jigwanGap, setJigwanGap] = useState<number>(1);
	const [gaesumLimit, setGaesumLimit] = useState<number>(2);
	const [gaesumGap, setGaesumGap] = useState<number>(1);

	const [filteredJigwanData, setFilteredJigwandata] = useState<number[]>([]);
	const [filteredGaesumData, setFilteredGaesumdata] = useState<number[]>([]);
	const [statistics, setStatistics] = useState({avg: 0, std: 0, cv: 0, max: 0, min: 0})

	const setJigwanData = (data: any) => {
		setJigwandata(data);
	}

	const setGaesumData = (data: any) => {
		setGaesumdata(data)
	}

	const setFilteredJigwanData = (data: any) => {
		setFilteredJigwandata(data);
	}

	const setFilteredGaesumData = (data: any) => {
		setFilteredGaesumdata(data)
	}

	const jigwanRefresh = async () => {
		const filteredData = dataFilter(jigwanData, jigwanLimit, jigwanGap);
		await setFilteredJigwandata(filteredData);
		getStatistics();
	}

	const gaesumRefresh = async () => {
		const filteredData = dataFilter(gaesumData, gaesumLimit, gaesumGap);
		await setFilteredGaesumdata(filteredData);
		getStatistics();
	}

	const dataFilter = (data: number[], limit: number, gap: number) => {
		const filteredData = data.filter((number, index) => {
			if(index === 0 ){
				return true;
			} else {
				const difference = Math.abs(number-data[index-1]);
				return !(number < limit || difference > gap);
			}
		})
		
		return filteredData;
	}
	const getStatistics = () => {
		//평균, 표준편차, CV, MAX, MIN
		setStatistics(Statistics(filteredJigwanData));
	}

  const inputFormContainer = (name: string, limit:number, gap: number, setLimit: any, setGap: any, refresh: any) => (
      <div className="input-form">
        <div className="input-row">
			<label className="form-label">하한값&nbsp;</label>
			<input type={'number'} step={0.1} min={0} value={limit} onChange={(e)=>{setLimit(e.target.value); refresh();}}></input>
		</div>
		<div className="input-row">
			<label className="form-label">gap값&nbsp;</label>
			<input type={'number'} step={0.1} min={0} value={gap} onChange={(e)=>{setGap(e.target.value); refresh();}}></input>
		</div>
		<div className="input-row">
			<button onClick={refresh}>{name} filter</button>
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
			<J_Controller title={"지관 row 데이터 업로드"} setData = {setJigwanData} limit={jigwanLimit} gap={jigwanGap}/>
			<G_Controller title={"개섬 row 데이터 업로드"} setData = {setGaesumData} limit={gaesumLimit} gap={gaesumGap}/>
		</div>
		<div className="input-form-container">
			{inputFormContainer("지관", jigwanLimit, jigwanGap, setJigwanLimit, setJigwanGap, jigwanRefresh)}
			{inputFormContainer("개섬", gaesumLimit, gaesumGap, setGaesumLimit, setGaesumGap, gaesumRefresh)}
		</div>

		<hr></hr>
		<section className="result-container">
			<div className="result">
				<Chart data={jigwanData} color={"#173f5f"}/>
			</div>
			<div className="result">
				<Chart data={gaesumData} color={"#173f5f"}/>
			</div>
		</section>
		<section className="result-container">
			<div className="result">
				<Chart data={filteredJigwanData} color={"#ed553b"}/>
			</div>
			<div className="result">
				<Chart data={filteredGaesumData} color={"#ed553b"}/>
			</div>
		</section>
			<div className="input-form-container">
				<button onClick={getStatistics}>통계</button>
				<div>
					{statistics.avg}<br/>
					{statistics.std}<br/>
					{statistics.cv}<br/>
					{statistics.max}<br/>
					{statistics.min}<br/>
				</div>
			</div>
    </div>
  );
}

export default App;
