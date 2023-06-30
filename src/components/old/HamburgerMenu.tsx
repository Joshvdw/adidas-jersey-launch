// import Image from "next/image";
// import { MenuProps } from "@/types/Types";

// export default function HamburgerMenu(props: MenuProps) {

//   const { openMenu, setOpenMenu } = props.menuState;

//   return (
//     <div
//       className="hamburger_menu_icon_wrapper"
//       onClick={() => setOpenMenu(!openMenu)}
//     >
//       {!openMenu ? (
//         <Image
//           src="/svg/hamburger_menu.svg"
//           width={30}
//           height={20}
//           alt="Hamburger Menu Icon"
//           className="hamburger_menu_icon"
//         />
//       ) : (
//         <>
//           <Image
//             src="/svg/hamburger_menu_closed.svg"
//             width={30}
//             height={20}
//             alt="Hamburger Menu Closed Icon"
//             className="hamburger_menu_icon"
//           />
//         </>
//       )}
//     </div>
//   );
// }
