import React, { createContext, useContext, useState, useCallback } from 'react';
import axios from 'axios';

const RecentSaveListContext = createContext();

export const RecentSaveListProvider = ({ children }) => {
  const [RecentSaveList, setRecentSaveList] = useState([]);

  const GetRecentSaveList = useCallback(async () => {
    let auth_key = atob(sessionStorage.getItem("auth_key"));
    const params = { auth_key: auth_key };
    if (auth_key !== null) {
      try {
        const response = await axios.get('https://minelife-api.azurewebsites.net/get_user_activities', { params });
        if (response.status === 200) {
          setRecentSaveList(response.data.user_actrivities_details);
        } else {
          setRecentSaveList([]);
        }
      } catch (error) {
        console.log("Error", error);
      }
    }
  }, []);

  return (
    <RecentSaveListContext.Provider value={{ RecentSaveList, GetRecentSaveList }}>
      {children}
    </RecentSaveListContext.Provider>
  );
};

export const useRecentSaveList = () => useContext(RecentSaveListContext);
