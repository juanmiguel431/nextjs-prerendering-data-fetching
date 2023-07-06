import { GetServerSideProps, NextPage } from 'next';

interface UserIdPageProps {
  id: number;
}

const UserIdPage: NextPage<UserIdPageProps> = (props) => {

  return (
    <div className="user-profile">
      <h1>{props.id}</h1>
    </div>
  );
};

export default UserIdPage;

export const getServerSideProps: GetServerSideProps<UserIdPageProps> = async (context) => {
  const { params, res, req } = context;

  const userIdParam = params?.uid as string;
  const userId: number = +userIdParam;

  if (isNaN(userId)) {
    return {
      notFound: true
    };
  }

  return {
    props: {
      id: userId
    },
  }
};
