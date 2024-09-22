import React, { Fragment } from "react";

import Switcher from "./components/Switcher";
import { Post } from "@types/Post";


export type Props = {
  items: Post[];
  page: number;
};

const Previews = ({ items, page }: Props) => {
  return (
    <Fragment>
      <Switcher items={items} page={page} />
    </Fragment>
  );
};

export default Previews;
