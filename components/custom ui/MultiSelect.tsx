"use client";

import {
  Command,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { useState } from "react";
import { Badge } from "../ui/badge";
import { X } from "lucide-react";

interface MultiSelectProps {
  placeholder: string;
  value: string[];
  collections: CollectionType[];
  onChange: (value: string) => void;
  onRemove: (value: string) => void;
}

const MultiSelect: React.FC<MultiSelectProps> = ({
  placeholder,
  value,
  collections,
  onChange,
  onRemove,
}) => {
  const [inputValue, setInputValue] = useState("");
  const [open, setOpen] = useState(false);

  let selected: CollectionType[];
  if (value.length === 0) {
    selected = [];
  } else {
    selected = value.map((id) =>
      collections.find((collection) => collection._id === id)
    ) as CollectionType[];
  }

  const selectables =
    collections &&
    collections.filter((collection) => !selected.includes(collection));
  return (
    <Command className="overflow-visible bg-white">
      <div className="flex flex-wrap gap-1 border rounded-md">
        {selected.map((collection) => (
          <Badge key={collection._id}>
            {collection.title}
            <button
              className="ml-1 hover:text-red-1 "
              onClick={() => onRemove(collection._id)}
            >
              <X className="h-3 w-3" />
            </button>
          </Badge>
        ))}
        <CommandInput
          placeholder={placeholder}
          value={inputValue}
          onValueChange={setInputValue}
          onBlur={() => setOpen(false)}
          onFocus={() => setOpen(true)}
        />
      </div>
      <div className="mt-2 relative">
        {open && (
          <CommandList className=" absolute top-0 z-10 w-full overflow-auto border rounded-md shadow-md ">
            {selectables &&
              selectables.map((collection) => (
                <CommandGroup
                  key={collection._id}
                  onMouseDown={(e) => {
                    e.preventDefault();
                  }}
                  onClick={() => {
                    onChange(collection._id);
                    setInputValue("");
                  }}
                  className="hover:bg-grey-2 cursor-pointer"
                >
                  <CommandItem>{collection.title}</CommandItem>
                </CommandGroup>
              ))}
          </CommandList>
        )}
      </div>
    </Command>
  );
};

export default MultiSelect;
