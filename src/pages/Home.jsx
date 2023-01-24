import styled from 'styled-components';
import { useEffect, useMemo, useState } from 'react';

import { phone } from 'responsive';
import Chart from 'components/Chart';
import WidgetSm from 'components/WidgetSm';
import WidgetLg from 'components/WidgetLg';
import FeaturedInfo from 'components/FeaturedInfo';
import { getUsersStats } from 'services/userService';

const Home = () => {
  const [userStats, setUserStats] = useState([]);

  const MONTHS = useMemo(
    () => [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ],
    []
  );

  useEffect(() => {
    (async () => {
      try {
        const {
          data: { stats },
        } = await getUsersStats();

        // const statsList = stats.sort((a, b) => (a._id - b._id));

        stats.map((item) =>
          setUserStats((prev) => [
            ...prev,
            { name: MONTHS[item._id - 1], 'Active User': item.total },
          ])
        );
      } catch (err) {
        console.log(err);
      }
    })();
  }, [MONTHS]);

  return (
    <Container>
      <FeaturedInfo />
      <Chart
        data={userStats}
        title='User Analytics'
        grid
        dataKey='Active User'
      />
      <Widget>
        <WidgetSm />
        <WidgetLg />
      </Widget>
    </Container>
  );
};

const Container = styled.div`
  flex: 4;
`;

const Widget = styled.div`
  display: flex;
  margin: 2rem;

  ${phone({ flexDirection: 'column' })}
`;

export default Home;
