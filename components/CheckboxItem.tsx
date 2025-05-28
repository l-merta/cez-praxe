import { Checkbox } from "@/components/ui/checkbox";

interface CheckboxItemProps {
  name: string;
  label: string;
  value?: boolean;
  onCheckedChange: (name: string, checked: boolean) => void;
}

export default function CheckboxItem({ name, label, value, onCheckedChange }: CheckboxItemProps) {
  return (
    <div className="flex items-center gap-2 p-2">
      <Checkbox id={name} defaultChecked={value} onCheckedChange={(checked) => onCheckedChange(name, !!checked)} />
      <label
        htmlFor={name}
        className="text-sm font-medium leading-none cursor-pointer peer-disabled:opacity-70"
      >
        {label}
      </label>
    </div>
  );
}