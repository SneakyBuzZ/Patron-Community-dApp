import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const NotFoundPage = () => {
  const navigate = useNavigate();
  const handleNotFound = async () => {
    navigate('/explore');
  };
  return (
    <>
      <h1 className="text-PATRON_TEXT_WHITE_PRIMARY">THIS IS 404 NOT FOUND PAGE</h1>
      <Button onClick={handleNotFound}>Go Back</Button>
    </>
  );
};

export default NotFoundPage;

// {/* <div>
// {/* navbar */}
// <div className="h-screen">
//   <div className="flex justify-between m-3">
//     <nav className="flex gap-5 ">
//       <img className="w-10" src="/Logo.png" alt="logo.png" />
//       <div className="bg-gray-800  rounded-lg  w-60 h-8 border border-1 border-slate-500  "></div>
//     </nav>
//     <div className="flex gap-6 mr-4 mb-2">
//       <a href="#">Github</a>
//       <a href="#">Privacy</a>
//       <a href="#">Terms</a>
//     </div>
//   </div>

//   <div className="border  border-b border-slate-800 "></div>
//   <div className="flex flex-row">
//     {/*menu*/}
//     <div className="w-60 h-screen border border-t-0 border-r border-l-0 border-slate-800">
//       <div>
//         <h1 className="m-3 text-2xl">Menu</h1>
//         <div className="w-60 border border-1 border-slate-800"></div>
//         <div className="flex flex-col">
//           <button className="w-40 ml-2 mt-5 p-1 border border-1 border-slate-800 rounded-md">
//             Channel
//           </button>
//           <button className="w-40 ml-2 mt-3 p-1 border border-1 border-slate-800 rounded-md">
//             Popular
//           </button>
//           <button className="w-40 ml-2 mt-3 p-1 border border-1 border-slate-800 rounded-md">
//             Posta
//           </button>
//           <div className="mt-5 border border-1 border-slate-800 border-b "></div>
//         </div>
//       </div>

//       <div>
//         <h1 className="m-3 text-2xl">Tags</h1>
//         <div className="w-60 border border-1 border-slate-800 border-b"></div>
//         <div className="grid-flow-row grid sm:grid-cols-2">
//           <button className="border  border-1 border-slate-800 rounded-md ml-2 mt-4 w-20 ">
//             jazz
//           </button>
//           <button className="border  border-1 border-slate-800 rounded-md ml-2 mt-4 w-20">
//             jazz
//           </button>
//           <button className="border  border-1 border-slate-800 rounded-md ml-2 mt-4 w-20">
//             jazz
//           </button>
//           <button className="border  border-1 border-slate-800 rounded-md ml-2 mt-4 w-20">
//             jazz
//           </button>
//         </div>
//         <div className="mt-5 border border-1 border-slate-800 border-b "></div>
//       </div>

//       <div>
//         <h1 className="m-3">Menu</h1>
//         <div className="w-60 border border-1 border-slate-800 border-b"></div>
//         <div className="flex flex-col">
//           <button className="w-40 ml-2 mt-5 p-1 border border-1 border-slate-800 rounded-md">
//             Channel
//           </button>
//           <button className="w-40 ml-2 mt-3 p-1 border border-1 border-slate-800 rounded-md">
//             Popular
//           </button>
//           <button className="w-40 ml-2 mt-3 p-1 border border-1 border-slate-800 rounded-md">
//             Posta
//           </button>
//           <div className="mt-5 border border-1 border-slate-800 border-b "></div>
//         </div>
//       </div>
//     </div>

