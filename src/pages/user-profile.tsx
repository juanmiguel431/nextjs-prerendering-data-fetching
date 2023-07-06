import { GetServerSideProps, NextPage } from 'next';

interface UserProfilePageProps {
  username: string;
}

const UserProfilePage: NextPage<UserProfilePageProps> = (props) => {

  return (
    <div className="user-profile">
      <h1>{props.username}</h1>
    </div>
  );
};

export default UserProfilePage;

export const getServerSideProps: GetServerSideProps<UserProfilePageProps> = async (context) => {
  const { params, res, req } = context;
  return {
    props: {
      username: 'Juan Miguel Paulino Carpio'
    },
  }
};
