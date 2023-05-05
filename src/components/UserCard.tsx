import { Show, Suspense } from "solid-js";
import { createQuery } from "@tanstack/solid-query";
import { fetchUser } from "~/utils/fetcher";
import { InfoCard, LoadingCard } from "~/components";

interface UserCardProps {
  uid: number;
}

export default (props: UserCardProps) => {
  const query = createQuery(
    () => ["userinfo", props.uid],
    fetchUser,
  );

  return (
    <Suspense fallback={<LoadingCard />}>
      <Show when={query.data}>
        {(u) => (
          <InfoCard
            user={u()}
            refetch={query.refetch}
          />
        )}
      </Show>
    </Suspense>
  );
};
