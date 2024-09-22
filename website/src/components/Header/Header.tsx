import React, { RefObject, useContext } from "react";
import { Link } from "gatsby";
import classNames from "classnames";

import { MenuContext } from "../../contexts";
import { useHeaderAssets } from "../../hooks/queries";
import Menu from "./components/Menu";

import * as styles from "./Header.module.scss";

import { ReactSVG } from "react-svg";

type HeaderProps = {
  headerIsWhite: boolean;
  forwardedRef: RefObject<HTMLDivElement>;
  withoutGradient: boolean;
  headerShow: boolean;
};

const Header = ({
  headerIsWhite,
  forwardedRef,
  withoutGradient,
  headerShow,
}: HeaderProps) => {
  const { logotype } = useHeaderAssets();
  const { isOpened, handleTogglingIsOpened } = useContext(MenuContext);

  const menuStatus = isOpened ? "opened" : "closed";
  const barStyles = classNames(styles.bar, "pageWrapper");
  const headerStyles = classNames(styles.container, {
    [styles.isWhite]: headerIsWhite && !isOpened,
    [styles.gradientIsRemoved]: withoutGradient,
    [styles.isShow]: headerShow,
  });

  return (
    <div className={headerStyles} ref={forwardedRef}>
      <div className={barStyles}>
        <div className={styles.logotype}>
          <Link to="/" id="logoHomePage" title={"JS Station logo"}>
            <ReactSVG src={logotype.publicURL} title={"JS Station logo"} />
          </Link>
        </div>

        <ul className={styles.navItems}>
          <li>
            <Link
              to="/services/"
              className={styles.contact}
              data-status={menuStatus}
            >
              services
            </Link>
          </li>
          <li>
            <Link
              to="/portfolio/"
              className={styles.contact}
              data-status={menuStatus}
            >
              Projects
            </Link>
          </li>
          <li>
            {" "}
            <Link
              to="/blog/"
              className={styles.contact}
              data-status={menuStatus}
            >
              blog
            </Link>
          </li>
          <li>
            {" "}
            <Link
              to="/contacts/"
              className={styles.contact}
              data-status={menuStatus}
            >
              Contact
            </Link>
          </li>
        </ul>

        {isOpened ? <Menu /> : null}

        <div className={styles.menuBar}>
          <button
            type="button"
            className={styles.menuButton}
            onClick={handleTogglingIsOpened}
          >
            <span className={styles.menuIcon} data-status={menuStatus}></span>
            <span className={styles.hiddenTitle}>Menu</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;
