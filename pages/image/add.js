import React from "react";
import { IMG_TYPE } from '../../src/constants/public';


export default function AddImage() {
  const [image, setImage] = React.useState({ file: null, img: null, src: '', error: null });


  const changeImage = file => {
    if (!(file instanceof File)) {
      setImage({ ...image, file: null, img: null, src: '', error: null });
      return;
    };

    const img = new Image();
    const source = URL.createObjectURL(file);

    img.onload = function () {
      setImage({ ...image, file: file, img: img, src: source, error: null });
    };
    img.onerror = function () {
      setImage({ ...image, file: file, img: null, src: source, error: new Error('failure load') });
    };

    img.src = source;

    setImage({ ...image, file: file, img: null, src: source, error: null });
    console.log(image);
  };

  const send = () => {
    if (!image.img) return;

    const formData = new FormData();
    formData.append('IMAGE', image.file);

    fetch('/api/image/save', {
      method: 'POST',
      body: formData
    }).then(response => {
      response.json().then(data => {
        console.log(data);
      });
    }).catch(reason => {
      console.warn(reason);
    });
  };

  return (
    <div>
      <div>
        <label>
          <input type="file" accept="image/*" onChange={e => changeImage(e.target.files[0])} />
        </label>
      </div>
      <div>
        <button onClick={() => send()}>send</button>
      </div>
    </div>
  );
};