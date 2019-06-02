import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

interface IController {
    title: string;
    setData(data: []): any;
    limit: number;
    gap: number;
}


const Controller: React.FC<IController> = ({title, setData, limit, gap}) => {
    let data = null;
    const onDrop = useCallback( acceptedFiles => {
        const reader = new FileReader();

        reader.onabort = () => console.log('file reading was aborted');
        reader.onerror = () => console.log('file reading has failed');
        reader.onload = () => {
            const binaryStr:string = reader.result as string;
            const fileData = binaryStr.split('\n');
            data = fileData.map(data => Number(data));
            setData(data as any);
            
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
        <section className="controller">
            <h2>{title}</h2>
            <div {...getRootProps({className: 'dropzone'})}>
            <input {...getInputProps()}/>
            <p>{ files || "지관 파일을 drag 또는 선택해주세요."}</p>
            </div>
        </section>
    )
}

export default Controller;
