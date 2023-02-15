import styled from 'styled-components';
import { transactions } from 'data';

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
          {transactions.map((transaction) => {
            const { id, img, total, status, customer, createdAt } = transaction;
            return (
              <TableRow key={id}>
                <TableDataUser>
                  <Image
                    src={img}
                    alt=''
                  />
                  <UserName>{customer}</UserName>
                </TableDataUser>
                <TableDataDate>{createdAt}</TableDataDate>
                <TableDataAmount>${total}</TableDataAmount>
                <TableDataStatus>
                  <Button type={status}>{status}</Button>
                </TableDataStatus>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </Container>
  );
};

const Container = styled.div`
  flex: 2;
  padding: 2rem;
  -webkit-box-shadow: ${({ theme }) => theme.box};
  -moz-box-shadow: ${({ theme }) => theme.box};
  box-shadow: ${({ theme }) => theme.box};
`;

const Title = styled.h3`
  font-size: 2.2rem;
  font-weight: 600;
  text-transform: capitalize;
  color: ${({ theme }) => theme.textSoft};
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

const TableHeading = styled.th`
  color: ${({ theme }) => theme.textSoft};
`;

const TableBody = styled.tbody`
  color: ${({ theme }) => theme.text};
`;

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
  text-transform: capitalize;
  border-radius: 1rem;
  background-color: ${(props) => props.type === 'approved' && props.theme.bgApproved};
  background-color: ${(props) => props.type === 'declined' && props.theme.bgDeclined};
  background-color: ${(props) => props.type === 'pending' && props.theme.bgPending};
  color: ${(props) => props.type === 'approved' && props.theme.textApproved};
  color: ${(props) => props.type === 'declined' && props.theme.textDeclined};
  color: ${(props) => props.type === 'pending' && props.theme.textPending};
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
