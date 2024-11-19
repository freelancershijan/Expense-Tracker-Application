import { BiMoney } from 'react-icons/bi';
import { useGetValueOrDefault } from '../../utils/useGetValueOrDefault';
import Skeleton from "../Loading/Skeleton";

export default function BoxItem({ type, bg, title, value, isLoading, mainBg }) {

  const displayValue = useGetValueOrDefault(value, '0.00');
  let content;
  if (isLoading) content = <Skeleton />
  if (!isLoading && value) content = displayValue;

  return (
    <div
      className={`lg:col-span-1 md:col-span-1 p-5 flex justify-start gap-5 items-center rounded-lg shadow-lg`}
      style={{ backgroundColor: mainBg || 'white' }}
    >
      <div
        className={`${ mainBg ? 'border-white border-2' : '' } rounded-full p-3`}
        style={{ backgroundColor: bg }}
      >
        <BiMoney className={`w-6 h-6 ${ type === 'cost' ? 'text-red-500' :  type === 'fund' ? 'text-green-500' : 'text-white' }`}></BiMoney>
      </div>
      <div>
        <div className={`text-lg font-semibold ${ mainBg ? 'text-white' : 'text-gray-800' }`}>{content}</div>
        <p className={`${ mainBg ? 'text-white' : 'text-gray-700' }`}>{title}</p>
      </div>
    </div>
  );
}
