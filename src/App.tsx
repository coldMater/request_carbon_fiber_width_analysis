import React, { useCallback } from 'react';
import logo from './logo.svg';
import { useDropzone } from 'react-dropzone';
import './App.css';

const App: React.FC = () => {

  const onDrop = useCallback( acceptedFiles => {
    const reader = new FileReader();

    reader.onabort = () => console.log('file reading was aborted');
    reader.onerror = () => console.log('file reading has failed');
    reader.onload = () => {
      const binaryStr:string = reader.result as string;
      console.log(reader);
      console.log(binaryStr.split('\n'));
      console.log(binaryStr);
    }

    acceptedFiles.forEach((file:any) => reader.readAsBinaryString(file));

  }, []);

  const { acceptedFiles, getRootProps, getInputProps, isDragActive } = useDropzone({onDrop});
  
  const files = acceptedFiles.map((file:any) => (
    <li key={file.path}>
      {file.path}
    </li>
  ));

  return (
    <div className="App">
      <header className="App-header">
        <h1>
          변위 센서 사폭 분석
        </h1>
      </header>
      <div className="controller-container">
        <section className="controller">
          <h2>지관 row 데이터 업로드</h2>
          <div {...getRootProps({className: 'dropzone'})}>
            <input {...getInputProps()}/>
            <p>{ files || "지관 파일을 drag 또는 선택해주세요."}</p>
          </div>
        </section>
        <section className="controller">
          <h2>지관 row 데이터 업로드</h2>
          <div {...getRootProps({className: 'dropzone'})}>
            <input {...getInputProps()}/>
            <p>지관 파일을 drag 또는 선택해주세요.</p>
          </div>
        </section>
      </div>

      <section className="result-viewer">
      </section>
    </div>
  );
}

export default App;
