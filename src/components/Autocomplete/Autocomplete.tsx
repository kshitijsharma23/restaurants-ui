import { ChangeEventHandler, FC, Fragment, ReactNode, useState } from "react";

interface AutocompleteProps {
  getResultId: (result: unknown) => string;
  onChange: (query: string) => Promise<unknown[] | undefined>;
  placeholder?: string;
  // renderResultsContainer: () => (
  //   children: ReactNode
  // ) => FunctionComponent<PropsWithChildren>;
  renderResult: (result: unknown) => ReactNode;
  pageSize: number;
}

const Autocomplete: FC<AutocompleteProps> = (props) => {
  const {
    getResultId,
    onChange,
    pageSize,
    placeholder = "Search",
    renderResult,
    // renderResultsContainer,
  } = props;
  const [results, setResults] = useState<unknown[] | undefined>();
  const [page, setPage] = useState(0);
  const [resultsToRender, setResultsToRender] = useState<
    unknown[] | undefined
  >();
  // const ResultsContainer = renderResultsContainer();

  const handleInputChange: ChangeEventHandler<HTMLInputElement> = async (
    event
  ) => {
    const query = event.target.value;
    const searchResults = await onChange(query);
    setResults(searchResults);
    setResultsToRender(searchResults?.slice(0, pageSize));
    setPage(0);
  };

  const showMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  return (
    <div>
      <input
        type="text"
        onChange={handleInputChange}
        placeholder={placeholder}
      />
      {resultsToRender ? (
        <>
          <table>
            <thead>
              <th>Name</th>
              <th>Start</th>
              <th>City</th>
              <th>Category</th>
            </thead>
            <tbody>
              {resultsToRender.map((result) => (
                <Fragment key={getResultId(result)}>
                  {renderResult(result)}
                </Fragment>
              ))}
            </tbody>
          </table>
          <button onClick={showMore}>Show More</button>
        </>
      ) : null}
    </div>
  );
};

export default Autocomplete;
