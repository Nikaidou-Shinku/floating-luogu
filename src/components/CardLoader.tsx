import { JSX, Show, Suspense, createSignal } from "solid-js";
import { createQuery } from "@tanstack/solid-query";
import { fetchUser } from "~/utils/fetcher";
import { InfoCard, LoadingCard } from "~/components";

let floatNumber = 2000100;

const getStyle = (x: number, y: number): JSX.CSSProperties => {
  floatNumber += 100;

  const MAX_WIDTH = document.body.clientWidth;

  const deltaRight = x + 169 - MAX_WIDTH;
  const deltaLeft = 218 - x;

  const baseTop = y + 30;
  let baseLeft = x - 150;

  if (deltaRight > 0) {
    baseLeft -= deltaRight;
  }

  if (deltaLeft > 0) {
    baseLeft += deltaLeft;
  }

  return {
    "position": "absolute",
    "z-index": floatNumber,
    "opacity": 1,
    "top": `${baseTop}px`,
    "left": `${baseLeft}px`,
  };
};

interface CardLoaderProps {
  id: number;
  uid: number;
}

export default (props: CardLoaderProps) => {
  const query = createQuery(
    () => ["userinfo", props.uid],
    fetchUser,
  );

  // TODO: calc position
  const [style, setStyle] = createSignal<JSX.CSSProperties>(getStyle(100, 200));

  return (
    <div style={style()}>
      <Suspense fallback={<LoadingCard />}>
        <Show when={query.data}>
          {(u) => <InfoCard user={u()} />}
        </Show>
      </Suspense>
    </div>
  );
};
