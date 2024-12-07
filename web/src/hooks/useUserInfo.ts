import { useEffect, useState } from "react";

export interface UserInfo {
  id: number;
  accountType: string;
}

const useUserInfo = () => {
  const [userInfo, setUserInfo] = useState<UserInfo>({
    id: 0,
    accountType: "",
  });

  const getUserInfoFromLocalStorage = () => {
    const userInfo = localStorage.getItem("user");
    if (userInfo) {
      const parsedUserInfo = JSON.parse(userInfo);
      if (parsedUserInfo) {
        setUserInfo(parsedUserInfo);
      }
    }
  };

  useEffect(() => {
    getUserInfoFromLocalStorage();
  }, []);

  return { userInfo };
};

export default useUserInfo;
