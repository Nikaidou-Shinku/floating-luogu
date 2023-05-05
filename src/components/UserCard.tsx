import { Show, Suspense } from "solid-js";
import { createQuery } from "@tanstack/solid-query";
import { fetchUser } from "~/utils/fetcher";
import { InfoCard, LoadingCard } from "~/components";

interface UserCardProps {
  uid: number;
}

export default (props: UserCardProps) => {
  const query = createQuery({
    queryKey: () => ["userinfo", props.uid],
    queryFn: fetchUser,
    staleTime: 10000, // cache for 10s
  });

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
