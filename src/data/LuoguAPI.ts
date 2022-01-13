export const getUser = (uid: number) => {
  return `https://www.luogu.com.cn/user/${uid}`;
};

export const chatWith = (uid: number) => {
  return `https://www.luogu.com.cn/chat?uid=${uid}`;
};

export const UPDATE_FOLLOW = "https://www.luogu.com.cn/api/user/updateRelationShip";

export const getAvatar = (uid: number) => {
  return `https://cdn.luogu.com.cn/upload/usericon/${uid}.png`;
};
