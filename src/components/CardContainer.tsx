import { For, createMemo, createSignal, onCleanup } from "solid-js";
import { createQuery } from "@tanstack/solid-query";
import { getUid } from "~/utils";
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

  node.setAttribute("uid", `${uid}`);

  return uid;
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

      result.push({ anchor: item, uid });
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
