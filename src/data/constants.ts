export const userPageRegex = [
  /^user\/\d+$/,
  /^\/user\/\d+$/,
  /^https:\/\/www\.luogu\.com\.cn\/user\/\d+$/,
  /^https:\/\/www\.luogu\.com\.cn\/space\/show\?uid=\d+$/
];

export const userPageUrlIndex = [ 5, 6, 30, 40 ];

export module consts {
  export let currentUID: number = -1;
  export let csrfToken: string = "";
}
