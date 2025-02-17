const UserCard = ({user}) => {
  const {firstName,lastName, age, gender}=user;
  console.log(user);
  return (
    <div className="place-items-center my-1">
      <div className="card bg-base-200 w-96 h-[500px] shadow-xl">
        <figure className="px-10 pt-10">
          <img
            src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
            alt="Shoes"
            className="rounded-xl"
          />
        </figure>
        <div className="card-body items-center text-center">
          <h2 className="card-title">
            {firstName+" "+lastName}
          </h2>
          {age && gender &&  <p>{gender+", "+age}</p>}
          <p>About {firstName} </p>
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
