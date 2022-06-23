import { useRouter } from 'next/router';
import EventList from '../../components/events/event-list';
import { getFilteredEvents } from '../../dummy-data';
import ResultsTitle from '../../components/events/results-title';
import Button from '../../components/ui/button';
import ErrorAlert from '../../components/ui/error-alert';

function FilteredEventsPage() {
  const router = useRouter();

  // we couldn't destract both values here from array because useRouter() will be called after first render of this componenet, so basicaly router.query.slug will return undefined on first render of this componenet, and after second render we will have queries. That's why we have if conditions for (!filterData)
  const filterData = router.query.slug;

  if (!filterData) {
    return <p className='center'>Loading...</p>;
  }

  // converting strings into numbers and extract from array
  const numYear = +filterData[0];
  const numMonth = +filterData[1];

  if (
    // user can type in url something that is not a valid number like 'abc' so we check for numYear and numMonth is this two values are not a number, if this is true we display invalid filters
    isNaN(numYear) ||
    isNaN(numMonth) ||
    numYear > 2030 ||
    numYear < 2021 ||
    numMonth < 1 ||
    numMonth > 12
  ) {
    return (
      <>
        <ErrorAlert>
          <p>Invalid Filters. Please adjust your filters!</p>
        </ErrorAlert>
        <div className='center'>
          <Button link='/events'>Show all Events</Button>
        </div>
      </>
    );
  }

  const filteredEvents = getFilteredEvents({ year: numYear, month: numMonth });

  if (!filteredEvents || filteredEvents.length === 0) {
    return (
      <>
        <ErrorAlert>
          <p>No events found for the chosen filters!</p>
        </ErrorAlert>
        <div className='center'>
          <Button link='/events'>Show all Events</Button>
        </div>
      </>
    );
  }

  const date = new Date(numYear, numMonth - 1);

  return (
    <div>
      <ResultsTitle date={date} />
      <EventList items={filteredEvents} />
    </div>
  );
}

export default FilteredEventsPage;
