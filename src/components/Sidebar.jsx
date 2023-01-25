import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import {
  BarChart,
  ChatBubbleOutline,
  DynamicFeed,
  LineStyle,
  List,
  MailOutline,
  PermIdentity,
  PlayCircleOutlineRounded,
  Report,
  Timeline,
  TrendingUp,
  WorkOutline,
} from '@material-ui/icons';

const Sidebar = () => {
  return (
    <Container>
      <Wrapper>
        <SidebarMenu>
          <Title>Dashboard</Title>
          <SidebarList>
            <SidebarListItem active>
              <NavLink
                to='/'
                className={({ isActive }) =>
                  isActive ? 'sidebar__link active' : 'sidebar__link'
                }
              >
                <LineStyle
                  style={{ fontSize: '2rem', marginRight: '0.5rem' }}
                />
                Home
              </NavLink>
            </SidebarListItem>
            <SidebarListItem>
              <Timeline style={{ fontSize: '2rem', marginRight: '0.5rem' }} />
              Analytics
            </SidebarListItem>
            <SidebarListItem>
              <TrendingUp style={{ fontSize: '2rem', marginRight: '0.5rem' }} />
              Sales
            </SidebarListItem>
          </SidebarList>
        </SidebarMenu>
        <SidebarMenu>
          <Title>Quick menu</Title>
          <SidebarList>
            <SidebarListItem>
              <NavLink
                to='/users'
                className={({ isActive }) =>
                  isActive ? 'sidebar__link active' : 'sidebar__link'
                }
              >
                <PermIdentity
                  style={{ fontSize: '2rem', marginRight: '0.5rem' }}
                />
                Users
              </NavLink>
            </SidebarListItem>
            <SidebarListItem>
              <NavLink
                to='/movies'
                className={({ isActive }) =>
                  isActive ? 'sidebar__link active' : 'sidebar__link'
                }
              >
                <PlayCircleOutlineRounded
                  style={{ fontSize: '2rem', marginRight: '0.5rem' }}
                />
                Movies
              </NavLink>
            </SidebarListItem>
            <SidebarListItem>
              <NavLink
                to='/lists'
                className={({ isActive }) =>
                  isActive ? 'sidebar__link active' : 'sidebar__link'
                }
              >
                <List style={{ fontSize: '2rem', marginRight: '0.5rem' }} />
                Lists
              </NavLink>
            </SidebarListItem>
            <SidebarListItem>
              <BarChart style={{ fontSize: '2rem', marginRight: '0.5rem' }} />
              Reports
            </SidebarListItem>
          </SidebarList>
        </SidebarMenu>
        <SidebarMenu>
          <Title>Notifications</Title>
          <SidebarList>
            <SidebarListItem>
              <MailOutline
                style={{ fontSize: '2rem', marginRight: '0.5rem' }}
              />
              Mail
            </SidebarListItem>
            <SidebarListItem>
              <DynamicFeed
                style={{ fontSize: '2rem', marginRight: '0.5rem' }}
              />
              Feedback
            </SidebarListItem>
            <SidebarListItem>
              <ChatBubbleOutline
                style={{ fontSize: '2rem', marginRight: '0.5rem' }}
              />
              Messages
            </SidebarListItem>
          </SidebarList>
        </SidebarMenu>
        <SidebarMenu>
          <Title>Staff</Title>
          <SidebarList>
            <SidebarListItem>
              <WorkOutline
                style={{ fontSize: '2rem', marginRight: '0.5rem' }}
              />
              Manage
            </SidebarListItem>
            <SidebarListItem>
              <Timeline style={{ fontSize: '2rem', marginRight: '0.5rem' }} />
              Analytics
            </SidebarListItem>
            <SidebarListItem>
              <Report style={{ fontSize: '2rem', marginRight: '0.5rem' }} />
              Reports
            </SidebarListItem>
          </SidebarList>
        </SidebarMenu>
      </Wrapper>
    </Container>
  );
};

const Container = styled.div`
  flex: 1;
  height: calc(100vh - 5rem);
  background-color: rgb(251, 251, 255);
  position: sticky;
  top: 5rem;
`;

const Wrapper = styled.div`
  font-size: 1.5rem;
  padding: 2rem;
  color: #555;
`;

const SidebarMenu = styled.div`
  margin-bottom: 1rem;
`;

const Title = styled.h3`
  font-size: 1.3rem;
  text-transform: uppercase;
  color: rgb(187, 186, 186);
`;

const SidebarList = styled.ul`
  list-style: none;
  padding: 0.5rem;
`;

const SidebarListItem = styled.li`
  padding: 0.5rem;
  cursor: pointer;

  display: flex;
  align-items: center;
  border-radius: 1rem;
  // background-color: ${(props) => props.active && 'rgb(240, 240, 255)'};
  -webkit-transition: all 0.5s ease;
  transition: all 0.5s ease;

  &:hover {
    background-color: rgb(240, 240, 255);
  }
`;

export default Sidebar;
