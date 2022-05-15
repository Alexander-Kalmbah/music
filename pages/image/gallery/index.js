import axios from "axios";
import React from "react";
import { LOAD } from "../../../src/constants/public";

//#region CONFIG
const PAGINATION_PAGE_DEFAULT = 0;
const PAGINATION_SIZE_DEFAULT = 30;
const PAGINATION_PAGE_STEP = 1;
const PAGINATION_SIZE_STEP = 1;
const PAGINATION_MIN_PAGE = 0;
const PAGINATION_MAX_PAGE = 0xffffffffff;
const PAGINATION_MIN_SIZE = 5;
const PAGINATION_MAX_SIZE = 120;
const PAGINATION_OPTIONS = {
  hiddenDisabled: true,
  hiddenDeleted: true,
  hiddenLocked: true,
};

const PAGINATION_META = {
  PAGE_DEFAULT: PAGINATION_PAGE_DEFAULT,
  SIZE_DEFAULT: PAGINATION_SIZE_DEFAULT,
  PAGE_STEP: PAGINATION_PAGE_STEP,
  SIZE_STEP: PAGINATION_SIZE_STEP,
  MIN_PAGE: PAGINATION_MIN_PAGE,
  MAX_PAGE: PAGINATION_MAX_PAGE,
  MIN_SIZE: PAGINATION_MIN_SIZE,
  MAX_SIZE: PAGINATION_MAX_SIZE,
  OPTIONS: PAGINATION_OPTIONS
};
//#endregion

export default function Gallery() {
  const [images, setImages] = React.useState([]);
  const [pagination, setPagination] = React.useState({ page: PAGINATION_PAGE_DEFAULT, size: PAGINATION_SIZE_DEFAULT });
  const [load, setLoad] = React.useState(LOAD.NONE);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    axios.get(`/api/image/list/${pagination.page}?size=${pagination.size}`).then(res => {
      setImages(res.data?.images instanceof Array ? res.data.images : []);
      setError(null);
      setLoad(LOAD.LOADED);
    }).catch(rej => {
      setImages([]);
      setError(rej);
      setLoad(LOAD.ERROR);
    });
  }, [pagination.page, pagination.size]);

  React.useEffect(() => { console.log(`load: ${load}, error: ${error && (error?.message || '[ERROR]') || '-'}, page: ${pagination.page}, size: ${pagination.size}`); }, [load, error, pagination.page, pagination.size]);


  return (
    <div style={{ width: '100%', height: '100%', overflow: 'auto' }}>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
        {images.map(image => <div key={image.id}>
          [{image.width}x{image.height}][{image.mimetype}]
          <img style={{ width: '200px', height: 'auto' }} width={image.width} height={image.height} src={`/api/image/${image.key}?sizes=${200}x${100}&fit=contain`} />
          <button onClick={null}>delete</button>
        </div>)}
      </div>
    </div>
  );
};