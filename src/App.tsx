import React, { useCallback, useState } from 'react';
import logo from './logo.svg';
import { useDropzone } from 'react-dropzone';
import './App.css';
import J_Controller from './controller';
import G_Controller from './controller';
import Chart from './chart';
import Statistics from './statistics';
import Clipboard from 'react-clipboard.js';

const App: React.FC = () => {
	type TdefaultValue = {
		[key: string]: { [key:string]: {limit: number, gap: number} }
	}
	const defaultValue:TdefaultValue = {
		'jigwan': {
			'6K': {limit: 2.0, gap: 1.0},
			'12K': {limit: 4.0, gap: 2.0},
			'24K': {limit: 6.0, gap: 3.0}
		},
		'gaesum': {
			'6K': {limit: 4.0, gap: 2.0},
			'12K': {limit: 8.0, gap: 4.0},
			'24K': {limit: 12.0, gap: 6.0}
		}
	}
	const [jigwanData, setJigwandata] = useState<number[]>([]);
	const [gaesumData, setGaesumdata] = useState<number[]>([]);

	const [jigwanLimit, setJigwanLimit] = useState<number>(0);
	const [jigwanGap, setJigwanGap] = useState<number>(1);
	const [gaesumLimit, setGaesumLimit] = useState<number>(0);
	const [gaesumGap, setGaesumGap] = useState<number>(1);

	const [filteredJigwanData, setFilteredJigwandata] = useState<number[]>([]);
	const [filteredGaesumData, setFilteredGaesumdata] = useState<number[]>([]);

	const [jigwanStatistics, setJigwanStatistics] = useState({avg: 0, std: 0, cv: 0, max: 0, min: 0})
	const [gaesumStatistics, setGaesumStatistics] = useState({avg: 0, std: 0, cv: 0, max: 0, min: 0})

	const [lot, setLot] = useState("");
	const [doping, setDoping] = useState("");
	const [sosungNo, setSosungNo] = useState("");
	const [sizing, setSizing] = useState("");

	const [threadType, setThreadType] = useState("");

	const [showCopied, setShowCopied] = useState(false);

	const setMaterialInfo = (lot: string, doping: string, sosungNo: string, sizing: string) => {
		setLot(lot);
		setDoping(doping);
		setSosungNo(sosungNo);
		setSizing(sizing);
	}

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
		getJigwanStatistics();
	}

	const gaesumRefresh = async () => {
		const filteredData = dataFilter(gaesumData, gaesumLimit, gaesumGap);
		await setFilteredGaesumdata(filteredData);
		getGaesumStatistics();
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
	
	const getJigwanStatistics = () => {
		//평균, 표준편차, CV, MAX, MIN
		setJigwanStatistics(Statistics(filteredJigwanData));
	}

	const getGaesumStatistics = () => {
		//평균, 표준편차, CV, MAX, MIN
		setGaesumStatistics(Statistics(filteredGaesumData));
	}

	const onThreadTypeSelect = (e: any) => {
		const threadType = String(e.target.value);
		setThreadType(threadType);
		setJigwanLimit(defaultValue.jigwan[threadType].limit);
		setJigwanGap(defaultValue.jigwan[threadType].gap);
		setGaesumLimit(defaultValue.gaesum[threadType].limit);
		setGaesumGap(defaultValue.gaesum[threadType].gap);
		jigwanRefresh();
		gaesumRefresh();
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
	const onCopySuccess = () => {
		setShowCopied(true);
		setInterval(()=>setShowCopied(false), 5000);
	}

  return (
    <div className="App">
		<header className="App-header">
			<h1>
			변위 센서 사폭 분석
			</h1>
		</header>
		<div className="controller-container">
			<div className="thread-type-selector">
				사종선택&nbsp;
				<select onChange={(e) => onThreadTypeSelect(e)}>
					<option value="">사종</option>
					<option value="6K">6K</option>
					<option value="12K">12K</option>
					<option value="24K">24K</option>
				</select>
			</div>
		</div>
		<div className="controller-container">
			<J_Controller title={"지관 row 데이터 업로드"} setData = {setJigwanData} limit={jigwanLimit} gap={jigwanGap} setMaterialInfo={setMaterialInfo}/>
			<G_Controller title={"개섬 row 데이터 업로드"} setData = {setGaesumData} limit={gaesumLimit} gap={gaesumGap} setMaterialInfo={setMaterialInfo}/>
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
				<div className="table">
					<div>
						<table>
							<tr>
								<th> LOT </th>
								<th> 사종 </th>
								<th> 도핑 No </th>
								<th> 소성 No </th>
								<th> Sizing </th>
								<th> 지관 avg </th>
								<th> 지관 std </th>
								<th> 지관 cv </th>
								<th> 지관 max </th>
								<th> 지관 min </th>
								<th> 개섬 avg </th>
								<th> 개섬 std </th>
								<th> 개섬 cv </th>
								<th> 개섬 max </th>
								<th> 개섬 min </th>
							</tr>
							<tr>
								<td>{lot}{'\t'}</td>
								<td>{threadType}{'\t'}</td>
								<td>{doping+'\t'}</td>
								<td>{sosungNo+'\t'}</td>
								<td>{sizing+'\t'}</td>
								<td>{String(jigwanStatistics.avg)+'\t'}</td>
								<td>{String(jigwanStatistics.std)+'\t'}</td>
								<td>{String(jigwanStatistics.cv)+'\t'}</td>
								<td>{String(jigwanStatistics.max)+'\t'}</td>
								<td>{String(jigwanStatistics.min)+'\t'}</td>
								<td>{String(gaesumStatistics.avg)+'\t'}</td>
								<td>{String(gaesumStatistics.std)+'\t'}</td>
								<td>{String(gaesumStatistics.cv)+'\t'}</td>
								<td>{String(gaesumStatistics.max)+'\t'}</td>
								<td>{String(gaesumStatistics.min)+'\t'}</td>
							</tr>
						</table>
					</div>
					<div className="copy-button">
						<Clipboard 
							data-clipboard-text={
								`${lot}\t${''}\t${doping}\t${sosungNo}\t${sizing}\t${jigwanStatistics.avg}\t${jigwanStatistics.std}\t${jigwanStatistics.cv}\t${jigwanStatistics.max}\t${jigwanStatistics.min}\t ${gaesumStatistics.avg}\t${gaesumStatistics.std}\t${gaesumStatistics.cv}\t${gaesumStatistics.max}\t${gaesumStatistics.min}`
							}
							onSuccess={onCopySuccess}
						>
							{showCopied ? "Copy success!" :"클립보드에 복사"}
						</Clipboard>
					</div>
				</div>
			</div>
    </div>
  );
}

export default App;
