import { FC, PropsWithChildren } from "react";

import Autocomplete from "../../components/Autocomplete";
import { searchRestaurants } from "../../utils/api";
import { Restaurant } from "../../types";
import SearchResult from "../../components/SearchResult";

const ResultsContainer: FC<PropsWithChildren> = (props) => {
  const { children } = props;

  return (
    <table>
      <thead>
        <th>Name</th>
        <th>Start</th>
        <th>City</th>
        <th>Category</th>
      </thead>
      <tbody>{children}</tbody>
    </table>
  );
};

const Home: FC = () => {
  const renderResultItem = (resultItem: Restaurant) => {
    const { name, stars, city, categories } = resultItem;
    return (
      <SearchResult
        name={name}
        city={city}
        stars={stars}
        categories={categories}
      />
    );
  };

  const getResultId = (result: Restaurant) => result.business_id;

  return (
    <div>
      <Autocomplete
        getResultId={getResultId}
        onChange={searchRestaurants}
        pageSize={5}
        renderResult={renderResultItem}
        // renderResultsContainer={() => <ResultsContainer />}
      />
    </div>
  );
};

export default Home;
