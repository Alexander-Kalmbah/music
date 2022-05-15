import { useRouter } from "next/router";

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="jsx_wrapper">
      <header className="jsx_header">
        <div className="jsx_nav">
          <button className="jsx_btn" onClick={() => router.back()}>back page</button>
        </div>
      </header>
      <div className="jsx_main">
        <h1 className="jsx_msg">404 | PAGE NOT FOUND</h1>
      </div>
      <style>{`
        .jsx_wrapper {
          position: relative;
          width: 100%;
          height: 100%;
        }
        .jsx_header {
          background: var(--theme-nearest);
          box-shadow: var(--shadow);
          position: sticky;
          top: 0;
          box-sizing: border-box;
          padding: 5px;
        }
        .jsx_nav {
          display: flex;
          flex-wrap: wrap;
        }
        .jsx_btn {
          background: none;
          cursor: var(--cursor-pointer);
          color: var(--theme-active);
          border: 1px solid var(--theme-active);
          padding: 0 15px;
        }
        .jsx_main {
          box-sizing: border-box;
          width: 100%;
          min-height: 70vh;
          padding: 20px;
          display: flex;
          text-align: center;
          align-items: center;
          justify-content: center;
        }
        .jsx_msg {
          font-size: 1.5rem;
          font-weight: 400;
          color: var(--theme-primary);
        }
        @media (max-width: 720px) {
          .jsx_msg {
            font-size: 1.2rem;
          }
        }
      `}</style>
    </div>
  );
};