import React, { Fragment } from "react";

// import { useProjectsAssets } from "../../hooks/queries";
import List from "./components/List";
import Others from "./components/Others";
// @ts-ignore
import * as styles from "./Projects.module.scss";
import { useProjectsAssets } from "@hooks/queries";

type props = {
  title: string;
  navigation: boolean;
};

const Projects = ({ title, navigation }: props) => {
  const { ...listAssets } = useProjectsAssets();

  return (
    <Fragment>
      <div className={styles.sliderWrapper}>
      <List {...listAssets} />
      </div>

      {navigation ? <Others /> : null}
    </Fragment>
  );
};


export default Projects;
