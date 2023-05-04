export interface UserSummary {
  uid: number;
  name: string;
  slogan: string | null;
  badge: string | null;
  isAdmin: boolean;
  isBanned: boolean;
  color: string;
  ccfLevel: number;
  background: string;
  isRoot?: true;
}

interface User extends UserSummary {
  blogAddress: string | null;
  followingCount: number;
  followerCount: number;
  ranking: number | null;
}

interface Rating {
  contestRating: number;
  socialRating: number;
  practiceRating: number;
  basicRating: number;
  prizeRating: number;
  calculateTime: number;
  user: UserSummary;
  rating: number;
}

interface Prize {
  year: number;
  contestName: string;
  prize: string;
}

interface UserDetails extends User {
  rating?: Rating;
  registerTime: number;
  introduction: string | null;
  prize: Prize[];
}

interface UserRelaStats {
  userRelationship: number;
  reverseUserRelationship: number;
}

interface UserProbStats {
  passedProblemCount: number;
  submittedProblemCount: number;
}

type Maybe<T> = T | { [K in keyof T]: undefined };

export type FUser = UserDetails & Maybe<UserRelaStats> & Maybe<UserProbStats>;
