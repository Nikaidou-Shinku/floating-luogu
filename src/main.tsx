import { render } from "solid-js/web";
import { FUser } from "~/data/types";
import { logInfo } from "~/utils";
import { HelloBlock, InfoCard, LuoguBlock } from "~/components";

// TODO: remove this
// eslint-disable-next-line quotes
const tmpUser: FUser = JSON.parse('{"rating":{"contestRating":81,"socialRating":6,"practiceRating":1,"basicRating":100,"prizeRating":60,"calculateTime":1675620517,"user":{"uid":126486,"name":"yurzhang","slogan":"どんな時も——夏の青さを、覚えていた。","badge":"ATRI","isAdmin":true,"isBanned":false,"color":"Purple","ccfLevel":7,"background":"https://cdn.luogu.com.cn/upload/image_hosting/y2pk46mp.png"},"rating":248},"organization":null,"email":"yurzhang@163.com","phone":"13972753103","registerTime":1535807404,"introduction":"这里是退役选手 yurzhang，[这个](https://nikaidou-shinku.github.io/)是我的万年不更（源代码弄丢了）博客。\\n\\n[这个](https://yurzhang.com/)是我的新博客，近期会选择性迁移一部分内容，今后将在新博客上更新。\\n","prize":[{"year":2018,"contestName":"NOIP提高","prize":"一等奖"},{"year":2019,"contestName":"CSP提高","prize":"一等奖"}],"followingCount":133,"followerCount":1510,"ranking":1301,"blogAddress":"https://www.luogu.com.cn/blog/yurzhang/","unreadMessageCount":0,"unreadNoticeCount":0,"userRelationship":0,"reverseUserRelationship":0,"passedProblemCount":440,"submittedProblemCount":3283,"uid":126486,"name":"yurzhang","slogan":"どんな時も——夏の青さを、覚えていた。","badge":"ATRI","isAdmin":true,"isBanned":false,"color":"Purple","ccfLevel":7,"background":"https://cdn.luogu.com.cn/upload/image_hosting/y2pk46mp.png","verified":true}');

/// 在洛谷首页顶端创建一个 block 用于调试
const insertDebugBlock = () => {
  logInfo("Starting...");

  if (import.meta.env.MODE === "dev") {
    const container = document.getElementsByClassName("lg-index-content");

    if (container.length > 0) {
      const debugContainer = document.createElement("div");
      container[0].prepend(debugContainer);

      render(() => (
        <>
          <LuoguBlock>
            <HelloBlock />
          </LuoguBlock>
          <LuoguBlock center>
            <InfoCard user={tmpUser} />
          </LuoguBlock>
        </>
      ), debugContainer);
    }
  }
};

const main = () => {
  insertDebugBlock();
};

main();
