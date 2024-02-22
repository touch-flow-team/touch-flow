import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface IProps {
  element_list: {
    [key: string]: any;
    name: string;
  }[];
  label: string;
}

const Selector = ({ element_list, label }: IProps) => {
  return (
    <Select>
      <SelectTrigger className="w-full">
        <SelectValue placeholder={label} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>{label}</SelectLabel>
          {element_list.map((element) => (
            <SelectItem value={element.name}>{element.name}</SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default Selector;
