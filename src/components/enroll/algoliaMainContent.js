import React from "react";
import algoliasearch from "algoliasearch/lite";
import { InstantSearch } from "react-instantsearch-dom";

import { CustomSearchBox } from "./customSearchComponents/customSearchBox";
import { CustomHits } from "./customSearchComponents/customHits";

const searchClient = algoliasearch(
  process.env.GATSBY_ALGOLIA_APP_ID,
  process.env.GATSBY_ALGOLIA_SEARCH_KEY
);

const AlgoliaMainContent = () => {
  return (
    <InstantSearch searchClient={searchClient} indexName="ourportal">
      <CustomSearchBox />
      <CustomHits />
    </InstantSearch>
  );
};

export default AlgoliaMainContent;
