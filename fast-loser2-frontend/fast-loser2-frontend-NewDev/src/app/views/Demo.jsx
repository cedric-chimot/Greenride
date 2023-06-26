import React, { useEffect, useState } from 'react';

const Demo = () => {
  const [images, setImages] = useState([]);
  const [url, setUrl] = useState([]);
  const [imgPreviewer, setImgPreviewer] = useState();

  let imgConverter = (e) => {
    let imagesArray = images;
    let UrlArray = url;
    imagesArray.push(e);
    UrlArray.push(URL.createObjectURL(e));
    setImages(imagesArray);
    setUrl(UrlArray);
    let imgPreview = url.map((img) => (
      <li>
        <img src={img} />
      </li>
    ));
    setImgPreviewer(imgPreview);
  };

  return (
    <div>
      <h1>Demo</h1>
      <input type="file" onChange={(e) => imgConverter(e.target.files[0])} />
      <div className="imgContainer">{imgPreviewer}</div>
    </div>
  );
};

export default Demo;
