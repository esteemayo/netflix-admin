import styled from 'styled-components';

const WidgetLg = () => {
  return (
    <Container>
      <Title>Latest transaction</Title>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHeading>Customer</TableHeading>
            <TableHeading>Date</TableHeading>
            <TableHeading>Amount</TableHeading>
            <TableHeading>Status</TableHeading>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableDataUser>
              <Image src='https://images.pexels.com/photos/4172933/pexels-photo-4172933.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940' />
              <UserName>Susan carol</UserName>
            </TableDataUser>
            <TableDataDate>2 Jun 2021</TableDataDate>
            <TableDataAmount>$122.00</TableDataAmount>
            <TableDataStatus>
              <Button type='approved'>Approved</Button>
            </TableDataStatus>
          </TableRow>

          <TableRow>
            <TableDataUser>
              <Image src='https://images.pexels.com/photos/4172933/pexels-photo-4172933.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940' />
              <UserName>Susan carol</UserName>
            </TableDataUser>
            <TableDataDate>2 Jun 2021</TableDataDate>
            <TableDataAmount>$122.00</TableDataAmount>
            <TableDataStatus>
              <Button type='declined'>Declined</Button>
            </TableDataStatus>
          </TableRow>

          <TableRow>
            <TableDataUser>
              <Image src='https://images.pexels.com/photos/4172933/pexels-photo-4172933.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940' />
              <UserName>Susan carol</UserName>
            </TableDataUser>
            <TableDataDate>2 Jun 2021</TableDataDate>
            <TableDataAmount>$122.00</TableDataAmount>
            <TableDataStatus>
              <Button type='pending'>Pending</Button>
            </TableDataStatus>
          </TableRow>

          <TableRow>
            <TableDataUser>
              <Image src='https://images.pexels.com/photos/4172933/pexels-photo-4172933.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940' />
              <UserName>Susan carol</UserName>
            </TableDataUser>
            <TableDataDate>2 Jun 2021</TableDataDate>
            <TableDataAmount>$122.00</TableDataAmount>
            <TableDataStatus>
              <Button type='approved'>Approved</Button>
            </TableDataStatus>
          </TableRow>
        </TableBody>
      </Table>
    </Container>
  );
};

const Container = styled.div`
  flex: 2;
  padding: 2rem;
  -webkit-box-shadow: 0 0 1.5rem -1rem rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 0 0 1.5rem -1rem rgba(0, 0, 0, 0.75);
  box-shadow: 0 0 1.5rem -1rem rgba(0, 0, 0, 0.75);
`;

const Title = styled.h3`
  font-size: 2.2rem;
  font-weight: 600;
  text-transform: capitalize;
`;

const Table = styled.table`
  width: 100%;
  border-spacing: 2rem;
  font-size: 1.5rem;
`;

const TableRow = styled.tr``;

const TableHeader = styled.thead`
  text-align: left;
`;

const TableHeading = styled.th``;

const TableBody = styled.tbody``;

const TableDataUser = styled.td`
  display: flex;
  align-items: center;
  font-weight: 600;
`;

const Image = styled.img`
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
  display: block;
  object-fit: cover;
  margin-right: 1rem;
`;

const UserName = styled.span`
  text-transform: capitalize;
`;

const TableDataDate = styled.td`
  font-weight: 300;
`;

const TableDataAmount = styled.td`
  font-weight: 300;
`;

const TableDataStatus = styled.td``;

const Button = styled.button`
  border: none;
  display: block;
  padding: 0.5rem 0.7rem;
  text-transform: capitalise;
  border-radius: 1rem;
  background-color: #${(props) => props.type === 'approved' && 'e5faf1'};
  background-color: #${(props) => props.type === 'declined' && 'fff0f1'};
  background-color: #${(props) => props.type === 'pending' && 'ebf1fe'};
  color: #${(props) => props.type === 'approved' && '3bb077'};
  color: #${(props) => props.type === 'declined' && 'd95087'};
  color: #${(props) => props.type === 'pending' && '2a7ade'};
  -webkit-transition: all 0.5s ease;
  transition: all 0.5s ease;

  &:hover {
    transform: translateY(-3px);
  }

  &:focus {
    outline: none;
  }
`;

export default WidgetLg;
