import { ApiCardProps } from '@/interface/api';

interface CardProps {
  data: ApiCardProps;
}

export default function Card({ data }: CardProps) {
  return (
    <div className='rounded-t-md overflow-hidden'>
      <img src={data.primaryImage} alt='' className='aspect-[16/9] object-cover' />
      <div className="flex flex-col gap-2 p-4 rounded-b-md border-2 border-t-0 border-gray-100">
        <h2 className="text-2xl font-bold">{data.title}</h2>
        <p className="text-sm text-gray-500">{data.elementDescrition}</p>
        <p className="text-sm text-gray-500">{data.repository}</p>
      </div>
    </div>
  );
}