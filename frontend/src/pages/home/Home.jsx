import React from 'react';

function Home({ username }) {
 // Check if the username object exists before trying to access its properties
 if (!username) {
    return <div>Loading...</div>; // Or any other placeholder content
 }

 return (
    <div>
      <p>{username.email}</p>
      <p>{username.username}</p>
    </div>
 );
}

export default Home;