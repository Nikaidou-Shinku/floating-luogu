import { JSX, Show, createEffect, createSignal, onCleanup } from "solid-js";
import { debounce } from "@solid-primitives/scheduled";
import { Transition } from "solid-transition-group";
import { getCardStyle } from "~/utils/card";
import { UserCard } from "~/components";
import "./styles.css";

interface CardLoaderProps {
  anchor: HTMLAnchorElement;
  uid: number;
}

export default (props: CardLoaderProps) => {
  const [style, setStyle] = createSignal<JSX.CSSProperties>();
  const [display, setDisplay] = createSignal(false);

  const onMouseLeave = debounce(() => setDisplay(false), 300);

  const onMouseEnter = (e: MouseEvent) => {
    if (display()) {
      onMouseLeave.clear();
      return;
    }

    const callback = debounce(() => {
      setStyle(getCardStyle(e.pageX, e.pageY));
      setDisplay(true);
    }, 100);

    callback();
  };

  createEffect(() => {
    props.anchor.addEventListener("mouseenter", onMouseEnter);
    props.anchor.addEventListener("mouseleave", onMouseLeave);

    onCleanup(() => {
      props.anchor.removeEventListener("mouseenter", onMouseEnter);
      props.anchor.removeEventListener("mouseleave", onMouseLeave);
    });
  });

  return (
    <Transition name="card-fade">
      <Show when={display()}>
        <div
          style={style()}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
        >
          <UserCard uid={props.uid} />
        </div>
      </Show>
    </Transition>
  );
};
