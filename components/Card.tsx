import { ApiCardProps } from '@/interface/api';

interface CardProps {
  data: ApiCardProps;
}

export default function Card({ data }: CardProps) {
  return (
    <div className='rounded-t-md overflow-hidden'>
      {data.primaryImage && <img src={data.primaryImageSmall} alt='' className='aspect-[16/9] object-cover' />}
      <div className="flex flex-col gap-2 p-4 rounded-b-md border-2 border-t-0 border-gray-100">
        <h3 className="text-xl font-bold">{data.title}</h3>
        {data.elementDescrition && <p className="text-sm text-gray-500">{data.elementDescrition}</p>}
        <p className="text-sm text-gray-500">{data.objectDate}</p>
      </div>
    </div>
  );
}