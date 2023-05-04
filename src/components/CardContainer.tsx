import { createQuery } from "@tanstack/solid-query";
import { fetchSelf } from "~/utils/fetcher";
import { CardLoader } from "~/components";

export default () => {
  const self = createQuery(() => ["self"], fetchSelf);

  // TODO: check the whole page and generate cards

  return (
    <CardLoader id={1} uid={126486} />
  );
};
