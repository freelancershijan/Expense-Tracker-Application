import { Link } from "react-router-dom";

export default function BreadCrumbs({breadcrumbs}){
    return (
      <ol class="flex items-center whitespace-nowrap">
      <li class="inline-flex items-center">
        <Link to={breadcrumbs?.[0]?.path} class="text-sm capitalize font-semibold hover:text-blue-600 focus:outline-none focus:text-blue-600">
          {breadcrumbs?.[0]?.name}
        </Link>
         <span className="mx-1">/</span>
      </li>
      <li class="inline-flex items-center text-sm capitalize font-semibold text-gray-800 truncate dark:text-neutral-200" aria-current="page">
        {breadcrumbs?.[1]?.name}
      </li>
    </ol>
    );
}