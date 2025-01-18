const func = async () => {
  const response = await window.api.ping()
  console.log(response) // prints out 'pong'
}

func()