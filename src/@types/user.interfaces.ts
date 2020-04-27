export interface UserBasicInfo {
  id: string;
  username: string;
  profilePic?: string;
  followed: boolean;
}

export interface User extends UserBasicInfo {
  fullname: string;
  email: string;
  followingCount: number;
  followersCount: number;
  status: string;
}
