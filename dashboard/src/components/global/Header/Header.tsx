import Logo from "./Logo";
import NavItems from "./NavItems";
import UserMenu from "./UserMenu";


const Header = () => {
  return (
    <div className="flex flex-row py-4 items-center justify-between border-b">
      <div className="flex items-center gap-2">
        <Logo />
        <NavItems />
      </div>
      <UserMenu />
    </div>
  );
};

export default Header;
