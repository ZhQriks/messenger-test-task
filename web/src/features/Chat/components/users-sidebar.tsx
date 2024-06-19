import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import UserPill from "@/components/user-pill";
import useInfinityUsers from "@/lib/hooks/users/useInfinityUsers";
import clsx from "clsx";
import { Search } from "lucide-react";
import { Fragment } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

const UsersSidebar = ({ className }) => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfinityUsers();

  console.log("data", data);

  return (
    <div className={clsx("border-r flex flex-col", className)}>
      <div className="border-b border-gray-200 p-4">
        <div onClick={() => fetchNextPage} className="relative">
          <Input placeholder="Search contacts..." />
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
        </div>
      </div>
      <div className="flex-1 overflow-y-auto max-h-full">
        <div className="divide-y divide-gray-200 w-full overflow-y-auto">
          {data?.pages && (
            <InfiniteScroll
              dataLength={data?.pages?.length}
              next={fetchNextPage}
              hasMore={!!hasNextPage}
              loader={<h4>Loading...</h4>}
              endMessage={
                <p style={{ textAlign: "center" }}>
                  <b>Yay! You have seen it all</b>
                </p>
              }
              scrollableTarget="scrollableDiv"
            >
              {data?.pages?.map((page, index) => (
                <Fragment key={index}>
                  {page?.users?.data.map((preview, index) => (
                    <div key={index} className="py-2">
                      <UserPill
                        key={preview.user._id}
                        id={preview.user._id}
                        name={preview.user.email}
                        lastMessage={preview.lastMessage?.text || ""}
                        time="2h ago"
                      />
                    </div>
                  ))}
                </Fragment>
              ))}
            </InfiniteScroll>
          )}
        </div>
      </div>
    </div>
  );
};

export default UsersSidebar;
