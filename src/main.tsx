import { render } from "solid-js/web";
import { QueryClient, QueryClientProvider } from "@tanstack/solid-query";
import { MOCK_USER } from "~/mock";
import { logInfo } from "~/utils";
import { CardContainer, HelloBlock, InfoCard, LuoguBlock } from "~/components";

/// 在洛谷首页顶端创建一个 block 用于调试
const insertDebugBlock = () => {
  logInfo("Starting...");

  if (import.meta.env.MODE === "dev") {
    const container = document.getElementsByClassName("lg-index-content");

    if (container.length <= 0) {
      return;
    }

    const debugContainer = document.createElement("div");
    container[0].prepend(debugContainer);

    render(() => (
      <>
        <LuoguBlock>
          <HelloBlock />
        </LuoguBlock>
        <LuoguBlock center>
          <InfoCard
            user={MOCK_USER}
            refetch={() => undefined}
          />
        </LuoguBlock>
      </>
    ), debugContainer);
  }
};

const insertCardContainer = () => {
  const body = document.getElementsByTagName("body");

  if (body.length <= 0) {
    throw new Error("?");
  }

  const cardContainer = document.createElement("div");
  cardContainer.setAttribute("style", "position: absolute; top: 0; left: 0");
  body[0].append(cardContainer);

  const queryClient = new QueryClient();

  render(() => (
    <QueryClientProvider client={queryClient}>
      <CardContainer />
    </QueryClientProvider>
  ), cardContainer);
};

const main = () => {
  insertDebugBlock();
  insertCardContainer();

  logInfo("脚本已加载√", "Floating Luogu 用户群 885149235 欢迎来玩~");
};

main();
