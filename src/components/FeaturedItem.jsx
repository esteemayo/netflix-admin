import styled from 'styled-components';
import { ArrowDownward, ArrowUpward } from '@material-ui/icons';

const FeaturedItem = ({ type }) => {
  let data;

  switch (type) {
    case 'revenue':
      data = {
        title: 'Revenue',
        money: '2,415',
        rate: '-11.4',
        icon: (
          <ArrowDownward style={{
            fontSize: '1.4rem',
            marginLeft: '0.5rem',
            color: 'red',
          }} />
        ),
      };
      break;

    case 'sales':
      data = {
        title: 'Sales',
        money: '4,415',
        rate: '-1.4',
        icon: (
          <ArrowDownward style={{
            fontSize: '1.4rem',
            marginLeft: '0.5rem',
            color: 'red',
          }} />
        ),
      };
      break;

    case 'cost':
      data = {
        title: 'Cost',
        money: '2,415',
        rate: '2.4',
        icon: (
          <ArrowUpward style={{
            fontSize: '1.4rem',
            marginLeft: '0.5rem',
            color: 'green',
          }} />
        ),
      };
      break;

    default:
      break;
  }

  return (
    <div>FeaturedItem</div>
  );
};

export default FeaturedItem;
