import Conversations from "./Conversations";
import LogoutButton from "./LogoutButton";
import SearchInput from "./SearchInput";

const Sidebar = ({ areas, loading }) => {
  return (
    <div className='border-r border-orange-500 p-4 flex flex-col'>
      <SearchInput />
      <div className='divider px-3'></div>
      {loading ? (
        <span className="loading loading-spinner mx-auto"></span>
      ) : (
        <div className="flex flex-col gap-2">
          {areas.map((area) => (
            <div key={area._id} className="hover:bg-green-800 rounded p-2 py-1 cursor-pointer">
              <p className="font-bold text-gray-700">{area.name}</p>
            </div>
          ))}
        </div>
      )}
      <Conversations />
      <LogoutButton />
    </div>
  );
};
export default Sidebar;
