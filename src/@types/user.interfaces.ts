export interface UserBasicInfo {
  id: string;
  username: string;
  profilePic?: string;
}

export interface User extends UserBasicInfo {
  fullname: string;
  email: string;
  followingCount: number;
  followersCount: number;
  status: string;
}
