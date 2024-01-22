import { IconSearch } from "@tabler/icons-react";
import { FC, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../@types/redux";
import { useSocket } from "../../../contexts/socketContext";
import avatar from "../../../services/avatar";

const FriendSearch: FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { userId } = useSelector((state: RootState) => state.user);
  const [results, setResults] = useState<any[]>([]);
  const socket = useSocket();

  useEffect(() => {
    if (!socket) return;
    // Handle search results from the server
    socket.on("searchResults", (res) => {
      setResults(res);
    });
  }, [socket]);

  useEffect(() => {
    if (!socket) return;

    // Emit the "search" event with the searchTerm
    socket.emit("search", searchTerm);
  }, [searchTerm]);
  return (
    <section className="flex flex-col">
      <div className="flex gap-4 bg-neutral-50 pl-4 items-center">
        <IconSearch />
        <input
          type="search"
          placeholder="New friends"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="bg-transparent py-4 w-full outline-none"
        />
      </div>
      {results.length > 0 && <div className="border-t"></div>}
      {results.map((result) => {
        //Hide self from result list
        if (result.id === userId) return null;
        //Get avatar img by seed
        const svg = avatar.getSvgBySeed(result.seed || "");
        return (
          <div
            key={result.id}
            className="flex p-2 gap-2  w-full bg-neutral-50 items-center hover:bg-neutral-200"
          >
            <img src={svg} alt="" className="h-16 w-16 rounded-md" />
            <div>
              <h2 className="font-normal text-xl">{result.name}</h2>
              <h4 className=" text-blue-800 italic">@{result.username}</h4>
            </div>
            <button className="ml-auto mr-2 hover:bg-blue-800 transition duration-200 py-2 px-4 rounded-md bg-blue-600 text-white">
              Add
            </button>
          </div>
        );
      })}
    </section>
  );
};

export default FriendSearch;
