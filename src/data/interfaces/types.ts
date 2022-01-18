interface Prize {
  year: number,
  contestName: string,
  prize: string
}

export interface UserInfo {
  registerTime: number,
  introduction: string,
  prize: Prize[],
  background: string,
  blogAddress: string,
  followingCount: number,
  followerCount: number,
  ranking: number,
  userRelationship: number,
  reverseUserRelationship: number,
  passedProblemCount: number,
  submittedProblemCount: number,
  uid: number,
  name: string,
  slogan: string,
  badge: string,
  isAdmin: boolean,
  isBanned: boolean,
  color: string,
  ccfLevel: number,
  isRoot: boolean
}

export interface ColorTable {
  purple: string,
  red: string,
  orange: string,
  yellow: string,
  green: string,
  bluelight: string,
  gray: string,
  brown: string,
  blue: string,
  gold: string,
  black: string
}

export interface SearchResult {
  0: string,
  1: string,
  index: number,
  endIdx: number
}

export interface ProblemInfo {
  pid: string,
  title: string,
  type: string,
  fullScore: number,
  difficulty: number
}
