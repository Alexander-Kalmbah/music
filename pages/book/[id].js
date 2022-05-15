import React from "react";
import Layout from "../../src/component/Layout";
import { useRouter } from "next/router";
import LOAD from '../../src/constants/LOAD';
import axios from "axios";
import KEY from "../../src/constants/keys_property";

const TITLE = 'Книга';
const URL = '/api/book/';

// TODO DELETE
const IMAGE_SOURCE = '/api/image/c93ef8a2.A1CBFA6A.JPG';

const Book = () => {
  const router = useRouter();

  const [load, setLoad] = React.useState(LOAD.NONE);
  const [error, setError] = React.useState(null);
  const [book, setBook] = React.useState(null);

  React.useEffect(() => {
    if (router.query.id) {
      axios.get(`${URL}${router.query.id}`).then(({ data }) => {
        setLoad(LOAD.LOADED);
        setBook(data);
      }).catch(reason => {
        setLoad(LOAD.ERROR);
        setError(reason?.response?.data || null);
      });
      setLoad(LOAD.LOADING);

    }
  }, [router.query.id]);

  return (
    <Layout title={book?.name ? book.name : TITLE}>
      {book ? <>
        <div>
          <h2>{book.author}: {book.name}</h2>
        </div>

        <div>
          <div>
            <div>
              {book.image ? <img src={book.image} /> : <div><p>картинка не найдена</p></div>}
            </div>
          </div>
          <div>
            <div>
              <div>Название:</div>
              <div>{book.name}</div>
            </div>
            <div>
              <div>Автор:</div>
              <div>{book.author}</div>
            </div>
            <div>
              <div>Год выпуска:</div>
              <div>{book.time}</div>
            </div>
            <div>
              <div>Жанры:</div>
              <div>{book.genres.map((g, i, a) => <React.Fragment key={i}><b>{g}</b>{a.length === i + 1 ? '' : ', '}</React.Fragment>)}</div>
            </div>
          </div>
          <div>
            <button>изменить</button>
          </div>
        </div>
      </> : null}

      <style jsx>{`
      
      `}</style>
    </Layout>
  );
};

export default Book;