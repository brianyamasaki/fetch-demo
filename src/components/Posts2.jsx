import React from 'react';
import { fetchDataV2 } from './fetchData';
import '../App.css';

const Posts2 = () => {

  const [ posts, setPosts] = React.useState([]);
  const [ errorMsg, setErrorMsg ] = React.useState('');
  const [ users, setUsers] = React.useState([]);

  // all fetches must be in a useEffect, otherwise fetches will happen continuously.
  // like when the user moves the mouse over the component. Second argument to useEffect is required. See documentation.
  React.useEffect(() =>{
    const fetchPosts = async () => {
      const { isOK, data} = await fetchDataV2('https://jsonplaceholder.typicode.com/posts');
      if (isOK) {
        setPosts(data);
      } else {
        setErrorMsg('network error');
      }
      const result = await fetchDataV2('https://randomuser.me/api/?results=101');
      if (result.isOK) {
        setUsers(result.data.results);
      } else {
        setErrorMsg('network error');
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
      <h1>Posts 2</h1>
      {renderPosts()}
      <p>{errorMsg}</p>
    </div>
  )
}

export default Posts2;