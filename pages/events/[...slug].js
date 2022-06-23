import { useRouter } from 'next/router';
import EventList from '../../components/events/event-list';
import { getFilteredEvents } from '../../dummy-data';

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
    return <p>Invalid filter. Please adjust your values!</p>;
  }

  const filteredEvents = getFilteredEvents({ year: numYear, month: numMonth });

  if (!filteredEvents || filteredEvents.length === 0) {
    return <p>No events found for the chosen filters!</p>;
  }

  return (
    <div>
      <EventList items={filteredEvents} />
    </div>
  );
}

export default FilteredEventsPage;
