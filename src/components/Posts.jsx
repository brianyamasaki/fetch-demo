import React from 'react';
import { fetchDataV1 } from './fetchData';
import '../App.css';

const Posts = () => {

  const [ posts, setPosts] = React.useState([]);
  const [ errorMsg, setErrorMsg ] = React.useState('');
  const [ users, setUsers] = React.useState([]);

  // all fetches must be in a useEffect, otherwise fetches will happen continuously.
  // like when the user moves the mouse over the component. Second argument to useEffect is required. See documentation.
  React.useEffect(() =>{
    const fetchPosts = async () => {
      try {
        // fetchDataV1 requires the caller to use a TRY..CATCH.
        const result = await fetchDataV1('https://jsonplaceholder.typicode.com/posts', {failureOdds: 0.4});
        setPosts(result);
        const users = await fetchDataV1('https://randomuser.me/api/?results=101', {failureOdds: 0.5});
        setUsers(users.results);
      }
      catch(error) {
        // all fetch failures end up here.
        setErrorMsg(error.message);
      }
    }
    
    fetchPosts();
  }, []);

  const renderPosts = () => {
    return posts.map(post => {
      const user = post.id < users.length ? users[post.id - 1] : undefined;
      let username = 'user not found';
      let imgSrc;
      if (user !== undefined) {
        username = `${user.name.first} ${user.name.last}`;
        imgSrc = user.picture.large;
      }
      return (
        <div className="post flex" key={post.id}>
          <div className="user">
            {imgSrc !== undefined ? <img src={imgSrc} alt="user photo" /> : null}
            {username}
          </div>
          <div className="post-text">
            <h2>{post.title}</h2>
            <p>{post.body}</p>
          </div>
        </div>
      )
    })
  }

  return (
    <div className="all-posts">
      <h1>Posts</h1>
      {renderPosts()}
      <p className="show-error">{errorMsg}</p>
    </div>
  )
}

export default Posts;