//     {/*post section*/}
//     <div className="ml-10 grid-flow-row grid sm:grid-cols-3 grid-cols-1 gap-5 justify-center">
//       <div className="border-red rounded-2xl bg-gray-800 mt-8 w-80 h-90">
//         <div className="rounded">
//           <img
//             className="rounded-t-2xl "
//             src="https://plus.unsplash.com/premium_photo-1687382111414-7b87afa5da34?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fGltYWdlfGVufDB8fDB8fHww"
//             alt=""
//           />
//         </div>
//         <div className="pl-2">
//           <h1 className="font-sans ui-monospace mt-2 ">
//             Lorem ipsum dolor, sit amet consectetur adipisicing elit. Atque explicabo ipsum{' '}
//           </h1>
//         </div>
//         <div className="mt-1 flex items-center  gap-2 ">
//           <img
//             className="mb-3 ml-2 w-8 pl-0"
//             src="https://cdn-icons-png.flaticon.com/128/2589/2589175.png"
//             alt=""
//           />
//         </div>
//       </div>
//       <div className="border-red rounded-2xl bg-gray-800 mt-8 w-80 h-90">
//         <div className="rounded">
//           <img
//             className="rounded-t-2xl "
//             src="https://plus.unsplash.com/premium_photo-1687382111414-7b87afa5da34?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fGltYWdlfGVufDB8fDB8fHww"
//             alt=""
//           />
//         </div>
//         <div className="pl-2">
//           <h1 className="font-sans ui-monospace mt-2 ">
//             Lorem ipsum dolor, sit amet consectetur adipisicing elit. Atque explicabo ipsum{' '}
//           </h1>
//         </div>
//         <div className="mt-1 flex items-center  gap-2 ">
//           <img
//             className="mb-3 ml-2 w-8 pl-0"
//             src="https://cdn-icons-png.flaticon.com/128/2589/2589175.png"
//             alt=""
//           />
//         </div>
//       </div>
//       <div className="border-red rounded-2xl bg-gray-800 mt-8 w-80 h-90">
//         <div className="rounded">
//           <img
//             className="rounded-t-2xl "
//             src="https://plus.unsplash.com/premium_photo-1687382111414-7b87afa5da34?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fGltYWdlfGVufDB8fDB8fHww"
//             alt=""
//           />
//         </div>
//         <div className="pl-2">
//           <h1 className="font-sans ui-monospace mt-2 ">
//             Lorem ipsum dolor, sit amet consectetur adipisicing elit. Atque explicabo ipsum{' '}
//           </h1>
//         </div>
//         <div className="mt-1 flex items-center  gap-2 ">
//           <img
//             className="mb-3 ml-2 w-8 pl-0"
//             src="https://cdn-icons-png.flaticon.com/128/2589/2589175.png"
//             alt=""
//           />
//         </div>
//       </div>
//       <div className="border-red rounded-2xl bg-gray-800 mt-8 w-80 h-90">
//         <div className="rounded">
//           <img
//             className="rounded-t-2xl "
//             src="https://plus.unsplash.com/premium_photo-1687382111414-7b87afa5da34?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fGltYWdlfGVufDB8fDB8fHww"
//             alt=""
//           />
//         </div>
//         <div className="pl-2">
//           <h1 className="font-sans ui-monospace mt-2 ">
//             Lorem ipsum dolor, sit amet consectetur adipisicing elit. Atque explicabo ipsum{' '}
//           </h1>
//         </div>
//         <div className="mt-1 flex items-center  gap-2 ">
//           <img
//             className="mb-3 ml-2 w-8 pl-0"
//             src="https://cdn-icons-png.flaticon.com/128/2589/2589175.png"
//             alt=""
//           />
//         </div>
//       </div>
//       <div className="border-red rounded-2xl bg-gray-800 mt-8 w-80 h-90">
//         <div className="rounded">
//           <img
//             className="rounded-t-2xl "
//             src="https://plus.unsplash.com/premium_photo-1687382111414-7b87afa5da34?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fGltYWdlfGVufDB8fDB8fHww"
//             alt=""
//           />
//         </div>
//         <div className="pl-2">
//           <h1 className="font-sans ui-monospace mt-2 ">
//             Lorem ipsum dolor, sit amet consectetur adipisicing elit. Atque explicabo ipsum{' '}
//           </h1>
//         </div>
//         <div className="mt-1 flex items-center  gap-2 ">
//           <img
//             className="mb-3 ml-2 w-8 pl-0"
//             src="https://cdn-icons-png.flaticon.com/128/2589/2589175.png"
//             alt=""
//           />
//         </div>
//       </div>
//       <div className="border-red rounded-2xl bg-gray-800 mt-8 w-80 h-90">
//         <div className="rounded">
//           <img
//             className="rounded-t-2xl "
//             src="https://plus.unsplash.com/premium_photo-1687382111414-7b87afa5da34?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fGltYWdlfGVufDB8fDB8fHww"
//             alt=""
//           />
//         </div>
//         <div className="pl-2">
//           <h1 className="font-sans ui-monospace mt-2 ">
//             Lorem ipsum dolor, sit amet consectetur adipisicing elit. Atque explicabo ipsum{' '}
//           </h1>
//         </div>
//         <div className="mt-1 flex items-center  gap-2 ">
//           <img
//             className="mb-3 ml-2 w-8 pl-0"
//             src="https://cdn-icons-png.flaticon.com/128/2589/2589175.png"
//             alt=""
//           />
//         </div>
//       </div>
//       <img src="images/bellicon.jpeg" alt="" />
//     </div>
//   </div>
// </div>
// </div> */}
