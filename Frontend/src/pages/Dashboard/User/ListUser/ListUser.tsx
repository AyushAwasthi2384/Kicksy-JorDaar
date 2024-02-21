import { useEffect, useState } from "react";
import { getUsers } from "../../../../api/admin.api";
import style from "./ListUser.module.css";
import UserDashboardCard from "../../../../components/UserDashboardCard/UserDashboardCard";
import { Pagination } from "@mui/material";

const ListUser = () => {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);

  const fetchUsers = async (page) => {
    const response = await getUsers(page);
    if (response.statusCode === 200) {
      setUsers(response.data.users);
    }
  };
  useEffect(() => {
    fetchUsers(page);
  }, [page]);

  return (
    <div className={style.container}>
      <div className={style.sectionTitle}>
        <div className={style.name}>Name</div>
        <div className={style.phone}>Phone Number</div>
        <div className={style.role}>Role</div>
        <div className={style.status}>Status</div>
      </div>
      {users.map((user, index) => {
        return (
          <div key={index}>
            <UserDashboardCard data={user} />
          </div>
        );
      })}
      <div className={style.pagination}>
        <Pagination
          count={10}
          page={page}
          onChange={(e, value) => setPage(value)}
        />
      </div>
    </div>
  );
};

export default ListUser;
