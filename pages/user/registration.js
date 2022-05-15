import React from "react";
import Layout from "../../src/component/Layout";
import axios from "axios";

const TITLE = 'Регистрация';

const Registration = () => {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [repeatPassword, setRepeatPassword] = React.useState('');


  const send = () => {
    if (password === repeatPassword) {
      axios.post('/api/auth/registration', {
        username,
        password,
        repeatPassword
      }).then(res => {
        console.log(res);
      }).catch(reason => {
        console.warn(reason);
      });

      setPassword('');
      setRepeatPassword('');
    }
  };

  return (
    <Layout title={TITLE}>
      <div>
        <div>
          <h1>{TITLE}</h1>
        </div>
        <hr />
        <div>
          <label>
            <input type="text" placeholder="username" value={username} onChange={e => setUsername(e.target.value)} />
          </label>
        </div>
        <div>
          <label>
            <input type="password" placeholder="password" value={password} onChange={e => setPassword(e.target.value)} />
          </label>
        </div>
        <div>
          <label>
            <input type="password" placeholder="repeat password" value={repeatPassword} onChange={e => setRepeatPassword(e.target.value)} />
          </label>
        </div>
        <hr />
        <div>
          <button onClick={send}>{'регистрировать'}</button>
        </div>
      </div>
    </Layout>
  );
};

export default Registration;