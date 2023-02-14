import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { useEffect, useMemo, useState } from 'react';

import { phone } from 'responsive';
import Chart from 'components/Chart';
import WidgetSm from 'components/WidgetSm';
import WidgetLg from 'components/WidgetLg';
import FeaturedInfo from 'components/FeaturedInfo';
import { getUsersStats } from 'services/userService';
import axios from 'axios';

const Home = () => {
  const [userStats, setUserStats] = useState([]);
  const { currentUser } = useSelector((state) => state.user);

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
        const { token } = axios.CancelToken.source();
        const {
          data: { stats },
        } = await getUsersStats(token);

        // const statsList = stats.sort((a, b) => (a._id - b._id));

        stats.map((item) =>
          setUserStats((prev) => [
            ...prev,
            { name: MONTHS[item._id - 1], 'Active User': item.total },
          ])
        );
      } catch (err) {
        if (axios.isCancel(err)) {
          console.log('cancelled');
        } else {
          // TODO: handle error
          console.log(err);
        }
      }
    })();
  }, [MONTHS]);

  if (!currentUser) {
    return null;
  }

  return (
    <Container>
      <FeaturedInfo />
      <Chart
        grid
        data={userStats}
        dataKey='Active User'
        title='User Analytics'
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
  background-color: ${({ theme }) => theme.bg};
`;

const Widget = styled.div`
  display: flex;
  margin: 2rem;

  ${phone({ flexDirection: 'column' })}
`;

export default Home;
