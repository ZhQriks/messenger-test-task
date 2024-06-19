import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import UserPill from "@/components/user-pill";
import useInfinityUsers from "@/lib/hooks/users/useInfinityUsers";
import clsx from "clsx";
import { Search } from "lucide-react";
import { Fragment, useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

const UsersSidebar = ({ className }) => {
  const [searchValue, setSearchValue] = useState<string>("");
  const [debouncedSearch, setDebouncedSearch] = useState<string>("");
  const handleInputChange = (event) => {
    setSearchValue(event.target.value);
  };

  const { data, fetchNextPage, hasNextPage, isLoading } =
    useInfinityUsers(debouncedSearch);

  useEffect(() => {
    const delayInputTimeoutId = setTimeout(() => {
      setDebouncedSearch(searchValue);
    }, 500);
    return () => clearTimeout(delayInputTimeoutId);
  }, [searchValue, 500]);

  return (
    <div className={clsx("border-r flex flex-col", className)}>
      <div className="border-b border-gray-200 p-4">
        <div className="relative">
          <Input
            value={searchValue}
            onChange={handleInputChange}
            placeholder="Search contacts..."
          />
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
        </div>
      </div>
      <div className="flex-1 h-[70vh] overflow-y-auto" id="scrollableDiv">
        <div className="divide-y divide-gray-200 w-full">
          {isLoading && <Spinner size="medium" className="mt-10" />}
          {data?.pages && (
            <InfiniteScroll
              dataLength={data?.pages?.length}
              next={fetchNextPage}
              hasMore={!!hasNextPage}
              loader={<Spinner size="medium" className="mt-10" />}
              endMessage={
                <p className="text-primary text-center">
                  There is nothing left!
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
