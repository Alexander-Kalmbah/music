import React from "react";
import Link from "next/link";

export default function Home() {
  React.useEffect(() => {

  });

  return (
    <div>
      <h1>HOME</h1>
      <div>
        <Link href='/audio/add'><a>add audio</a></Link>
      </div>
      <div>
        <Link href='/image/add'><a>add image</a></Link>
      </div>
      <div>
        <Link href='/not_found'><a>not found</a></Link>
      </div>
      <div>
        <Link href='/book/list'><a>books</a></Link>
      </div>
    </div>
  );
};
