import React from "react";
import Layout from "../../src/component/Layout";
import Link from 'next/link';
import LOAD from '../../src/constants/LOAD';
import axios from "axios";
import KEY from "../../src/constants/keys_property";
import { MdOutlineImageNotSupported } from 'react-icons/md';

const TITLE = 'список книг';
const URL = '/api/book/list';


const Books = () => {
  const [load, setLoad] = React.useState(LOAD.NONE);
  const [error, setError] = React.useState(null);
  const [books, setBooks] = React.useState([]);

  React.useEffect(() => {
    axios.get(URL).then(({ data }) => {
      setLoad(LOAD.LOADED);
      setBooks(data instanceof Array ? data : []);
    }).catch(reason => {
      setLoad(LOAD.ERROR);
      setError(reason?.response?.data || null);
    });
    setLoad(LOAD.LOADING);
  }, []);

  return (
    <Layout title={TITLE}>
      <div className="jsx_title_block">
        <h2 className="jsx_title">{TITLE}</h2>
      </div>

      {load === LOAD.ERROR ? <div>
        <h3>Ошибка</h3>
        {error && typeof (error) === 'object' && error[KEY.RES_ERROR] ? <p>{error[KEY.RES_ERROR]}</p> : null}
        {error?.message ? <p>{error.message}</p> : null}
        {error?.description ? <p>{error.description}</p> : null}
      </div> : null}

      {load === LOAD.LOADED ? <div className="jsx_books">
        {books.map(book => <div key={book.id} className="jsx_book">
          <div className="jsx_book_image_block">
            {book.image ? <img src={book.image} className="jsx_book_image" /> : <div className="jsx_book_image_none"><MdOutlineImageNotSupported /></div>}
          </div>
          <div className="jsx_book_title_block">
            <h5 className="jsx_book_title">{book.name}</h5>
          </div>
          <div className="jsx_book_author_block">
            <h6 className="jsx_book_author">{book.author}</h6>
          </div>
          <div className="jsx_book_open_block">
            <Link href={`/book/${book.id}`}>
              <a className="jsx_book_open">открыть</a>
            </Link>
          </div>
        </div>)}
      </div> : null}

      {load === LOAD.LOADING ? <div>
        <div>loading...</div>
      </div> : null}


      <style jsx>{`
        .jsx_title_block {
          padding: 20px;
        }
        .jsx_title {
          text-align: center;
          text-transform: uppercase;
        }

        .jsx_books {
          display: flex;
          flex-wrap: wrap;
          gap: 20px;
          padding: 0 20px;
        }
        .jsx_book {
          width: 240px;
          background: var(--theme-nearest);
          padding: 5px;
          border-radius: 5px;
          box-sizing: border-box;
          box-shadow: 0 0 5px 0px var(--theme-shadow);
          display: flex;
          flex-direction: column;
        }
        .jsx_book_image_block {
          width: 100%;
          height: 180px;
          position: relative;
        }
        .jsx_book_image {
          max-width: 100%;
          max-height: 100%;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          pointer-events: none;
        }
        .jsx_book_image_none {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          pointer-events: none;
          font-size: 50px;
          color: var(--theme-disabled);
        }
        .jsx_book_title_block {
          padding: 10px 5px 5px 5px;
        }
        .jsx_book_title {
          color: var(--theme-primary);
        }
        .jsx_book_author_block {
          padding: 0 5px 5px 5px;
        }
        .jsx_book_author {
          color: var(--theme-secondary);
        }
        .jsx_book_open_block {
          margin: auto 0 0 0;
          padding: 5px;
          display: flex;
        }
        .jsx_book_open {
          margin: 0 0 0 auto;
          padding: 5px;
          border: 2px solid var(--theme-active);
          border-radius: 5px;
          color: var(--theme-active);
          display: block;
          text-decoration: none;
          font-size: 0.8rem;
          background: var(--theme-nearest);
          transition: 0.3s;
          outline: none;
        }
        .jsx_book_open:hover {
          background: var(--theme-distant);
        }
        .jsx_book_open:focus {
          background: var(--theme-distant);
        }
      `}</style>
    </Layout>
  );
};

export default Books;