import { useEffect, useState } from 'react';
import axios from 'axios';
import Aos from 'aos';
import 'aos/dist/aos.css';
import styles from './mylist.module.css';

export default function MyList() {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get(
          `https://6372695e025414c6370f15bd.mockapi.io/users?limit=20&page=${currentPage}`,
        );
        setUsers((prevUsers) => [...prevUsers, ...res.data]);
        setCurrentPage((prevPage) => prevPage + 1);
      } catch (error) {
        console.error(error);
      } finally {
        setIsFetching(false);
      }
    };

    if (isFetching) {
      fetchUsers();
    }
  }, [currentPage, isFetching]);

  useEffect(() => {
    const handleScroll = () => {
      const isAtBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight;
      if (isAtBottom && !isFetching) {
        setIsFetching(true);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isFetching]);

  useEffect(() => {
    Aos.init({ duration: 1000 });
  }, []);

  return (
    <div className={styles.listBlock}>
      {users.map((user) => (
        <ul className={styles.list} key={user.id} data-aos="fade-up">
          <li>
            {user.id}. {user.name} {user.surname}
          </li>
        </ul>
      ))}
    </div>
  );
}
