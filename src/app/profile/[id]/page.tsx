
interface Props {
  params: {
    id: string;   // replace with your dynamic segment name
  };
}


export default function UserProfile({params}: Props | any) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>Profile</h1>
      <hr />
      <hr />
      <p className="text-4xl">Profile page 
        <span className="p-2 ml-2 rounded bg-orange-400">{params.id}</span>
      </p>
    </div>
  );
}