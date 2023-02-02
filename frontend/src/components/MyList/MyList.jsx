import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Aos from 'aos';
import style from './mylist.module.css';
import 'aos/dist/aos.css';

export default function MyList() {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [fetching, setFetching] = useState(true);

  const scrollHandler = (e) => {
    if (e.target.documentElement.scrollHeight - (e.target.documentElement.scrollTop + window.innerHeight) < 10) {
      setFetching(true);
    }
  };

  useEffect(() => {
    if (fetching) {
      console.log(fetching);
      axios.get(`https://6372695e025414c6370f15bd.mockapi.io/users?limit=20&page=${currentPage}`)
        .then((res) => {
          setUsers([...users, ...res.data]);
          setCurrentPage((prev) => prev + 1);
        })
        .finally(() => setFetching(false));
    }
  }, [fetching]);

  useEffect(() => {
    document.addEventListener('scroll', scrollHandler);
    return function () {
      document.removeEventListener('scroll', scrollHandler);
    };
  });

  useEffect(() => {
    Aos.init({ duration: 1000 });
  }, []);

  return (

    <div className={style.listBlock}>
      {users?.map((user) => (
        <ul className={style.list} key={user.id}>
          <li data-aos="fade-up">
            {user.id}
            .
            {' '}
            {user.name}
            {' '}
            {user.surname}
          </li>
        </ul>
      ))}
    </div>

  );
}
