import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { IoSearchOutline } from "react-icons/io5";
import { IoIosCloseCircle } from "react-icons/io";

export const Search = () => {
  //Set Use navigate to use route in the app
  const navigate = useNavigate();
  //Set the value of the search
  const [value, setValue] = useState("");

  //Handle the button for the search, and apply check to proceed
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    const string = /^[^0-9]+[^0-9]$/;
    const empty = /^\S+$/;

    e.preventDefault();

    if (!value) return;

    if (!string.test(value)) {
      toast.error("Only the name in the search!");
      return;
    }
    if (!empty.test(value)) {
      return;
    }
    navigate(`/search?${value}`);
  };

  //Handle clear search input
  const onClear = () => {
    setValue("");
  };

  //Handle change value search input
  const handleValueChange = (data: string) => {
    setValue(data);
  };

  return (
    <>
      <form
        onSubmit={onSubmit}
        className="relative w-full lg:w-[400px] flex items-center"
      >
        <input
          value={value}
          onChange={(e) => handleValueChange(e.target.value)}
          placeholder="Search by name of character"
          className="flex h-8 w-full rounded-md border border-input bg-[#282828] px-3 py-2 text-sm  placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50 rounded-r-none focus-visible:ring-transparent text-white font-kodeMono outline-none "
        />
        {value && (
          <IoIosCloseCircle
            className="absolute right-14 h-5 w-5 text-muted-foreground cursor-pointer hover:opacity-75 text-white transition"
            onClick={onClear}
          />
        )}
        <button
          type="submit"
          className="bg-primary text-primary-foreground hover:bg-primary/90 text-2xl bg-white h-8 w-8 rounded-r-lg"
        >
          <IoSearchOutline className="h-7 w-7 " />
        </button>
      </form>
    </>
  );
};
