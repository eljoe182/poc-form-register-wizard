export interface StepProps {
  number: number;
  title: string;
  active?: boolean;
  description?: string;
  completed?: boolean;
}

export default function StepComponent({
  number,
  title,
  description,
  active,
  completed,
}: StepProps) {
  return (
    <li class="flex items-center space-x-2.5 rtl:space-x-reverse">
      <span
        class={`flex items-center justify-center w-8 h-8 border rounded-full shrink-0
          ${active ? "bg-blue-500 text-white" : "bg-transparent border-gray-500 text-gray-500"}
          `}
      >
        {number}
      </span>
      <span class={`${active ? "" : "text-gray-500"}`}>
        <h3 class="font-medium leading-tight">{title}</h3>
        <p class="text-sm">{description}</p>
      </span>
    </li>
  );
}
