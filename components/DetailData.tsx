import Link from "next/link";

interface DetailDataProps {
  children?: React.ReactNode;
  data: string | number | boolean;
  icon?: React.ReactNode;
  link?: string;
  className?: string;
}

export default function DetailData({ children, data, icon, link, className }: DetailDataProps) {
  console.log("DetailData", children, data, link);

  return (
    <>
    {data && 
      <div className={"flex flex-wrap gap-2 items-center " + (className ? className : "")}>
        {icon}
        {link ? 
          (<Link href={link}><h3 className="hover:underline">{children ? children : data}</h3></Link>)
        :
          (<h3>{children ? children : data}</h3>)
        }
      </div>
    }
    </>
  );
}