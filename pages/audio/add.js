import { useState, useEffect } from 'react';

export default function AddAudio() {
  const [fileAudio, setFileAudio] = useState(null);
  const [fileImage, setFileImage] = useState(null);
  const [name, setName] = useState('');
  const [performer, setPerformer] = useState('');

  const [audioPreview, setAudioPreview] = useState(null);
  const [imagePreviewSource, setImagePreviewSource] = useState('');

  const changeAudio = event => {
    setFileAudio(event.target.files[0]);
    const objectURL = URL.createObjectURL(event.target.files[0]);
    if (audioPreview) {
      audioPreview.src = objectURL;
    } else {
      setAudioPreview(new Audio(objectURL));
    }
  };
  const changeImage = event => {
    setFileImage(event.target.files[0]);
    setImagePreviewSource(URL.createObjectURL(event.target.files[0]));
  };
  const changeName = event => {
    setName(event.target.value);
  };
  const changePerformer = event => {
    setPerformer(event.target.value);
  };


  return (
    <div>
      <label>
        <input name={'audio'} type="file" accept=".mp3, .wav" onChange={changeAudio} />
      </label>
      <br />
      <label>
        <input name={'cover'} type="file" accept=".png, .jpg, .jpeg" onChange={changeImage} />
      </label>
      <br />
      <label>
        <input name={'name'} type="text" value={name} onChange={changeName} />
      </label>
      <br />
      <label>
        <input name={'performer'} type="text" value={performer} onChange={changePerformer} />
      </label>
      <br />
      <button onClick={null}>save</button>
      <hr />
      {fileAudio && <>{`${fileAudio.name}|${fileAudio.size}|${fileAudio.type}`}<hr /></>}
      {fileImage && <>{`${fileImage.name}|${fileImage.size}|${fileImage.type}`}<hr /></>}
      {audioPreview && <button onClick={() => audioPreview.play()}>play</button>}
      {audioPreview && <button onClick={() => audioPreview.pause()}>pause</button>}
      {imagePreviewSource && <img src={imagePreviewSource} alt="" />}
    </div>
  );
};