import { BiMoney } from 'react-icons/bi';
import { formatNumbersWithCommas } from '../../utils/formatNumbersWithCommas';
import Skeleton from "../Loading/Skeleton";

export default function BoxItem({ color, bg, title, value, isLoading, mainBg }) {
  let content;
  if (isLoading) content = <Skeleton />
  if (!isLoading && value) content = formatNumbersWithCommas(value)
  return (
    <div className={`lg:col-span-1 md:col-span-1 p-5 flex justify-start gap-5 items-center ${ mainBg ? `bg-[${ mainBg }]` : 'bg-white' } rounded-lg shadow-lg`}>

      <div className={`bg-[${ bg }] ${ mainBg ? 'border-white border-2' : '' } rounded-full p-3`}>
        <BiMoney className={`w-6 h-6 text-${ color }`}></BiMoney>
      </div>
      <div>
        <div className={`text-lg font-semibold ${ mainBg ? 'text-white' : 'text-gray-800' }`}>{content}</div>
        <p className={`${ mainBg ? 'text-white' : 'text-gray-700' }`}>{title}</p>
      </div>
    </div>
  );
}