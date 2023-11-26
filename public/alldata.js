function AllData() {
    const [data, setData] = React.useState([]);
  
    React.useEffect(() => {
      fetch('/account/allData') // Update the URL to match your server's URL
        .then((response) => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then((data) => {
        console.log('Data received:', data);
          setData(data);
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
          setData([]);
        });
    }, []);
  
    return (
      <>
        <h5>All Data in Store:</h5>
        <ul>
          {data.map((item) => (
            <li key={item._id}>
              {item.name}
              {item.email}
              {item.password}
              {item.balance}
            </li>
          ))}
        </ul>
      </>
    );
  }
  