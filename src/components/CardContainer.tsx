import { For, createMemo, createSignal, createUniqueId, onCleanup } from "solid-js";
import { createQuery } from "@tanstack/solid-query";
import { getUid, logDebug, logWarn } from "~/utils";
import { fetchSelf } from "~/utils/fetcher";
import { StateProvider } from "~/state";
import { CardLoader } from "~/components";

const check = (node: HTMLAnchorElement): number | null => {
  const href = node.getAttribute("href");

  if (href === null) {
    return null;
  }

  const uid = getUid(href);

  if (uid === null) {
    return null;
  }

  // avoid duplicate
  const mark = node.getAttribute("uid");

  if (mark === `${uid}`) {
    return null;
  }

  return uid;
};

const dirty = (node: HTMLAnchorElement): HTMLAnchorElement => {
  const id = createUniqueId();
  node.setAttribute(`card-${id}`, "");
  const parent = node.parentElement;

  if (parent === null) {
    return node;
  }

  if (parent.tagName !== "SPAN") {
    return node;
  }

  logDebug("kill official card", parent);

  // 鲨官方卡片🔪
  const newParent = document.createElement("template");
  newParent.innerHTML = parent.outerHTML;
  const newNode = newParent.content.querySelector(`a[card-${id}]`);

  if (newNode === null) {
    logWarn("不小心把新 node 玩丢了！");
    return node;
  }

  parent.replaceWith(newParent.content);

  return newNode as HTMLAnchorElement;
};

export default () => {
  const self = createQuery(() => ["self"], fetchSelf);

  const csrfToken = (() => {
    const csrfNode = document.querySelector("meta[name=\"csrf-token\"]");

    if (csrfNode === null) {
      return "";
    }

    return csrfNode.getAttribute("content") ?? "";
  })();

  const state = createMemo(() => {
    let selfUid = self.data;

    if (typeof selfUid === "undefined") {
      selfUid = null;
    }

    return { selfUid, csrfToken };
  });

  interface AnchorPair {
    anchor: HTMLAnchorElement;
    uid: number;
  }

  const [links, setLinks] = createSignal<AnchorPair[]>([]);

  const timer = setInterval(() => {
    const result: AnchorPair[] = [];

    const links = document.getElementsByTagName("a");

    for (const item of links) {
      const uid = check(item);

      if (uid === null) {
        continue;
      }

      item.setAttribute("uid", `${uid}`);

      result.push({ anchor: dirty(item), uid });
    }

    setLinks((last) => [...last, ...result]);
  }, 500);

  onCleanup(() => clearInterval(timer));

  return (
    <StateProvider state={state()}>
      <For each={links()}>
        {(a) => <CardLoader {...a} />}
      </For>
    </StateProvider>
  );
};
