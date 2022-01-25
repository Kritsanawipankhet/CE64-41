export default function Index() {
  const registerUser = async (event) => {
    event.preventDefault();
    console.log(event);
    const res = await fetch("http://localhost:3000/api/register", {
      body: JSON.stringify({
        name: event.target.name.value,
      }),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    });

    const result = await res.json();
    console.log(result);
  };

  return (
    <div>
      <form onSubmit={registerUser}>
        <input type="text" name="name" />
        <button type="submit">Submit</button>
      </form>
      <p></p>
    </div>
  );
}
