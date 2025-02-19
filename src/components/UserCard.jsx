const UserCard = ({ user }) => {
  const { firstName, lastName, age, gender, photoUrl, about } = user;
  console.log(user);
  return (
    <div className="place-items-center overflow-auto">
      <div className="card bg-base-300 w-96 h-auto shadow-xl">
        <figure className="px-10 pt-10">
          <img
            src={photoUrl}
            alt="Profile Photo"
            className="rounded-xl h-auto"
          />
        </figure>
        <div className="card-body items-center text-center">
          <h2 className="card-title">{firstName + " " + lastName}</h2>
          {age && gender && <p className="my-1">{gender + ", " + age}</p>}
          <p className="h-auto mt-0">{about}</p>
          <div className="card-actions my-2">
            <button className="btn btn-primary">Ignore</button>
            <button className="btn btn-secondary">Interested</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
