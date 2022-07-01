import { useRouter } from 'next/router';
import EventList from '../../components/events/event-list';
import { getFilteredEvents } from '../../helpers/api-util';
import ResultsTitle from '../../components/events/results-title';
import Button from '../../components/ui/button';
import ErrorAlert from '../../components/ui/error-alert';

function FilteredEventsPage(props) {
  const router = useRouter();

  // we couldn't destract both values here from array because useRouter() will be called after first render of this componenet, so basicaly router.query.slug will return undefined on first render of this componenet, and after second render we will have queries. That's why we have if conditions for (!filterData)
  // const filterData = router.query.slug;

  // if (!filterData) {
  //   return <p className='center'>Loading...</p>;
  // }

  // // converting strings into numbers and extract from array
  // const numYear = +filterData[0];
  // const numMonth = +filterData[1];

  if (props.hasError) {
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

  const filteredEvents = props.events;

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

  const date = new Date(props.date.year, props.date.month - 1);

  return (
    <div>
      <ResultsTitle date={date} />
      <EventList items={filteredEvents} />
    </div>
  );
}

export async function getServerSideProps(context) {
  const { params } = context;

  const filterData = params.slug;

  const numYear = +filterData[0];
  const numMonth = +filterData[1];

  if (
    isNaN(numYear) ||
    isNaN(numMonth) ||
    numYear > 2030 ||
    numYear < 2021 ||
    numMonth < 1 ||
    numMonth > 12
  ) {
    return {
      props: {
        hasError: true,
      },
      // notFound: true,  show 404 page
      // redirect: {
      //   destination: '/error'
      // }
    };
  }

  const filteredEvents = await getFilteredEvents({ year: numYear, month: numMonth });

  return {
    props: {
      events: filteredEvents,
      date: {
        year: numYear,
        month: numMonth,
      },
    },
  };
}

export default FilteredEventsPage;
