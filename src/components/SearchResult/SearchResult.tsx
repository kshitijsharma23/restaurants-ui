import { FC } from "react";
import { Restaurant } from "../../types";

interface SearchResultProps
  extends Pick<Restaurant, "name" | "city" | "stars" | "categories"> {}

const SearchResult: FC<SearchResultProps> = (props) => {
  const { name, city, stars, categories } = props;
  return (
    <tr>
      <td>{name}</td>
      <td>{city}</td>
      <td>{stars}</td>
      <td>{categories}</td>
    </tr>
  );
};

export default SearchResult;
