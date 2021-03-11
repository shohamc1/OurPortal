import React from "react";
import algoliasearch from "algoliasearch/lite";
import { InstantSearch, Configure } from "react-instantsearch-dom";

import { CustomSearchBox } from "./customSearchComponents/customSearchBox";
import { CustomHits } from "./customSearchComponents/customHits";
import { AuthContext } from "../../context/authContext";

const searchClient = algoliasearch(
  process.env.GATSBY_ALGOLIA_APP_ID,
  process.env.GATSBY_ALGOLIA_SEARCH_KEY
);

const AlgoliaMainContent = () => {
  const { activePage } = React.useContext(AuthContext);
  return (
    <InstantSearch searchClient={searchClient} indexName="ourportal">
      <Configure filters={activePage == "enroll" ? "" : "type:HASS"} />
      <CustomSearchBox />
      <CustomHits />
    </InstantSearch>
  );
};

export default AlgoliaMainContent;
