import React, { useState } from 'react';
import axios from 'axios';

const LINE_JUMP = '\n';
const EMPTY_FIELD = '--';

const ButtonDownload: React.FC = () => {
  // State
  const [isDownloading, setIsDownloading] = useState<boolean>(false);

  // Methods
  const handleOnClick = async () => {
    setIsDownloading(true);
    
    await axios.get('https://jsonplaceholder.typicode.com/posts')
      .then((res: any) => {
        debugger
        toCSV(res.data);
        setIsDownloading(false);
      })
      .catch((e: any) => {
        setIsDownloading(false);
        alert('CSV download failed');
      });
  }

  const toCSV = (data: any[]) => {
    const fileType = 'data:text/csv;charset=utf-8;' + LINE_JUMP;
    const headers = ',Id, User Id, Title, Body' + LINE_JUMP;
    
    const items = data.map((item) => {
      const id = item.id || EMPTY_FIELD;
      const userId = item.userId || EMPTY_FIELD;
      const title = item.title || EMPTY_FIELD;
      const body = item.body || EMPTY_FIELD;
      return [`${id}, ${userId}, ${title}, ${body}`];
    })

    let stringItems = '';
    items.forEach((item) => {
      const value = item.toString() + LINE_JUMP;
      stringItems = stringItems + value;
    })

    const csvContent =
      fileType
      + headers
      + stringItems;

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'redeem_requests.csv');
    document.body.appendChild(link); 
    link.click();
  }

  return (
    <button onClick={handleOnClick} disabled={isDownloading}>
      Download CSV
    </button>
  )
}

const DownloadCsv: React.FC = () => {
  return (
    <div className='h-50 w-50' style={{ backgroundColor: 'white', padding: 20 + 'px' }}>
      <ButtonDownload />
    </div>
  )
}

export default DownloadCsv;